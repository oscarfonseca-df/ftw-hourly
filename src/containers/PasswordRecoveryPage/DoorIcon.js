import React from 'react';
import PropTypes from 'prop-types';
import css from './DoorIcon.module.css';

const DoorIcon = props => {
  const { className } = props;
  return (
    <svg
      className={className}
      height="59"
      viewBox="0 0 52 59"
      width="52"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd" strokeLinejoin="round" strokeWidth="2.5">
        <path
          className={css.strokeAndFill}
          d="M28.182 42.364H50V26H28.182z"
          strokeLinecap="round"
        />
        <path d="M39.09 38v-4.364" stroke="#FFF" strokeLinecap="round" />
        <path
          className={css.stroke}
          d="M31.455 26v-2.455c0-4.067 3.176-7.363 7.09-7.363 3.915 0 7.09 3.296 7.09 7.363V26"
          strokeLinecap="round"
        />
        <path
          d="M40.182 32.545c0 .603-.49 1.09-1.09 1.09-.603 0-1.092-.487-1.092-1.09 0-.602.49-1.09 1.09-1.09.603 0 1.092.488 1.092 1.09z"
          stroke="#FFF"
        />
        <path
          className={css.stroke}
          d="M23.818 7.455h19.637V14M43.455 47.818v4.364H23.818M2 52.798l21.818 4.838V2L2 6.838z"
          strokeLinecap="round"
        />
        <path
          className={css.stroke}
          d="M19.455 30.91c0 2.107-1.71 3.817-3.82 3.817-2.106 0-3.817-1.71-3.817-3.818 0-2.11 1.71-3.82 3.818-3.82s3.82 1.71 3.82 3.82z"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

DoorIcon.defaultProps = { className: null };

const { string } = PropTypes;

DoorIcon.propTypes = {
  className: string,
};

export default DoorIcon;
