/* eslint-disable no-console */
import React from 'react';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import * as validators from '../../util/validators';
import { Button } from "..";
import FieldTextInput from './FieldTextInput';
import css from './FieldTextInputExample.module.css';

const FormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const { handleSubmit, onChange, invalid, pristine, submitting, formName } = fieldRenderProps;
      const required = validators.required('This field is required');
      const submitDisabled = invalid || pristine || submitting;
      return (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <FormSpy onChange={onChange} />
          <FieldTextInput
            className={css.field}
            id={`${formName}.input1`}
            label="Input that requires a value:"
            name="input1"
            type="text"
            validate={required}
          />
          <FieldTextInput
            className={css.field}
            id={`${formName}.input2`}
            label="Input that does not require a value:"
            name="input2"
            type="text"
          />
          <FieldTextInput
            className={css.field}
            name="input3"
            placeholder="Input without label..."
            type="text"
          />
          <FieldTextInput
            className={css.field}
            id={`${formName}.textarea1`}
            label="Textarea that requires a value:"
            name="textarea1"
            type="textarea"
            validate={required}
          />
          <FieldTextInput
            className={css.field}
            id={`${formName}.textarea2`}
            label="Textarea that does not require a value:"
            name="textarea2"
            type="textarea"
          />
          <FieldTextInput
            className={css.field}
            name="textarea3"
            placeholder="Textarea without label..."
            type="textarea"
          />
          <Button className={css.submit} disabled={submitDisabled} type="submit">
            Submit
          </Button>
        </form>
      );
    }}
  />
);

export const Inputs = {
  component: FormComponent,
  props: {
    formName: 'Inputs',
    onChange: formState => {
      if (Object.keys(formState.values).length > 0) {
        console.log('form values changed to:', formState.values);
      }
    },
    onSubmit: values => {
      console.log('submit values:', values);
    },
  },
  group: 'inputs',
};
