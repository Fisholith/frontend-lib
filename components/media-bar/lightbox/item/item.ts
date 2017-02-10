import * as Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import * as View from '!view!./item.html?style=./item.styl';

import { MediaBarLightboxConfig, AppMediaBarLightbox } from '../lightbox';
import { AppJolticon } from '../../../../vue/components/jolticon/jolticon';
import { AppImgResponsive } from '../../../img/responsive/responsive.directive.vue';
import { AppVideoEmbed } from '../../../video/embed/embed';
import { AppSketchfabEmbed } from '../../../sketchfab/embed/embed';
import { findVueParent } from '../../../../utils/vue';
import { Screen } from '../../../screen/screen-service';

@View
@Component({
	name: 'media-bar-lightbox-item',
	components: {
		AppJolticon,
		AppVideoEmbed,
		AppSketchfabEmbed,
	},
	directives: {
		AppImgResponsive,
	},
})
export class AppMediaBarLightboxItem extends Vue
{
	@Prop( Object ) item: any;
	@Prop() itemIndex: number;
	@Prop() activeIndex: number;

	lightbox: AppMediaBarLightbox;

	isActive = false;
	isNext = false;
	isPrev = false;

	maxWidth = 0;
	maxHeight = 0;

	resize$ = Screen.resizeChanges.subscribe( async () =>
	{
		// We have to do it after changes are applied to the DOM.
		await this.$nextTick();
		this.calcDimensions();
	} );

	mounted()
	{
		this.lightbox = findVueParent( this, AppMediaBarLightbox ) as AppMediaBarLightbox;
		this.calcActive();
		this.calcDimensions();
	}

	destroyed()
	{
		this.resize$.unsubscribe();
	}

	@Watch( 'activeIndex' )
	activeIndexChange()
	{
		this.calcActive();
	}

	play()
	{
		this.lightbox.mediaBar.isPlaying = this.itemIndex;
	}

	calcDimensions()
	{
		this.maxWidth = this.lightbox.maxItemWidth - MediaBarLightboxConfig.itemPadding;
		this.maxHeight = this.lightbox.maxItemHeight;

		const captionElement = this.$el.getElementsByClassName( 'media-bar-lightbox-item-caption' )[0] as HTMLElement;
		if ( captionElement ) {
			this.maxHeight -= captionElement.offsetHeight;
		}

		if ( this.item.media_type === 'image' ) {
			const dimensions = this.item.media_item.getDimensions( this.maxWidth, this.maxHeight );
			this.maxWidth = dimensions.width;
			this.maxHeight = dimensions.height;
		}
	}

	async calcActive()
	{
		this.isActive = this.activeIndex === this.itemIndex;
		this.isNext = this.activeIndex + 1 === this.itemIndex;
		this.isPrev = this.activeIndex - 1 === this.itemIndex;

		this.$el.classList.remove( 'active', 'next', 'prev' );

		if ( this.isActive ) {
			this.$el.classList.add( 'active' );
		}
		else if ( this.isPrev ) {
			this.$el.classList.add( 'prev' );
		}
		else if ( this.isNext ) {
			this.$el.classList.add( 'next' );
		}

		if ( this.isActive || this.isNext || this.isPrev ) {

			// Since changing these values affect whether or not the image is loaded (v-if in the template)
			// we have to wait until vue compiles back in.
			await this.$nextTick();
			this.calcDimensions();
		}
	}
}