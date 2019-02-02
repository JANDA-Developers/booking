import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import './icons.scss';

const icons = {
  arrow_right: 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z',
  arrow_left: 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z',
};

function Icon({
  label, icon, width, height,
}) {
  return (
    <Fragment>
      <svg
        alignmentBaseline="central"
        width={width}
        height={height}
        className="JDicon__svg"
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
  icon: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  label: PropTypes.string,
};

Icon.defaultProps = {
  width: '1em',
  height: '1em',
  label: '',
};

export default Icon;
