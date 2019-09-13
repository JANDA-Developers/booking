import React from "react";
import {IUseDayPicker, IUseModal} from "../../actions/hook";
import JDmodal from "../../atoms/modal/Modal";
import DayPicker from "react-day-picker";
import JDdayPicker, {IJDdayPickerProps} from "../../atoms/dayPicker/DayPicker";
interface Iprops extends IJDdayPickerProps {
  modalHook: IUseModal;
}

const DayPickerModal: React.FC<Iprops> = ({modalHook, ...props}) => {
  return (
    <JDmodal {...modalHook}>
      <JDdayPicker {...props} />
    </JDmodal>
  );
};

export default DayPickerModal;
