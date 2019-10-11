import React, * as react from "react";
import {Query, Mutation} from "react-apollo";
import {queryDataFormater, onCompletedMessage} from "../../../../utils/utils";
import CreateNotiModal from "./createNotiModal";
import {CREATE_NOTI, GET_MEMO, GET_NOTI} from "../../../../queries";
import {
  createNoti,
  createNotiVariables
} from "../../../../types/api";
import {IUseModal} from "../../../../hooks/hook";
import {NotiType} from "../../../../types/enum";
import {IContext} from "../../../MiddleServerRouter";
import {getOperationName} from "apollo-link";

export interface ICreateNotiModalParam {
  target: string | NotiType.TO_ALL;
  targetIds?: [string];
}

interface IProps {
  context: IContext;
  modalHook: IUseModal<ICreateNotiModalParam>;
}

class CreateNotiMu extends Mutation<
  createNoti,
  createNotiVariables
> {}

const CreateNotiModalWrap: React.FC<IProps> = ({
  context,
  modalHook
}) => {
  return (
    <div>
      <CreateNotiMu
        mutation={CREATE_NOTI}
        refetchQueries={[getOperationName(GET_NOTI) || ""]}
        onCompleted={({CreateNoti}) =>
          onCompletedMessage(
            CreateNoti,
            "알람전송 완료",
            "알람전송 실패"
          )
        }
      >
        {(createNotiMu, {loading: createNotiMuLoading}) => {
          return (
            <CreateNotiModal
              context={context}
              modalHook={modalHook}
              createNotiMu={createNotiMu}
            />
          );
        }}
      </CreateNotiMu>
    </div>
  );
};
export default CreateNotiModalWrap;
