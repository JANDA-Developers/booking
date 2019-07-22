import React from "react";
import {withRouter} from "react-router";
import {IUseModal} from "../../actions/hook";
import ReservationWrap from "../../pages/outPages/reservation/ReservationWrap";
import JDmodal from "../../atoms/modal/Modal";
import {any} from "prop-types";
import "./ReservationModal.scss";
import {IAssigTimelineUtils} from "../../pages/middleServer/assig/components/assigIntrerface";

interface IProps {
  modalHook: IUseModal;
  pulbicKey?: string;
  houseId: string;
  ts_ignore?: any;
  assigUtils?: IAssigTimelineUtils;
}

const ReservationModal: React.FC<IProps> = ({
  modalHook,
  pulbicKey,
  houseId,
  ts_ignore,
  assigUtils
}) => (
  <JDmodal className="reservationModal" {...modalHook}>
    <ReservationWrap
      modalHook={modalHook}
      isAdmin={true}
      {...ts_ignore}
      publicKey={pulbicKey}
      houseId={houseId}
      assigUtils={assigUtils}
    />
  </JDmodal>
);

export default ReservationModal;
