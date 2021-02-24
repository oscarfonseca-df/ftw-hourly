import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import css from './IconEmailSuccess.module.css';

const IconEmailSuccess = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  return (
    <svg
      className={classes}
      height="44"
      viewBox="0 0 51 44"
      width="51"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd" transform="translate(2 2)">
        <circle className={css.successFill} cx="35.5" cy="28.5" r="13.5" />
        <path
          className={css.checkStroke}
          d="M42 26l-8 8-4-4"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <path
          className={css.marketplaceStroke}
          d="M18.43 30H3.07C1.377 30 0 28.558 0 26.786V3.214C0 1.438 1.376 0 3.07 0h36.86C41.623 0 43 1.438 43 3.214v9.643"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.75"
        />
        <path
          className={css.marketplaceStroke}
          d="M41 2.026L21.015 15 1 2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.75"
        />
      </g>
    </svg>
  );
};

IconEmailSuccess.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

IconEmailSuccess.propTypes = { rootClassName: string, className: string };

export default IconEmailSuccess;
