import React, { useState, useEffect } from "react";
import CheckTable from "./CheckTable";
import {
  getBookingForPublic_GetBookingForPublic_booking,
  getBookingForPublicVariables,
  getBookingForPublic,
  getHouseForPublic_GetHouseForPublic_house,
  searchBooking,
  searchBookingVariables,
  searchBooking_SearchBooking_data,
} from "../../../types/api";
import Button from "../../../atoms/button/Button";
import { LANG } from "../../../hooks/hook";
import { NumForm } from "./component/NumForm";
import { InfoForm, TSearchInput } from "./component/InfoForm";
import client from "../../../apollo/apolloClient";
import { SEARCH_BOOKING, GET_BOOKING_FOR_PUBLIC } from "../../../apollo/queries";
import { printRecipt } from "../../../utils/printRecipt";
import { onCompletedMessage } from "@janda-com/front";


interface Iprops {
  houseData?: getHouseForPublic_GetHouseForPublic_house;
}

const CheckReservation: React.FC<Iprops> = ({
  houseData
}) => {
  const [data, setData] = useState<searchBooking_SearchBooking_data | getBookingForPublic_GetBookingForPublic_booking>();
  const [mode, setMode] = useState<"byNum" | "byInfo">("byNum");

  const handleInfoSearch = async (prop: TSearchInput) => {
    const { name, password, phoneNumber } = prop;
    const result = await client.query<getBookingForPublic, getBookingForPublicVariables>({
      query: GET_BOOKING_FOR_PUBLIC,
      variables: {
        param: {
          name,
          password,
          phoneNumber
        },
        skip: false,
      }
    })

    const { GetBookingForPublic } = result.data;
    const { booking } = GetBookingForPublic;

    onCompletedMessage(
      GetBookingForPublic,
      LANG("reference_success"),
      LANG("reference_fail")
    );

    if (booking)
      setData(booking);
  }

  const handleNumSearch = async (bn: string) => {
    const result = await client.query<searchBooking, searchBookingVariables>({
      query: SEARCH_BOOKING, variables: {
        bookingNum: bn
      }
    })
    const { SearchBooking } = result.data;
    onCompletedMessage(SearchBooking,
      LANG("reference_success"),
      LANG("reference_fail"));
    const { data } = SearchBooking;
    if (data)
      setData(data)
  }

  const isNumMode = mode === "byNum";

  return (
    <div id="JDreservation" className="JDreservation">
      <h6>{LANG("reservation_information")}</h6>
      <Button onClick={() => {
        setMode("byNum")
      }} thema={isNumMode ? "primary" : undefined} label="예약번호로 검색" />
      <Button onClick={() => {
        setMode("byInfo")
      }} thema={isNumMode ? undefined : "primary"} label="예약정보로 검색" />
      {isNumMode ? <NumForm handleSearch={handleNumSearch} />
        : <InfoForm onSearch={handleInfoSearch} />
      }

      <h6>{LANG("reservation_confirm")}</h6>
      {/* {data?.payment.cardInfo && (
        <Button
          onClick={() => {
            if (data && houseData) printRecipt(data, houseData);
          }}
          label={LANG("bill_print")}
        />
      )} */}

      <CheckTable tableData={data ? [data] : undefined} />
    </div>
  );
};

export default CheckReservation;
