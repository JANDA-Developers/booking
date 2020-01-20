import React from "react";
import { IContext } from "../../../../BookingHostRouter";
import InputText from "../../../../../../atoms/forms/inputText/InputText";
import Vtable, {
  VtableColumn,
  VtableCell
} from "../../../../../../atoms/vtable/Vtable";
import { useInput } from "../../../../../../hooks/hook";

interface Iprops {
  context: IContext;
}

// "MoveTo today",
// "ZoomOut 처리",
// "Zoom 처리",
// "Delete 처리",
// "CheckIn 처리"

const ShortKeyConfig: React.FC<Iprops> = ({ context }) => {
  // Do get Key ZZ
  // const moveToTodayKeyHook = useInput("","","Ctrl + ");
  // const moveToTodayKeyHook = useInput("","","Ctrl + ");
  // useInput("","","Ctrl + ");
  // useInput("","","Click + Ctrl + ");
  // useInput("","","Click + Ctrl + ");

  return (
    <div>
      <Vtable mode="unStyle">
        <VtableColumn>
          <VtableCell label="MoveTo today">
            <InputText />
          </VtableCell>
        </VtableColumn>
        <VtableColumn>
          <VtableCell label="ZoomOut">
            <InputText />
          </VtableCell>
        </VtableColumn>
        <VtableColumn>
          <VtableCell label="Zoom">
            <InputText />
          </VtableCell>
        </VtableColumn>
        <VtableColumn>
          <VtableCell label="Delete">
            <InputText />
          </VtableCell>
        </VtableColumn>
        <VtableColumn>
          <VtableCell label="CheckIn">
            <InputText />
          </VtableCell>
        </VtableColumn>
      </Vtable>
    </div>
  );
};

export default ShortKeyConfig;
