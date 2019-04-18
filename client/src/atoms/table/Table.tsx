import classNames from 'classnames';
import 'react-table/react-table.css';
import './Table.scss';
import React from 'react';
import ReactTable, { Column } from 'react-table';
import ErrProtecter from '../../utils/ErrProtecter';

interface IProps {
  align?: string;
  columns: Column<{}>[];
  data: any;
  className?: string;
  [foo: string]: any;
}

const JDtable: React.SFC<IProps> = ({
  align, children, className, ...props
}) => {
  const classes = classNames('JDtable', className, {
    'JDtable--center ': align === 'center',
  });

  return <ReactTable className={classes} {...props} />;
};

export default JDtable;
