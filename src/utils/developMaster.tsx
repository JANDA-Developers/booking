import $ from "jquery";
import {getCookie} from "./cookies";
import {IReservationHooks} from "../pages/outPages/reservation/Reservation";

export const isDeveloper = () => {
  return getCookie("isDeveloper") === "Y";
};

export const developEvent = (developEvent: any) => {
  if (isDeveloper()) {
    $(window).keypress("q", e => {
      if (e.ctrlKey) developEvent();
    });
  }
};

export const reservationDevelop = (reservationHooks: IReservationHooks) => {
  const target = $(".DayPicker-Day").not(".DayPicker-Day--disabled");
  if (target.length > 2) {
    target[0].click();
    target[1].click();
  }

  const {setBookerInfo} = reservationHooks;
  setTimeout(() => {
    $(".roomTypeCard__selectButton")[0].click();
    setBookerInfo({
      agreePrivacyPolicy: true,
      email: "colton950901@gmail.com",
      memo: "테스트",
      name: "개발테스터",
      password: "#rammus123",
      phoneNumber: "010-5237-4492"
    });
    setTimeout(() => {
      $("#ResvBtn").click();
    }, 100);
  }, 2000);
};
