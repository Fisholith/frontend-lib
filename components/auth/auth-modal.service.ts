import { Modal } from '../modal/modal.service';
import { asyncComponentLoader } from '../../utils/utils';

export class AuthModal {
	static async show() {
		return await Modal.show<void>({
			component: () =>
				asyncComponentLoader(import(/* webpackChunkName: "AuthModal" */ './auth-modal')),
			size: 'sm',
			props: {},
		});
	}
}
