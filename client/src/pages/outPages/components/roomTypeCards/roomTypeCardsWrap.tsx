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
  BookerInput,
  getRoomTypeDatePricesForBooker,
  getRoomTypeDatePricesForBookerVariables,
  getCapacityToRoomType,
  getCapacityToRoomTypeVariables
} from "../../../../types/api";
import {
  GET_ROOM_TYPE_DATE_PRICE_FOR_BOOKER,
  GET_CAPACITY_TO_ROOM_TYPE
} from "../../../../queries";
import {IUseModal, IUseDayPicker} from "../../../../actions/hook";
import {setYYYYMMDD} from "../../../../utils/setMidNight";
import {IRoomType} from "../../../../types/interface";
import {getAveragePrice} from "../../../../utils/booking";
import moment from "moment";
import {Gender} from "../../../../types/enum";
import {IBookerInfo, IReservationHooks} from "../../reservation/Reservation";
import {isDeveloper} from "../../../../utils/developMaster";

class GetAvailGuestCountQu extends Query<
  getCapacityToRoomType,
  getCapacityToRoomTypeVariables
> {}
class GetRoomTypeDatePricesForBooker extends Query<
  getRoomTypeDatePricesForBooker,
  getRoomTypeDatePricesForBookerVariables
> {}

export interface IGuestCount {
  male: number;
  female: number;
  room: number;
  get: Gender;
}

interface IProps {
  windowWidth: any;
  roomTypeData: IRoomType;
  reservationHooks: IReservationHooks;
}

// 하우스 아이디를 우선 Props를 통해서 받아야함
const RoomTypeCardsWrap: React.SFC<IProps> = ({
  reservationHooks,
  windowWidth,
  roomTypeData
}) => {
  const {
    toastModalHook,
    setResvRooms,
    roomInfoHook,
    resvRooms,
    priceHook,
    dayPickerHook
  } = reservationHooks;
  // 이건 독립 state용이다. 실제 선택된것은 resvRooms에 있으며 이건 선택완료 누르기 전까지의 상태이다.
  const [guestCountValue, setGuestCount] = useState<IGuestCount>({
    male: isDeveloper() ? 1 : 0,
    female: 0,
    room: 0,
    get: Gender.MALE
  });

  if (roomTypeData.roomCount === 0) return <div />;

  return (
    // 하나의 방타입에 하나의 카드
    <GetAvailGuestCountQu
      skip={roomTypeData.roomCount === 0}
      query={GET_CAPACITY_TO_ROOM_TYPE}
      variables={{
        start: setYYYYMMDD(dayPickerHook.from),
        end: setYYYYMMDD(
          moment(dayPickerHook.to!)
            .add(-1, "day")
            .toDate()
        ),
        initValue: {
          count:
            guestCountValue.get === Gender.FEMALE
              ? guestCountValue.female
              : guestCountValue.male,
          gender: guestCountValue.get
        },
        roomTypeId: roomTypeData._id
      }}
    >
      {({data, loading: countLoading, error}) => {
        // 상대편 최대값은 알수있어도 스스로의 최대값이 변해버리기 때문에 두개가됨
        // 🏠 방타입의 경우에는 둘중 아무거나 조회해도 상관없음
        const count = queryDataFormater(
          data,
          "GetCapacityToRoomType",
          "capacityRoomType",
          undefined
        );

        let availableCount = {
          maleCount: 0,
          femaleCount: 0,
          roomCount: 0
        };

        if (count) {
          if (count.__typename === "CapacityRoomTypeDomitory") {
            availableCount = {
              maleCount: count.availableCount.male,
              femaleCount: count.availableCount.female,
              roomCount: 0
            };
          } else {
            availableCount = {
              maleCount: 0,
              femaleCount: 0,
              roomCount: count.count
            };
          }
        }

        return (
          <GetRoomTypeDatePricesForBooker
            skip={dayPickerHook.to === null}
            variables={{
              end: setYYYYMMDD(moment(dayPickerHook.to!)),
              start: setYYYYMMDD(dayPickerHook.from),
              roomTypeIds: [roomTypeData._id]
            }}
            query={GET_ROOM_TYPE_DATE_PRICE_FOR_BOOKER}
          >
            {({data: priceData, loading: priceLoading, error}) => {
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
                  countLoading={countLoading}
                  roomTypeData={roomTypeData}
                  windowWidth={windowWidth}
                  availableCount={availableCount}
                  setGuestCount={setGuestCount}
                  guestCountValue={guestCountValue}
                  truePrice={formattedTruePrice}
                  priceLoading={priceLoading}
                  reservationHooks={reservationHooks}
                />
              );
            }}
          </GetRoomTypeDatePricesForBooker>
        );
      }}
    </GetAvailGuestCountQu>
  );
};

export default ErrProtecter(RoomTypeCardsWrap);
