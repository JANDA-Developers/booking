/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {Mutation, ApolloConsumer} from "react-apollo";
import {withRouter, RouteComponentProps} from "react-router";
import CheckReservation from "./CheckReservation";
import {
  ErrProtecter,
  queryDataFormater,
  onCompletedMessage
} from "../../../utils/utils";
import {FIND_BOOKER} from "../../../queries";
import {findBookerVariables} from "../../../types/api";

export interface ICheckParams {
  name?: string;
  password?: string;
  phoneNumber?: string;
  houseId: string;
}

interface IProps extends RouteComponentProps<ICheckParams> {}

// 하우스 아이디를 우선 Props를 통해서 받아야함
const CheckReservationWrap: React.FC<IProps> = ({match}) => {
  const defaultBookerInfo = {
    name: match.params.name,
    password: match.params.password,
    phoneNumber: match.params.phoneNumber
  };
  return (
    <ApolloConsumer>
      {client => {
        const findBookerQr = async (bookerInfo: findBookerVariables) => {
          const {data: bookerData} = await client.query({
            query: FIND_BOOKER,
            variables: {
              name: bookerInfo.name,
              // :TODO 다음수정
              houseId: "5cb1a8abcc8ef91ca45ab02b",
              password: bookerInfo.password,
              phoneNumber: bookerInfo.phoneNumber
            }
          });

          onCompletedMessage(bookerData.FindBooker, "조회성공", "조회실패");
          const booker = queryDataFormater(
            bookerData,
            "FindBooker",
            "bookers",
            undefined
          );

          return booker;
        };
        return (
          <CheckReservation
            defaultBookerInfo={defaultBookerInfo}
            findBookerQr={findBookerQr}
          />
        );
      }}
    </ApolloConsumer>
  );
};

export default ErrProtecter(CheckReservationWrap);
