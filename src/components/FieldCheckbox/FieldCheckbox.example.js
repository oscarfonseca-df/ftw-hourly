import React from 'react';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import { Button } from "..";
import FieldCheckbox from './FieldCheckbox';

const formName = 'Styleguide.FieldCheckbox.Form';

const FormComponent = props => (
  <FinalForm
    {...props}
    formId={formName}
    render={fieldRenderProps => {
      const { form, handleSubmit, onChange, invalid, pristine, submitting } = fieldRenderProps;

      const submitDisabled = invalid || pristine || submitting;

      return (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <FormSpy onChange={onChange} subscription={{ values: true, dirty: true }} />
          <FieldCheckbox id="checkbox-id1" label="option 1" name="checkbox-group" value="option1" />
          <FieldCheckbox id="checkbox-id2" label="option 2" name="checkbox-group" value="option2" />

          <Button disabled={submitDisabled} style={{ marginTop: 24 }} type="submit">
            Submit
          </Button>
        </form>
      );
    }}
  />
);

export const Checkbox = {
  component: FormComponent,
  props: {
    onChange: formState => {
      if (Object.keys(formState.values).length > 0) {
        console.log('form values changed to:', formState.values);
      }
    },
    onSubmit: values => {
      console.log('Submit values of FieldCheckbox: ', values);
    },
  },
  group: 'inputs',
};
