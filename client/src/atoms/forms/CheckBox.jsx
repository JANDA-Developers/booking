import React from 'react';
import './CheckBox.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import ErrProtecter from '../../utils/ErrProtecter';

function Checkbox({
  disabled, checked, onChange, label,
}) {
  const classes = classNames({
    JDcheck_box: true,
  });

  const onHandleClick = () => {
    const flag = disabled ? checked : !checked;
    onChange(flag);
  };
  return (
    <span className="JDcheck_box_wrap" tabIndex={0} role="button" onKeyPress={onHandleClick} onClick={onHandleClick}>
      <input onChange={() => {}} checked={checked} disabled={disabled} className={classes} type="checkbox" />
      <span className="JDcheck_box_label">{label}</span>
    </span>
  );
}

Checkbox.propTypes = {
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
};

Checkbox.defaultProps = {
  label: '',
  checked: false,
  disabled: false,
  onChange: () => {},
};

export default ErrProtecter(Checkbox);
