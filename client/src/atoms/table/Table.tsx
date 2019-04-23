import classNames from 'classnames';
import 'react-table/react-table.css';
import './Table.scss';
import React from 'react';
import ReactTable, { Column, TableProps, ReactTableDefaults } from 'react-table';
import ErrProtecter from '../../utils/ErrProtecter';

interface IProps extends TableProps {
  align?: string;
  inClassNames?: string;
}

const JDtable: React.SFC<IProps> = ({
  align, children, inClassNames, ...props
}) => {
  const classes = classNames('JDtable', inClassNames, {
    'JDtable--center ': align === 'center',
  });

  return <ReactTable {...props} className={classes} />;
};

export const ReactTableDefault = Object.assign(ReactTableDefaults, {
  defaultPageSize: 10,
  minRows: 3,
  showPagination: false,
  sortable: false,
  resizable: false,
  // etc...
});

export default JDtable;
