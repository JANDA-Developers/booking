import React, {useState} from "react";
import {randomIntFromInterval} from "../../../../utils/utils";
import {getMyProfile_GetMyProfile_user} from "../../../../types/api";

interface IProps {
  userData: getMyProfile_GetMyProfile_user;
}

const GreetingBox: React.FC<IProps> = ({userData}) => {
  if (!userData.name) return null;

  const greetingTexts = [
    <span>
      {`${userData.name}님 안녕하세요.`}
      {`오늘도 밝은 하루 보내세요`}
    </span>,
    `${userData.name}님 오늘도 힘찬 하루 되세요.`,
    `${userData.name}님 좋은 일 가득하길 기원합니다.`
  ];

  const gretting = useState(
    greetingTexts[randomIntFromInterval(0, greetingTexts.length - 1)]
  );
  return <div>{gretting[0]}</div>;
};

export const PeriodBox: any = (leftDays: number) => (
  <div>서비스 종료까지 {leftDays} 일 남았습니다.</div>
);

export default GreetingBox;
