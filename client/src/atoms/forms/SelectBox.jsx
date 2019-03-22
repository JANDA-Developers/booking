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
  // placeHolder 가 보일려면 value 는 undefined 여야 합니다.
  let validSelectedOption;
  if (selectedOption && !selectedOption.value) validSelectedOption = undefined;
  else validSelectedOption = selectedOption;

  const handleChange = (selectOption) => {
    onChange(selectOption);
  };

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
