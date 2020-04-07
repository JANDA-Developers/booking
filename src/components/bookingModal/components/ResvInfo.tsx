import React from "react";
import { IBookingModalContext } from "../declaration";
import Align from "../../../atoms/align/Align";
import JDtypho from "../../../atoms/typho/Typho";
import InputText from "../../../atoms/forms/inputText/InputText";
import { LANG } from "../../../hooks/hook";
import JDselect, {
  SelectBoxSize,
} from "../../../atoms/forms/selectBox/SelectBox";
import { FUNNELS_OP, BOOKING_STATUS_OP } from "../../../types/const";
import { IModalSMSinfo } from "../../smsModal/SendSmsModal";
import { toast } from "react-toastify";
import { isPhone } from "../../../utils/inputValidations";
import JDdayPicker from "../../../atoms/dayPicker/DayPicker";
import moment from "moment";
import { DateFormat } from "../../../types/enum";

interface IProps {
  responseStyle: any;
  bookingModalContext: IBookingModalContext;
}

const ResvInfo: React.FC<IProps> = ({
  bookingModalContext,
  responseStyle,
  ...prop
}) => {
  const {
    resvDateHook,
    isDesktopUp,
    bookingStatusHook,
    bookingData,
  } = bookingModalContext;
  // smsIcon 핸들
  const { createdAt } = bookingData;

  return (
    <Align {...responseStyle}>
      {isDesktopUp && (
        <JDtypho mb="normal">{LANG("reservation_information")}</JDtypho>
      )}
      <div>
        <JDselect
          mr={"no"}
          {...bookingStatusHook}
          options={BOOKING_STATUS_OP}
          id="BookingStatusSelect"
          label={LANG("booking_status")}
        />
      </div>
      <div>
        <JDdayPicker
          mr={"no"}
          displayIcon={false}
          canSelectBeforeDay={false}
          {...resvDateHook}
          mode="input"
          className="JDstandard-space"
          readOnly
          label={LANG("date_of_stay")}
        />
      </div>
      <div>
        <InputText
          mb="no"
          mr={"no"}
          readOnly
          id="ResvDateInput"
          value={moment(createdAt || undefined)
            .local()
            .format(DateFormat.WITH_TIME)}
          label={LANG("reservation_date")}
          placeholder={LANG("reservation_date")}
        />
      </div>
    </Align>
  );
};

export default ResvInfo;
