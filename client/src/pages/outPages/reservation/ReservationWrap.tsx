/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {Mutation} from "react-apollo";
import {RouteComponentProps, withRouter} from "react-router";
import Reservation from "./Reservation";
import {
  ErrProtecter,
  showError,
  onCompletedMessage
} from "../../../utils/utils";
import {
  createBooking,
  createBookingVariables,
  startBookingForPublic,
  startBookingForPublicVariables,
  createBooking_CreateBooking
} from "../../../types/api";
import {
  GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM,
  CREATE_BOOKING,
  START_BOOKING_FOR_FOR_PUBLIC
} from "../../../queries";
import {toast} from "react-toastify";
import {useModal, IUseModal} from "../../../actions/hook";
import {getOperationName} from "apollo-link";
import {IAssigTimelineUtils} from "../../middleServer/assig/components/assigIntrerface";
import JDIcon, {IconSize} from "../../../atoms/icons/Icons";
import JDanimation, {Animation} from "../../../atoms/animation/Animations";
import {IReservationModalProps} from "../../../components/reservationModala/ReservationModal";

class StartBookingMuForPublic extends Mutation<
  startBookingForPublic,
  startBookingForPublicVariables
> {}
class CreatBookingMuForHost extends Mutation<
  createBooking,
  createBookingVariables
> {}

export interface IReservationWrapProps {
  houseId: string;
  publicKey?: string;
  isAdmin?: boolean;
  modalHook?: IUseModal;
  callBackCreateBookingMu?: (
    CreateBooking: createBooking_CreateBooking
  ) => void;
}

// 하우스 아이디를 우선 Props를 통해서 받아야함
const ReservationWrap: React.FC<
  IReservationWrapProps & RouteComponentProps<any>
> = ({
  match,
  publicKey,
  isAdmin,
  houseId,
  modalHook,
  callBackCreateBookingMu
}) => {
  sessionStorage.setItem("hpk", publicKey || match.params.publickey);
  sessionStorage.setItem("hpk33", "33");

  const addSeasonHook = "";
  const confirmModalHook = useModal(false);

  return (
    <StartBookingMuForPublic
      refetchQueries={[
        getOperationName(GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM) || ""
      ]}
      awaitRefetchQueries
      mutation={START_BOOKING_FOR_FOR_PUBLIC}
    >
      {(startBookingForPublicMu, {loading: createLoading}) => (
        // 호스트용
        <CreatBookingMuForHost
          mutation={CREATE_BOOKING}
          onCompleted={({CreateBooking}) => {
            onCompletedMessage(
              CreateBooking,
              "예약 생성 완료",
              "예약 생성 실패"
            );

            modalHook && modalHook.closeModal();

            callBackCreateBookingMu && callBackCreateBookingMu(CreateBooking);
          }}
          refetchQueries={[
            getOperationName(GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM) || ""
          ]}
        >
          {(createBookingMu, {loading: createBookingLoading}) => (
            <div>
              <Reservation
                houseId={houseId}
                isAdmin={isAdmin || false}
                confirmModalHook={confirmModalHook}
                createBookingMu={createBookingMu}
                startBookingForPublicMu={startBookingForPublicMu}
                createLoading={createLoading || createBookingLoading}
              />
            </div>
          )}
        </CreatBookingMuForHost>
      )}
    </StartBookingMuForPublic>
  );
};

export default ReservationWrap;

// 🚁 iFrame 에서 상위페이지를 Redirect 하는 방법 [https://help.surveygizmo.com/help/break-out-of-iframe];

// ⭐️⭐️ ⭐️⭐️ ⭐️⭐️ ⭐️⭐️ ⭐️⭐️  IFRAME 코드 IFRAME 코드 IFRAME 코드
{
  /* <iframe id="JD_RESV_APP" style="border:none;" width="100%" height="1500px" scrolling="no" title="JDqna" src="https://localhost:3000/#/outpage/reservation/하우스키"></iframe> */
}
