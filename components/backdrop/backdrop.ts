import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as View from '!view!./backdrop.html?style=./backdrop.styl';

import { Backdrop } from './backdrop.service';

@View
@Component({})
export class AppBackdrop extends Vue
{
	active = false;

	async created()
	{
		await this.$nextTick();
		this.active = true;
	}

	remove()
	{
		// This will start a transition.
		// At the end of the leave transition it will call `_transitionend`.
		this.active = false;
	}

	_clicked()
	{
		this.$emit( 'clicked' );
	}

	_transitionend()
	{
		if ( !this.active ) {
			Backdrop.remove( this );
		}
	}
}
