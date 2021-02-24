import React from 'react';
import PropTypes from 'prop-types';

const EditIcon = props => {
  const { className } = props;
  return (
    <svg
      className={className}
      height="16px"
      version="1.1"
      viewBox="0 0 16 16"
      width="16px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
      >
        <g stroke="#FFFFFF" transform="translate(-255.000000, -76.000000)">
          <g transform="translate(0.000000, 60.000000)">
            <g transform="translate(256.000000, 16.000000)">
              <polygon points="5.1611 12.8804 0.2121 15.0004 2.3331 10.0504 11.1721 1.2124 14.0001 4.0404" />
              <path d="M12.1641,5.876 L9.3361,3.048" />
              <path d="M5.1611,12.8804 L2.3331,10.0504" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

EditIcon.defaultProps = { className: null };

const { string } = PropTypes;

EditIcon.propTypes = { className: string };

export default EditIcon;
