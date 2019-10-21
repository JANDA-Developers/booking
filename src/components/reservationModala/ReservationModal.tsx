import React from "react";
import {IUseModal} from "../../hooks/hook";
import ReservationWrap, {
  IReservationWrapProps
} from "../../pages/outPages/reservation/ReservationWrap";
import JDmodal from "../../atoms/modal/Modal";
import "./ReservationModal.scss";
import {IContext} from "../../pages/MiddleServerRouter";

export interface IReservationModalProps extends IReservationWrapProps {
  modalHook: IUseModal;
  context: IContext;
}

const ReservationModal: React.FC<IReservationModalProps> = ({
  modalHook,
  publicKey,
  context,
  ...props
}) => {
  const {match, location, history} = context;

  return (
    <JDmodal className="reservationModal" {...modalHook}>
      <ReservationWrap
        match={match}
        history={history}
        location={location}
        modalHook={modalHook}
        publicKey={publicKey}
        context={context}
        {...props}
      />
    </JDmodal>
  );
};

export default ReservationModal;