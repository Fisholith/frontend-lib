import { Component, Prop } from 'vue-property-decorator';
import View from '!view!./media-items.html?style=./media-items.styl';

import { BaseForm, FormOnInit, FormOnSubmit, FormOnLoad } from '../../../form.service';
import { Api } from '../../../../api/api.service';
import { MediaItem } from '../../../../media-item/media-item-model';
import { Clipboard } from '../../../../clipboard/clipboard-service';
import { AppFormControlUpload } from '../../upload/upload';
import { AppForm } from '../../../form';
import { AppTooltip } from '../../../../tooltip/tooltip';
import { AppJolticon } from '../../../../../vue/components/jolticon/jolticon';

interface FormModel {
	type: string;
	parent_id: number;
	image: File | null;
	_progress: ProgressEvent | null;
}

@View
@Component({
	components: {
		AppJolticon,
		AppFormControlUpload,
	},
	directives: {
		AppTooltip,
	},
})
export class AppFormControlMarkdownMediaItems extends BaseForm<FormModel>
	implements FormOnInit, FormOnLoad, FormOnSubmit {
	@Prop(String) type: string;
	@Prop(Number) parentId: number;

	resetOnSubmit = true;
	reloadOnSubmit = true;

	$refs: {
		form: AppForm;
	};

	mediaItems: MediaItem[] = [];
	maxFilesize = 0;
	maxWidth = 0;
	maxHeight = 0;

	get loadUrl() {
		return `/web/dash/media-items`;
	}

	get loadData() {
		return this.formModel;
	}

	onInit() {
		this.setField('type', this.type);
		this.setField('parent_id', this.parentId);
		this.setField('image', null);
	}

	onLoad(response: any) {
		this.mediaItems = MediaItem.populate(response.mediaItems);
		this.maxFilesize = response.maxFilesize;
		this.maxWidth = response.maxWidth;
		this.maxHeight = response.maxHeight;
	}

	imageSelected() {
		this.$refs.form.submit();
	}

	copyLink(mediaItem: MediaItem) {
		Clipboard.copy(
			'![](' + mediaItem.img_url.replace(/ /g, '+') + ')',
			this.$gettext(`You can now paste this image in your content.`)
		);
	}

	async onSubmit() {
		return Api.sendRequest('/web/dash/media-items/add', this.formModel, {
			file: this.formModel.image,
			progress: e => this.setField('_progress', e),
		});
	}

	onSubmitSuccess(response: any) {
		if (Array.isArray(response.mediaItems)) {
			for (const mediaItem of response.mediaItems) {
				this.mediaItems.unshift(new MediaItem(mediaItem));
			}
		}
	}
}
