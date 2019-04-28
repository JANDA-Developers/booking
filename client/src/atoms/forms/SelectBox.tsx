import React from 'react';
import Select from 'react-select';
import './SelectBox.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SelectComponentsProps } from 'react-select/lib/Select';

export interface IselectedOption {
  label: string;
  value: string | number;
}
interface Iprops extends SelectComponentsProps {
  label?: string;
  disabled?: boolean;
  selectedOption?: IselectedOption;
  options?: IselectedOption[] | [];
  onChange?(foo: IselectedOption): void;
  className?: string;
  rightLabel?: string;
  props?: any;
  mode?: 'small';
  size?: '2rem' | '3rem' | '3.5rem' | '3.8rem' | '4rem' | '9rem' | '11rem' | '13rem';
}

const JDselect: React.SFC<Iprops> = ({
  label,
  disabled,
  selectedOption,
  onChange,
  rightLabel,
  options,
  mode,
  className,
  size,
  // eslint-disable-next-line no-unused-vars
  ...props
}) => {
  // placeHolder 가 보일려면 value 는 undefined 여야 합니다.
  let validSelectedOption;
  if (selectedOption && !selectedOption.value) validSelectedOption = undefined;
  else validSelectedOption = selectedOption;

  const handleChange = (selectOption: any) => {
    onChange && onChange(selectOption);
  };

  const classes = classNames('JDselect', className, {
    'JDselect--disabled': disabled,
    'JDselect--small': mode === 'small',
  });

  const selectStyle: any = {
    width: size,
  };

  return (
    <div style={selectStyle} className={classes}>
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
      {rightLabel && <span className="JDselect__label JDselect__label--right">{rightLabel}</span>}
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
