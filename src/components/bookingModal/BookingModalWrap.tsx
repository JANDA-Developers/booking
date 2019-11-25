import React, { useMemo } from "react";
import { Query, Mutation } from "react-apollo";
import BookingModal from "./BookingModal";
import _ from "lodash";
import { IUseModal, LANG } from "../../hooks/hook";
import {
  getBooking,
  getBookingVariables,
  updateBooking,
  updateBookingVariables,
  deleteBooking,
  deleteBookingVariables,
  getRoomTypeDatePrices,
  getRoomTypeDatePricesVariables,
  startBooking,
  startBookingVariables
} from "../../types/api";
import {
  queryDataFormater,
  onCompletedMessage,
  isEmpty,
  mergeObject,
  s4
} from "../../utils/utils";
import Preloader from "../../atoms/preloader/Preloader";
import {
  GET_BOOKING,
  UPDATE_BOOKING,
  DELETE_BOOKING,
  GET_BOOKINGS,
  GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM,
  GET_ROOM_TYPE_DATE_PRICE,
  START_BOOKING
} from "../../apollo/queries";
import { MODAL_PRELOADER_SIZE } from "../../types/enum";
import { getOperationName } from "apollo-utilities";
import { DEFAULT_BOOKING } from "../../types/defaults";
import JDmodal from "../../atoms/modal/Modal";
import { totalPriceGetAveragePrice } from "../../utils/booking";
import { IBookingModalWrapProps } from "./declaration";

class UpdateBookingMu extends Mutation<updateBooking, updateBookingVariables> {}
class CreatBookingMu extends Mutation<startBooking, startBookingVariables> {}
class DeleteBookingMu extends Mutation<deleteBooking, deleteBookingVariables> {}
class GetBookingQuery extends Query<getBooking, getBookingVariables> {}
class GetPriceWithDate extends Query<
  getRoomTypeDatePrices,
  getRoomTypeDatePricesVariables
> {}

const BookingModalWrap: React.FC<IBookingModalWrapProps> = ({
  deleteBookingCallBack,
  startBookingCallBack,
  updateBookingCallBack,
  modalHook,
  context,
  ...props
}) => {
  const { house } = context;

  const Result = useMemo(
    () => (
      <GetBookingQuery
        query={GET_BOOKING}
        skip={
          isEmpty(modalHook.info) || modalHook.info.createParam !== undefined
        }
        variables={{
          bookingId: modalHook.info.bookingId || ""
        }}
      >
        {({ data: bookingData, loading: getBooking_loading }) => {
          // 쿼리결과
          const booking = queryDataFormater(
            bookingData,
            "GetBooking",
            "booking",
            undefined
          );

          // (API로 가져온 Booking 정보) + (예약 생성요청 정보)
          const mergedBooking = mergeObject(
            booking,
            modalHook.info.createParam
          );

          const priceQueryVariables:
            | getRoomTypeDatePricesVariables
            | undefined = mergedBooking
            ? {
                checkIn: mergedBooking.checkIn,
                checkOut: mergedBooking.checkOut,
                houseId: house._id,
                roomTypeIds: mergedBooking.roomTypes
                  ? mergedBooking.roomTypes.map(roomType => roomType._id)
                  : [""]
              }
            : undefined;

          return (
            <GetPriceWithDate
              skip={!priceQueryVariables}
              query={GET_ROOM_TYPE_DATE_PRICE}
              variables={priceQueryVariables}
            >
              {({ data: priceResult, loading: getPrice_loading }) => {
                const priceData = queryDataFormater(
                  priceResult,
                  "GetRoomTypeDatePrices",
                  "roomTypeDatePrices",
                  []
                );
                const placeHolederPrice = totalPriceGetAveragePrice(
                  priceData || []
                );
                return (
                  <UpdateBookingMu
                    refetchQueries={[
                      getOperationName(GET_BOOKINGS) || "",
                      getOperationName(
                        GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM
                      ) || ""
                    ]}
                    mutation={UPDATE_BOOKING}
                    onCompleted={({ UpdateBooking }) => {
                      onCompletedMessage(
                        UpdateBooking,
                        LANG("reservation_update"),
                        LANG("reservation_update_fail")
                      );
                      updateBookingCallBack &&
                        updateBookingCallBack(UpdateBooking);
                    }}
                  >
                    {updateBookingMu => (
                      <CreatBookingMu
                        mutation={START_BOOKING}
                        onCompleted={({ StartBooking }) => {
                          onCompletedMessage(
                            StartBooking,
                            LANG("reservation_creation_complete"),
                            LANG("reservation_creation_fail")
                          );
                          if (StartBooking.ok) {
                            modalHook.closeModal();
                            startBookingCallBack &&
                              startBookingCallBack(StartBooking);

                            if (modalHook.info.startBookingCallBack)
                              modalHook.info.startBookingCallBack(StartBooking);
                          }
                        }}
                        refetchQueries={[
                          getOperationName(
                            GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM
                          ) || ""
                        ]}
                      >
                        {(startBookingMu, { loading: startBookingLoading }) => (
                          <DeleteBookingMu
                            mutation={DELETE_BOOKING}
                            refetchQueries={[
                              getOperationName(GET_BOOKINGS) || "",
                              getOperationName(
                                GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM
                              ) || ""
                            ]}
                            onCompleted={({ DeleteBooking }) => {
                              onCompletedMessage(
                                DeleteBooking,
                                LANG("reservation_delete_complete"),
                                LANG("reservation_delete_fail")
                              );
                              modalHook.closeModal();

                              deleteBookingCallBack &&
                                deleteBookingCallBack(DeleteBooking);
                            }}
                          >
                            {deleteBookingMu => {
                              const bookingData = isEmpty(mergedBooking)
                                ? DEFAULT_BOOKING
                                : mergedBooking;

                              const totalLoading =
                                getBooking_loading || getPrice_loading;

                              return !totalLoading ? (
                                <BookingModal
                                  bookingData={bookingData}
                                  mode={modalHook.info.mode}
                                  context={context}
                                  loading={totalLoading}
                                  modalHook={modalHook}
                                  startBookingMu={startBookingMu}
                                  updateBookingMu={updateBookingMu}
                                  deleteBookingMu={deleteBookingMu}
                                  startBookingLoading={startBookingLoading}
                                  placeHolederPrice={placeHolederPrice}
                                  {...props}
                                  key={
                                    modalHook.info.createParam
                                      ? s4()
                                      : `bookingModal${modalHook.info.bookingId}`
                                  }
                                />
                              ) : (
                                <JDmodal {...modalHook}>
                                  <Preloader
                                    size={MODAL_PRELOADER_SIZE}
                                    noAnimation
                                    loading={totalLoading}
                                  />
                                </JDmodal>
                              );
                            }}
                          </DeleteBookingMu>
                        )}
                      </CreatBookingMu>
                    )}
                  </UpdateBookingMu>
                );
              }}
            </GetPriceWithDate>
          );
        }}
      </GetBookingQuery>
    ),
    [JSON.stringify(modalHook)]
  );

  return Result;
};

export default BookingModalWrap;
