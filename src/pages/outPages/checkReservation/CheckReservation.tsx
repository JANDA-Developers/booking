import React, {useState} from "react";
import ErrProtecter from "../../../utils/errProtect";
import "./CheckReservation.scss";
import {useQuery} from "@apollo/react-hooks";
import {
  getBookingForPublic,
  getBookingForPublicVariables
} from "../../../types/api";
import {queryDataFormater, s4} from "../../../utils/utils";
import {GET_BOOKING_FOR_PUBLIC} from "../../../queries";
import {RouteComponentProps} from "react-router";
import client from "../../../apolloClient";
import CheckView from "./CheckView";
import JDmodal from "../../../atoms/modal/Modal";
import JDanimation, {Animation} from "../../../atoms/animation/Animations";
import JDIcon, {IconSize} from "../../../atoms/icons/Icons";
import {useModal} from "../../../hooks/hook";
export interface ISetBookingInfo
  extends React.Dispatch<React.SetStateAction<any>> {}

export interface ICheckParams {
  publickey: string;
  transId?: string;
}

interface IProps extends RouteComponentProps<ICheckParams> {}

// 20190917083341-5d809a64a5ea6b187811b7e5-ebfe3982
const SetPrice: React.SFC<IProps> = ({
  match: {
    params: {transId, publickey}
  }
}) => {
  sessionStorage.setItem("hpk", publickey);
  const comeplteModalHook = useModal(false);
  const isFirstSender = useState(true);
  const {data, refetch} = useQuery<
    getBookingForPublic,
    getBookingForPublicVariables
  >(GET_BOOKING_FOR_PUBLIC, {
    client: client,
    skip: !transId,
    variables: {
      transactionId: transId
    }
  });

  const booking = queryDataFormater(
    data,
    "GetBookingForPublic",
    "booking",
    undefined
  );

  if (booking && transId && isFirstSender[0]) {
    comeplteModalHook.openModal();
    isFirstSender[1](false);
  }

  return (
    <div>
      <CheckView key={s4()} refetch={refetch} data={booking} />
      <JDmodal center {...comeplteModalHook}>
        <div>
          <div className="JDstandard-margin-bottom">예약이 완료되었습니다.</div>
          <JDanimation animation={[Animation.tada]}>
            <JDIcon
              color="positive"
              size={IconSize.SUPER_LARGE}
              icon="circleCheckIn"
            ></JDIcon>
          </JDanimation>
        </div>
      </JDmodal>
    </div>
  );
};

export default ErrProtecter(SetPrice);
