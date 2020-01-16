import React from "react";
import { Query, Mutation } from "react-apollo";
import BookingModal from "./BookingModal";
import _ from "lodash";
import { LANG } from "../../hooks/hook";
import {
  getBooking,
  getBookingVariables,
  updateBooking,
  updateBookingVariables,
  deleteBooking,
  deleteBookingVariables,
  startBooking,
  refundBooking,
  refundBookingVariables,
  startBookingVariables,
  getRoomTypeDatePrices,
  getRoomTypeDatePricesVariables
} from "../../types/api";
import {
  queryDataFormater,
  onCompletedMessage,
  isEmpty,
  mergeObject,
  s4
} from "../../utils/utils";
import {
  GET_BOOKING,
  UPDATE_BOOKING,
  DELETE_BOOKING,
  GET_BOOKINGS,
  GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM,
  START_BOOKING,
  GET_ROOM_TYPES_DATE_PRICE,
  REFUND_BOOKING
} from "../../apollo/queries";
import client from "../../apollo/apolloClient";
import { getOperationName } from "apollo-utilities";
import { DEFAULT_BOOKING } from "../../types/defaults";
import { totalPriceGetAveragePrice } from "../../utils/booking";
import { IBookingModalWrapProps } from "./declaration";
import moment from "moment";
import PreloaderModal from "../../atoms/preloaderModal/PreloaderModal";
import { useMutation } from "@apollo/react-hooks";

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
  const [refundMu, { data, loading: cancelLoading }] = useMutation<
    refundBooking,
    refundBookingVariables
  >(REFUND_BOOKING, {
    client,
    onCompleted: ({ CancelBooking }) => {
      onCompletedMessage(
        CancelBooking,
        LANG("refund_complete"),
        LANG("refund_fail")
      );
    }
  });

  const refundFn = (variables: refundBookingVariables) => {
    const { bookingNum, refundInfo } = variables.param;
    refundMu({
      variables: {
        param: {
          bookingNum,
          refundInfo
        }
      }
    });
  };

  return (
    <GetBookingQuery
      query={GET_BOOKING}
      skip={isEmpty(modalHook.info) || modalHook.info.createParam !== undefined}
      variables={{
        param: {
          bookingId: modalHook.info.bookingId || ""
        }
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
        const mergedBooking = mergeObject(booking, modalHook.info.createParam);

        let priceQueryVariables:
          | getRoomTypeDatePricesVariables
          | undefined = undefined;

        if (mergedBooking) {
          const { checkIn, checkOut, roomTypes } = mergedBooking;
          priceQueryVariables = {
            param: {
              checkIn: moment(checkIn).format("YYYY-MM-DD"),
              checkOut: moment(checkOut).format("YYYY-MM-DD"),
              houseId: house._id,
              roomTypeIds: roomTypes?.map(roomType => roomType._id) || [""]
            }
          };
        }

        return (
          <GetPriceWithDate
            skip={!priceQueryVariables}
            query={GET_ROOM_TYPES_DATE_PRICE}
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
                    getOperationName(GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM) ||
                      ""
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
                      awaitRefetchQueries
                      onCompleted={({ StartBooking }) => {
                        onCompletedMessage(
                          StartBooking,
                          LANG("reservation_creation_complete"),
                          LANG("reservation_creation_fail"),
                          "StartBooking"
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
                        getOperationName(GET_BOOKINGS) || "",
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
                          awaitRefetchQueries
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
                                refundFn={refundFn}
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
                              <PreloaderModal loading={true} />
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
  );
};

// 이모달은 포퍼몬스를 이유로 열고 닫히는 순간에만 업데이트 합니다.
export default React.memo(
  BookingModalWrap,
  (prevProp, nextProp) =>
    prevProp.modalHook.isOpen === nextProp.modalHook.isOpen
);
