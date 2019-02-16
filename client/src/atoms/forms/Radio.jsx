import React from 'react';
import './Radio.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import ErrProtecter from '../../utils/ErrProtecter';

function Radio({
  id, disabled, groupName, label, onChange, value,
}) {
  const handleRadioChange = (e) => {
    const radioVlaue = e.target.value;
    if (!disabled) {
      onChange(radioVlaue);
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
          onChange={handleRadioChange}
        />
        <span className="JDradio__label" />
        <span className="JDradio__label-text">{label}</span>
      </label>
    </span>
  );
}

Radio.propTypes = {
  id: PropTypes.string,
  disabled: PropTypes.bool,
  groupName: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Radio.defaultProps = {
  id: '',
  disabled: false,
  groupName: '',
  label: '',
  onChange: () => {},
  value: '',
};

export default ErrProtecter(Radio);
