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
  getAvailableGuestCountVariables
} from "../../../../types/api";
import {GET_AVAILABLE_GUEST_COUNT} from "../../../../queries";
import {IUseModal, IUseDayPicker} from "../../../../actions/hook";
import {setYYYYMMDD} from "../../../../utils/setMidNight";
import {IRoomType} from "../../../../types/interface";

class GetAvailGuestCountQu extends Query<
  getAvailableGuestCount,
  getAvailableGuestCountVariables
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
  roomTypeData
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
          <RoomTypeCard
            resvRooms={resvRooms}
            setResvRooms={setResvRooms}
            roomTypeData={roomTypeData}
            roomInfoHook={roomInfoHook}
            windowWidth={windowWidth}
            toastModalHook={toastModalHook}
            availableCount={availableCount}
            setGuestCount={setGuestCount}
            guestCountValue={guestCountValue}
          />
        );
      }}
    </GetAvailGuestCountQu>
  );
};

export default ErrProtecter(RoomTypeCardsWrap);
