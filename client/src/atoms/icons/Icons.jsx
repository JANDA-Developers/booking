import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import classNames from 'classnames/bind';
import './icons.scss';

const icons = {
  arrow_right: 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z',
  arrow_left: 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z',
  magnifier:
    'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  menue: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
  list:
    'M19 5v14H5V5h14m1.1-2H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM11 7h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7z',
};

function Icon({
  label, icon, width, height, hover,
}) {
  const classes = classNames({
    JDicon__svg: true,
    'JDicon__svg--hover': hover,
  });
  return (
    <Fragment>
      <svg
        alignmentBaseline="central"
        className={classes}
        width={width}
        height={height}
        version="1.1"
        viewBox="0 0 24 24 "
      >
        <g>
          <path d={icons[icon]} />
        </g>
      </svg>
      {label !== '' && <span className="Icon__label">{label}</span>}
    </Fragment>
  );
}

Icon.propTypes = {
  icon: PT.string.isRequired,
  width: PT.string,
  height: PT.string,
  label: PT.string,
  hover: PT.bool,
};

Icon.defaultProps = {
  width: '1em',
  height: '1em',
  label: '',
  hover: false,
};

export { icons };

export default Icon;
