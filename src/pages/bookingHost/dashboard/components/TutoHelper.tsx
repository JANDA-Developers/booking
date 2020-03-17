import React from "react";
import { IContext } from "../../BookingHostRouter";
import TutoBlock from "./TutoBlock";
import { LANG } from "../../../../hooks/hook";
import { arraySum } from "../../../../utils/elses";

interface IProps {
  context: IContext;
}

const TutoHelper: React.FC<IProps> = ({ context }) => {
  const { house, user } = context;
  const { roomTypes, name, product, createdAt, smsInfo } = house;

  const roomTypeExist = (roomTypes?.length || 0) > 0;
  const roomCount = arraySum(roomTypes?.map(rt => rt.roomCount) || [0]);
  const roomExsist = roomCount !== 0;

  const tutorials = [
    /* 방을 설정 하였는지 */
    {
      title: LANG("room_config"),
      steps: [
        {
          title: LANG("room_type_create"),
          isDone: roomTypeExist
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
          isDone: false
        },
        {
          title: "자동 발송 하기",
          isDone: false
        },
        {
          title: "단체 발송 하기",
          isDone: false
        },
        {
          title: "히스토리 확인하기",
          isDone: false
        }
      ]
    },
    // 하우스 설정 하기
    {
      title: "하우스 설정을 하였는지",
      steps: [
        {
          title: "숙소 기본 정보를 입력하기",
          isDone: false
        },
        {
          title: "결제를 정보를 변경하기",
          isDone: false
        }
      ]
    },
    /* 하우스 메뉴얼 설정 */
    {
      title: "하우스 설정을 하였는지",
      steps: [
        {
          title: "숙소 기본 정보를 입력하기",
          isDone: false
        },
        {
          title: "결제를 정보를 변경하기",
          isDone: false
        }
      ]
    },
    /* 기타사항 듀토리얼 */
    {
      title: "기타사항 듀토리얼",
      steps: [
        {
          title: "예약 생성하기",
          isDone: false
        },
        {
          title: "예약 관리하기",
          isDone: false
        },
        {
          title: "예약 엑셀 출력",
          isDone: false
        },
        {
          title: "프로필 변경하기",
          isDone: false
        }
      ]
    }
  ];

  return (
    <div className="JDflex">
      {tutorials.map(tuto => (
        <TutoBlock steps={tuto.steps} title={tuto.title} />
      ))}
    </div>
  );
};
export default TutoHelper;
