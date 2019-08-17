/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {Mutation} from "react-apollo";
import {RouteComponentProps} from "react-router";
import Reservation from "./Reservation";
import {
  ErrProtecter,
  showError,
  onCompletedMessage
} from "../../../utils/utils";
import {
  createBookingForBooker,
  createBookingForBookerVariables,
  createBooking,
  createBookingVariables
} from "../../../types/api";
import {
  CREATE_BOOKING_FOR_BOOKER,
  GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM,
  CREATE_BOOKING
} from "../../../queries";
import {toast} from "react-toastify";
import {useModal, IUseModal} from "../../../actions/hook";
import {getOperationName} from "apollo-link";
import {IAssigTimelineUtils} from "../../middleServer/assig/components/assigIntrerface";
import JDIcon, {IconSize} from "../../../atoms/icons/Icons";
import JDanimation, {Animation} from "../../../atoms/animation/Animations";
import JDmodal from "../../../atoms/modal/Modal";

class CreatBookingMuForBooker extends Mutation<
  createBookingForBooker,
  createBookingForBookerVariables
> {}
class CreatBookingMuForHost extends Mutation<
  createBooking,
  createBookingVariables
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
    <CreatBookingMuForBooker
      refetchQueries={[
        getOperationName(GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM) || ""
      ]}
      awaitRefetchQueries
      onCompleted={({CreateBookingForBooker}) => {
        if (CreateBookingForBooker.ok) {
          confirmModalHook.openModal({
            txt: (
              <div>
                <div className="JDstandard-margin-bottom">
                  예약이 완료되었습니다.
                  <br />
                  예약확인페이지로 이동합니다.
                </div>
                <JDanimation animation={[Animation.tada]}>
                  <JDIcon
                    color="positive"
                    size={IconSize.SUPER_LARGE}
                    icon="circleCheckIn"
                  ></JDIcon>
                </JDanimation>
              </div>
            )
          });
        } else {
          toast.warn("예약실패");
        }
      }}
      mutation={CREATE_BOOKING_FOR_BOOKER}
    >
      {(createBookingForBookerMu, {loading: createLoading}) => (
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
            toast.success("예약생성완료");

            // 방배정 화면일때 함수 👿 이부분을 나중에 컬백 함수 받는곳 파서 안에넣자.
            assigUtils &&
              CreateBooking.booking &&
              assigUtils.hilightGuestBlock({
                bookingId: CreateBooking.booking._id
              });

            // next resvConfirmCallBackFunc
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
                createBookingMu={
                  isAdmin ? createBookingMu : createBookingForBookerMu
                }
                createLoading={createLoading || createBookingLoading}
              />
            </div>
          )}
        </CreatBookingMuForHost>
      )}
    </CreatBookingMuForBooker>
  );
};

export default ErrProtecter(ReservationWrap);

// 🚁 iFrame 에서 상위페이지를 Redirect 하는 방법 [https://help.surveygizmo.com/help/break-out-of-iframe];

// ⭐️⭐️ ⭐️⭐️ ⭐️⭐️ ⭐️⭐️ ⭐️⭐️  IFRAME 코드 IFRAME 코드 IFRAME 코드
{
  /* <iframe id="JD_RESV_APP" style="border:none;" width="100%" height="1500px" scrolling="no" title="JDqna" src="https://app.stayjanda.com/#/outpage/reservation/하우스키"></iframe> */
}
