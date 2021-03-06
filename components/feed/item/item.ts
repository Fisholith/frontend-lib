import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import View from '!view!./item.html?style=./item.styl';

@View
@Component({})
export class AppFeedItem extends Vue {
	@Prop(Boolean) isActive?: boolean;
	@Prop(Boolean) isNew?: boolean;
}
