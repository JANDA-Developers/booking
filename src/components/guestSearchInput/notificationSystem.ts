import {
  getBookingsForNoti_GetBookings_result_bookings as notiBooking,
  getBookingsForNotiVariables
} from "../../types/api";
import { isEmpty, queryDataFormater } from "../../utils/utils";
import client from "../../apollo/apolloClient";
import { getBookingsForNoti } from "../../types/api";
import { GET_BOOKINGS_FOR_NOTI } from "../../apollo/queries";
import { useQuery } from "@apollo/react-hooks";
import { TimePerMs } from "../../types/enum";
import { IMG_REPO } from "../../types/const";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import { IHouse } from "../../types/interface";

let NOTI_CHECK_TIME =
  parseInt(localStorage.getItem("lastNotiMS") || "0") || new Date().valueOf();

let IS_FIRST_NOTI = true;

const commonNotiProp = {
  icon: IMG_REPO + "booking_app/icon/bookingIcon.png"
};

const sendLongTermNoti = (newItems: notiBooking[], houses: IHouse[]) => {
  houses.forEach(house => {
    const itemLength = newItems.filter(item => item.house._id === house._id)
      .length;
    const newNoti = new Notification(
      `숙소 ${house.name}에 ${itemLength}개의 새로운 예약이 있습니다.`,
      {
        ...commonNotiProp
      }
    );
  });
};

const sendNewBookingNoti = (
  item: notiBooking,
  onClick: (booking: notiBooking) => void
) => {
  const newNoti = new Notification("새로운 예약 접수", {
    body: `${item.name}님이 ${item.house.name}에 새로운 예약을 생성 하셨습니다.`,
    ...commonNotiProp
  });

  newNoti.onclick = () => {
    onClick(item);
  };
};

type TCallBackClickSingleNoti = (booking: notiBooking) => void;

const save = () => {
  NOTI_CHECK_TIME = new Date().valueOf();
  localStorage.setItem("lastNotiMS", new Date().valueOf().toString());
};

export const notiFire = (
  newItems: notiBooking[],
  callBackClick: TCallBackClickSingleNoti,
  stacked: boolean,
  context: IContext
) => {
  const { houses } = context;

  IS_FIRST_NOTI = false;
  if (isEmpty(newItems)) return;

  save();

  Notification.requestPermission().then(result => {
    if (stacked) {
      sendLongTermNoti(newItems, houses);
      return;
    }

    newItems
      .filter(item => !item.madeByHost)
      .map(item => {
        sendNewBookingNoti(item, callBackClick);
      });
  });
};

export const useSubScribeNotification = (
  callBackClick: TCallBackClickSingleNoti,
  context: IContext
) => {
  const timeStart = NOTI_CHECK_TIME;

  useQuery<getBookingsForNoti, getBookingsForNotiVariables>(
    GET_BOOKINGS_FOR_NOTI,
    {
      client,
      pollInterval: 30000,
      notifyOnNetworkStatusChange: true,
      onCompleted: result => {
        const newItems = queryDataFormater(
          result,
          "GetBookings",
          "result",
          undefined
        );

        if (newItems) {
          const newBookings = newItems.bookings || [];
          if (!isEmpty(newBookings))
            notiFire(newBookings, callBackClick, IS_FIRST_NOTI, context);
        }
      },
      variables: {
        param: {
          paging: {
            count: 100,
            selectedPage: 1
          },
          filter: {
            createdAt: {
              checkIn: timeStart,
              checkOut: timeStart + TimePerMs.DAY
            }
          }
        }
      }
    }
  );
};
