import React from "react";
import {
  IAssigTimelineUtils,
  IAssigTimelineContext,
  IAssigTimelineHooks,
  IAssigDataControl
} from "../components/assigIntrerface";
import JDcolorPicker from "../../../../atoms/colorPicker/ColorPicker";
import { useColorPicker, useCheckBox, LANG } from "../../../../hooks/hook";
import Button from "../../../../atoms/button/Button";
import JDmodal from "../../../../atoms/modal/Modal";
import CheckBox from "../../../../atoms/forms/checkBox/CheckBox";
import { muResult } from "../../../../utils/utils";
import ModalEndSection from "../../../../atoms/modal/components/ModalEndSection";

interface IProps {
  assigHooks: IAssigTimelineHooks;
  assigUtils: IAssigTimelineUtils;
  assigContext: IAssigTimelineContext;
  assigDataControl: IAssigDataControl;
}

const BlockOpModal: React.FC<IProps> = ({
  assigUtils: { getGuestsByBookingId },
  assigHooks: { blockOpModal, guestValue, setGuestValue },
  assigDataControl: { updateBlockOpMu }
}) => {
  const target = blockOpModal.info;
  const colorPickerHook = useColorPicker(
    target.blockOption ? target.blockOption.color : "#2153dbcc"
  );
  const addmitToAll = useCheckBox(false);

  const handleClickApply = async (cancle: boolean) => {
    const result = await updateBlockOpMu({
      variables: {
        applyWithBooking: addmitToAll.checked,
        blockOption: {
          color: cancle ? null : colorPickerHook.color
        },
        guestId: blockOpModal.info.id
      }
    });

    // 성공시 화면에 반영
    if (muResult(result, "UpdateBlockOption")) {
      let inTarget = [target];
      if (addmitToAll.checked)
        inTarget = getGuestsByBookingId(target.bookingId);

      if (!cancle) {
        inTarget.forEach(
          ininTarget => (ininTarget.blockOption.color = colorPickerHook.color)
        );
      } else if (cancle) {
        inTarget.forEach(ininTarget => (ininTarget.blockOption.color = null));
      }
      setGuestValue([...guestValue]);
    }
  };

  return (
    <JDmodal visibleOverflow className="assig__blockOpModal" {...blockOpModal}>
      <div className="blockOpMenu" id="blockOpMenu">
        <div>
          <h6>{LANG("block_highlights")}</h6>
          <JDcolorPicker
            label={LANG("apply_color")}
            colorHook={colorPickerHook}
          />
          <CheckBox
            label={LANG("applies_to_all_reservations_booked_together")}
            {...addmitToAll}
          />
        </div>
        <ModalEndSection>
          <Button
            mode="flat"
            onClick={() => {
              handleClickApply(false);
            }}
            thema="primary"
            size="small"
            label={LANG("Apply")}
          />
        </ModalEndSection>
      </div>
    </JDmodal>
  );
};

export default BlockOpModal;
