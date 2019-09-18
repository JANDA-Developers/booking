import React, * as react from "react";
import {Query, Mutation} from "react-apollo";
import {queryDataFormater, onCompletedMessage} from "../../utils/utils";
import Memo from "./Memo";
import {
  getMemos,
  getMemosVariables,
  createMemo,
  createMemoVariables,
  updateMemo,
  updateMemoVariables,
  deleteMemoVariables,
  deleteMemo
} from "../../types/api";
import {GET_MEMO, CREATE_MEMO, DELETE_MEMO, UPDATE_MEMO} from "../../queries";
import {getOperationName} from "apollo-link";
import {MemoType} from "../../types/enum";
import Preloader from "../../atoms/preloader/Preloader";
import {IContext} from "../../pages/MiddleServerRouter";

export interface IMemoWrapProps {
  context: IContext;
  memoType: MemoType;
}

class GetMemoQu extends Query<getMemos, getMemosVariables> {}
class CreateMemoMu extends Mutation<createMemo, createMemoVariables> {}
class UpdateMemoMu extends Mutation<updateMemo, updateMemoVariables> {}
class DeleteMemoMu extends Mutation<deleteMemo, deleteMemoVariables> {}

const MemoWrap: React.FC<IMemoWrapProps> = ({context, memoType}) => {
  const {
    house: {_id: houseId}
  } = context;
  return (
    <div>
      <GetMemoQu
        skip={!houseId}
        variables={{
          houseId,
          memoType: memoType
        }}
        query={GET_MEMO}
      >
        {({data: Data, loading: getMemoLoading, networkStatus}) => {
          const getMemosData = queryDataFormater(Data, "GetMemos", "memos", []);
          return (
            <CreateMemoMu
              mutation={CREATE_MEMO}
              awaitRefetchQueries
              refetchQueries={[getOperationName(GET_MEMO)!]}
              onCompleted={({CreateMemo}) =>
                onCompletedMessage(CreateMemo, "메모 생성완료", "메모 생성실패")
              }
            >
              {(createMemoMu, {loading: createMemoLoading}) => (
                <DeleteMemoMu
                  mutation={DELETE_MEMO}
                  awaitRefetchQueries
                  refetchQueries={[getOperationName(GET_MEMO)!]}
                  onCompleted={({DeleteMemo}) =>
                    onCompletedMessage(
                      DeleteMemo,
                      "메모 삭제완료",
                      "메모 삭제실패"
                    )
                  }
                >
                  {(deleteMemoMu, {loading: deleteMemoLoading}) => (
                    <UpdateMemoMu
                      mutation={UPDATE_MEMO}
                      awaitRefetchQueries
                      refetchQueries={[getOperationName(GET_MEMO)!]}
                      onCompleted={({UpdateMemo}) =>
                        onCompletedMessage(
                          UpdateMemo,
                          "메모 업데이트 완료",
                          "메모 업데이트 실패"
                        )
                      }
                    >
                      {(updateMemoMu, {loading: updateMemoLoading}) =>
                        networkStatus !== 1 ? (
                          <Memo
                            mutationLoading={
                              updateMemoLoading ||
                              deleteMemoLoading ||
                              createMemoLoading
                            }
                            memoType={memoType}
                            houseId={houseId}
                            createMemoMu={createMemoMu}
                            deleteMemoMu={deleteMemoMu}
                            updateMemoMu={updateMemoMu}
                            memos={getMemosData || []}
                          />
                        ) : (
                          <Preloader size="large" loading={true} />
                        )
                      }
                    </UpdateMemoMu>
                  )}
                </DeleteMemoMu>
              )}
            </CreateMemoMu>
          );
        }}
      </GetMemoQu>
    </div>
  );
};

export default MemoWrap;
