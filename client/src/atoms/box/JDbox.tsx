import classNames from 'classnames';
import React from 'react';
import ErrProtecter from '../../utils/ErrProtecter';
import './JDbox.scss';
import JDIcon from '../icons/Icons';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  children: JSX.Element[] | JSX.Element;
  className?: string;
  label?: JSX.Element | string;
  icon?: string;
  iconHover?: boolean;
  iconOnClick?: any;
}

const JDbox: React.FC<IProps> = ({
  children, className, label, iconOnClick, icon, iconHover, ...props
}) => {
  const classes = classNames('JDbox', className, {});

  return (
    <div className={classes} {...props}>
      {label && <div className="JDsmall-text">{label}</div>}
      {children}
      <span>{icon && <JDIcon onClick={iconOnClick} icon={icon} hover={iconHover} />}</span>
    </div>
  );
};

export default ErrProtecter<IProps>(JDbox);
