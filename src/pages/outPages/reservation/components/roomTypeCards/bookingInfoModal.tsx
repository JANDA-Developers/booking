import React from "react";
import {IUseModal, LANG} from "../../../../../hooks/hook";
import {IContext} from "../../../../MiddleServerRouter";
import JDmodal from "../../../../../atoms/modal/Modal";
import BookingInfoBox, {IBookingInfoBoxProps} from "../bookingInfoBox";
import Button from "../../../../../atoms/button/Button";

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
    <JDmodal noAnimation {...modalHook}>
      <h6 className="JDtext-align-center">
        {LANG("is_selected_info_collect")}
      </h6>
      <BookingInfoBox {...props} />
      <div className="JDmodal__endSection">
        <Button
          onClick={() => {
            modalHook.closeModal();
            paymentModalHook.openModal();
          }}
          thema="primary"
          size="long"
          label={LANG("selection_information_is_correct")}
        />
      </div>
    </JDmodal>
  );
};

export default BookingInfoModal;
