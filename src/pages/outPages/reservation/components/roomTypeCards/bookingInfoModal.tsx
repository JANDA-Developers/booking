import React from "react";
import { IUseModal, LANG } from "../../../../../hooks/hook";
import JDmodal from "../../../../../atoms/modal/Modal";
import BookingInfoBox, { IBookingInfoBoxProps } from "../bookingInfoBox";
import Button from "../../../../../atoms/button/Button";
import ModalEndSection from "../../../../../atoms/modal/components/ModalEndSection";

interface Iprops extends IBookingInfoBoxProps {
  modalHook: IUseModal;
  paymentModalHook: IUseModal;
}

const BookingInfoModal: React.FC<Iprops> = ({
  paymentModalHook,
  modalHook,
  ...props
}) => {
  return (
    <JDmodal
      foot={<Button
        mode="flat"
        onClick={() => {
          modalHook.closeModal();
          paymentModalHook.openModal();
        }}
        thema="primary"
        size="long"
        label={LANG("selection_information_is_correct")}
      />
      }
      head={{
        title: LANG("is_selected_info_collect")
      }} noAnimation {...modalHook}>
      <BookingInfoBox {...props} />
    </JDmodal>
  );
};

export default BookingInfoModal;
