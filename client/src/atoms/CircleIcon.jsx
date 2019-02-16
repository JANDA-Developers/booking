import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames/bind';
import ErrProtecter from '../utils/ErrProtecter';
import './CircleIcon.scss';

const CircleIcon = ({
  children, thema, darkWave, wave,
}) => {
  const classes = classNames({
    circleIcon: true,
    'circleIcon--white': thema === 'white',
    'circleIcon--greybg': thema === 'greybg',
    'JDwaves-effect': wave || darkWave,
    'JDwaves-effect-dark': darkWave,
  });

  return (
    <button type="button" className={classes}>
      {children}
    </button>
  );
};

CircleIcon.propTypes = {
  children: PropTypes.node.isRequired,
  thema: PropTypes.string,
  darkWave: PropTypes.bool,
  wave: PropTypes.bool,
};

CircleIcon.defaultProps = {
  thema: '',
  darkWave: false,
  wave: false,
};

export default ErrProtecter(CircleIcon);
