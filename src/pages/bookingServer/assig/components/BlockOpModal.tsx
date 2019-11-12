import React from "react";
import {
  IAssigTimelineUtils,
  IAssigTimelineContext,
  IAssigTimelineHooks,
  IAssigDataControl
} from "../assigIntrerface";
import JDcolorPicker from "../../../../atoms/colorPicker/ColorPicker";
import { useColorPicker, useCheckBox, LANG } from "../../../../hooks/hook";
import Button from "../../../../atoms/button/Button";
import JDmodal from "../../../../atoms/modal/Modal";
import CheckBox from "../../../../atoms/forms/checkBox/CheckBox";
import { muResult } from "../../../../utils/utils";

interface IProps {
  assigHooks: IAssigTimelineHooks;
  assigUtils: IAssigTimelineUtils;
  assigContext: IAssigTimelineContext;
  assigDataControl: IAssigDataControl;
}

const BlockOpModal: React.FC<IProps> = ({
  assigUtils: { getGroupById, getItemById, getGuestsByBookingId },
  assigHooks: {
    bookingModal,
    createMenuProps,
    blockOpModal,
    guestValue,
    setGuestValue
  },
  assigContext: { groupData },
  assigDataControl: { updateBlockOpMu }
}) => {
  const target = blockOpModal.info;
  const colorPickerHook = useColorPicker(
    target.blockOption ? target.blockOption.color : "#2153dbcc"
  );
  const addmitToAll = useCheckBox(false);

  const handleClickAdmit = (flag?: "cancle") => {
    const result = updateBlockOpMu({
      variables: {
        applyWithBooking: addmitToAll.checked,
        blockOption: {
          color: flag ? null : colorPickerHook.color
        },
        guestId: blockOpModal.info.id
      }
    });

    if (!muResult(result, "updateBlockOption")) {
      let inTarget = [target];
      if (addmitToAll.checked)
        inTarget = getGuestsByBookingId(target.bookingId);

      if (!flag) {
        inTarget.forEach(
          ininTarget => (ininTarget.blockOption.color = colorPickerHook.color)
        );
      } else if (flag === "cancle") {
        inTarget.forEach(ininTarget => (ininTarget.blockOption.color = null));
      }
      setGuestValue([...guestValue]);
    }
  };

  return (
    <JDmodal visibleOverflow className="assig__blockOpModal" {...blockOpModal}>
      <div className="blockOpMenu" id="blockOpMenu">
        <div>
          <h6>{LANG("block_highlights")}}</h6>
          <JDcolorPicker
            label={LANG("apply_color")}
            colorHook={colorPickerHook}
          />
          <CheckBox
            label={LANG("applies_to_all_reservations_booked_together")}
            {...addmitToAll}
          />
        </div>
        <div className="JDmodal__endSection">
          <Button
            onClick={() => {
              handleClickAdmit();
            }}
            thema="primary"
            size="small"
            label={LANG("Apply")}
          />
        </div>
      </div>
    </JDmodal>
  );
};

export default BlockOpModal;
