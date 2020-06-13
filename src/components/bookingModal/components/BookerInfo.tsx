import React from "react";
import { IBookingModalContext } from "../declaration";
import Align from "../../../atoms/align/Align";
import JDtypho from "../../../atoms/typho/Typho";
import InputText from "../../../atoms/forms/inputText/InputText";
import { LANG } from "../../../hooks/hook";
import JDselect from "../../../atoms/forms/selectBox/SelectBox";
import { FUNNELS_OP } from "../../../types/const";
import { IModalSMSinfo } from "../../smsModal/SendSmsModal";
import { toast } from "react-toastify";
import { isPhoneWeek } from "../../../utils/inputValidations";
import { enumToOption } from "@janda-com/front";
import { Funnels } from "../../../types/enum";

interface IProps {
  responseStyle: any;
  smsModalInfoTemp: IModalSMSinfo;
  bookingModalContext: IBookingModalContext;
}

const BookerInfo: React.FC<IProps> = ({
  bookingModalContext,
  responseStyle,
  smsModalInfoTemp,
  ...prop
}) => {
  const {
    isCreateMode,
    bookingPhoneHook,
    bookingNameHook,
    funnelStatusHook,
    sendSmsModalHook,
    isDesktopUp
  } = bookingModalContext;
  // smsIcon 핸들
  const handleSmsIconClick = () => {
    if (!bookingPhoneHook.isValid) {
      toast.warn(LANG("not_a_valid_mobile_number"));
      return;
    }
    sendSmsModalHook.openModal({
      ...smsModalInfoTemp,
      mode: isCreateMode ? "CreateBooking" : undefined
    });
  };

  return (
    <Align {...prop} {...responseStyle}>
      {isDesktopUp && <JDtypho mb="normal">{LANG("booker_info")}</JDtypho>}
      <div>
        <InputText
          id="BookerNameInput"
          mr={"no"}
          {...bookingNameHook}
          label={LANG("booker")}
          placeholder={LANG("booker")}
        />
      </div>
      <div>
        <InputText
          id="BookerPhoneInput"
          mr={"no"}
          {...bookingPhoneHook}
          validation={isPhoneWeek}
          label={LANG("phoneNumber")}
          placeholder={LANG("phoneNumber")}
          icon={isCreateMode ? undefined : "sms"}
          iconHover={!isCreateMode}
          iconOnClick={handleSmsIconClick}
          hyphen
        />
      </div>
      <div>
        <JDselect
          mb="no"
          id="FunnelSelect"
          menuPlacement="top"
          mr={"no"}
          {...funnelStatusHook}
          options={enumToOption(LANG, "Funnels", Funnels)}
          label={LANG("funnels")}
        />
      </div>
    </Align>
  );
};

export default BookerInfo;
