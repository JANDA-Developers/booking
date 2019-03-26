import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames/bind';
import ErrProtecter from '../../utils/ErrProtecter';
import './CircleIcon.scss';

const CircleIcon = ({
  children, thema, darkWave, wave, onClick,
}) => {
  const handleOnclick = () => {
    onClick && onClick();
  };

  const classes = classNames({
    circleIcon: true,
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
  onClick: PropTypes.func,
};

CircleIcon.defaultProps = {
  thema: '',
  darkWave: false,
  wave: false,
  onClick: () => {},
};

export default ErrProtecter(CircleIcon);
