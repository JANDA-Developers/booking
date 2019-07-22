import React from "react";
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
  getRoomTypeDatePricesVariables
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
import {ICreateBookingInfo} from "../../pages/middleServer/assig/components/assigIntrerface";
import JDmodal from "../../atoms/modal/Modal";
import {totalPriceGetAveragePrice} from "../../utils/booking";

interface IProps {
  modalHook: IUseModal;
  houseId: string;
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
// 🆔 음 여기서 예약 변동 가능 범위를 받아야할것 같은뎅?
// 🆔 여기서 쿼리로 북커 인포를 받아야함
// 🆔 예약삭제 뮤테이션
// 🆔 예약변경 뮤테이션
// 🆔 예약생성 뮤테이션

const BookingModalWrap: React.FC<IProps> = ({modalHook, houseId}) => (
  <GetBookingQuery
    query={GET_BOOKING}
    skip={isEmpty(modalHook.info) || modalHook.info.createMode}
    variables={{
      bookingId: modalHook.info.bookingId
    }}
  >
    {({data: bookingData, loading: getBooking_loading, error}) => {
      showError(error);

      // 쿼리결과
      const booking = queryDataFormater(
        bookingData,
        "GetBooking",
        "booking",
        undefined
      );

      // ⭐️ 생성일경우
      // 생성일경우 만들어질 임시 booking
      let makeInfo: GB_booking | undefined = undefined;
      if (
        modalHook.info.type &&
        modalHook.info.type === BookingModalType.CREATE_WITH_ASSIG
      ) {
        const createModaInfoes: ICreateBookingInfo = modalHook.info;

        makeInfo = {
          ...DEFAULT_BOOKING,
          agreePrivacyPolicy: true,
          bookingStatus: BookingStatus.COMPLETE,
          start: createModaInfoes.start,
          end: createModaInfoes.end,
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
      }

      const priceVariables = (() => {
        const valueFinedr = (
          obj?: getBooking_GetBooking_booking,
          obj2?: getBooking_GetBooking_booking
        ) => {
          const exsistObj = isEmpty(obj) ? obj : obj2;

          return {
            end: exsistObj ? exsistObj.end : new Date(),
            start: exsistObj ? exsistObj.end : new Date(),
            houseId: houseId,
            romTypeIds:
              exsistObj && exsistObj.guests
                ? exsistObj.guests.map(guest => guest.roomType!._id)
                : []
          };
        };

        return valueFinedr(makeInfo, booking || undefined);
      })();

      return (
        <GetPriceWithDate
          skip={getBooking_loading}
          query={GET_ROOM_TYPE_DATE_PRICE}
          notifyOnNetworkStatusChange
          variables={priceVariables}
        >
          {({data: priceResult, loading: getPrice_loading, error}) => {
            showError(error);
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
                  getOperationName(GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM) ||
                    ""
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
                    onError={showError}
                    onCompleted={({UpdateBooking}) => {
                      onCompletedMessage(
                        UpdateBooking,
                        "예약자 업데이트",
                        "예약자 업데이트 실패"
                      );
                    }}
                  >
                    {updateBookingMu => (
                      <CreatBookingMu
                        mutation={CREATE_BOOKING}
                        onError={showError}
                        onCompleted={({CreateBooking}) => {
                          onCompletedMessage(
                            CreateBooking,
                            "예약 생성 완료",
                            "예약자 생성 실패"
                          );
                          if (CreateBooking.ok) {
                            modalHook.closeModal();
                          }
                          // TODO 여기에 컬백으로 배정
                          // allocateGuestToRoomMu({
                          //   variables: {
                          //     bedIndex:
                          //   }
                          // })
                        }}
                      >
                        {createBookingMu => (
                          <DeleteBookingMu
                            mutation={DELETE_BOOKING}
                            onError={showError}
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
                                  houseId={houseId}
                                  loading={totalLoading}
                                  modalHook={modalHook}
                                  createBookingMu={createBookingMu}
                                  updateBookingMu={updateBookingMu}
                                  deleteBookingMu={deleteBookingMu}
                                  placeHolederPrice={placeHolederPrice}
                                  allocateGuestToRoomMu={allocateGuestToRoomMu}
                                  key={`bookingModal${
                                    modalHook.info.bookingId
                                  }`}
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
);

export default BookingModalWrap;
