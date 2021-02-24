import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import css from './Topbar.module.css';

const SearchIcon = props => {
  const { className, rootClassName } = props;
  const classes = classNames(rootClassName || css.rootSearchIcon, className);

  return (
    <svg
      className={classes}
      height="18"
      viewBox="0 0 18 18"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        transform="matrix(-1 0 0 1 17 1)"
      >
        <path d="M11.733 11.733l3.727 3.727" />
        <circle cx="6.4" cy="6.4" r="6.4" />
      </g>
    </svg>
  );
};

const { string } = PropTypes;

SearchIcon.defaultProps = {
  className: null,
  rootClassName: null,
};

SearchIcon.propTypes = {
  className: string,
  rootClassName: string,
};

export default SearchIcon;
