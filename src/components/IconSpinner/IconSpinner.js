import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import css from './IconSpinner.module.css';

const IconSpinner = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  return (
    <svg
      className={classes}
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="15" cy="15" fill="none" r="12" strokeLinecap="round">
        <animateTransform
          attributeName="transform"
          begin="0s"
          calcMode="linear"
          dur="0.9s"
          keyTimes="0;0.5;1"
          repeatCount="indefinite"
          type="rotate"
          values="0 15 15;180 15 15;720 15 15"
        />
        <animate
          attributeName="stroke-dasharray"
          begin="0s"
          calcMode="linear"
          dur="0.9s"
          keyTimes="0;0.5;1"
          repeatCount="indefinite"
          values="9 56;46 14;9 56"
        />
      </circle>
    </svg>
  );
};

IconSpinner.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

IconSpinner.propTypes = {
  rootClassName: string,
  className: string,
};

export default IconSpinner;
