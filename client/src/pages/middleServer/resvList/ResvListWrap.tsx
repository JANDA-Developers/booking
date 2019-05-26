import React, {useState} from "react";
import {Query, Mutation} from "react-apollo";
import ResvList from "./ResvList";
import {IHouse} from "../../../types/interface";
import {
  getBookers,
  getBookersVariables,
  updateBooker,
  updateBookerVariables,
  deleteBooker,
  deleteBookerVariables
} from "../../../types/api";
import {
  showError,
  queryDataFormater,
  onCompletedMessage
} from "../../../utils/utils";
import {GET_BOOKERS, DELETE_BOOKER, UPDATE_BOOKER} from "../../../queries";
import {getOperationName} from "apollo-link";
import {usePagiNation} from "../../../actions/hook";

interface IProps {
  houseId: string;
}

class UpdateBookerMu extends Mutation<updateBooker, updateBookerVariables> {}
class DeleteBookerMu extends Mutation<deleteBooker, deleteBookerVariables> {}
class GetBookersQuery extends Query<getBookers, getBookersVariables> {}

const ResvListWrap: React.SFC<IProps> = ({houseId}) => {
  const [page, setPage] = usePagiNation(1);

  return (
    <GetBookersQuery
      fetchPolicy="network-only"
      query={GET_BOOKERS}
      variables={{houseId, page, count: 20}}
    >
      {({data: boookerData, loading, error}) => {
        showError(error);

        const bookers = queryDataFormater(
          boookerData,
          "GetBookers",
          "bookers",
          undefined
        );
        const pageInfo = queryDataFormater(
          boookerData,
          "GetBookers",
          "pageInfo",
          undefined
        );

        if (bookers) bookers.reverse();

        return (
          <DeleteBookerMu
            mutation={DELETE_BOOKER}
            onError={showError}
            refetchQueries={[getOperationName(GET_BOOKERS) || ""]}
            onCompleted={({DeleteBooker}) => {
              onCompletedMessage(
                DeleteBooker,
                "예약 삭제 완료",
                "예약 삭제 실패"
              );
            }}
          >
            {deleteBookerMu => (
              <UpdateBookerMu
                mutation={UPDATE_BOOKER}
                onError={showError}
                refetchQueries={[getOperationName(GET_BOOKERS) || ""]}
                onCompleted={({UpdateBooker}) => {
                  onCompletedMessage(
                    UpdateBooker,
                    "예약자 업데이트",
                    "예약자 업데이트 실패"
                  );
                }}
              >
                {updateBookerMu => (
                  <ResvList
                    houseId={houseId}
                    pageInfo={pageInfo || undefined}
                    bookersData={bookers || []}
                    deleteBookerMu={deleteBookerMu}
                    updateBookerMu={updateBookerMu}
                    setPage={setPage}
                    loading={loading}
                  />
                )}
              </UpdateBookerMu>
            )}
          </DeleteBookerMu>
        );
      }}
    </GetBookersQuery>
  );
};

export default ResvListWrap;
