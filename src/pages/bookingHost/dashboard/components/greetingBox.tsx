import React, { useState } from "react";
import { randomIntFromInterval } from "../../../../utils/utils";
import { getMyProfile_GetMyProfile_user } from "../../../../types/api";
import { LANG } from "../../../../hooks/hook";

interface IProps {
  userData: getMyProfile_GetMyProfile_user;
}

const GreetingBox: React.FC<IProps> = ({ userData }) => {
  if (!userData.name) return null;

  const greetingTexts = [
    <span>
      {LANG("F_user_name_hello")(userData.name)}
      {LANG("have_a_bright_day_sir")}
    </span>,
    LANG("F_user_name_have_a_bright_day")(userData.name),
    LANG("F_user_name_good_luck")(userData.name)
  ];

  const gretting = useState(
    greetingTexts[randomIntFromInterval(0, greetingTexts.length - 1)]
  );
  return <div>{gretting[0]}</div>;
};

export const PeriodBox: any = (leftDays: number) => (
  <div>{LANG("F_have_x_days_left_to_try_for_free")(leftDays)}</div>
);

export default GreetingBox;
