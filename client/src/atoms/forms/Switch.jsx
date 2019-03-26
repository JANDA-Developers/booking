import React from 'react';
import './Switch.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import ErrProtecter from '../../utils/ErrProtecter';

function Switch({
  disabled, checked, onChange, ltxt, rtxt,
}) {
  const handleCheckboxChange = () => {
    const flag = disabled ? checked : !checked;
    onChange(flag);
  };

  const classes = classNames({
    JDswitch__input: true,
  });

  return (
    <span
      tabIndex={0}
      className="JDswitch"
      role="button"
      disabled={disabled}
      onKeyPress={handleCheckboxChange}
      onClick={handleCheckboxChange}
    >
      <label htmlFor="JDswitch">
        {ltxt !== '' && <span className="JDswitch__ltxt">{ltxt}</span>}
        <input
          onChange={() => {}}
          checked={checked}
          className={classes}
          disabled={disabled}
          type="checkbox"
        />
        <span className="JDswitch__lever" />
        {rtxt !== '' && <span className="JDswitch__rtxt">{rtxt}</span>}
      </label>
    </span>
  );
}

Switch.propTypes = {
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  ltxt: PropTypes.string,
  rtxt: PropTypes.string,
};

Switch.defaultProps = {
  disabled: false,
  checked: false,
  onChange: () => {},
  ltxt: '',
  rtxt: '',
};

export default ErrProtecter(Switch);
