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
import ip from "ip";
import Button from "../../../atoms/button/Button";
import crypto from "crypto";

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

const doSubmit = () => {
  console.log("!!!!!!!!");
  // @ts-ignore
  document.getElementById("nicePay").submit();
};

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

  const openNiceModal = () => {
    const form = document.createElement("form");
    form.setAttribute("charset", "UTF-8");
    form.setAttribute("method", "Post"); //Post 방식
    form.setAttribute("action", process.env.REACT_APP_API_NICE_PAY || ""); //요청 보낼 주소
    form.setAttribute("id", "nicePay"); //요청 보낼 주소
    form.setAttribute("name", "payForm"); //요청 보낼 주소

    let hiddenField = document.createElement("input");

    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "PayMethod");
    hiddenField.setAttribute("value", "CARD");
    form.appendChild(hiddenField);

    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "GoodsName");
    hiddenField.setAttribute("value", "테스트 객실");
    form.appendChild(hiddenField);

    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "GoodsCnt");
    hiddenField.setAttribute("value", "1");
    form.appendChild(hiddenField);

    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "Amt");
    hiddenField.setAttribute("value", "1000");
    form.appendChild(hiddenField);

    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "BuyerName");
    hiddenField.setAttribute("value", "JANDA");
    form.appendChild(hiddenField);

    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "BuyerTel");
    hiddenField.setAttribute("value", "01081208523");
    form.appendChild(hiddenField);

    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "Moid");
    hiddenField.setAttribute("value", "mnoid1234567890");
    form.appendChild(hiddenField);

    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "MID");
    hiddenField.setAttribute("value", "nicepay00m");
    form.appendChild(hiddenField);

    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "UserIP");
    hiddenField.setAttribute("value", ip.address());
    form.appendChild(hiddenField);

    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "UserIP");
    hiddenField.setAttribute("value", ip.address());
    form.appendChild(hiddenField);

    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "EncodeParameters");
    hiddenField.setAttribute("value", "");
    form.appendChild(hiddenField);

    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "EdiDate");
    hiddenField.setAttribute("value", "20190818044115");
    form.appendChild(hiddenField);

    const time = "20190818044115";
    const merchantID = "nicepay00m";
    const merchantKey =
      "EYzu8jGGMfqaDEp76gSckuvnaHHu+bC4opsSN6lHv3b2lurNYkVXrZ7Z1AoqQnXI3eLuaUFyoRNC6FkrzVjceg==";
    const price = 1000;
    const hashed = crypto
      .createHash("sha256")
      .update(`${time}${merchantID}${price}${merchantKey}`)
      .digest("hex");

    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "EncryptData");
    hiddenField.setAttribute("value", hashed);
    form.appendChild(hiddenField);

    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "TrKey");
    hiddenField.setAttribute("value", "");
    form.appendChild(hiddenField);

    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "SocketYN");
    hiddenField.setAttribute("value", "Y");
    form.appendChild(hiddenField);

    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "VbankExpDate");
    hiddenField.setAttribute("id", "vExp");
    form.appendChild(hiddenField);

    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "BuyerEmail");
    hiddenField.setAttribute("value", "");
    form.appendChild(hiddenField);

    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "TransType");
    hiddenField.setAttribute("value", "0");
    form.appendChild(hiddenField);

    hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "GoodsCl");
    hiddenField.setAttribute("value", "1");
    form.appendChild(hiddenField);

    document.body.appendChild(form);

    // @ts-ignore
    window.nicepaySubmit = doSubmit;
    // @ts-ignore
    window.nicepayClose = doSubmit;

    // @ts-ignore
    window.goPay(form);
  };

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
              {/* <Button
                label="결제테스트"
                onClick={() => {
                  openNiceModal();
                }}
              /> */}
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
