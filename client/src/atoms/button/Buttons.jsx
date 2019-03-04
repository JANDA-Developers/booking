/* eslint-disable react/button-has-type */
import React from 'react';
import './Buttons.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import ErrProtecter from '../../utils/ErrProtecter';
import Icon from '../icons/Icons';
import Preloader from '../preloader/Preloader';

function Buttons({
  disabled,
  label,
  icon,
  onClick,
  iconClasses,
  dataTip,
  dataFor,
  mode,
  float,
  type,
  color,
  thema,
  pulse,
  blink,
  preloader,
}) {
  const classes = classNames({
    JDbtn: true,
    'JDbtn--flat': mode === 'flat',
    'JDbtn--small': mode === 'small',
    'JDbtn--large': mode === 'large',
    'JDbtn--left': float === 'left',
    'JDbtn--right': float === 'right',
    'JDbtn--white': color === 'white',
    'JDbtn--primary': thema === 'primary',
    'JDbtn--secondary': thema === 'secondary',
    'JDbtn--pulse-primary': pulse,
    'JDtext-blink': blink,
  });

  const handleKeyPress = () => {};

  return (
    <button
      type={type}
      disabled={disabled}
      className={`JDbtn JDwaves-effect  ${classes}`}
      onClick={onClick}
      onKeyPress={handleKeyPress}
      data-tip={dataTip}
      data-for={dataFor}
    >
      {preloader ? <Preloader /> : label}
      {!preloader && icon !== '' && (
        <i className={`JDbtn__icon ${iconClasses.join(' ')}`}>
          <Icon icon={icon} />
        </i>
      )}
    </button>
  );
}

Buttons.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  iconClasses: PropTypes.arrayOf(PropTypes.string),
  dataTip: PropTypes.bool,
  pulse: PropTypes.bool,
  blink: PropTypes.bool,
  preloader: PropTypes.bool,
  dataFor: PropTypes.string,
  mode: PropTypes.string,
  float: PropTypes.string,
  color: PropTypes.string,
  thema: PropTypes.string,
  type: PropTypes.string,
};

Buttons.defaultProps = {
  disabled: false,
  label: '',
  icon: '',
  onClick: () => {},
  iconClasses: [''],
  dataTip: false,
  dataFor: '',
  mode: '',
  pulse: false,
  blink: false,
  float: '',
  color: '',
  thema: 'normal',
  type: 'button',
  preloader: false,
};

export default ErrProtecter(Buttons);
