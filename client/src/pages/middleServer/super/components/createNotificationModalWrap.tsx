import React, * as react from "react";
import {Query, Mutation} from "react-apollo";
import {queryDataFormater, onCompletedMessage} from "../../../../utils/utils";
import CreateNotificationModal from "./createNotificationModal";
import {CREATE_NOTI, GET_MEMO, GET_NOTI} from "../../../../queries";
import {
  createNotification,
  createNotificationVariables
} from "../../../../types/api";
import {IUseModal} from "../../../../actions/hook";
import {NotificationType} from "../../../../types/enum";
import {IContext} from "../../../MiddleServerRouter";
import {getOperationName} from "apollo-link";

export interface ICreateNotiModalParam {
  target: string | NotificationType.TO_ALL;
}

interface IProps {
  context: IContext;
  modalHook: IUseModal<ICreateNotiModalParam>;
}

class CreateNotificationMu extends Mutation<
  createNotification,
  createNotificationVariables
> {}

const CreateNotificationModalWrap: React.FC<IProps> = ({
  context,
  modalHook
}) => {
  const {
    info: {target}
  } = modalHook;

  return (
    <div>
      <CreateNotificationMu
        mutation={CREATE_NOTI}
        refetchQueries={[getOperationName(GET_NOTI) || ""]}
        onCompleted={({CreateNotification}) =>
          onCompletedMessage(
            CreateNotification,
            "알람전송 완료",
            "알람전송 실패"
          )
        }
      >
        {(createNotiMu, {loading: createNotiMuLoading}) => {
          return (
            <CreateNotificationModal
              context={context}
              modalHook={modalHook}
              target={target}
              createNotiMu={createNotiMu}
            />
          );
        }}
      </CreateNotificationMu>
    </div>
  );
};
export default CreateNotificationModalWrap;
