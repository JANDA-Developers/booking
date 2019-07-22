/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from "react";
import {Query} from "react-apollo";
import RoomTypeCard from "./roomTypeCard";
import {
  ErrProtecter,
  queryDataFormater,
  showError,
  isEmpty
} from "../../../../utils/utils";
import {
  GuestPartInput,
  getAvailableGuestCount,
  getAvailableGuestCountVariables,
  getAppliedPriceWithDateRange,
  getAppliedPriceWithDateRangeVariables,
  BookerInput,
  getAppliedPriceWithDateRangeForBooker,
  getAppliedPriceWithDateRangeForBookerVariables,
  getRoomTypeDatePrices,
  getRoomTypeDatePricesVariables,
  getRoomTypeDatePricesForBooker,
  getRoomTypeDatePricesForBookerVariables
} from "../../../../types/api";
import {
  GET_AVAILABLE_GUEST_COUNT,
  GET_APPLIED_PRICE_WITH_DATE,
  GET_APPLIED_PRICE_WITH_DATE_RANGE_FOR_BOOKER,
  GET_ROOM_TYPE_DATE_PRICE,
  GET_ROOM_TYPE_DATE_PRICE_FOR_BOOKER
} from "../../../../queries";
import {IUseModal, IUseDayPicker} from "../../../../actions/hook";
import {setYYYYMMDD} from "../../../../utils/setMidNight";
import {IRoomType} from "../../../../types/interface";
import {truePriceFinder, getAveragePrice} from "../../../../utils/booking";
import moment from "moment";

class GetAvailGuestCountQu extends Query<
  getAvailableGuestCount,
  getAvailableGuestCountVariables
> {}
class GetAppliedPriceWithDate extends Query<
  getRoomTypeDatePricesForBooker,
  getRoomTypeDatePricesForBookerVariables
> {}

export interface IGuestCount {
  male: number;
  female: number;
  room: number;
}

interface IProps {
  resvRooms: GuestPartInput[];
  setResvRooms: React.Dispatch<React.SetStateAction<GuestPartInput[]>>;
  roomInfoHook: any;
  windowWidth: any;
  toastModalHook: IUseModal;
  dayPickerHook: IUseDayPicker;
  roomTypeData: IRoomType;
  setBookingInfo: React.Dispatch<React.SetStateAction<BookerInput>>;
  bookingInfo: BookerInput;
}

// 하우스 아이디를 우선 Props를 통해서 받아야함
const RoomTypeCardsWrap: React.SFC<IProps> = ({
  resvRooms,
  roomInfoHook,
  setResvRooms,
  windowWidth,
  toastModalHook,
  dayPickerHook,
  roomTypeData,
  setBookingInfo,
  bookingInfo
}) => {
  // 이건 독립 state용이다. 실제 선택된것은 resvRooms에 있으며 이건 선택완료 누르기 전까지의 상태이다.
  const [guestCountValue, setGuestCount] = useState<IGuestCount>({
    male: 0,
    female: 0,
    room: 0
  });

  return (
    // 하나의 방타입에 하나의 카드
    <GetAvailGuestCountQu
      query={GET_AVAILABLE_GUEST_COUNT}
      fetchPolicy="network-only"
      variables={{
        start: setYYYYMMDD(dayPickerHook.from),
        end: setYYYYMMDD(dayPickerHook.to),
        femalePadding: guestCountValue.female,
        malePadding: guestCountValue.male,
        roomTypeId: roomTypeData._id
      }}
    >
      {({data: roomCapacity, loading: countLoading, error}) => {
        showError(error);

        // 상대편 최대값은 알수있어도 스스로의 최대값이 변해버리기 때문에 두개가됨
        // 🏠 방타입의 경우에는 둘중 아무거나 조회해도 상관없음
        const maleCount = queryDataFormater(
          roomCapacity,
          "GetMale",
          "roomCapacity",
          undefined
        );
        const femaleCount = queryDataFormater(
          roomCapacity,
          "GetFemale",
          "roomCapacity",
          undefined
        );
        const availableCount = {
          maleCount,
          femaleCount
        };

        return (
          <GetAppliedPriceWithDate
            skip={dayPickerHook.to === null}
            variables={{
              end: setYYYYMMDD(moment(dayPickerHook.to!)),
              start: setYYYYMMDD(dayPickerHook.from),
              roomTypeIds: [roomTypeData._id]
            }}
            query={GET_ROOM_TYPE_DATE_PRICE_FOR_BOOKER}
          >
            {({data: priceData, loading: priceLoading, error}) => {
              showError(error);
              const roomPrices = queryDataFormater(
                priceData,
                "GetRoomTypeDatePricesForBooker",
                "roomTypeDatePrices",
                undefined
              );

              const truePrice = getAveragePrice(
                !isEmpty(roomPrices) ? roomPrices[0].datePrices || [] : []
              );

              const formattedTruePrice = Math.floor(truePrice / 10) * 10;

              return (
                <RoomTypeCard
                  resvRooms={resvRooms}
                  countLoading={countLoading}
                  setResvRooms={setResvRooms}
                  roomTypeData={roomTypeData}
                  roomInfoHook={roomInfoHook}
                  windowWidth={windowWidth}
                  toastModalHook={toastModalHook}
                  availableCount={availableCount}
                  setGuestCount={setGuestCount}
                  guestCountValue={guestCountValue}
                  dayPickerHook={dayPickerHook}
                  truePrice={formattedTruePrice}
                  setBookingInfo={setBookingInfo}
                  bookingInfo={bookingInfo}
                  priceLoading={priceLoading}
                />
              );
            }}
          </GetAppliedPriceWithDate>
        );
      }}
    </GetAvailGuestCountQu>
  );
};

export default ErrProtecter(RoomTypeCardsWrap);
