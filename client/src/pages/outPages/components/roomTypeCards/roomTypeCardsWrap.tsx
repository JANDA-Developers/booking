/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from "react";
import {Query} from "react-apollo";
import RoomTypeCard from "./roomTypeCard";
import {
  ErrProtecter,
  queryDataFormater,
  showError
} from "../../../../utils/utils";
import {
  GuestPartInput,
  getAvailableGuestCount,
  getAvailableGuestCountVariables,
  getAppliedPriceWithDateRange,
  getAppliedPriceWithDateRangeVariables,
  BookerInput,
  getAvailableGuestCountForBooker,
  getAvailableGuestCountForBookerVariables,
  getAppliedPriceWithDateRangeForBooker,
  getAppliedPriceWithDateRangeForBookerVariables
} from "../../../../types/api";
import {
  GET_AVAILABLE_GUEST_COUNT,
  GET_APPLIED_PRICE_WITH_DATE,
  GET_APPLIED_PRICE_WITH_DATE_RANGE_FOR_BOOKER
} from "../../../../queries";
import {IUseModal, IUseDayPicker} from "../../../../actions/hook";
import {setYYYYMMDD} from "../../../../utils/setMidNight";
import {IRoomType} from "../../../../types/interface";
import {truePriceFinder} from "../../../../utils/booking";

class GetAvailGuestCountQu extends Query<
  getAvailableGuestCountForBooker,
  getAvailableGuestCountForBookerVariables
> {}
class GetAppliedPriceWithDate extends Query<
  getAppliedPriceWithDateRangeForBooker,
  getAppliedPriceWithDateRangeForBookerVariables
> {}

export interface IGuestCount {
  male: number;
  female: number;
  room: number;
}

interface IProps {
  houseId: string;
  resvRooms: GuestPartInput[];
  setResvRooms: React.Dispatch<React.SetStateAction<GuestPartInput[]>>;
  roomInfoHook: any;
  windowWidth: any;
  toastModalHook: IUseModal;
  dayPickerHook: IUseDayPicker;
  roomTypeData: IRoomType;
  setBookerInfo: React.Dispatch<React.SetStateAction<BookerInput>>;
  bookerInfo: BookerInput;
}

// 하우스 아이디를 우선 Props를 통해서 받아야함
const RoomTypeCardsWrap: React.SFC<IProps> = ({
  houseId,
  resvRooms,
  roomInfoHook,
  setResvRooms,
  windowWidth,
  toastModalHook,
  dayPickerHook,
  roomTypeData,
  setBookerInfo,
  bookerInfo
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
            variables={{
              end: dayPickerHook.to,
              start: dayPickerHook.from,
              roomTypeId: roomTypeData._id
            }}
            query={GET_APPLIED_PRICE_WITH_DATE_RANGE_FOR_BOOKER}
          >
            {({data: priceData, loading, error}) => {
              const seasonPrices = queryDataFormater(
                priceData,
                "GetAppliedPriceWithDateRangeForBooker",
                "seasonPrices",
                undefined
              );
              const specificPrices = queryDataFormater(
                priceData,
                "GetAppliedPriceWithDateRangeForBooker",
                "roomPrices",
                undefined
              );
              const truePrice = truePriceFinder(
                roomTypeData.defaultPrice,
                seasonPrices,
                specificPrices,
                dayPickerHook.from,
                dayPickerHook.to
              );

              console.log("💖 truePrice");
              console.log(truePrice);

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
                  truePrice={truePrice}
                  setBookerInfo={setBookerInfo}
                  bookerInfo={bookerInfo}
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
