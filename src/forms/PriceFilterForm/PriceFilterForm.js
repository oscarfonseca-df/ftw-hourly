import React from 'react';
import { bool, func, number, object, string } from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { Field, Form as FinalForm, FormSpy } from 'react-final-form';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form, RangeSlider } from '../../components';
import css from './PriceFilterForm.module.css';

const DEBOUNCE_WAIT_TIME = 400;

// Helper function to parse value for min handle
// Value needs to be between slider's minimum value and current maximum value
const parseMin = (min, currentMax) => value => {
  const parsedValue = Number.parseInt(value, 10);
  if (isNaN(parsedValue)) {
    return '';
  }
  return parsedValue < min ? min : parsedValue > currentMax ? currentMax : parsedValue;
};

// Helper function to parse value for max handle
// Value needs to be between slider's max value and current minimum value
const parseMax = (max, currentMin) => value => {
  const parsedValue = Number.parseInt(value, 10);
  if (isNaN(parsedValue)) {
    return '';
  }
  return parsedValue < currentMin ? currentMin : parsedValue > max ? max : parsedValue;
};

// PriceFilterForm component
const PriceFilterFormComponent = props => {
  const { liveEdit, onChange, onSubmit, onCancel, onClear, ...rest } = props;

  if (liveEdit && !onChange) {
    throw new Error('PriceFilterForm: if liveEdit is true you need to provide onChange function');
  }

  if (!liveEdit && !(onCancel && onClear && onSubmit)) {
    throw new Error(
      'PriceFilterForm: if liveEdit is false you need to provide onCancel, onClear, and onSubmit functions'
    );
  }

  const handleChange = debounce(
    formState => {
      if (formState.dirty) {
        const { minPrice, maxPrice, ...restValues } = formState.values;
        onChange({
          minPrice: minPrice === '' ? rest.min : minPrice,
          maxPrice: maxPrice === '' ? rest.max : maxPrice,
          ...restValues,
        });
      }
    },
    DEBOUNCE_WAIT_TIME,
    { leading: false, trailing: true }
  );

  const handleSubmit = values => {
    const { minPrice, maxPrice, ...restValues } = values;
    return onSubmit({
      minPrice: minPrice === '' ? rest.min : minPrice,
      maxPrice: maxPrice === '' ? rest.max : maxPrice,
      ...restValues,
    });
  };

  const formCallbacks = liveEdit
    ? { onSubmit: () => null }
    : { onSubmit: handleSubmit, onCancel, onClear };
  return (
    <FinalForm
      {...rest}
      {...formCallbacks}
      render={formRenderProps => {
        const {
          form,
          handleSubmit,
          id,
          showAsPopup,
          onClear,
          onCancel,
          isOpen,
          contentRef,
          style,
          intl,
          values,
          min,
          max,
          step,
        } = formRenderProps;
        const { minPrice: minPriceRaw, maxPrice: maxPriceRaw } = values;
        const minPrice = typeof minPriceRaw !== 'string' ? minPriceRaw : min;
        const maxPrice = typeof maxPriceRaw !== 'string' ? maxPriceRaw : max;

        const handleCancel = () => {
          // reset the final form to initialValues
          form.reset();
          onCancel();
        };

        const clear = intl.formatMessage({ id: 'PriceFilterForm.clear' });
        const cancel = intl.formatMessage({ id: 'PriceFilterForm.cancel' });
        const submit = intl.formatMessage({ id: 'PriceFilterForm.submit' });

        const classes = classNames(css.root, {
          [css.popup]: showAsPopup,
          [css.isOpenAsPopup]: showAsPopup && isOpen,
          [css.plain]: !showAsPopup,
          [css.isOpen]: !showAsPopup && isOpen,
        });

        return (
          <Form
            className={classes}
            contentRef={contentRef}
            onSubmit={handleSubmit}
            style={{ minWidth: '300px', ...style }}
            tabIndex="0"
          >
            <div className={css.contentWrapper}>
              <span className={css.label}>
                <FormattedMessage id="PriceFilterForm.label" />
              </span>
              <div className={css.inputsWrapper}>
                <Field
                  className={css.minPrice}
                  component="input"
                  id={`${id}.minPrice`}
                  max={max}
                  min={min}
                  name="minPrice"
                  parse={parseMin(min, maxPrice)}
                  placeholder={min}
                  step={step}
                  type="number"
                />
                <span className={css.priceSeparator}>-</span>
                <Field
                  className={css.maxPrice}
                  component="input"
                  id={`${id}.maxPrice`}
                  max={max}
                  min={min}
                  name="maxPrice"
                  parse={parseMax(max, minPrice)}
                  placeholder={max}
                  step={step}
                  type="number"
                />
              </div>
            </div>

            <div className={css.sliderWrapper}>
              <RangeSlider
                handles={[minPrice, maxPrice]}
                max={max}
                min={min}
                onChange={handles => {
                  form.change('minPrice', handles[0]);
                  form.change('maxPrice', handles[1]);
                }}
                step={step}
              />
            </div>

            {liveEdit ? (
              <FormSpy onChange={handleChange} subscription={{ values: true, dirty: true }} />
            ) : (
              <div className={css.buttonsWrapper}>
                <button className={css.clearButton} onClick={onClear} type="button">
                  {clear}
                </button>
                <button className={css.cancelButton} onClick={handleCancel} type="button">
                  {cancel}
                </button>
                <button className={css.submitButton} type="submit">
                  {submit}
                </button>
              </div>
            )}
          </Form>
        );
      }}
    />
  );
};

PriceFilterFormComponent.defaultProps = {
  liveEdit: false,
  showAsPopup: false,
  isOpen: false,
  contentRef: null,
  style: null,
  min: 0,
  step: 1,
  onCancel: null,
  onChange: null,
  onClear: null,
  onSubmit: null,
};

PriceFilterFormComponent.propTypes = {
  id: string.isRequired,
  liveEdit: bool,
  showAsPopup: bool,
  onCancel: func,
  onChange: func,
  onClear: func,
  onSubmit: func,
  isOpen: bool,
  contentRef: func,
  style: object,
  min: number.isRequired,
  max: number.isRequired,
  step: number,

  // form injectIntl
  intl: intlShape.isRequired,
};

const PriceFilterForm = injectIntl(PriceFilterFormComponent);

export default PriceFilterForm;
