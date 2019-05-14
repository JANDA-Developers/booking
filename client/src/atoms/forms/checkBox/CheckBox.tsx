import React from 'react';
import './CheckBox.scss';
import classNames from 'classnames';
import ErrProtecter from '../../../utils/errProtect';

interface IProps {
  disabled?: boolean;
  checked?: boolean;
  label?: string;
  className?: string;
  onChange?(foo: boolean): void;
  id?: string;
}

const JDcheckbox: React.FC<IProps> = ({
  disabled, checked, onChange, label, className, ...props
}) => {
  const classes = classNames('JDcheck_box', className, {});

  const onHandleClick = () => {
    if (checked !== undefined && onChange) {
      const flag = disabled ? checked : !checked;
      onChange(flag);
    }
  };

  return (
    <span className="JDcheck_box_wrap" tabIndex={0} role="button" onKeyPress={onHandleClick} onClick={onHandleClick}>
      <input {...props} onChange={() => {}} checked={checked} disabled={disabled} className={classes} type="checkbox" />
      <span className="JDcheck_box_label">{label}</span>
    </span>
  );
};

JDcheckbox.defaultProps = {
  checked: false,
  disabled: false,
};

export default ErrProtecter(JDcheckbox);
