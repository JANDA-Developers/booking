import React from 'react';
import './ColorBox.scss';
import PropTypes from 'prop-types';
import ErrProtecter from '../../../../utils/ErrProtecter';

const colorBox = ({ color, txt }) => (
  <div className="colorPage-box-wrap">
    <div className="colorPage-box">
      <div className={`colorPage-circle colorPage-circle--${color}`}>
        <h6 className="colorPage-circle__txt">{txt}</h6>
      </div>
    </div>
  </div>
);

colorBox.propTypes = {
  color: PropTypes.string.isRequired,
  txt: PropTypes.string.isRequired,
};

export default ErrProtecter(colorBox);
