import React from 'react';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import { Button } from '..';
import FieldRadioButton from './FieldRadioButton';

const FormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        handleSubmit,
        onChange,
        invalid,
        pristine,
        submitting,
        required,
        id,
      } = fieldRenderProps;

      const submitDisabled = invalid || pristine || submitting;

      const showAsRequired = pristine && required;

      return (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <FormSpy onChange={onChange} />
          <FieldRadioButton
            id={`${id}-option-id1`}
            label="option 1"
            name="option-group"
            showAsRequired={showAsRequired}
            value="option1"
          />
          <FieldRadioButton
            id={`${id}-option-id2`}
            label="option 2"
            name="option-group"
            showAsRequired={showAsRequired}
            value="option2"
          />
          <FieldRadioButton
            id={`${id}-option-id3`}
            label="option 3"
            name="option-group"
            showAsRequired={showAsRequired}
            value="option3"
          />

          <Button disabled={submitDisabled} style={{ marginTop: 24 }} type="submit">
            Submit
          </Button>
        </form>
      );
    }}
  />
);

export const RadioButtonRequired = {
  component: FormComponent,
  props: {
    onChange: formState => {
      if (Object.keys(formState.values).length > 0) {
        console.log('form values changed to:', formState.values);
      }
    },
    onSubmit: values => {
      console.log('Submit values of FieldRadioButton: ', values);
    },
    required: true,
    id: 'radiobutton',
  },
  group: 'inputs',
};

export const RadioButtonNotRequired = {
  component: FormComponent,
  props: {
    onChange: formState => {
      if (Object.keys(formState.values).length > 0) {
        console.log('form values changed to:', formState.values);
      }
    },
    onSubmit: values => {
      console.log('Submit values of FieldRadioButton: ', values);
    },
    required: false,
    id: 'radiobutton2',
  },
  group: 'inputs',
};
