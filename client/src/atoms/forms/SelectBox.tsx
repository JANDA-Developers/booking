import React from 'react';
import Select from 'react-select';
import './SelectBox.scss';
import PropTypes from 'prop-types';

export interface IselectedOption {
  label: string;
  value: string | number;
}

interface Iprops {
  label?: string;
  disabled?: boolean;
  selectedOption?: IselectedOption;
  options?: IselectedOption[] | [];
  onChange(foo: IselectedOption): void;
  props?: any;
}

const JDselect: React.SFC<Iprops> = ({
  label,
  disabled,
  selectedOption,
  onChange,
  options,
  // eslint-disable-next-line no-unused-vars
  ...props
}) => {
  // placeHolder 가 보일려면 value 는 undefined 여야 합니다.
  let validSelectedOption;
  if (selectedOption && !selectedOption.value) validSelectedOption = undefined;
  else validSelectedOption = selectedOption;

  const handleChange = (selectOption: any) => {
    onChange(selectOption);
  };

  return (
    <div className={disabled ? 'JDselect JDselect--disabled' : 'JDselect'}>
      {label !== '' ? <span className="JDselect__label JDselect__label--top">{label}</span> : null}
      <Select
        {...props}
        options={options}
        value={validSelectedOption}
        onChange={handleChange}
        className="react-select-container"
        classNamePrefix="react-select"
        isDisabled={disabled}
      />
    </div>
  );
};

JDselect.defaultProps = {
  disabled: false,
  label: '',
  onChange: () => {},
  selectedOption: undefined,
  props: {},
};

export default JDselect;
