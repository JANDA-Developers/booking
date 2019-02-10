import React, { useState } from 'react';
import './CheckBox.scss';
import classNames from 'classnames/bind';
import ErrProtecter from '../../utils/ErrProtecter';
import { FormsDefault, Forms } from '../../utils/PropTypes';

function Checkbox({ disabled, check, label }) {
  const [checked, setChecked] = useState(check);
  const classes = classNames({
    JDcheck_box: true,
  });

  return (
    <span
      className="JDcheck_box_wrap"
      tabIndex={0}
      role="button"
      onKeyPress={() => setChecked(() => (disabled ? checked : !checked))}
      onClick={() => setChecked(() => (disabled ? checked : !checked))}
    >
      <input
        onChange={() => {}}
        checked={checked}
        disabled={disabled}
        className={classes}
        type="checkbox"
      />
      <span className="JDcheck_box_label">{label}</span>
    </span>
  );
}

Checkbox.propTypes = Forms;

Checkbox.defaultProps = FormsDefault;

export default ErrProtecter(Checkbox);
