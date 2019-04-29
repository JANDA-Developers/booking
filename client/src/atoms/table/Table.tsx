import classNames from 'classnames';
import 'react-table/react-table.css';
import './Table.scss';
import React from 'react';
import ReactTable, { Column, TableProps, ReactTableDefaults } from 'react-table';
import { SelectInputComponentProps, SelectAllInputComponentProps } from 'react-table/lib/hoc/selectTable';
import ErrProtecter from '../../utils/ErrProtecter';
import CheckBox from '../forms/CheckBox';

interface IProps extends TableProps {
  align?: string;
  inClassNames?: string;
  // css 셋팅해줌
  isCheckable?: boolean;
}

const JDtable: React.SFC<IProps> = ({
  align, children, inClassNames, isCheckable, ...props
}) => {
  const classes = classNames('JDtable', inClassNames, {
    'JDtable--center ': align === 'center',
    'JDtable--checkable': isCheckable,
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
