import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { State } from 'vuex-class';
import * as View from '!view!./widget.html?style=./widget.styl';

import { AppState } from '../../../vue/services/app/app-store';
import { User } from '../../user/user.model';
import { Comment } from '../comment-model';
import { Subscription } from '../../subscription/subscription.model';
import { Environment } from '../../environment/environment.service';
import { Analytics } from '../../analytics/analytics.service';
import { Growls } from '../../growls/growls.service';
import { Scroll } from '../../scroll/scroll.service';
import { Translate } from '../../translate/translate.service';
import { Api } from '../../api/api.service';
import { Translation } from '../../translation/translation.model';
import { AppLoading } from '../../../vue/components/loading/loading';
import { AppAuthRequired } from '../../auth/auth-required-directive.vue';
import { AppCommentWidgetComment } from './comment';
import { AppPagination } from '../../pagination/pagination';
import { AppCommentWidgetAddForm } from './add-form';
import { AppLoadingFade } from '../../loading/fade/fade';

let incrementer = 0;

@View
@Component({
	name: 'comment-widget',
	components: {
		AppLoading,
		AppLoadingFade,
		AppPagination,
		AppCommentWidgetComment,
		AppCommentWidgetAddForm,
	},
	directives: {
		AppAuthRequired,
	},
})
export class AppCommentWidget extends Vue
{
	@Prop( String ) resource: string;
	@Prop( Number ) resourceId: number;
	@Prop( Boolean ) noIntro?: boolean;

	@State app: AppState;

	id = ++incrementer;
	hasBootstrapped = false;
	hasError = false;
	isLoading = false;
	currentPage = 1;
	resourceOwner: User | null = null;
	comments: Comment[] = [];
	childComments: { [k: string]: Comment } = {};
	commentsCount = 0;
	parentCount = 0;
	perPage = 10;
	numPages = 0;
	replyingTo = 0;
	highlightedComment = 0;

	lang = this.getTranslationLabel( Translate.lang );
	allowTranslate = false;
	isTranslating = false;
	isShowingTranslations = false;
	translationsLoaded = false;
	translations: { [k: string]: Translation } = {};

	subscriptions: { [k: string]: Subscription } = {};

	loginUrl = '';

	// Translate = Translate;
	// Analytics = Analytics;

	async created()
	{
		await this.init();
		this.checkPermalink();
	}

	@Watch( 'resourceId' )
	@Watch( 'resourceName' )
	async init()
	{
		if ( !this.resource || !this.resourceId ) {
			return;
		}

		this.hasBootstrapped = false;
		this.hasError = false;
		this.currentPage = this.$route.query.comment_page ? parseInt( this.$route.query.comment_page, 10 ) : 1;
		await this.refreshComments();
	}

	mounted()
	{
		if ( !this.app.user ) {
			// this.loginUrl = Environment.authBaseUrl + '/login?redirect=' + encodeURIComponent( $location.absUrl() );
		}
	}

	private async refreshComments()
	{
		// Pull in new comments, huzzah!
		try {
			this.isLoading = true;
			const payload = await Comment.fetch( this.resource, this.resourceId, this.currentPage );
			this.isLoading = false;

			// Check the hash in the URL to see if we should autoscroll to a comment.
			this.checkAutoScroll();

			this.hasBootstrapped = true;
			this.hasError = false;
			this.comments = Comment.populate( payload.comments );
			this.resourceOwner = new User( payload.resourceOwner );
			this.perPage = payload.perPage || 10;
			this.commentsCount = payload.count || 0;
			this.parentCount = payload.parentCount || 0;

			// Child comments.
			this.childComments = {};
			if ( payload.childComments ) {
				const childComments: Comment[] = Comment.populate( payload.childComments );
				const grouped: any = {};
				for ( const child of childComments ) {
					if ( !grouped[ child.parent_id ] ) {
						grouped[ child.parent_id ] = [];
					}
					grouped[ child.parent_id ].push( child );
				}
				this.childComments = grouped;
			}

			// User subscriptions to comment threads.
			this.subscriptions = {};
			if ( payload.subscriptions ) {
				const subscriptions: Subscription[] = Subscription.populate( payload.subscriptions );
				const indexed: any = {};
				for ( const subscription of subscriptions ) {
					indexed[ subscription.resource_id ] = subscription;
				}
				this.subscriptions = indexed;
			}

			this.translations = {};
			this.isTranslating = false;
			this.isShowingTranslations = false;
			this.translationsLoaded = false;
			this.allowTranslate = this.gatherTranslatable().length > 0;

			this.$emit( 'count', this.commentsCount );
		}
		catch ( e ) {
			console.error( e );
			this.hasError = true;
		}
	}

	replyToComment( comment: Comment )
	{
		this.replyingTo = comment.id;
	}

	onCommentAdd( formModel: Comment, isReplying: boolean )
	{
		Analytics.trackEvent( 'comment-widget', 'add' );

		// Was it marked as possible spam?
		if ( formModel.status === Comment.STATUS_SPAM ) {
			Growls.success(
				this.$gettext( 'Your comment has been marked for review. Please allow some time for it to show on the site.' ),
				this.$gettext( 'Almost there...' ),
			);

			if ( Analytics ) {
				Analytics.trackEvent( 'comment-widget', 'spam' );
			}
		}
		// Otherwise refresh.
		else {

			// Force us back to the first page, but only if we weren't replying.
			// If they replied to a comment, obviously don't want to change back to the first page.
			this.changePage( isReplying ? this.currentPage : 1 );
		}
	}

	onReplyAdd( formModel: Comment )
	{
		this.onCommentAdd( formModel, true );
	}

	onPageChange( page: number )
	{
		this.changePage( page );
		Scroll.to( `comment-pagination-${this.id}`, { animate: false } );
	}

	changePage( page: number )
	{
		// Update the page and refresh the comments list.
		this.currentPage = page || 1;
		this.refreshComments();

		if ( Analytics ) {
			Analytics.trackEvent( 'comment-widget', 'change-page', this.currentPage + '' );
		}
	}

	async toggleTranslate()
	{
		// If we already loaded translations, just toggle back and forth.
		if ( this.translationsLoaded ) {
			this.isShowingTranslations = !this.isShowingTranslations;
			return;
		}

		// If they try translating again while one is already in process, skip it.
		if ( this.isTranslating || this.isLoading ) {
			return;
		}

		this.isTranslating = true;

		try {
			const commentIds = this.gatherTranslatable().map( ( item ) => item.id );
			const response = await Api.sendRequest(
				'/comments/translate',
				{ lang: Translate.lang, resources: commentIds },
				{ sanitizeComplexData: false, detach: true },
			);

			// This may happen if they changed the page while translating.
			// In that case, skip doing anything.
			if ( !this.isTranslating ) {
				return;
			}

			const translations: Translation[] = Translation.populate( response.translations );

			const indexed: any = {};
			for ( const translation of translations ) {
				indexed[ translation.resource_id ] = translation;
			}

			this.translations = indexed;

		}
		catch ( e ) {
			this.translations = {};
		}

		this.isTranslating = false;
		this.isShowingTranslations = true;
		this.translationsLoaded = true;
	}

	gatherTranslatable()
	{
		let comments = ([] as Comment[]).concat( this.comments );
		for ( const child of Object.values( this.childComments ) ) {
			comments.push( child );
		}

		const translationCode = this.getTranslationCode( Translate.lang );
		const translatable = comments.filter( ( comment ) =>
		{
			if ( comment.lang && comment.lang !== translationCode ) {
				return true;
			}
			return false;
		} );

		return translatable;
	}

	// Just a conversion.
	getTranslationCode( lang: string )
	{
		if ( lang === 'en_US' ) {
			return 'en';
		}
		else if ( lang === 'pt_BR' ) {
			return 'pt';
		}

		return lang;
	}

	// Just a conversion.
	getTranslationLabel( lang: string )
	{
		if ( lang === 'en_US' || lang === 'en' ) {
			return 'English';
		}
		else if ( lang === 'pt_BR' || lang === 'pt' ) {
			return 'Português';
		}

		return Translate.langsByCode[ lang ].label;
	}

	// private updateUrl( commentId?: number )
	// {
	// 	let query: any = {
	// 		comment_page: this.currentPage > 1 ? this.currentPage : undefined,
	// 	};

	// 	let hash = undefined;
	// 	if ( commentId ) {
	// 		hash = 'comment-' + commentId;
	// 		this.highlightedComment = commentId;
	// 	}
	// 	else {
	// 		this.highlightedComment = 0;
	// 	}

	// 	// We replace the URL and don't notify so that the controller doesn't reload.
	// 	// this.$router.replace( { name: this.$route.name, query, hash } );
	// 	// $state.go( $state.current, params, { location: 'replace', notify: false } );
	// }

	private checkPermalink()
	{
		// var hash = $location.hash();
		// if ( !hash || hash.indexOf( 'comment-' ) !== 0 ) {
		// 	return;
		// }

		// var id = parseInt( hash.substring( 'comment-'.length ) );
		// if ( !id ) {
		// 	return;
		// }

		// Comment.getCommentPage( id )
		// 	.then( function( page )
		// 	{
		// 		this._currentPage = page;
		// 		refreshComments();
		// 		updateUrl( id );

		// 		if ( Analytics ) {
		// 			Analytics.trackEvent( 'comment-widget:permalink' );
		// 		}
		// 	} )
		// 	.catch( function()
		// 	{
		// 		Growls.error( 'Invalid comment passed in.' );

		// 		// TODO: Track this error.
		// 	} );
	}

	private checkAutoScroll()
	{
		// var hash = $location.hash();
		// if ( hash && hash.indexOf( 'comment-' ) === 0 ) {
		// 	$timeout( function()
		// 	{
		// 		if ( $window.document.getElementById( hash ) ) {
		// 			Scroll.to( hash );
		// 		}
		// 	}, 0, false );
		// }
	}
}