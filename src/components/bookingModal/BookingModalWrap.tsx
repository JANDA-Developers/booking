import React, { Fragment } from "react";
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
  makeBooking,
  refundBooking,
  refundBookingVariables,
  makeBookingVariables,
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
  MAKE_BOOKING,
  GET_ROOM_TYPES_DATE_PRICE,
  REFUND_BOOKING,
  GET_ALL_GUEST_AND_BLOCK,
  CANCLE_BOOKING
} from "../../apollo/queries";
import client from "../../apollo/apolloClient";
import { getOperationName } from "apollo-utilities";
import { DEFAULT_BOOKING } from "../../types/defaults";
import { totalPriceGetAveragePrice } from "../../utils/booking";
import { IBookingModalWrapProps } from "./declaration";
import { cancelBooking, cancelBookingVariables } from "../../types/api";
import moment from "moment";
import PreloaderModal from "../../atoms/preloaderModal/PreloaderModal";
import { useMutation } from "@apollo/react-hooks";

class UpdateBookingMu extends Mutation<updateBooking, updateBookingVariables> { }
class CreatBookingMu extends Mutation<makeBooking, makeBookingVariables> { }
class DeleteBookingMu extends Mutation<deleteBooking, deleteBookingVariables> { }
class GetBookingQuery extends Query<getBooking, getBookingVariables> { }
class GetPriceWithDate extends Query<
  getRoomTypeDatePrices,
  getRoomTypeDatePricesVariables
  > { }

const BookingModalWrap: React.FC<IBookingModalWrapProps> = ({
  deleteBookingCallBack,
  makeBookingCallBack,
  updateBookingCallBack,
  modalHook,
  context,
  ...props
}) => {
  const { house } = context;

  const refetchQueries = [
    getOperationName(GET_BOOKINGS) || "",
    getOperationName(GET_ALL_GUEST_AND_BLOCK) || ""
  ]

  const [cancelBookingMu, { loading: cancelBookingLoading }] = useMutation<
    cancelBooking,
    cancelBookingVariables
  >(CANCLE_BOOKING, {
    client,
    refetchQueries,
    ignoreResults: true,
    onCompleted: ({ CancelBooking }) => {
      onCompletedMessage(
        CancelBooking,
        LANG("assig_completed"),
        LANG("assig_failed")
      );
    }
  });

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

              let dataTemp: {
                roomTypeId: string;
                count: number;
              }[] = [];

              if (mergedBooking) {
                const { guests, roomTypes } = mergedBooking;
                if (roomTypes && guests) {
                  dataTemp = roomTypes?.map(rt => ({
                    roomTypeId: rt._id,
                    count: guests!.filter(g => g.roomType._id === rt._id).length
                  }));
                }
              }

              const placeHolederPrice = totalPriceGetAveragePrice(
                priceData || [],
                false,
                dataTemp
              );
              return (
                <UpdateBookingMu
                  refetchQueries={refetchQueries}
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
                      mutation={MAKE_BOOKING}
                      awaitRefetchQueries
                      onCompleted={({ MakeBooking }) => {
                        onCompletedMessage(
                          MakeBooking,
                          LANG("reservation_creation_complete"),
                          LANG("reservation_creation_fail"),
                          "MakeBooking"
                        );
                        if (MakeBooking.ok) {
                          makeBookingCallBack &&
                            makeBookingCallBack(MakeBooking);

                          modalHook.closeModal();
                          if (modalHook.info.makeBookingCallBack)
                            modalHook.info.makeBookingCallBack(MakeBooking);
                        }
                      }}
                      refetchQueries={refetchQueries}
                    >
                      {(makeBookingMu, { loading: makeBookingLoading }) => (
                        <DeleteBookingMu
                          mutation={DELETE_BOOKING}
                          refetchQueries={refetchQueries}
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

                            return (
                              <Fragment>
                                <PreloaderModal loading={totalLoading} />
                                {!totalLoading && (
                                  <BookingModal
                                    bookingData={bookingData}
                                    mode={modalHook.info.mode}
                                    context={context}
                                    loading={totalLoading}
                                    modalHook={modalHook}
                                    cancelBookingMu={cancelBookingMu}
                                    makeBookingMu={makeBookingMu}
                                    updateBookingMu={updateBookingMu}
                                    deleteBookingMu={deleteBookingMu}
                                    makeBookingLoading={makeBookingLoading}
                                    placeHolederPrice={placeHolederPrice}
                                    {...props}
                                    key={
                                      modalHook.info.createParam
                                        ? s4()
                                        : `bookingModal${modalHook.info.bookingId}`
                                    }
                                  />
                                )}
                              </Fragment>
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
