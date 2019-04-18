import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames/bind';
import ErrProtecter from '../../utils/ErrProtecter';
import './CircleIcon.scss';

const CircleIcon = ({
  children, thema, darkWave, wave, onClick, hover, large,
}) => {
  const handleOnclick = () => {
    onClick && onClick();
  };

  const classes = classNames({
    circleIcon: true,
    'circleIcon--large': large,
    'circleIcon--noHover': !hover,
    'circleIcon--white': thema === 'white',
    'circleIcon--greybg': thema === 'greybg',
    'JDwaves-effect': wave || darkWave,
    'JDwaves-effect-dark': darkWave,
  });

  return (
    <button type="button" onClick={handleOnclick} className={classes}>
      {children}
    </button>
  );
};

CircleIcon.propTypes = {
  children: PropTypes.node.isRequired,
  thema: PropTypes.string,
  darkWave: PropTypes.bool,
  wave: PropTypes.bool,
  hover: PropTypes.bool,
  onClick: PropTypes.func,
};

CircleIcon.defaultProps = {
  thema: '',
  darkWave: false,
  hover: true,
  wave: false,
  onClick: () => {},
};

export default ErrProtecter(CircleIcon);
