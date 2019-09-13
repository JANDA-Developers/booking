import React from "react";
import JDmodal from "../../../../atoms/modal/Modal";
import {IUseModal} from "../../../../actions/hook";
import MypageWrap from "../../myPage/MyPageWrap";
import {Context} from "tern";
import {IContext} from "../../../MiddleServerRouter";
import {getUserForSU_GetUserForSU_user} from "../../../../types/api";

export interface IUserModalProps {
  userId: string;
}

interface IProps {
  modalHook: IUseModal<IUserModalProps>;
  context: IContext;
  propUserData: getUserForSU_GetUserForSU_user;
}

const UserModal: React.FC<IProps> = ({modalHook, context, propUserData}) => {
  return <MypageWrap propUserData={propUserData} context={context} />;
};
export default UserModal;
