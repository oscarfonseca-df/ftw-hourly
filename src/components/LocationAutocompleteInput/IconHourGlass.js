import React from 'react';
import css from './LocationAutocompleteInput.module.css';

const IconHourGlass = () => (
  <svg
    className={css.iconSvg}
    height="22"
    viewBox="0 0 21 22"
    width="21"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      className={css.iconSvgGroup}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      transform="matrix(-1 0 0 1 20 1)"
    >
      <path d="M13 14l5.241 5.241" />
      <circle cx="7.5" cy="7.5" r="7.5" />
    </g>
  </svg>
);

export default IconHourGlass;
