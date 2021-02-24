import React from 'react';
import PropTypes from 'prop-types';

const NoImageIcon = props => {
  const { className } = props;

  return (
    <svg
      className={className}
      height="49"
      viewBox="0 -1 48 49"
      width="48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <path d="M13.6 9.6L24 .8l10.4 8.8z" strokeLinejoin="round" strokeWidth="2" />
        <path d="M.8 46.4h46.4V9.6H.8z" strokeWidth="2" />
        <path d="M5.6 41.6h36.8V14.4H5.6z" strokeWidth="2" />
        <path
          d="M19.998 31.636l.835-.835a4.035 4.035 0 0 1 2.853-1.183h.693c1.07 0 2.097.426 2.853 1.183l.835.835"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path d="M21.599 23.983a1.009 1.009 0 1 0 0 2.018 1.009 1.009 0 0 0 0-2.018M26.402 23.983a1.009 1.009 0 1 0 0 2.018 1.009 1.009 0 0 0 0-2.018" />
      </g>
    </svg>
  );
};

const { string } = PropTypes;

NoImageIcon.defaultProps = {
  className: null,
};

NoImageIcon.propTypes = {
  className: string,
};

export default NoImageIcon;
