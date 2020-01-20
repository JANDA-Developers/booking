import React from "react";
import selectTableHOC, {
  SelectAllInputComponentProps,
  SelectInputComponentProps,
  SelectTableAdditionalProps
} from "react-table/lib/hoc/selectTable";
import CheckBox from "../forms/checkBox/CheckBox";
import { IUseCheckBoxTable } from "../../hooks/hook";
import JDtable, { IJDTableProps } from "./Table";

interface ISCProp {
  onToogleRow: (key: string) => void;
}

const SelectInputCompoent: React.FC<ISCProp & SelectInputComponentProps> = ({
  checked,
  id,
  onToogleRow
}) => {
  const inId = id.replace("select-", "");
  const onChange = (flag: boolean) => {
    onToogleRow(inId);
  };

  return <CheckBox size="small" onChange={onChange} checked={checked} />;
};

interface ISACProp {
  onToogleAllRow: () => void;
  selectAll: boolean;
}

const SelectAllInputComponent: React.FC<ISACProp &
  SelectAllInputComponentProps> = ({ selectAll, onToogleAllRow }) => (
  <CheckBox onChange={onToogleAllRow} checked={selectAll} />
);

const JDSelectableJDtable: React.FC<IJDTableProps &
  SelectTableAdditionalProps &
  IUseCheckBoxTable> = prop => {
  const { selectAll, onToogleAllRow, onToogleRow } = prop;
  const SelectableJDtable = selectTableHOC(JDtable);

  return (
    <SelectableJDtable
      {...prop}
      SelectAllInputComponent={prop => (
        <SelectAllInputComponent
          onToogleAllRow={onToogleAllRow}
          selectAll={selectAll}
          {...prop}
        />
      )}
      SelectInputComponent={prop => (
        <SelectInputCompoent onToogleRow={onToogleRow} {...prop} />
      )}
    />
  );
};

export { JDSelectableJDtable };
