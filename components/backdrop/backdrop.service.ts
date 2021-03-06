import { AppBackdrop } from './backdrop';
import { arrayRemove } from '../../utils/array';

export interface BackdropOptions {
	context?: HTMLElement;
	className?: string;
}

export class Backdrop {
	private static backdrops: AppBackdrop[] = [];

	static push(options: BackdropOptions = {}) {
		const el = document.createElement('div');

		if (!options.context) {
			document.body.appendChild(el);
		} else {
			options.context.appendChild(el);
		}

		const backdrop = new AppBackdrop({
			propsData: {
				className: options.className,
			},
		});

		backdrop.$mount(el);

		this.backdrops.push(backdrop);
		document.body.classList.add('backdrop-active');

		return backdrop;
	}

	static checkBackdrops() {
		const active = this.backdrops.filter(i => i.active);
		if (active.length === 0) {
			document.body.classList.remove('backdrop-active');
		}
	}

	static remove(backdrop: AppBackdrop) {
		backdrop.$destroy();
		backdrop.$el.parentNode!.removeChild(backdrop.$el);
		arrayRemove(this.backdrops, i => i === backdrop);
		this.checkBackdrops();
	}
}
