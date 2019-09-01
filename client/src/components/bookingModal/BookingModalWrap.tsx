import React, {useMemo} from "react";
import {Query, Mutation} from "react-apollo";
import BookingModal from "./BookingModal";
import _ from "lodash";
import {IUseModal} from "../../actions/hook";
import {
  getBooking,
  getBookingVariables,
  getBooking_GetBooking_booking,
  updateBooking,
  updateBookingVariables,
  deleteBooking,
  deleteBookingVariables,
  createBooking,
  createBookingVariables,
  allocateGuestToRoom,
  allocateGuestToRoomVariables,
  RoomGender,
  getRoomTypeDatePrices,
  getRoomTypeDatePricesVariables,
  createBooking_CreateBooking,
  updateBooking_UpdateBooking,
  deleteBooking_DeleteBooking
} from "../../types/api";
import {
  queryDataFormater,
  showError,
  onCompletedMessage,
  s4,
  isEmpty
} from "../../utils/utils";
import {GB_booking} from "../../types/interface";
import Preloader from "../../atoms/preloader/Preloader";
import {
  GET_BOOKING,
  UPDATE_BOOKING,
  DELETE_BOOKING,
  GET_BOOKINGS,
  ALLOCATE_GUEST_TO_ROOM,
  GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM,
  CREATE_BOOKING,
  GET_ROOM_TYPE_DATE_PRICE
} from "../../queries";
import {BookingStatus, BookingModalType} from "../../types/enum";
import {getOperationName} from "apollo-utilities";
import {DEFAULT_BOOKING, DEFAULT_ROOMTYPE} from "../../types/defaults";
import {
  ICreateBookingInfo,
  IAssigTimelineUtils
} from "../../pages/middleServer/assig/components/assigIntrerface";
import JDmodal from "../../atoms/modal/Modal";
import {totalPriceGetAveragePrice} from "../../utils/booking";
import {IContext} from "../../pages/MiddleServerRouter";

export interface IBookingModalProp {
  createBookingCallBack?: (
    result: "error" | createBooking_CreateBooking
  ) => any;
  updateBookingCallBack?: (
    result: "error" | updateBooking_UpdateBooking
  ) => any;
  deleteBookingCallBack?: (
    result: "error" | deleteBooking_DeleteBooking
  ) => any;
  [key: string]: any;
}

interface IProps {
  context: IContext;
  modalHook: IUseModal<IBookingModalProp>;
  assigUtils?: IAssigTimelineUtils;
}

class AllocateGuestToRoomMu extends Mutation<
  allocateGuestToRoom,
  allocateGuestToRoomVariables
> {}
class UpdateBookingMu extends Mutation<updateBooking, updateBookingVariables> {}
class CreatBookingMu extends Mutation<createBooking, createBookingVariables> {}
class DeleteBookingMu extends Mutation<deleteBooking, deleteBookingVariables> {}

class GetBookingQuery extends Query<getBooking, getBookingVariables> {}
class GetPriceWithDate extends Query<
  getRoomTypeDatePrices,
  getRoomTypeDatePricesVariables
> {}

const BookingModalWrap: React.FC<IProps> = ({
  modalHook,
  context,
  assigUtils
}) => {
  const {house} = context;

  const Result = useMemo(
    () => (
      <GetBookingQuery
        query={GET_BOOKING}
        skip={isEmpty(modalHook.info) || modalHook.info.createMode}
        variables={{
          bookingId: modalHook.info.bookingId
        }}
      >
        {({data: bookingData, loading: getBooking_loading, error}) => {
          // 쿼리결과
          const booking = queryDataFormater(
            bookingData,
            "GetBooking",
            "booking",
            undefined
          );

          // ⭐️ 생성일경우
          // 생성일경우 만들어질 임시 booking
          const createInfoToBookingInfo = (
            createModaInfoes: ICreateBookingInfo
          ): GB_booking | undefined => {
            if (
              !createModaInfoes.type ||
              createModaInfoes.type !== BookingModalType.CREATE_WITH_ASSIG
            )
              return undefined;

            return {
              ...DEFAULT_BOOKING,
              agreePrivacyPolicy: true,
              bookingStatus: BookingStatus.COMPLETE,
              checkIn: createModaInfoes.checkIn,
              checkOut: createModaInfoes.checkOut,
              roomTypes: _.uniqBy(
                createModaInfoes.resvInfoes.map(resvInfo => ({
                  ...DEFAULT_ROOMTYPE,
                  _id: resvInfo.roomTypeId,
                  name: resvInfo.roomTypeName,
                  pricingType: resvInfo.group.pricingType
                })),
                "_id"
              ),
              guests: createModaInfoes.resvInfoes.map(resv => ({
                __typename: "Guest",
                _id: "",
                gender: resv.gender,
                roomType: {
                  __typename: "RoomType",
                  _id: resv.roomTypeId
                }
              }))
            };
          };

          const makeInfo = createInfoToBookingInfo(modalHook.info as any);

          //  makeInfo와 Booking 중에 맞는 값을 찾아서 query Variable 에 맞는 형태로 반환
          const priceQueryVariables:
            | getRoomTypeDatePricesVariables
            | undefined = (() => {
            const findExistObj = () =>
              isEmpty(makeInfo) ? makeInfo : booking || undefined;

            const variableMaker = (
              bookingObj?: getBooking_GetBooking_booking
            ) => {
              if (!bookingObj) return undefined;

              return {
                end: bookingObj.checkIn,
                start: bookingObj.checkOut,
                houseId: house._id,
                romTypeIds: bookingObj.guests
                  ? bookingObj.guests.map(guest => guest.roomType!._id)
                  : []
              };
            };

            return variableMaker(findExistObj());
          })();

          return (
            <GetPriceWithDate
              skip={getBooking_loading || isEmpty(priceQueryVariables)}
              query={GET_ROOM_TYPE_DATE_PRICE}
              notifyOnNetworkStatusChange
              variables={priceQueryVariables}
            >
              {({data: priceResult, loading: getPrice_loading, error}) => {
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
                  <AllocateGuestToRoomMu
                    refetchQueries={[
                      getOperationName(GET_BOOKINGS) || "",
                      getOperationName(
                        GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM
                      ) || ""
                    ]}
                    mutation={ALLOCATE_GUEST_TO_ROOM}
                  >
                    {allocateGuestToRoomMu => (
                      <UpdateBookingMu
                        refetchQueries={[
                          getOperationName(GET_BOOKINGS) || "",
                          getOperationName(
                            GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM
                          ) || ""
                        ]}
                        mutation={UPDATE_BOOKING}
                        onCompleted={({UpdateBooking}) => {
                          onCompletedMessage(
                            UpdateBooking,
                            "예약 업데이트",
                            "예약 업데이트 실패"
                          );
                        }}
                      >
                        {updateBookingMu => (
                          <CreatBookingMu
                            mutation={CREATE_BOOKING}
                            onCompleted={({CreateBooking}) => {
                              if (modalHook.info.createBookingCallBack)
                                modalHook.info.createBookingCallBack(
                                  CreateBooking
                                );
                              onCompletedMessage(
                                CreateBooking,
                                "예약 생성 완료",
                                "예약 생성 실패"
                              );
                              if (CreateBooking.ok) {
                                modalHook.closeModal();
                              }
                            }}
                            refetchQueries={[
                              getOperationName(
                                GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM
                              ) || ""
                            ]}
                          >
                            {(
                              createBookingMu,
                              {loading: createBookingLoading}
                            ) => (
                              <DeleteBookingMu
                                mutation={DELETE_BOOKING}
                                refetchQueries={[
                                  getOperationName(GET_BOOKINGS) || "",
                                  getOperationName(
                                    GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM
                                  ) || ""
                                ]}
                                onCompleted={({DeleteBooking}) => {
                                  onCompletedMessage(
                                    DeleteBooking,
                                    "예약 삭제 완료",
                                    "예약 삭제 실패"
                                  );
                                  modalHook.closeModal();
                                }}
                              >
                                {deleteBookingMu => {
                                  const bookingData =
                                    booking || makeInfo || DEFAULT_BOOKING;
                                  const totalLoading =
                                    getBooking_loading || getPrice_loading;

                                  return !totalLoading ? (
                                    <BookingModal
                                      bookingData={bookingData}
                                      assigInfo={modalHook.info.assigInfo}
                                      type={modalHook.info.type}
                                      context={context}
                                      loading={totalLoading}
                                      modalHook={modalHook}
                                      createBookingMu={createBookingMu}
                                      updateBookingMu={updateBookingMu}
                                      deleteBookingMu={deleteBookingMu}
                                      createBookingLoading={
                                        createBookingLoading
                                      }
                                      placeHolederPrice={placeHolederPrice}
                                      allocateGuestToRoomMu={
                                        allocateGuestToRoomMu
                                      }
                                      key={`bookingModal${modalHook.info.bookingId}`}
                                    />
                                  ) : (
                                    <JDmodal {...modalHook}>
                                      <Preloader
                                        size="large"
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
                    )}
                  </AllocateGuestToRoomMu>
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
