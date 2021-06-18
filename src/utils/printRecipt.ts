import {
  getBookingForPublic_GetBookingForPublic_booking,
  getHouseForPublic_GetHouseForPublic_house
} from "../types/api";
import { getRoomSelectInfo, getRoomSelectString } from "./typeChanger";
import CardRecipt from "../docs/print/CreditCardReceipt";
import { openForPrint } from "./openForPrint";
import { TNiceinfo } from "../components/bookingModal/components/PayInfo";
import dayjs from "dayjs";
export const printRecipt = (
  data: getBookingForPublic_GetBookingForPublic_booking,
  houseData: getHouseForPublic_GetHouseForPublic_house,
  niceInfo: TNiceinfo[]
) => {
  if (!houseData) return;
  const {
    location: { address, addressDetail },
    name: houseName,
    phoneNumber: houseContact
  } = houseData;
  const { name, payment, bookingNum, roomTypes, guests } = data;
  const {
    payMethod,
    status,
    totalPrice,
    type,
    goodsVat,
    supplyAmt,
    cardInfo,
    tid,
    refundedPrice
  } = payment;

  if (!cardInfo) return;
  const { cardName, cardNo, authDate } = cardInfo;
  if (!roomTypes) return;
  const selectInfoes = getRoomSelectInfo(guests, roomTypes);
  const stringBookInfo = getRoomSelectString(selectInfoes);

  const approvalNo = niceInfo[0]?.approvalNo;
  const refundPrice = niceInfo[0]?.refundedPrice.toString();
  const cancelMessage = niceInfo[0]?.cancelMessage || "";
  const cancelStatus = niceInfo[0]?.refundStatus;
  const cancelDate = niceInfo[0]?.cancelDate;
  const markUp = CardRecipt({
    resvInfo: {
      bookingNum: bookingNum,
      bookerName: name,
      bookInfo: stringBookInfo
    },
    payInfo: {
      payMethod,
      payStatus: status,
      payDate: authDate,
      cardName,
      cardNumber: cardNo,
      price: totalPrice,
      TAX: supplyAmt,
      VAT: goodsVat,
      tid,
      cancelMessage,
      cancelStatus,
      refundPrice,
      approvalNumber: approvalNo,
      cancelDate: cancelDate
        ? dayjs(cancelDate).format("YYYY.MM.DD")
        : undefined
    },
    hostInfo: {
      address: address + addressDetail,
      houseName: houseName,
      bNumber: "",
      hostName: "",
      houseContact,
      hompage: ""
    }
  });

  openForPrint(markUp);
};
