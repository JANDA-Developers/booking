import React, {useState} from "react";
import ReactDragList from "react-drag-list";
import "react-drag-list/assets/index.css";

interface IProps {
  children: any;
  className?: string;
  data: any;
  rowKey: string;
  onUpdate?: ((event: Object, dataSource: Object[]) => void) | undefined;
}

function DrragList({children, data, rowKey, onUpdate, className}: IProps) {
  return (
    <div className="JDdrragable">
      <ReactDragList
        dataSource={data}
        chosenClass={"JDdrragable--chosen"}
        dragClass={"JDdrragable--drag"}
        ghostClass={"JDdrragable--ghost"}
        rowKey={rowKey}
        row={children}
        handles={false}
        className={`simple-drag ${className}`}
        rowClassName="simple-drag-row"
        onUpdate={onUpdate}
      />
    </div>
  );
}
export default DrragList;
