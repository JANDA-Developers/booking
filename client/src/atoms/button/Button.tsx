/* eslint-disable react/button-has-type */
import React from 'react';
import './Button.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ErrProtecter from '../../utils/ErrProtecter';
import Icon, { IIcons } from '../icons/Icons';
import Preloader from '../preloader/Preloader';

interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  label?: string;
  icon?: IIcons;
  onClick?: any;
  iconClasses?: string[];
  dataTip?: any;
  dataFor?: any;
  mode?: 'flat' | 'normal' | 'long';
  size?: 'small' | 'large';
  flat?: boolean;
  float?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  color?: string;
  thema?: 'primary' | 'grey' | 'secondary' | 'warn' | 'normal';
  pulse?: boolean;
  blink?: boolean;
  toggle?: boolean;
  preloader?: boolean;
  className?: string;
  hrefOpen?: string;
}

const Button: React.FC<IProps> = ({
  disabled,
  label,
  icon,
  onClick,
  iconClasses,
  dataTip,
  dataFor,
  flat,
  mode,
  float,
  type,
  color,
  thema,
  pulse,
  blink,
  preloader,
  className,
  size,
  hrefOpen,
  // 투글은 클래스만 바꾸어 줍니다.
  toggle,
  ...props
}) => {
  const classes = classNames('JDbtn', className, {
    'JDbtn--flat': mode === 'flat' || flat,
    'JDbtn--small': size === 'small',
    'JDbtn--large': size === 'large',
    'JDbtn--long': mode === 'long',
    'JDbtn--left': float === 'left',
    'JDbtn--right': float === 'right',
    'JDbtn--white': color === 'white',
    'JDbtn--primary': thema === 'primary',
    'JDbtn--grey': thema === 'grey',
    'JDbtn--secondary': thema === 'secondary',
    'JDbtn--warn': thema === 'warn',
    'JDwaves-effect-dark': mode === 'flat' && thema === 'normal',
    'JDbtn--pulse': pulse,
    'JDbtn--toogleOn': toggle,
    'JDtext-blink': blink,
  });

  const handleRedirect = () => {
    window.open(hrefOpen);
  };

  const handleKeyPress = () => {};

  return (
    <button
      {...props}
      type={type}
      disabled={disabled}
      className={`JDbtn JDwaves-effect ${classes}`}
      onClick={hrefOpen ? handleRedirect : onClick}
      onKeyPress={handleKeyPress}
      data-tip={dataTip}
      data-for={dataFor}
    >
      {preloader ? <Preloader /> : label}
      {!preloader && icon && (
        <i className={`JDbtn__icon ${iconClasses && iconClasses.join(' ')}`}>{icon && <Icon icon={icon} />}</i>
      )}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  label: '',
  onClick: () => {},
  iconClasses: [''],
  dataTip: false,
  dataFor: '',
  pulse: false,
  blink: false,
  float: '',
  color: '',
  thema: 'normal',
  type: 'button',
  preloader: false,
};

export default ErrProtecter(Button);
