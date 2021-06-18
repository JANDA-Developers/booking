import { TMultiColumns } from "../../../components/excel/Excel";
import { isEmpty } from "../../../utils/utils";
import { IBooking } from "../../../types/interface";
import { LANG } from "../../../hooks/hook";
import { getRoomSelectInfo } from "../../../utils/typeChanger";
import { arraySum } from "../../../utils/elses";
import dayjs from "dayjs";

export const resvDatasToExcel = (
  bookingsData?: IBooking[]
): TMultiColumns[] => {
  if (isEmpty(bookingsData)) return [];

  const keys = [
    LANG("reservation_date"),
    LANG("accommodation_info"),
    LANG("checkIn"),
    LANG("checkOut"),
    LANG("booker_name"),
    LANG("contact"),
    LANG("usage_amount"),
    LANG("payment_status"),
    LANG("memo"),
    LANG("status")
  ];

  const bookingKeys = [
    "createdAt",
    "getRoomSelectInfo",
    "checkIn",
    "checkOut",
    "name",
    "phoneNumber",
    "payment",
    "paymentStatus",
    "memo",
    "status"
  ];

  return [
    {
      columns: keys,
      data: bookingsData.map(booking =>
        bookingKeys.map(bookingKey => {
          if (bookingKey === "getRoomSelectInfo") {
            return {
              value: getRoomSelectInfo(booking.guests, booking.roomTypes || [])
                .map(info => {
                  const { roomTypeName, count } = info;
                  const { female, male, roomCount } = count;

                  let countString = "";
                  countString += female && female + "여";
                  countString += male && male + "남";
                  countString += roomCount && roomCount + "개";

                  return roomTypeName || "" + countString;
                })
                .join()
            };
          } else if (bookingKey === "payment") {
            return { value: booking[bookingKey]["totalPrice"].toString() };
          } else if (bookingKey === "paymentStatus") {
            return { value: booking["payment"]["status"] };
          } else if (bookingKey === "createdAt") {
            return {
              value: dayjs(booking["createdAt"]).format("YYYY-MM-DD HH:ss")
            };
          }
          // @ts-ignore
          return { value: booking[bookingKey] };
        })
      )
    }
  ];
};
