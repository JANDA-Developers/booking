import React from "react";
import { IControllSharedPorps } from "./SuperAdminController";
import Vtable, {
  VtableColumn,
  VtableCell,
  ColumnCells
} from "../../../../atoms/vtable/Vtable";
import InputText from "../../../../atoms/forms/inputText/InputText";
import JDselect from "../../../../atoms/forms/selectBox/SelectBox";
import { HOUSE_TYPE_OP } from "../../../../types/const";

interface Iprops extends IControllSharedPorps {}

const HouseControll: React.FC<Iprops> = ({ context }) => {
  const renders = [
    {
      label: "House Name",
      Component: () => <InputText />
    },
    {
      label: "House Type",
      Component: () => <JDselect options={HOUSE_TYPE_OP} />
    },
    {
      label: "Location",
      Component: () => <InputText />
    }
  ];

  return (
    <div>
      <Vtable>
        <ColumnCells datas={renders} />
      </Vtable>
    </div>
  );
};

export default HouseControll;
