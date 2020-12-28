import {
  getBookingForPublic_GetBookingForPublic_booking,
  getHouseForPublic_GetHouseForPublic_house
} from "../types/api";
import { getRoomSelectInfo, getRoomSelectString } from "./typeChanger";
import CardRecipt from "../docs/print/CreditCardReceipt";
import { openForPrint } from "./openForPrint";

export const printRecipt = (
  data: getBookingForPublic_GetBookingForPublic_booking,
  houseData: getHouseForPublic_GetHouseForPublic_house
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
    tid
  } = payment;

  if (!cardInfo) return;
  const { cardName, cardNo, authDate } = cardInfo;
  if (!roomTypes) return;
  const selectInfoes = getRoomSelectInfo(guests, roomTypes);
  const stringBookInfo = getRoomSelectString(selectInfoes);

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
      tid
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
