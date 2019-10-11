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
  startBookingVariables,
  startBookingForPublic,
  startBookingForPublicVariables
} from "../../../types/api";
import {
  GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM,
  START_BOOKING,
  START_BOOKING_FOR_PUBLIC
} from "../../../queries";
import {useModal, IUseModal} from "../../../hooks/hook";
import {getOperationName} from "apollo-link";
import {isInIfram} from "../../../utils/isInIfram";
import {IContext} from "../../MiddleServerRouter";
import {useMutation} from "@apollo/react-hooks";
import client from "../../../apolloClient";

class StartBooking extends Mutation<startBooking, startBookingVariables> {}

export interface IReservationWrapProps {
  publicKey?: string;
  // context가 존재하면 Host가 한 예약
  context?: IContext;
  modalHook?: IUseModal;
  callBackCreateBookingMu?: (CreateBooking: startBooking_StartBooking) => void;
}

// 하우스 아이디를 우선 Props를 통해서 받아야함
const ReservationWrap: React.FC<
  IReservationWrapProps & RouteComponentProps<any>
> = ({match, publicKey, context, modalHook, callBackCreateBookingMu}) => {
  // .react-select__input

  const startBookingCallBackFn = (result: any) => {
    onCompletedMessage(result, "예약 생성 완료", "예약 생성 실패");
    modalHook && modalHook.closeModal();
    callBackCreateBookingMu && callBackCreateBookingMu(result);
  };

  const [startBookingForPublicMu, {loading: startBookingLoading}] = useMutation<
    startBookingForPublic,
    startBookingForPublicVariables
  >(START_BOOKING_FOR_PUBLIC, {
    client,
    awaitRefetchQueries: true,
    onCompleted: ({StartBookingForPublic}) => {
      startBookingCallBackFn(StartBookingForPublic);
    }
  });

  const [startBookingMu, {loading: startBookingL}] = useMutation<
    startBooking,
    startBookingVariables
  >(START_BOOKING, {
    client,
    refetchQueries: [
      getOperationName(GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM) || ""
    ],
    awaitRefetchQueries: true,
    onCompleted: ({StartBooking}) => {
      startBookingCallBackFn(StartBooking);
    }
  });

  sessionStorage.setItem("hpk", publicKey || match.params.publickey);
  sessionStorage.setItem("hpk33", "33");

  const confirmModalHook = useModal(false);

  if (isInIfram) {
    $("html").addClass("inIframe");
  }

  return (
    <div>
      <Reservation
        context={context}
        confirmModalHook={confirmModalHook}
        startBookingForPublicMu={startBookingForPublicMu}
        startBookingMu={startBookingMu}
        createLoading={startBookingLoading}
      />
    </div>
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
