/* eslint-disable no-console */
import React from 'react';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import { Button } from "..";
import FieldRangeSlider from './FieldRangeSlider';

const formName = 'Styleguide.FieldRangeSlider.Form';

const FormComponent = props => (
  <FinalForm
    {...props}
    formId={formName}
    render={fieldRenderProps => {
      const {
        formId,
        handleSubmit,
        onChange,
        invalid,
        pristine,
        submitting,
        min,
        max,
        step,
        handles,
      } = fieldRenderProps;
      const submitDisabled = invalid || pristine || submitting;

      return (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <FormSpy onChange={onChange} />

          <FieldRangeSlider
            handles={handles}
            id={`${formId}.range`}
            label="Select range"
            max={max}
            min={min}
            name="range"
            step={step}
          />

          <Button disabled={submitDisabled} style={{ marginTop: 24 }} type="submit">
            Submit
          </Button>
        </form>
      );
    }}
  />
);

export const FieldRangeSliderForm = {
  component: FormComponent,
  props: {
    min: 0,
    max: 1000,
    step: 5,
    handles: [333, 666],
    onChange: formState => {
      if (formState.dirty) {
        console.log('form values changed to:', formState.values);
      }
    },
    onSubmit: values => {
      console.log('submit values:', values);
    },
  },
  group: 'custom inputs',
};
