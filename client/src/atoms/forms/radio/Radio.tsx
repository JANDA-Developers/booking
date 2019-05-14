import React from 'react';
import './Radio.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ErrProtecter from '../../../utils/errProtect';

interface IProps {
  id: string;
  groupName: string;
  label?: string;
  disabled?: boolean;
  onChange?(foo?: string | number): void;
  value?: string | number;
  checked?: boolean;
}

const JDradio: React.FC<IProps> = ({
  id, disabled, groupName, label, onChange, value, checked = false,
}) => {
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const radioVlaue = e.target.value;
    if (!disabled) {
      onChange && onChange(radioVlaue);
    }
  };

  const classes = classNames({
    JDradio__input: true,
    'JDradio__input--gap': true,
  });

  return (
    <span className="JDradio">
      <label tabIndex={0} role="button" htmlFor={id}>
        <input
          id={id}
          className={classes}
          name={groupName}
          type="radio"
          value={value}
          disabled={disabled}
          checked={checked}
          onChange={handleRadioChange}
        />
        <span className="JDradio__label" />
        {label && <span className="JDradio__label-text">{label}</span>}
      </label>
    </span>
  );
};

export default ErrProtecter(JDradio);
