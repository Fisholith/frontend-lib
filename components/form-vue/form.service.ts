import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';

export interface FormOnSubmit
{
	onSubmit(): Promise<any>;
}

@Component({})
export class BaseForm extends Vue
{
	@Prop( Object ) model?: any;

	formModel?: any = {};
	modelClass?: any = undefined;
	resetOnSubmit = false;
	saveMethod = '$save';
	method = 'add';

	state: { [k: string]: any } = {
		isProcessing: false,
		isShowingSuccess: false,
		// isShowingSuccess: isShowingSuccess,
		serverErrors: {},
		// progress: undefined,
	};

	created()
	{
		// Is a base model defined? If so, then we're editing.
		if ( this.model ) {
			this.method = 'edit';

			// If a model class was assigned to this form, then create a copy of
			// it on the instance. Otherwise just copy the object.
			if ( this.modelClass ) {
				this.formModel = new this.modelClass( this.model );
			}
			else {
				this.formModel = Object.assign( {}, this.model );
			}
		}
		else {

			// If we have a model class, then create a new one.
			if ( this.modelClass ) {
				this.formModel = new this.modelClass();
			}
			// Otherwise, just use an empty object as the form's model.
			else {
				this.formModel = {};
			}
		}
	}

	setState( key: string, value: any )
	{
		Vue.set( this.state, key, value );
	}

	async _onSubmit()
	{
		if ( this.state.isProcessing ) {
			return;
		}

		this.state.isProcessing = true;
		// this.state.progress = undefined;

		let response: any;

		try {
			if ( (this as any).onSubmit ) {
				const _response = await (this as any).onSubmit();
				if ( _response.success === false ) {
					throw _response;
				}

				response = _response;
			}
			else if ( this.modelClass && this.saveMethod ) {
				response = await this.formModel[ this.saveMethod ]();

				// Copy it back to the base model.
				if ( this.model ) {
					Object.assign( this.model, this.formModel );
				}
			}

			// if ( _this.onSubmitSuccess ) {
			// 	_this.onSubmitSuccess( scope, response );
			// }

			// Send the new model back into the submit handler.
			this.$emit( 'submit', this.formModel, response );
			// if ( angular.isDefined( scope.submitHandler ) ) {
			// scope.submitHandler( { formModel: scope.formModel, $response: response } );
			// }

			// Reset our processing state.
			this.state.isProcessing = false;

			// Make sure that serverErrors is reset on a successful submit, just in case.
			this.state.serverErrors = {};

			// After successful submit of the form, we broadcast the onSubmitted event.
			// We will capture this in the gjForm directive to set the form to a pristine state.
			// scope.$broadcast( 'gjForm.onSubmitted', {} );

			// Show successful form submission.
			// _this._showSuccess( scope );

			// TODO: Test this!
			// If we should reset on successful submit, let's do that now.
			if ( this.resetOnSubmit ) {
				this.created();
			}
		}
		catch ( _response ) {

			console.error( 'Form error', _response );

			// Store the server validation errors.
			if ( _response && _response.errors ) {
				Vue.set( this.state, 'serverErrors', _response.errors );
			}

			// Reset our processing state.
			this.state.isProcessing = false;
		}
	}
}
