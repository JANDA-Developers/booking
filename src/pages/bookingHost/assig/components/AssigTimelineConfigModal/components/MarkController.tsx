import React from "react";
import Button from "../../../../../../atoms/button/Button";
import JDselect from "../../../../../../atoms/forms/selectBox/SelectBox";
import Vtable, {
  VtableColumn,
  VtableCell
} from "../../../../../../atoms/vtable/Vtable";
import JDcolorPicker from "../../../../../../atoms/colorPicker/ColorPicker";
import JDswitch from "../../../../../../atoms/forms/switch/Switch";
import { useColorPicker, useSwitch } from "../../../../../../hooks/hook";
import { IContext } from "../../../../BookingHostRouter";
import ModalEndSection from "../../../../../../atoms/modal/components/ModalEndSection";

interface Iprops {
  context: IContext;
}

const MarkController: React.FC<Iprops> = ({ context }) => {
  const useHasMemoColor = useSwitch(false);
  const hasMemoColor = useColorPicker(null);

  const unPayUse = useSwitch(false);
  const unPayColor = useColorPicker(null);

  return (
    <div>
      <div>
        <Vtable mode="unStyle">
          <VtableColumn>
            <VtableCell label="has memo mark">
              <JDswitch mr="normal" {...useHasMemoColor} />
              <JDcolorPicker colorHook={hasMemoColor} />
            </VtableCell>
          </VtableColumn>
          <VtableColumn>
            <VtableCell label="didn't pay mark">
              <JDswitch mr="normal" {...unPayUse} />
              <JDcolorPicker colorHook={unPayColor} />
            </VtableCell>
          </VtableColumn>
        </Vtable>
      </div>
      <ModalEndSection>
        <Button
          onClick={() => {
            // handleClickAdmit();
          }}
          thema="primary"
          size="small"
          label="적용"
        />
        <Button
          onClick={() => {
            // handleClickAdmit("cancel");
          }}
          size="small"
          thema="warn"
          label="적용해제"
        />
      </ModalEndSection>
    </div>
  );
};

export default MarkController;
