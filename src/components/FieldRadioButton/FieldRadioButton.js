import React from 'react';
import { node, string } from 'prop-types';
import classNames from 'classnames';
import { Field } from 'react-final-form';
import css from './FieldRadioButton.module.css';

const IconRadioButton = props => {
  const { checkedClassName } = props;
  return (
    <div>
      <svg className={props.className} height="14" width="14" xmlns="http://www.w3.org/2000/svg">
        <circle
          className={props.showAsRequired ? css.required : css.notChecked}
          cx="5"
          cy="19"
          fill="none"
          fillRule="evenodd"
          r="6"
          strokeWidth="2"
          transform="translate(2 -12)"
        />

        <g
          className={classNames(css.checked, checkedClassName || css.checkedStyle)}
          fill="none"
          fillRule="evenodd"
          transform="translate(2 -12)"
        >
          <circle cx="5" cy="19" r="6" strokeWidth="2" />
          <circle cx="5" cy="19" fill="#FFF" fillRule="nonzero" r="3" />
        </g>
      </svg>
    </div>
  );
};

IconRadioButton.defaultProps = { className: null };

IconRadioButton.propTypes = { className: string };

const FieldRadioButtonComponent = props => {
  const {
    rootClassName,
    className,
    svgClassName,
    checkedClassName,
    id,
    label,
    showAsRequired,
    ...rest
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const radioButtonProps = {
    id,
    className: css.input,
    component: 'input',
    type: 'radio',
    ...rest,
  };

  return (
    <span className={classes}>
      <Field {...radioButtonProps} />
      <label className={css.label} htmlFor={id}>
        <span className={css.radioButtonWrapper}>
          <IconRadioButton
            checkedClassName={checkedClassName}
            className={svgClassName}
            showAsRequired={showAsRequired}
          />
        </span>
        <span className={css.text}>{label}</span>
      </label>
    </span>
  );
};

FieldRadioButtonComponent.defaultProps = {
  className: null,
  rootClassName: null,
  svgClassName: null,
  checkedClassName: null,
  label: null,
};

FieldRadioButtonComponent.propTypes = {
  className: string,
  rootClassName: string,
  svgClassName: string,
  checkedClassName: string,

  // Id is needed to connect the label with input.
  id: string.isRequired,
  label: node,

  // Name groups several RadioButtones to an array of selected values
  name: string.isRequired,

  // RadioButton needs a value that is passed forward when user checks the RadioButton
  value: string.isRequired,
};

export default FieldRadioButtonComponent;
