import classNames from 'classnames';
import React from 'react';
import ErrProtecter from '../../utils/ErrProtecter';
import './JDbox.scss';
import JDIcon from '../icons/Icons';
import { IDiv } from '../../types/interface';

interface IProps extends IDiv {
  className?: string;
  mode?: 'table' | 'border';
  label?: JSX.Element | string;
  icon?: string;
  iconHover?: boolean;
  iconOnClick?: any;
}

const JDbox: React.FC<IProps> = ({
  children, className, label, iconOnClick, icon, iconHover, mode, ...props
}) => {
  const classes = classNames('JDbox', className, {
    'JDbox--normal': mode === undefined,
    'JDbox--table': mode === 'table',
    'JDbox--border': mode === 'border',
  });

  return (
    <div className={classes} {...props}>
      {label && <div className="JDbox__label">{label}</div>}
      <div className="JDbox__content">
        {children}
        <span>{icon && <JDIcon onClick={iconOnClick} icon={icon} hover={iconHover} />}</span>
      </div>
    </div>
  );
};

export default ErrProtecter<IProps>(JDbox);
