import React from "react";
import { Query } from "react-apollo";
import JDmodal from "../../../../atoms/modal/Modal";
import { IUseModal } from "../../../../hooks/hook";
import { getUserForSU, getUserForSUVariables } from "../../../../types/api";
import { GET_USER_FOR_SU } from "../../../../apollo/queries";
import { showError, queryDataFormater } from "../../../../utils/utils";
import Preloader from "../../../../atoms/preloader/Preloader";
import UserModal, { IUserModalProps } from "./userModal";
import { IContext } from "../../../bookingHost/BookingHostRouter";
import { MODAL_PRELOADER_SIZE } from "../../../../types/const";

interface IProps {
  modalHook: IUseModal<IUserModalProps>;
  context: IContext;
}

class GetUserInfoQuery extends Query<getUserForSU, getUserForSUVariables> {}

const UserModalWrap: React.SFC<IProps> = ({ modalHook, context }) => (
  <GetUserInfoQuery
    query={GET_USER_FOR_SU}
    variables={{ userId: modalHook.info.userId }}
  >
    {({ loading, error, data: userData }) => {
      const user = queryDataFormater(
        userData,
        "GetUserForSU",
        "user",
        undefined
      );

      if (!user && !loading) throw Error("nonUserId");

      return (
        <JDmodal loading={loading} minWidth="90%" {...modalHook}>
          {!loading ? (
            <UserModal
              propUserData={user!}
              context={context}
              modalHook={modalHook}
            />
          ) : (
            <Preloader loading={loading} size={MODAL_PRELOADER_SIZE} />
          )}
        </JDmodal>
      );
    }}
  </GetUserInfoQuery>
);
export default UserModalWrap;
