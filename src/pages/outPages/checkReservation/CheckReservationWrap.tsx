import React, { useState } from "react";
import ErrProtecter from "../../../utils/errProtect";
import "./CheckReservation.scss";
import { useQuery } from "@apollo/react-hooks";
import {
  getBookingForPublic,
  getBookingForPublicVariables
} from "../../../types/api";
import {
  queryDataFormater,
  s4,
  onCompletedMessage
} from "../../../utils/utils";
import { GET_BOOKING_FOR_PUBLIC } from "../../../apollo/queries";
import { RouteComponentProps } from "react-router-dom";
import client from "../../../apollo/apolloClient";
import CheckReservation from "./CheckReservation";
import JDmodal from "../../../atoms/modal/Modal";
import { useModal, LANG } from "../../../hooks/hook";
import CompleteCircle from "../../../components/completeCircle/CompleteCircle";
export interface ISetBookingInfo
  extends React.Dispatch<React.SetStateAction<any>> {}

export interface ICheckParams {
  publickey: string;
  transId?: string;
}

interface IProps extends RouteComponentProps<ICheckParams> {}

const CheckReservationWrap: React.FC<IProps> = ({
  match: {
    params: { transId, publickey }
  }
}) => {
  sessionStorage.setItem("hpk", publickey);
  const comeplteModalHook = useModal(false);
  const isFirstSender = useState(true);
  const { data, refetch, loading } = useQuery<
    getBookingForPublic,
    getBookingForPublicVariables
  >(GET_BOOKING_FOR_PUBLIC, {
    client: client,
    fetchPolicy: "network-only",
    variables: {
      transactionId: transId,
      // @ts-ignore
      skip: !transId
    },
    onCompleted: ({ GetBookingForPublic }) => {
      onCompletedMessage(
        GetBookingForPublic,
        LANG("reference_sucess"),
        LANG("reference_fail")
      );
    }
  });

  const booking = queryDataFormater(
    data,
    "GetBookingForPublic",
    "booking",
    undefined
  );

  // 예약완료 메세지 모달 오픈
  if (booking && transId && isFirstSender[0]) {
    comeplteModalHook.openModal();
    isFirstSender[1](false);
  }
  return (
    <div>
      {/* 예약확인 관련된 뷰 */}
      <CheckReservation refetch={refetch} data={booking} loading={loading} />
      <JDmodal center {...comeplteModalHook}>
        <div>
          <div className="JDstandard-margin-bottom">
            {LANG("reservation_is_completed")}
          </div>
          {/* 예약완료 에니메이션 */}
          <CompleteCircle />
        </div>
      </JDmodal>
    </div>
  );
};

export default ErrProtecter(CheckReservationWrap);
