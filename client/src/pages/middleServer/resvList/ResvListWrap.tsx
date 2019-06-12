import React, {useState} from "react";
import {Query, Mutation} from "react-apollo";
import ResvList from "./ResvList";
import {IHouse} from "../../../types/interface";
import {
  getBookings,
  getBookingsVariables,
  updateBooking,
  updateBookingVariables,
  deleteBooking,
  deleteBookingVariables
} from "../../../types/api";
import {
  showError,
  queryDataFormater,
  onCompletedMessage
} from "../../../utils/utils";
import {GET_BOOKINGS, DELETE_BOOKING, UPDATE_BOOKING} from "../../../queries";
import {getOperationName} from "apollo-link";
import {usePagiNation} from "../../../actions/hook";

interface IProps {
  houseId: string;
}

class UpdateBookingMu extends Mutation<updateBooking, updateBookingVariables> {}
class DeleteBookingMu extends Mutation<deleteBooking, deleteBookingVariables> {}
class GetBookingsQuery extends Query<getBookings, getBookingsVariables> {}

const ResvListWrap: React.FC<IProps> = ({houseId}) => {
  const [page, setPage] = usePagiNation(1);

  return (
    <GetBookingsQuery
      fetchPolicy="network-only"
      query={GET_BOOKINGS}
      pollInterval={5000}
      variables={{houseId, page, count: 20}}
    >
      {({data: boookerData, loading, error}) => {
        showError(error);

        const bookings = queryDataFormater(
          boookerData,
          "GetBookings",
          "bookings",
          undefined
        );
        const pageInfo = queryDataFormater(
          boookerData,
          "GetBookings",
          "pageInfo",
          undefined
        );

        return (
          <DeleteBookingMu
            mutation={DELETE_BOOKING}
            onError={showError}
            refetchQueries={[getOperationName(GET_BOOKINGS) || ""]}
            onCompleted={({DeleteBooking}) => {
              onCompletedMessage(
                DeleteBooking,
                "예약 삭제 완료",
                "예약 삭제 실패"
              );
            }}
          >
            {deleteBookingMu => (
              <UpdateBookingMu
                mutation={UPDATE_BOOKING}
                onError={showError}
                refetchQueries={[getOperationName(GET_BOOKINGS) || ""]}
                onCompleted={({UpdateBooking}) => {
                  onCompletedMessage(
                    UpdateBooking,
                    "예약자 업데이트",
                    "예약자 업데이트 실패"
                  );
                }}
              >
                {updateBookingMu => (
                  <ResvList
                    houseId={houseId}
                    pageInfo={pageInfo || undefined}
                    bookingsData={bookings || []}
                    deleteBookingMu={deleteBookingMu}
                    updateBookingMu={updateBookingMu}
                    setPage={setPage}
                    loading={loading}
                  />
                )}
              </UpdateBookingMu>
            )}
          </DeleteBookingMu>
        );
      }}
    </GetBookingsQuery>
  );
};

export default ResvListWrap;
