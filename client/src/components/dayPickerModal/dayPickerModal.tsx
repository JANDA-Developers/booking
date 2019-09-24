import React from "react";
import {IUseModal} from "../../actions/hook";
import JDmodal from "../../atoms/modal/Modal";
import JDdayPicker, {IJDdayPickerProps} from "../../atoms/dayPicker/DayPicker";
import "./DayPickerModal.scss";
import {MODAL_MIN_WIDTH} from "../../types/enum";

interface Iprops extends IJDdayPickerProps {
  modalHook: IUseModal;
}

const DayPickerModal: React.FC<Iprops> = ({modalHook, ...props}) => {
  return (
    <JDmodal className="DayPickerModal" {...modalHook}>
      <JDdayPicker {...props} />
    </JDmodal>
  );
};

export default DayPickerModal;
