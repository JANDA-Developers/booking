/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Mutation, ApolloConsumer } from "react-apollo";
import { withRouter, RouteComponentProps } from "react-router";
import CheckReservation from "./CheckReservation";
import {
    ErrProtecter,
    queryDataFormater,
    onCompletedMessage
} from "../../../utils/utils";
import { FIND_BOOKING } from "../../../queries";
import { findBookingVariables } from "../../../types/api";

export interface ICheckParams {
    name?: string;
    password?: string;
    phoneNumber?: string;
    houseId: string;
}

interface IProps extends RouteComponentProps<ICheckParams> {}

// 하우스 아이디를 우선 Props를 통해서 받아야함
const CheckReservationWrap: React.FC<IProps> = ({ match }) => {
    const defaultBookingInfo = {
        name: match.params.name,
        password: match.params.password,
        phoneNumber: match.params.phoneNumber
    };
    return (
        <ApolloConsumer>
            {client => {
                const findBookingQr = async (
                    bookingInfo: findBookingVariables
                ) => {
                    const { data: bookingData } = await client.query({
                        query: FIND_BOOKING,
                        variables: {
                            name: bookingInfo.name,
                            // :TODO 다음수정
                            password: bookingInfo.password,
                            phoneNumber: bookingInfo.phoneNumber
                        }
                    });

                    onCompletedMessage(
                        bookingData.FindBooking,
                        "조회성공",
                        "조회실패"
                    );
                    const booking = queryDataFormater(
                        bookingData,
                        "FindBookingForBooker",
                        "bookings",
                        undefined
                    );

                    return booking;
                };
                return (
                    <CheckReservation
                        defaultBookingInfo={defaultBookingInfo}
                        findBookingQr={findBookingQr}
                    />
                );
            }}
        </ApolloConsumer>
    );
};

export default ErrProtecter(CheckReservationWrap);
