import React, { Component } from 'react';
import './Buttons.scss';
import PropTypes from 'prop-types';
import ErrProtecter from '../utils/ErrProtecter';

class Buttons extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    classes: PropTypes.arrayOf(PropTypes.string),
    label: PropTypes.string,
    icon: PropTypes.string,
    onClick: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.disabled = props.disabled;
    this.classes = props.classes;
    this.label = props.label;
    this.icon = props.icon;
    this.onClick = props.onClick;
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
    return (
      <button
        type="button"
        disabled={disabled}
        className={`JDbtn JDwaves-effect ${classes.join(' ')}`}
        onClick={this.onClick}
      >
        {this.label}
        {this.icon !== '' && <i className="JDbtn__icon">{this.icon}</i>}
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
};

export default ErrProtecter(Buttons);
