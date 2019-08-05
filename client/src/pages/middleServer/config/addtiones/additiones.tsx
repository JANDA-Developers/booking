import React from "react";
import {IAddition, IAddtionProp} from "../components/AddtionModule";
import SystemDescription from "./systemConfig";
import AssigTimelineRoomTypeTab from "./assigTimelineRoomTypeTab";
import AssigBlockOP from "./assigBlockOP";
import NewBookingMark from "./newBookingMark";

export const additiones: IAddition[] = [
  {
    description: "기본적인 시스템 설정",
    name: "시스템설정",
    updateAt: "2019-05-23",
    detailDescription: (prop: IAddtionProp) => <SystemDescription {...prop} />
  },
  {
    description: "배정달력에서 방태입별로 나누어볼수있는 탭을 제공",
    name: "방타입별 탭",
    updateAt: "2019-07-01",
    detailDescription: (prop: IAddtionProp) => (
      <AssigTimelineRoomTypeTab {...prop} />
    )
  },
  {
    description: "배정 게스트에 대한 상세설정기능",
    name: "게스트 상세설정",
    updateAt: "2019-07-14",
    detailDescription: (prop: IAddtionProp) => <AssigBlockOP {...prop} />
  },
  {
    description: "새로운 예약을 화면에서 표시합니다.",
    name: "새로운 예약 알림",
    updateAt: "2019-07-14",
    detailDescription: (prop: IAddtionProp) => <NewBookingMark {...prop} />
  }
];
