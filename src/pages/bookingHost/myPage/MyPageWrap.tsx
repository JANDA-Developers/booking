import React from "react";
import MyPage from "./MyPage";
import { IDiv } from "../../../types/interface";
import { IContext } from "../../bookingHost/BookingHostRouter";
import { getUserForSU_GetUserForSU_user } from "../../../types/api";

interface IProps {
  context: IContext;
  props?: IDiv;
  propUserData?: getUserForSU_GetUserForSU_user;
}

const MypageWrap: React.FC<IProps> = ({ context, propUserData, ...props }) => {
  // 슈퍼 관리자가 유저를 열었을때를 대비한것
  const userInfo = propUserData || context.user;

  return <MyPage context={context} userInfo={userInfo} {...props} />;
};

export default MypageWrap;
