import React from "react";
import {IUseModal} from "../../../../../actions/hook";
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
      <h6 className="JDtext-align-center">선택하신 정보가 맞나요?</h6>
      <BookingInfoBox {...props} />
      <div className="JDmodal__endSection">
        <Button
          onClick={() => {
            modalHook.closeModal();
            paymentModalHook.openModal();
          }}
          thema="primary"
          size="long"
          label="선택 정보가 맞습니다."
        />
      </div>
    </JDmodal>
  );
};

export default BookingInfoModal;
