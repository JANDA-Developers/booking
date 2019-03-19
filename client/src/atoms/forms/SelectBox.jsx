import React from 'react';
import Select from 'react-select';
import './SelectBox.scss';
import PropTypes from 'prop-types';

function JDselect({
  label,
  disabled,
  selectedOption,
  onChange,
  // eslint-disable-next-line no-unused-vars
  ...props
}) {
  const handleChange = (selectOption) => {
    onChange(selectOption);
  };

  // for placeHolder
  let validSelectedOption;
  if (selectedOption && selectedOption.value === null) {
    validSelectedOption = undefined;
  } else {
    validSelectedOption = selectedOption;
  }

  return (
    <div className={disabled ? 'JDselect JDselect--disabled' : 'JDselect'}>
      {label !== '' ? <span className="JDselect__label JDselect__label--top">{label}</span> : null}
      <Select
        {...props}
        value={validSelectedOption}
        onChange={handleChange}
        className="react-select-container"
        classNamePrefix="react-select"
        isDisabled={disabled}
      />
    </div>
  );
}

JDselect.propTypes = {
  selectedOption: PropTypes.object,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  props: PropTypes.object,
};
JDselect.defaultProps = {
  disabled: false,
  label: '',
  onChange: () => {},
  selectedOption: undefined,
  props: {},
};

export default JDselect;
