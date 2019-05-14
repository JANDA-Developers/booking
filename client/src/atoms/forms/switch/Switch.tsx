import React, { Fragment } from 'react';
import './Switch.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ErrProtecter from '../../../utils/errProtect';
import JDlabel from '../../label/JDLabel';

interface IProps {
  disabled?: boolean;
  checked?: boolean;
  onChange?(foo: boolean): void;
  label?: string;
  ltxt?: string;
  rtxt?: string;
}

const JDswitch: React.FC<IProps> = ({
  disabled, checked = false, onChange, ltxt, rtxt, label,
}) => {
  const handleCheckboxChange = () => {
    const flag = disabled ? checked : !checked;
    onChange && onChange(flag);
  };

  const classes = classNames({
    JDswitch__input: true,
  });

  return (
    <span className="JDswitch-wrap">
      {label && <JDlabel txt={label} />}
      <span
        tabIndex={0}
        className="JDswitch"
        role="button"
        onKeyPress={handleCheckboxChange}
        onClick={handleCheckboxChange}
      >
        <label htmlFor="JDswitch">
          {ltxt !== '' && <span className="JDswitch__ltxt">{ltxt}</span>}
          <input onChange={() => {}} checked={checked} className={classes} disabled={disabled} type="checkbox" />
          <span className="JDswitch__lever" />
          {rtxt !== '' && <span className="JDswitch__rtxt">{rtxt}</span>}
        </label>
      </span>
    </span>
  );
};

JDswitch.defaultProps = {
  disabled: false,
  checked: false,
  onChange: () => {},
  ltxt: '',
  rtxt: '',
};

export default ErrProtecter(JDswitch);
