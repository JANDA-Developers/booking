import React from "react";
import { IContext } from "../../BookingHostRouter";
import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_SEASON_TABLE } from "../../../../apollo/queries";
import client from "../../../../apollo/apolloClient";
import {
  getAllSeasonTable,
  getAllSeasonTableVariables
} from "../../../../types/api";
import { queryDataFormater } from "../../../../utils/utils";
import TutoBlock from "./TutoBlock";
import { LANG } from "../../../../hooks/hook";
import { arraySum } from "../../../../utils/elses";

interface IProps {
  context: IContext;
}

const ConfigHelper: React.FC<IProps> = ({ context }) => {
  const { house, user } = context;
  const { roomTypes, name, product, createdAt, smsInfo } = house;

  const roomCount = arraySum(roomTypes?.map(rt => rt.roomCount) || [0]);
  const roomExsist = roomCount !== 0;

  const tutorials = [
    /* 방을 설정 하였는지 */
    {
      title: LANG("room_config"),
      steps: [
        {
          title: LANG("room_type_create"),
          isDone: roomTypes?.length !== 0
        },
        {
          title: LANG("room_create"),
          isDone: roomExsist
        }
      ]
    },
    /* SMS 설정 */
    {
      title: LANG("sms_config"),
      steps: [
        {
          title: "탬플릿을 생성하였는지",
          isDone: roomTypes?.length !== 0
        },
        {
          title: "자동 발송 하기",
          isDone: roomTypes?.length !== 0
        },
        {
          title: "단체 발송 하기",
          isDone: roomTypes?.length !== 0
        },
        {
          title: "히스토리 확인하기",
          isDone: roomTypes?.length !== 0
        }
      ]
    },
    // 하우스 설정 하기
    {
      title: "하우스 설정을 하였는지",
      steps: [
        {
          title: "숙소 기본 정보를 입력하기",
          isDone: roomTypes?.length !== 0
        },
        {
          title: "결제를 정보를 변경하기",
          isDone: roomTypes?.length !== 0
        }
      ]
    },
    /* 하우스 메뉴얼 설정 */
    {
      title: "하우스 설정을 하였는지",
      steps: [
        {
          title: "숙소 기본 정보를 입력하기",
          isDone: roomTypes?.length !== 0
        },
        {
          title: "결제를 정보를 변경하기",
          isDone: roomTypes?.length !== 0
        }
      ]
    },
    /* 기타사항 듀토리얼 */
    {
      title: "기타사항 듀토리얼",
      steps: [
        {
          title: "예약 생성하기",
          isDone: roomTypes?.length !== 0
        },
        {
          title: "예약 관리하기",
          isDone: roomTypes?.length !== 0
        },
        {
          title: "예약 엑셀 출력",
          isDone: roomTypes?.length !== 0
        },
        {
          title: "프로필 변경하기",
          isDone: roomTypes?.length !== 0
        }
      ]
    }
  ];

  return (
    <div>
      {tutorials.map(tuto => (
        <TutoBlock steps={tuto.steps} title={tuto.title} />
      ))}
      {/* SMS 설정을 하였는지 */}
      {/* 홈페이지 리퀘스트 */}
      {/* 기타사항 듀토리얼 */}
    </div>
  );
};
export default ConfigHelper;
