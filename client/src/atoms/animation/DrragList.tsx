import React, { useState } from 'react';
import ReactDragList from 'react-drag-list';
import 'react-drag-list/assets/index.css';

interface IProps {
  children: any;
  data: any;
  rowKey: string;
  handleUpdate?: any;
}

function DrragList({
  children, data, rowKey, handleUpdate,
}: IProps) {
  return (
    <div className="JDdrragable">
      <ReactDragList
        dataSource={data}
        rowKey={rowKey}
        row={children}
        handles={false}
        className="simple-drag"
        rowClassName="simple-drag-row"
        onUpdate={handleUpdate}
      />
    </div>
  );
}
export default DrragList;
