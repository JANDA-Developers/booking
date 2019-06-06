/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {Fragment, useState} from "react";
import url from "url";
import {Mutation, Query} from "react-apollo";
import {Redirect, RouteComponentProps, withRouter} from "react-router";
import Reservation from "./Reservation";
import {
  ErrProtecter,
  showError,
  onCompletedMessage
} from "../../../utils/utils";
import {
  createBooking,
  createBookingVariables,
  createBookingForBooker,
  createBookingForBookerVariables
} from "../../../types/api";
import {CREATE_BOOKING, CREATE_BOOKING_FOR_BOOKING} from "../../../queries";
import {toast} from "react-toastify";
import {useModal, useRedirect} from "../../../actions/hook";

class CreatBookingMu extends Mutation<
  createBookingForBooker,
  createBookingForBookerVariables
> {}

interface IProps extends RouteComponentProps<any> {
  houseId: string;
}

// 하우스 아이디를 우선 Props를 통해서 받아야함
const ReservationWrap: React.FC<IProps> = ({match, houseId}) => {
  localStorage.setItem("hpk", match.params.publickey);

  const addSeasonHook = "";
  const confirmModalHook = useModal(false);

  // TODO
  return (
    <CreatBookingMu
      onError={showError}
      onCompleted={({CreateBookingForBooker}) => {
        if (CreateBookingForBooker.ok) {
          confirmModalHook.openModal(
            "예약이 완료되었습니다. 예약확인페이지로 이동합니다."
          );
        } else {
          toast.warn("예약실패");
          showError(CreateBookingForBooker.error);
        }
      }}
      mutation={CREATE_BOOKING_FOR_BOOKING}
    >
      {createBookingMu =>
          <Reservation
            confirmModalHook={confirmModalHook}
            createBookingMu={createBookingMu}
          />
      }
    </CreatBookingMu>
  );
};

export default ErrProtecter(ReservationWrap);

// 🚁 iFrame 에서 상위페이지를 Redirect 하는 방법 [https://help.surveygizmo.com/help/break-out-of-iframe];
