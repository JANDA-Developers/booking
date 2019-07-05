import React from "react";
import {IAddition, IAddtionProp} from "../components/AddtionModule";
import SystemDescription from "./systemConfig";
import AssigTimelineRoomTypeTab from "./assigTimelineRoomTypeTab";

export const additiones: IAddition[] = [
  {
    description: "Description Fro Moudles",
    name: "시스템설정",
    updateAt: "2019-05-23",
    detailDescription: (prop: IAddtionProp) => <SystemDescription {...prop} />
  },
  {
    description: "Description Fro Moudles",
    name: "방타입별 탭",
    updateAt: "2019-05-23",
    detailDescription: (prop: IAddtionProp) => (
      <AssigTimelineRoomTypeTab {...prop} />
    )
  }
];
