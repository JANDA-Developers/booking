import classNames from 'classnames';
import React from 'react';

interface IProps {
  className?: string;
}

const PayMentModal: React.SFC<IProps> = ({ className }) => {
  const classes = classNames('JDcard', className, {});

  return <div className={classes} />;
};

export default PayMentModal;
