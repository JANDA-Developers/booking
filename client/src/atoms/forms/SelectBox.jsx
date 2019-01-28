import React from 'react';
import Select from 'react-select';
import './SelectBox.scss';
import PropTypes from 'prop-types';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

class JDselect extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    isOpen: PropTypes.bool,
    label: PropTypes.string,
    isMulti: PropTypes.bool,
  };

  state = {
    selectedOption: null,
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log('Option selected:', selectedOption);
  };

  render() {
    const { selectedOption } = this.state;
    const {
      // eslint-disable-next-line no-unused-vars
      label, disabled, isOpen, isMulti,
    } = this.props;

    return (
      <div className="JDselect">
        <span className="JDselect__label JDselect__label--top">{label}</span>
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
          className="react-select-container"
          classNamePrefix="react-select"
          // 개발후 삭제 아래줄
          // menuIsOpen={isOpen}
          isDisabled={disabled}
          isMulti={isMulti}
        />
      </div>
    );
  }
}

JDselect.defaultProps = {
  disabled: false,
  isOpen: false,
  label: '',
  isMulti: false,
};

export default JDselect;
