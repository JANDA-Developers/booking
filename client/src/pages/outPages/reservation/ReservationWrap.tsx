/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {Mutation} from "react-apollo";
import {RouteComponentProps} from "react-router";
import Reservation from "./Reservation";
import $ from "jquery";
import {onCompletedMessage} from "../../../utils/utils";
import {
  startBooking_StartBooking,
  startBooking,
  startBookingVariables
} from "../../../types/api";
import {
  GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM,
  START_BOOKING
} from "../../../queries";
import {useModal, IUseModal} from "../../../hooks/hook";
import {getOperationName} from "apollo-link";
import {isInIfram} from "../../../utils/isInIfram";

class StartBooking extends Mutation<startBooking, startBookingVariables> {}

export interface IReservationWrapProps {
  houseId: string;
  publicKey?: string;
  isHost?: boolean;
  modalHook?: IUseModal;
  callBackCreateBookingMu?: (CreateBooking: startBooking_StartBooking) => void;
}

// 하우스 아이디를 우선 Props를 통해서 받아야함
const ReservationWrap: React.FC<
  IReservationWrapProps & RouteComponentProps<any>
> = ({
  match,
  publicKey,
  isHost,
  houseId,
  modalHook,
  callBackCreateBookingMu
}) => {
  // .react-select__input

  sessionStorage.setItem("hpk", publicKey || match.params.publickey);
  sessionStorage.setItem("hpk33", "33");

  const confirmModalHook = useModal(false);

  if (isInIfram) {
    $("html").addClass("inIframe");
  }

  return (
    <StartBooking
      refetchQueries={[
        getOperationName(GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM) || ""
      ]}
      onCompleted={({StartBooking}) => {
        onCompletedMessage(StartBooking, "예약 생성 완료", "예약 생성 실패");

        modalHook && modalHook.closeModal();

        callBackCreateBookingMu && callBackCreateBookingMu(StartBooking);
      }}
      awaitRefetchQueries
      mutation={START_BOOKING}
    >
      {(startBookingMu, {loading: startBookingLoading}) => (
        <div>
          <Reservation
            houseId={houseId}
            isHost={isHost || false}
            confirmModalHook={confirmModalHook}
            startBookingMu={startBookingMu}
            createLoading={startBookingLoading}
          />
        </div>
      )}
    </StartBooking>
  );
};

export default ReservationWrap;

// 🚁 iFrame 에서 상위페이지를 Redirect 하는 방법 [https://help.surveygizmo.com/help/break-out-of-iframe];

// ⭐️⭐️ ⭐️⭐️ ⭐️⭐️ ⭐️⭐️ ⭐️⭐️  IFRAME 코드 IFRAME 코드 IFRAME 코드
// {
/* 
<iframe id="JD_RESV_APP" style="border:none;min-height:400px" scrolling="no" title="JDqna" src="http://localhost:3000/#/outpage/reservation/c61bf04b-446b-7907-54d5-d509147ca39e" width="100%" height="1500px"></iframe>

<script>
window.addEventListener('message', function(e) {
  console.log(e.data); 
  if(e.data.height) {
    jQuery('#JD_RESV_APP').height(e.data.height);
 }
})
</script>
  */
// }
