import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import View from '!view!./buttons.html';

import { GamePackageCardModel } from './card.model';
import { GamePackage } from '../package.model';
import { GameBuild } from '../../build/build.model';
import { AppPopover } from '../../../popover/popover';
import { AppTrackEvent } from '../../../analytics/track-event.directive.vue';
import { AppPopoverTrigger } from '../../../popover/popover-trigger.directive.vue';
import { filesize } from '../../../../vue/filters/filesize';
import { AppGamePackageCardMoreOptions } from './more-options';
import { Screen } from '../../../screen/screen-service';

@View
@Component({
	components: {
		AppPopover,
		AppGamePackageCardMoreOptions,
	},
	directives: {
		AppTrackEvent,
		AppPopoverTrigger,
	},
	filters: {
		filesize,
	},
})
export class AppGamePackageCardButtons extends Vue {
	@Prop(GamePackage) package: GamePackage;
	@Prop(GamePackageCardModel) card: GamePackageCardModel;

	readonly Screen = Screen;

	click(build: GameBuild, fromExtraSection = false) {
		this.$emit('click', { build, fromExtraSection });
	}
}
