import React, { Component } from 'react';
import './Buttons.scss';
import PropTypes from 'prop-types';
import ErrProtecter from '../utils/ErrProtecter';
import Icon from '../img/icon/icons';

class Buttons extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    classes: PropTypes.arrayOf(PropTypes.string),
    label: PropTypes.string,
    icon: PropTypes.string,
    onClick: PropTypes.func,
    iconClasses: PropTypes.arrayOf(PropTypes.string),
  };

  constructor(props) {
    super(props);
    this.disabled = props.disabled;
    this.classes = props.classes;
    this.icon = props.icon;
    this.onClick = props.onClick;
    this.iconClasses = props.iconClasses;
  }

  state = { disabled: false, classes: '' };

  componentWillMount = () => {
    this.setState({
      disabled: this.disabled,
      classes: this.classes,
    });
  };

  handleButtonClick = () => {};

  render() {
    const { disabled, classes } = this.state;
    const { label } = this.props;
    return (
      <button
        type="button"
        disabled={disabled}
        className={`JDbtn JDwaves-effect ${classes.join(' ')}`}
        onClick={this.onClick}
      >
        {label}
        {this.icon !== '' && (
          <i className={`JDbtn__icon ${this.iconClasses.join(' ')}`}>
            <Icon icon={this.icon} />
          </i>
        )}
      </button>
    );
  }
}

Buttons.defaultProps = {
  disabled: false,
  classes: [''],
  label: '',
  icon: '',
  onClick: () => {},
  iconClasses: [''],
};

export default ErrProtecter(Buttons);
