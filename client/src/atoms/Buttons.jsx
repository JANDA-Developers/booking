import React, { Component } from 'react';
import './Buttons.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import ErrProtecter from '../utils/ErrProtecter';
import Icon from './icons/Icons';

class Buttons extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string,
    icon: PropTypes.string,
    onClick: PropTypes.func,
    iconClasses: PropTypes.arrayOf(PropTypes.string),
    dataTip: PropTypes.bool,
    dataFor: PropTypes.string,
    mode: PropTypes.string,
    float: PropTypes.string,
    color: PropTypes.string,
    thema: PropTypes.string,
    type: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.onClick = props.onClick;
    this.state = {
      disabled: props.disabled,
    };
  }

  render() {
    const { disabled } = this.state;
    const {
      label,
      iconClasses,
      icon,
      dataTip,
      dataFor,
      mode,
      float,
      color,
      thema,
      type,
    } = this.props;

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
    });

    return (
      <button
        type={type}
        disabled={disabled}
        className={`JDbtn JDwaves-effect ${classes}`}
        onClick={this.onClick}
        data-tip={dataTip}
        data-for={dataFor}
      >
        {label}
        {icon !== '' && (
          <i className={`JDbtn__icon ${iconClasses.join(' ')}`}>
            <Icon icon={icon} />
          </i>
        )}
      </button>
    );
  }
}

Buttons.defaultProps = {
  disabled: false,
  label: '',
  icon: '',
  onClick: () => {},
  iconClasses: [''],
  dataTip: false,
  dataFor: '',
  mode: '',
  float: '',
  color: '',
  thema: 'normal',
  type: 'button',
};

export default ErrProtecter(Buttons);
