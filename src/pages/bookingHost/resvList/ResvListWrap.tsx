import React, { Fragment, useState } from "react";
import { Query, Mutation } from "react-apollo";
import ResvList from "./ResvList";
import {
  getBookings,
  getBookingsVariables,
  updateBooking,
  updateBookingVariables,
  deleteBooking,
  deleteBookingVariables,
  cancelBooking,
  cancelBookingVariables,
  cancelBookings,
  cancelBookingsVariables
} from "../../../types/api";
import {
  queryDataFormater,
  onCompletedMessage,
  getFromResult
} from "../../../utils/utils";
import {
  GET_BOOKINGS,
  DELETE_BOOKING,
  UPDATE_BOOKING,
  CANCLE_BOOKING,
  CANCLE_BOOKINGS
} from "../../../apollo/queries";
import { DEFAULT_PAGE_INFO, PAGE_COUNT_SELECT } from "../../../types/defaults";
import { getOperationName } from "apollo-link";
import { usePageNation, LANG, useDayPicker } from "../../../hooks/hook";
import { isNetworkRequestInFlight } from "apollo-client/core/networkStatus";
import { IContext } from "../../bookingHost/BookingHostRouter";
import { useMutation } from "@apollo/react-hooks";
import client from "../../../apollo/apolloClient";
import { useSelect } from "@janda-com/front";
import {
  CHECK_IN_OUT_OP2,
  PAYMENT_STATUS_OP,
  PAYMENT_STATUS_OP2
} from "../../../types/const";
import { IselectedOption } from "@janda-com/front/build/types/interface";

interface IProps {
  context: IContext;
}

class UpdateBookingMu extends Mutation<updateBooking, updateBookingVariables> {}
class DeleteBookingMu extends Mutation<deleteBooking, deleteBookingVariables> {}
class GetBookingsQuery extends Query<getBookings, getBookingsVariables> {}

const ResvListWrap: React.FC<IProps> = ({ context }) => {
  const { house, houseConfig } = context;
  const { page, setPage } = usePageNation(1);
  const selectCountHook = useSelect(PAGE_COUNT_SELECT[0], PAGE_COUNT_SELECT);
  const checkInOutHook = useSelect(CHECK_IN_OUT_OP2[0], CHECK_IN_OUT_OP2);
  const dayPickerHook = useDayPicker(null, null);
  const paymentStatusHook = useSelect(
    PAYMENT_STATUS_OP2[0],
    PAYMENT_STATUS_OP2
  );
  const [filterRoomTypeOps, setFilterRoomTypeOps] = useState<IselectedOption[]>(
    []
  );

  const checkInOutRange =
    dayPickerHook.from && dayPickerHook.to
      ? {
          checkIn: dayPickerHook.from,
          checkOut: dayPickerHook.to
        }
      : undefined;

  const refetchQueries = [getOperationName(GET_BOOKINGS) || ""];

  const [cancelBookingMu, { loading: cancelBookingsLoading }] = useMutation<
    cancelBookings,
    cancelBookingsVariables
  >(CANCLE_BOOKINGS, {
    client,
    refetchQueries,
    ignoreResults: true,
    onCompleted: ({ CancelBookings }) => {
      onCompletedMessage(
        CancelBookings,
        LANG("assig_completed"),
        LANG("assig_failed")
      );
    }
  });

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
            roomTypeIds: (filterRoomTypeOps || []).map(op => op.value),
            stayDate: checkInOutRange,
            houseId: house._id,
            isCheckIn: checkInOutHook.selectedOption?.value,
            paymentStatuses: paymentStatusHook.selectedOption?.value
              ? [paymentStatusHook.selectedOption?.value]
              : undefined
          },
          paging: {
            selectedPage: page,
            count: selectCountHook.selectedOption?.value
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
                      key={house._id}
                      context={context}
                      checkInOutHook={checkInOutHook}
                      pageInfo={pageInfo || DEFAULT_PAGE_INFO}
                      paymentStatusHook={paymentStatusHook}
                      bookingsData={data || []}
                      cancelBookingMu={cancelBookingMu}
                      deleteBookingMu={deleteBookingMu}
                      updateBookingMu={updateBookingMu}
                      updateBookingLoading={updateBookingLoading}
                      deleteBookingLoading={deleteBookingLoading}
                      setPage={setPage}
                      filterRoomTypeOps={filterRoomTypeOps}
                      setFilterRoomTypeOps={setFilterRoomTypeOps}
                      selectCountHook={selectCountHook}
                      dayPickerHook={dayPickerHook}
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
