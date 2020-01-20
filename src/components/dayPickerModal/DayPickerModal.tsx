import React from "react";
import { IUseModal } from "../../hooks/hook";
import JDmodal from "../../atoms/modal/Modal";
import JDdayPicker, {
  IJDdayPickerProps
} from "../../atoms/dayPicker/DayPicker";
import "./DayPickerModal.scss";
import { MODAL_MIN_WIDTH } from "../../types/const";

interface Iprops extends IJDdayPickerProps {
  autoClose?: boolean;
  modalHook: IUseModal;
  callBackChangeDate?: (from?: Date | null, to?: Date | null) => void;
}

const DayPickerModal: React.FC<Iprops> = ({
  modalHook,
  from,
  to,
  autoClose,
  callBackChangeDate,
  ...props
}) => {
  const handleChangeDate = (prop: any) => {
    callBackChangeDate && callBackChangeDate(from, to);
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
      <div
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <JDdayPicker
          from={from}
          to={to}
          onChangeDate={handleChangeDate}
          {...props}
        />
      </div>
    </JDmodal>
  );
};

export default DayPickerModal;
