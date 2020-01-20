import React, { useState } from "react";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import { IUseModal, useInput, LANG } from "../../hooks/hook";
import JDmodal from "../../atoms/modal/Modal";
import InputText from "../../atoms/forms/inputText/InputText";
import Button from "../../atoms/button/Button";
import { toast } from "react-toastify";
import JDpreloader from "../../atoms/preloader/Preloader";
import { isPhone } from "../../utils/inputValidations";
import ModalEndSection from "../../atoms/modal/components/ModalEndSection";
interface Iprops {
  context: IContext;
  modalHook: IUseModal;
  callBackGetEmailBtn: (phoneNumber: string) => void;
  muLoading: boolean;
}

const FindEmailModal: React.FC<Iprops> = ({
  context,
  modalHook,
  callBackGetEmailBtn,
  muLoading
}) => {
  const phoneNumberHook = useInput("");
  const validate = () => {
    if (!phoneNumberHook.isValid) {
      toast.warn(LANG("not_a_valid_phoneNumber"));
      return false;
    }
    return true;
  };
  return (
    <JDmodal {...modalHook}>
      <h6>{LANG("get_email_bt_msg")}</h6>
      <InputText
        validation={isPhone}
        label={LANG("phoneNumber")}
        hyphen
        {...phoneNumberHook}
      />
      <ModalEndSection>
        <Button
          thema="primary"
          mode="flat"
          label={LANG("get_email_bt_msg")}
          onClick={() => {
            if (validate()) {
              callBackGetEmailBtn(phoneNumberHook.value);
            }
          }}
        />
      </ModalEndSection>
      <JDpreloader loading={muLoading} floating />
    </JDmodal>
  );
};

export default FindEmailModal;
