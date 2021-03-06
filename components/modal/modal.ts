import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import View from '!view!./modal.html?style=./modal.styl';
import './modal-content.styl';

import { Modal } from './modal.service';
import { AppBackdrop } from '../backdrop/backdrop';
import { Backdrop } from '../backdrop/backdrop.service';
import { findRequiredVueParent } from '../../utils/vue';
import { BaseModal } from './base';
import { Screen } from '../screen/screen-service';
import { EscapeStack } from '../escape-stack/escape-stack.service';
import { AppTheme } from '../theme/theme';

@View
@Component({
	components: {
		AppTheme,
	},
})
export class AppModal extends Vue {
	@Prop(Number) index: number;
	@Prop(Object) theme?: any;

	modal: Modal = null as any;
	isHoveringContent = false;

	private backdrop?: AppBackdrop;
	private beforeEachDeregister?: Function;
	private escapeCallback?: Function;

	get zIndex() {
		return 1050 + this.modal.index;
	}

	created() {
		const parent = findRequiredVueParent(this, BaseModal);
		this.modal = parent.modal;
	}

	mounted() {
		if (!this.modal.noBackdrop) {
			this.backdrop = Backdrop.push({
				context: this.$el,
				className: 'modal-backdrop',
			});
		}

		this.beforeEachDeregister = this.$router.beforeEach((_to, _from, next) => {
			this.dismissRouteChange();
			next();
		});

		this.escapeCallback = () => this.dismissEsc();
		EscapeStack.register(this.escapeCallback);
	}

	destroyed() {
		// Make sure we clear the reference to it.
		if (this.backdrop) {
			this.backdrop.remove();
			this.backdrop = undefined;
		}

		if (this.beforeEachDeregister) {
			this.beforeEachDeregister();
			this.beforeEachDeregister = undefined;
		}

		if (this.escapeCallback) {
			EscapeStack.deregister(this.escapeCallback);
			this.escapeCallback = undefined;
		}
	}

	dismissRouteChange() {
		this.dismiss();
	}

	dismissEsc() {
		if (this.modal.noEscClose) {
			return;
		}
		this.dismiss();
	}

	dismissBackdrop() {
		if (Screen.isMobile || this.modal.noBackdropClose || this.isHoveringContent) {
			return;
		}
		this.dismiss();
	}

	dismiss() {
		this.modal.dismiss();
	}
}
