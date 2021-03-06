import { Component, Prop } from 'vue-property-decorator';
import View from '!view!./textarea.html';

import { BaseFormControl } from '../base';

@View
@Component({})
export class AppFormControlTextarea extends BaseFormControl {
	@Prop(Array) validateOn: string[];
	@Prop(Number) validateDelay: number;

	controlVal = '';

	get validationRules() {
		return {
			...this.baseRules,
		};
	}

	onChange(value: string) {
		this.applyValue(value);
	}
}
