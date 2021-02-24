import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import css from './Topbar.module.css';

const MenuIcon = props => {
  const { className, rootClassName } = props;
  const classes = classNames(rootClassName || css.rootMenuIcon, className);

  return (
    <svg
      className={classes}
      height="12"
      viewBox="0 0 18 12"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fillRule="evenodd">
        <rect height="2" rx="1" width="18" />
        <rect height="2" rx="1" width="18" y="5" />
        <rect height="2" rx="1" width="18" y="10" />
      </g>
    </svg>
  );
};

const { string } = PropTypes;

MenuIcon.defaultProps = {
  className: null,
  rootClassName: null,
};

MenuIcon.propTypes = {
  className: string,
  rootClassName: string,
};

export default MenuIcon;
