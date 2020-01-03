import React, * as react from "react";
import { Query, Mutation } from "react-apollo";
import {
  queryDataFormater,
  onCompletedMessage,
  getFromResult
} from "../../utils/utils";
import Memo, { IConfigMemo } from "./Memo";
import {
  getMemos,
  getMemosVariables,
  createMemo,
  createMemoVariables,
  updateMemo,
  updateMemoVariables,
  deleteMemoVariables,
  deleteMemo,
  getBookingMemos,
  getBookingMemosVariables
} from "../../types/api";
import {
  GET_MEMO,
  CREATE_MEMO,
  DELETE_MEMO,
  UPDATE_MEMO,
  GET_BOOKINGS_MEMOS
} from "../../apollo/queries";
import { getOperationName } from "apollo-link";
import { MemoType } from "../../types/enum";
import { MODAL_PRELOADER_SIZE } from "../../types/const";
import Preloader from "../../atoms/preloader/Preloader";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import { IUseModal, LANG } from "../../hooks/hook";
import { useQuery } from "@apollo/react-hooks";
import client from "../../apollo/apolloClient";
import moment from "moment";

export interface IMemoWrapProps extends IConfigMemo {
  context: IContext;
  memoType: MemoType;
  modalHook?: IUseModal;
}

class GetMemoQu extends Query<getMemos, getMemosVariables> {}
class CreateMemoMu extends Mutation<createMemo, createMemoVariables> {}
class UpdateMemoMu extends Mutation<updateMemo, updateMemoVariables> {}
class DeleteMemoMu extends Mutation<deleteMemo, deleteMemoVariables> {}

const MemoWrap: React.FC<IMemoWrapProps> = ({ context, memoType, ...prop }) => {
  const {
    house: { _id: houseId }
  } = context;

  const { data: memoData, networkStatus: bookingNetS } = useQuery<
    getBookingMemos,
    getBookingMemosVariables
  >(GET_BOOKINGS_MEMOS, {
    client,
    notifyOnNetworkStatusChange: true,
    variables: {
      param: {
        paging: {
          count: 20,
          selectedPage: 1
        }
      }
    }
  });

  const result = queryDataFormater(
    memoData,
    "GetBookings",
    "result",
    undefined
  );
  const bookings = result?.bookings || [];

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
        {({ data: Data, loading: getMemoLoading, networkStatus }) => {
          const getMemosData = queryDataFormater(Data, "GetMemos", "memos", []);
          return (
            <CreateMemoMu
              mutation={CREATE_MEMO}
              awaitRefetchQueries
              refetchQueries={[getOperationName(GET_MEMO)!]}
              onCompleted={({ CreateMemo }) =>
                onCompletedMessage(
                  CreateMemo,
                  LANG("create_memo_completed"),
                  LANG("create_memo_fail")
                )
              }
            >
              {(createMemoMu, { loading: createMemoLoading }) => (
                <DeleteMemoMu
                  mutation={DELETE_MEMO}
                  awaitRefetchQueries
                  refetchQueries={[getOperationName(GET_MEMO)!]}
                  onCompleted={({ DeleteMemo }) =>
                    onCompletedMessage(
                      DeleteMemo,
                      LANG("deleted_note_completed"),
                      LANG("deleted_note_failed")
                    )
                  }
                >
                  {(deleteMemoMu, { loading: deleteMemoLoading }) => (
                    <UpdateMemoMu
                      mutation={UPDATE_MEMO}
                      awaitRefetchQueries
                      refetchQueries={[getOperationName(GET_MEMO)!]}
                      onCompleted={({ UpdateMemo }) =>
                        onCompletedMessage(
                          UpdateMemo,
                          LANG("note_updated"),
                          LANG("note_updated_failed")
                        )
                      }
                    >
                      {(updateMemoMu, { loading: updateMemoLoading }) =>
                        networkStatus !== 1 && bookingNetS !== 1 ? (
                          <Memo
                            mutationLoading={
                              updateMemoLoading ||
                              deleteMemoLoading ||
                              createMemoLoading
                            }
                            bookingData={bookings}
                            memoType={memoType}
                            houseId={houseId}
                            createMemoMu={createMemoMu}
                            deleteMemoMu={deleteMemoMu}
                            updateMemoMu={updateMemoMu}
                            memos={getMemosData || []}
                            context={context}
                            {...prop}
                          />
                        ) : (
                          <Preloader
                            size={MODAL_PRELOADER_SIZE}
                            loading={true}
                          />
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
