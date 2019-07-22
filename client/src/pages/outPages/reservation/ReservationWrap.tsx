/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {Mutation} from "react-apollo";
import {RouteComponentProps} from "react-router";
import Reservation from "./Reservation";
import {ErrProtecter, showError} from "../../../utils/utils";
import {
  createBookingForBooker,
  createBookingForBookerVariables
} from "../../../types/api";
import {
  CREATE_BOOKING_FOR_BOOKER,
  GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM
} from "../../../queries";
import {toast} from "react-toastify";
import {useModal, IUseModal} from "../../../actions/hook";
import {getOperationName} from "apollo-link";
import {IAssigTimelineUtils} from "../../middleServer/assig/components/assigIntrerface";

class CreatBookingMu extends Mutation<
  createBookingForBooker,
  createBookingForBookerVariables
> {}

interface IProps extends RouteComponentProps<any> {
  houseId: string;
  publicKey?: string;
  isAdmin?: boolean;
  modalHook?: IUseModal;
  assigUtils?: IAssigTimelineUtils;
}

// 하우스 아이디를 우선 Props를 통해서 받아야함
const ReservationWrap: React.FC<IProps> = ({
  match,
  publicKey,
  isAdmin,
  houseId,
  modalHook,
  assigUtils
}) => {
  localStorage.setItem("hpk", publicKey || match.params.publickey);

  const addSeasonHook = "";
  const confirmModalHook = useModal(false);

  return (
    <CreatBookingMu
      refetchQueries={[
        getOperationName(GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM) || ""
      ]}
      onError={showError}
      awaitRefetchQueries
      onCompleted={({CreateBookingForBooker}) => {
        if (CreateBookingForBooker.ok) {
          if (isAdmin) {
            modalHook && modalHook.closeModal();
            toast.success("예약생성완료");
            assigUtils &&
              CreateBookingForBooker.booking &&
              assigUtils.hilightGuestBlock({
                bookingId: CreateBookingForBooker.booking._id
              });
          } else {
            confirmModalHook.openModal({
              txt: "예약이 완료되었습니다. 예약확인페이지로 이동합니다."
            });
          }
        } else {
          toast.warn("예약실패");
          showError(CreateBookingForBooker.error);
        }
      }}
      mutation={CREATE_BOOKING_FOR_BOOKER}
    >
      {createBookingMu => (
        <Reservation
          isAdmin={isAdmin || false}
          confirmModalHook={confirmModalHook}
          createBookingMu={createBookingMu}
        />
      )}
    </CreatBookingMu>
  );
};

export default ErrProtecter(ReservationWrap);

// 🚁 iFrame 에서 상위페이지를 Redirect 하는 방법 [https://help.surveygizmo.com/help/break-out-of-iframe];
