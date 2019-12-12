import React from "react";
import Button from "../../../../atoms/button/Button";
import JDselect from "../../../../atoms/forms/selectBox/SelectBox";
import Vtable, {
  VtableColumn,
  VtableCell
} from "../../../../atoms/vtable/Vtable";
import JDcolorPicker from "../../../../atoms/colorPicker/ColorPicker";
import JDswitch from "../../../../atoms/forms/switch/Switch";
import {
  useColorPicker,
  useDayPicker,
  useSwitch
} from "../../../../hooks/hook";

interface Iprops {}

const MarkController: React.FC<Iprops> = ({ context }) => {
  const useHasMemoColor = useSwitch(false);
  const hasMemoColor = useColorPicker(null);

  const unPayUse = useSwitch(false);
  const unPayColor = useColorPicker(null);

  return (
    <div>
      <div>
        <Vtable>
          <VtableColumn>
            <VtableCell label="has memo mark">
              <JDswitch {...useHasMemoColor} />
              <JDcolorPicker colorHook={hasMemoColor} />
            </VtableCell>
          </VtableColumn>
          <VtableColumn>
            <VtableCell label="didn't pay mark">
              <JDswitch {...unPayUse} />
              <JDcolorPicker colorHook={unPayColor} />
            </VtableCell>
          </VtableColumn>
        </Vtable>
      </div>
      <div className="JDmodal__endSection">
        <Button
          onClick={() => {
            handleClickAdmit();
          }}
          thema="primary"
          size="small"
          label="적용"
        />
        <Button
          onClick={() => {
            handleClickAdmit("cancel");
          }}
          size="small"
          thema="warn"
          label="적용해제"
        />
      </div>
    </div>
  );
};

export default MarkController;
