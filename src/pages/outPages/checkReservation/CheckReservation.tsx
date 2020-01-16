import React, { useState, useEffect } from "react";
import CheckTable from "./CheckTable";
import { toast } from "react-toastify";
import {
  getBookingForPublic_GetBookingForPublic_booking,
  getBookingForPublicVariables,
  getBookingForPublic,
  getHouseForPublic_GetHouseForPublic_house
} from "../../../types/api";
import InputText from "../../../atoms/forms/inputText/InputText";
import Button from "../../../atoms/button/Button";
import { ApolloQueryResult } from "apollo-client";
import { LANG } from "../../../hooks/hook";
import CardRecipt from "../../../docs/print/CreditCardReceipt";
import ReactDOMServer from "react-dom/server";
import { FAVI_URL } from "../../../types/const";
import { getRoomSelectInfo } from "../../../utils/typeChanger";
import $ from "jquery";

interface Iprops {
  loading: boolean;
  houseData?: getHouseForPublic_GetHouseForPublic_house;
  data: getBookingForPublic_GetBookingForPublic_booking | null | undefined;
  refetch: (
    variables?: getBookingForPublicVariables | undefined
  ) => Promise<ApolloQueryResult<getBookingForPublic>>;
}

const CheckReservation: React.FC<Iprops> = ({
  data,
  refetch,
  loading,
  houseData
}) => {
  const { name, password, phoneNumber } = data || {
    name: "",
    password: "",
    phoneNumber: ""
  };

  const updateInput = {
    name,
    password: password || "",
    phoneNumber
  };

  const [searchInfo, setSearchInfo] = useState(updateInput);

  useEffect(() => {
    setSearchInfo(updateInput);
  }, []);

  const printRecipt = (
    data: getBookingForPublic_GetBookingForPublic_booking
  ) => {
    const w = window.open("", "JD-receipt");
    if (!w || !houseData) return;
    const {
      location: { address, addressDetail },
      name: houseName,
      phoneNumber: houseContact
    } = houseData;
    const { name, payment, bookingNum, roomTypes, guests } = data;
    const { payMethod, status, totalPrice, type } = payment;
    if (!roomTypes) return;
    const selectInfoes = getRoomSelectInfo(guests, roomTypes);
    const stringBookInfo = selectInfoes
      .map(
        info => `
        ${info.roomTypeName} 
        ${info.count.female}
        ${LANG("FEMALE")}
        ${info.count.male}
        ${LANG("MALE")}
        ${LANG("room")}
        ${info.count.roomCount}
        ${LANG("unit")}`
      )
      .join(" | ");

    w.document.title = "JD-receipt";
    w.document.body.innerHTML = ReactDOMServer.renderToStaticMarkup(
      CardRecipt({
        resvInfo: {
          bookingNum: bookingNum,
          bookerName: name,
          bookInfo: stringBookInfo
        },
        payInfo: {
          payMethod,
          payStatus: status,
          payDate: "",
          cardName: "",
          cardNumber: "",
          price: totalPrice,
          TAX: "",
          VAT: ""
        },
        hostInfo: {
          address: address + addressDetail,
          houseName: name,
          bNumber: "",
          hostName: "",
          houseContact,
          hompage: ""
        }
      })
    );
    $("head", w.document).append(`<link rel="icon" href=${FAVI_URL}>`);
  };

  const validater = () => {
    if (!searchInfo.name) {
      toast.warn(LANG("input_your_name_please"));
      return false;
    }
    if (!searchInfo.phoneNumber) {
      toast.warn(LANG("please_enter_your_phone_number"));
      return false;
    }
    if (!searchInfo.password) {
      toast.warn("input_your_password_please");
      return false;
    }
    return true;
  };

  return (
    <div id="JDreservation" className="JDreservation">
      <h6>{LANG("reservation_information")}</h6>
      <div className="flex-grid-grow">
        <InputText
          onChange={value => setSearchInfo({ ...searchInfo, name: value })}
          value={searchInfo.name}
          label={LANG("name")}
        />
        <InputText
          onChange={value =>
            setSearchInfo({ ...searchInfo, phoneNumber: value })
          }
          hyphen
          value={searchInfo.phoneNumber}
          label={LANG("contact")}
        />
        <InputText
          onChange={value => setSearchInfo({ ...searchInfo, password: value })}
          label={LANG("password")}
          value={searchInfo.password}
          type="password"
        />
      </div>
      <div className="JDtext-align-center">
        <Button
          onClick={() => {
            if (validater()) {
              refetch({
                param: {
                  bookingNum: undefined,
                  name: searchInfo.name,
                  password: searchInfo.password,
                  phoneNumber: searchInfo.phoneNumber
                },
                // @ts-ignore
                skip: loading
              });
            }
          }}
          label={LANG("reservation_lookup")}
        />
      </div>
      <h6>{LANG("reservation_confirm")}</h6>
      <Button
        onClick={() => {
          if (data) printRecipt(data);
        }}
        label={LANG("bill_print")}
      />
      <CheckTable tableData={data ? [data] : undefined} />
    </div>
  );
};

export default CheckReservation;
