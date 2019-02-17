import React from 'react';
import Select from 'react-select';
import './SelectBox.scss';
import PropTypes from 'prop-types';

function JDselect({
  label,
  disabled,
  // eslint-disable-next-line no-unused-vars
  isOpen,
  isMulti,
  onChange,
  options,
  selectedOption,
}) {
  const handleChange = (selectOption) => {
    onChange(selectOption);
  };

  return (
    <div className={disabled ? 'JDselect JDselect--disabled' : 'JDselect'}>
      <span className="JDselect__label JDselect__label--top">{label}</span>
      <Select
        value={selectedOption}
        onChange={handleChange}
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

JDselect.propTypes = {
  selectedOption: PropTypes.object,
  disabled: PropTypes.bool,
  isOpen: PropTypes.bool,
  label: PropTypes.string,
  isMulti: PropTypes.bool,
  onChange: PropTypes.func,
  // todo: objectShape
  options: PropTypes.object,
};
JDselect.defaultProps = {
  disabled: false,
  isOpen: false,
  label: '',
  isMulti: false,
  onChange: () => {},
  options: {},
  selectedOption: {},
};

export default JDselect;
