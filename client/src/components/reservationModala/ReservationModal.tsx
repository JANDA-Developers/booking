import React from "react";
import {withRouter} from "react-router";
import {IUseModal} from "../../actions/hook";
import ReservationWrap, {
  IReservationWrapProps
} from "../../pages/outPages/reservation/ReservationWrap";
import JDmodal from "../../atoms/modal/Modal";
import {any} from "prop-types";
import "./ReservationModal.scss";
import {IAssigTimelineUtils} from "../../pages/middleServer/assig/components/assigIntrerface";
import {IContext} from "../../pages/MiddleServerRouter";

export interface IReservationModalProps extends IReservationWrapProps {
  modalHook: IUseModal;
  context: IContext;
}

const ReservationModal: React.FC<IReservationModalProps> = ({
  modalHook,
  publicKey,
  houseId,
  context: {match, location, history},
  ...props
}) => (
  <JDmodal className="reservationModal" {...modalHook}>
    <ReservationWrap
      match={match}
      history={history}
      location={location}
      modalHook={modalHook}
      isAdmin={true}
      publicKey={publicKey}
      houseId={houseId}
      {...props}
    />
  </JDmodal>
);

export default ReservationModal;
