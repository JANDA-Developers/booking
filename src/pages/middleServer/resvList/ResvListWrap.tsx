import React, { useState, Fragment } from "react";
import { Query, Mutation } from "react-apollo";
import ResvList from "./ResvList";
import { IHouse } from "../../../types/interface";
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
import { GET_BOOKINGS, DELETE_BOOKING, UPDATE_BOOKING } from "../../../queries";
import { getOperationName } from "apollo-link";
import { usePagiNation, LANG } from "../../../hooks/hook";
import { isNetworkRequestInFlight } from "apollo-client/core/networkStatus";
import { IContext } from "../../MiddleServerRouter";

interface IProps {
  context: IContext;
}

class UpdateBookingMu extends Mutation<updateBooking, updateBookingVariables> { }
class DeleteBookingMu extends Mutation<deleteBooking, deleteBookingVariables> { }
class GetBookingsQuery extends Query<getBookings, getBookingsVariables> { }

const ResvListWrap: React.FC<IProps> = ({ context }) => {
  const { house, houseConfig } = context;
  const [page, setPage] = usePagiNation(1);

  const {
    pollingPeriod: { period }
  } = houseConfig;
  
  return (
    <GetBookingsQuery
      query={GET_BOOKINGS}
      pollInterval={period}
      notifyOnNetworkStatusChange
      variables={{ houseId: house._id, page, count: 20 }}
    >
      {({ data: boookerData, loading, error, networkStatus }) => {
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
            refetchQueries={[getOperationName(GET_BOOKINGS) || ""]}
            onCompleted={({ DeleteBooking }) => {
              onCompletedMessage(
                DeleteBooking,
                LANG("reservation_delete_complete"),
                LANG("reservation_delete_fail")
              );
            }}
          >
            {(deleteBookingMu, { loading: deleteBookingLoading }) => (
              <UpdateBookingMu
                mutation={UPDATE_BOOKING}
                refetchQueries={[getOperationName(GET_BOOKINGS) || ""]}
                onCompleted={({ UpdateBooking }) => {
                  onCompletedMessage(
                    UpdateBooking,
                    LANG("reservation_update"),
                    LANG("reservation_update_fail")
                  );
                }}
              >
                {(updateBookingMu, { loading: updateBookingLoading }) => (
                  <Fragment>
                    <ResvList
                      context={context}
                      pageInfo={pageInfo || undefined}
                      bookingsData={bookings || []}
                      deleteBookingMu={deleteBookingMu}
                      updateBookingMu={updateBookingMu}
                      updateBookingLoading={updateBookingLoading}
                      deleteBookingLoading={deleteBookingLoading}
                      setPage={setPage}
                      networkStatus={networkStatus}
                      loading={isNetworkRequestInFlight(networkStatus)}
                    />
                  </Fragment>
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
