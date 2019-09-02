import React from "react";
import {
  IAssigTimelineUtils,
  IAssigTimelineContext,
  IAssigTimelineHooks,
  IAssigDataControl
} from "./assigIntrerface";
import JDcolorPicker from "../../../../atoms/colorPicker/ColorPicker";
import {useColorPicker, useCheckBox} from "../../../../actions/hook";
import Button from "../../../../atoms/button/Button";
import JDmodal from "../../../../atoms/modal/Modal";
import CheckBox from "../../../../atoms/forms/checkBox/CheckBox";
import {muResult} from "../../../../utils/utils";
import {changeEnd} from "codemirror";
import JDLabel from "../../../../atoms/label/JDLabel";

interface IProps {
  assigHooks: IAssigTimelineHooks;
  assigUtils: IAssigTimelineUtils;
  assigContext: IAssigTimelineContext;
  assigDataControl: IAssigDataControl;
}

const BlockOpModal: React.FC<IProps> = ({
  assigUtils: {getGroupById, getItemById, getGuestsByBookingId},
  assigHooks: {
    bookingModal,
    makeMenuProps,
    blockOpModal,
    guestValue,
    setGuestValue
  },
  assigContext: {groupData},
  assigDataControl: {updateBlockOpMu}
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
          <h6>블록하일라이트</h6>
          <JDcolorPicker label="적용색상" colorHook={colorPickerHook} />
          <CheckBox label="함께 예약된 예약에 모두 적용" {...addmitToAll} />
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
              handleClickAdmit("cancle");
            }}
            size="small"
            thema="error"
            label="적용해제"
          />
        </div>
      </div>
    </JDmodal>
  );
};

export default BlockOpModal;
