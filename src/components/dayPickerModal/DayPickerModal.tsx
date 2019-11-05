import React, {useEffect} from "react";
import {IUseModal} from "../../hooks/hook";
import JDmodal from "../../atoms/modal/Modal";
import JDdayPicker, {IJDdayPickerProps} from "../../atoms/dayPicker/DayPicker";
import "./DayPickerModal.scss";
import {MODAL_MIN_WIDTH} from "../../types/enum";
import DayPicker from "react-day-picker";

interface Iprops extends IJDdayPickerProps {
  autoClose?: boolean;
  modalHook: IUseModal;
}

const DayPickerModal: React.FC<Iprops> = ({
  modalHook,
  from,
  to,
  autoClose,
  ...props
}) => {
  const handleChangeDate = (prop: any) => {
    console.log(autoClose);
    console.log(from);
    console.log(to);
    if (from && to && autoClose) {
      setTimeout(() => {
        modalHook.closeModal();
      }, 200);
    }
  };

  return (
    <JDmodal
      minWidth={MODAL_MIN_WIDTH}
      className="DayPickerModal"
      {...modalHook}
    >
      <JDdayPicker
        from={from}
        to={to}
        onChangeDate={handleChangeDate}
        {...props}
      />
    </JDmodal>
  );
};

export default DayPickerModal;
