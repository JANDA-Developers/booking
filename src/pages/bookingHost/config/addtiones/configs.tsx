import React from "react";
import { IAddition, IAddtionProp } from "../components/ConfigBlock";
import SystemDescription from "./systemConfig";
import AssigTimelineRoomTypeTab from "./assigTimelineRoomTypeTab";
import { LANG } from "../../../../hooks/hook";
import ReservationConfig from "./ReservationConfig";

export const configBlocks: IAddition[] = [
  // {
  //   description: "서비스에 관한 기본적인 설정",
  //   name: "기본설정",
  //   updateAt: "2019-09-23",
  //   detailDescription: (prop: IAddtionProp) => <BaseConfig {...prop} />
  // },
  {
    description: "예약 관련 설정",
    name: "예약 설정",
    updateAt: "2019-09-23",
    detailDescription: (prop: IAddtionProp) => <ReservationConfig {...prop} />
  },
  {
    description: LANG("system_related_settings"),
    name: LANG("system_config"),
    updateAt: "2019-05-23",
    detailDescription: (prop: IAddtionProp) => <SystemDescription {...prop} />
  },
  {
    description: LANG(
      "provides_a_tab_that_can_be_divided_by_status_in_the_assignment_calendar"
    ),
    name: LANG("room_type_tab"),
    updateAt: "2019-07-01",
    detailDescription: (prop: IAddtionProp) => (
      <AssigTimelineRoomTypeTab {...prop} />
    )
  },
  {
    description: LANG("resv_page_info_editer_desc"),
    name: LANG("resv_page_info_editer"),
    updateAt: "2019-07-01",
    detailDescription: (prop: IAddtionProp) => (
      <AssigTimelineRoomTypeTab {...prop} />
    )
  },

  // 테스트하고 정리해서 ㄱㄱ
  // {
  //   description: "배정 게스트에 대한 상세설정기능",
  //   name: "게스트 상세설정",
  //   updateAt: "2019-07-14",
  //   detailDescription: (prop: IAddtionProp) => <AssigBlockOP {...prop} />
  // },
  // {
  //   description: "새로운 예약을 화면에서 표시합니다.",
  //   name: "새로운 예약 알림",
  //   updateAt: "2019-07-14",
  //   detailDescription: (prop: IAddtionProp) => <NewBookingMark {...prop} />
  // }
];
