import React, { Fragment } from "react";
import { Query, Mutation } from "react-apollo";
import ResvList from "./ResvList";
import {
  getBookings,
  getBookingsVariables,
  updateBooking,
  updateBookingVariables,
  deleteBooking,
  deleteBookingVariables
} from "../../../types/api";
import {
  queryDataFormater,
  onCompletedMessage,
  getFromResult
} from "../../../utils/utils";
import {
  GET_BOOKINGS,
  DELETE_BOOKING,
  UPDATE_BOOKING
} from "../../../apollo/queries";
import { DEFAULT_PAGE_INFO } from "../../../types/defaults";
import { getOperationName } from "apollo-link";
import { usePageNation, LANG } from "../../../hooks/hook";
import { isNetworkRequestInFlight } from "apollo-client/core/networkStatus";
import { IContext } from "../../bookingHost/BookingHostRouter";

interface IProps {
  context: IContext;
}

class UpdateBookingMu extends Mutation<updateBooking, updateBookingVariables> {}
class DeleteBookingMu extends Mutation<deleteBooking, deleteBookingVariables> {}
class GetBookingsQuery extends Query<getBookings, getBookingsVariables> {}

const ResvListWrap: React.FC<IProps> = ({ context }) => {
  const { house, houseConfig } = context;
  const { page, setPage } = usePageNation(1);

  const {
    pollingPeriod: { period }
  } = houseConfig;

  return (
    <GetBookingsQuery
      query={GET_BOOKINGS}
      pollInterval={period}
      notifyOnNetworkStatusChange
      variables={{
        param: {
          filter: {
            houseId: house._id
          },
          paging: {
            selectedPage: page,
            count: 20
          }
        }
      }}
    >
      {({ data: boookerData, loading, error, networkStatus }) => {
        const result = queryDataFormater(
          boookerData,
          "GetBookings",
          "result",
          undefined
        );
        const { data, pageInfo } = getFromResult(result, "bookings", []);

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
                      pageInfo={pageInfo || DEFAULT_PAGE_INFO}
                      bookingsData={data || []}
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
