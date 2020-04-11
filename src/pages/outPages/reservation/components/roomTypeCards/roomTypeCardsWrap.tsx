/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, Fragment } from "react";
import RoomTypeCard from "./roomTypeCard";
import {
  ErrProtecter,
  queryDataFormater,
  instanceOfA
} from "../../../../../utils/utils";
import {
  getRoomTypeInfo,
  getRoomTypeInfoVariables
} from "../../../../../types/api";
import { GET_ROOM_TYPE_INFO } from "../../../../../apollo/queries";
import client from "../../../../../apollo/apolloClient";
import { to4YMMDD } from "../../../../../utils/setMidNight";
import { IRoomType, TDomitoryCapacity } from "../../../../../types/interface";
import { getAveragePrice } from "../../../../../utils/booking";
import { Gender } from "../../../../../types/enum";
import { useQuery } from "@apollo/react-hooks";
import { IReservationHooks } from "../../declation";
import { PortalPreloader } from "../../../../../utils/portalElement";

export interface IGuestCount {
  male: number;
  female: number;
  room: number;
  initGender: Gender;
}

interface IProps {
  windowWidth: any;
  roomTypeData: IRoomType;
  reservationHooks: IReservationHooks;
  lastCard: boolean;
  isHost?: boolean;
  houseId?: string;
}

// 하우스 아이디를 우선 Props를 통해서 받아야함
const RoomTypeCardWrap: React.SFC<IProps> = ({
  reservationHooks,
  windowWidth,
  roomTypeData,
  lastCard,
  houseId,
  isHost
}) => {
  const { dayPickerHook } = reservationHooks;
  const [guestCountValue, setGuestCount] = useState<IGuestCount>({
    male: 0,
    female: 0,
    room: 0,
    initGender: Gender.MALE
  });
  const checkIn = to4YMMDD(dayPickerHook.from);
  const checkOut = to4YMMDD(dayPickerHook.to);
  const initMale = guestCountValue.initGender === Gender.MALE;
  const initCount = initMale ? guestCountValue.male : guestCountValue.female;

  const roomTypeId = roomTypeData._id;
  const shouldSkip = () =>
    checkIn && checkOut && checkIn != checkOut ? false : true;
  const { data, loading: countLoading, networkStatus } = useQuery<
    getRoomTypeInfo,
    getRoomTypeInfoVariables
  >(GET_ROOM_TYPE_INFO, {
    client,
    notifyOnNetworkStatusChange: true,
    skip: shouldSkip(),
    variables: {
      roomTypeId,
      GetRoomTypeDatePricesInput: {
        checkOut,
        checkIn,
        houseId,
        roomTypeIds: [roomTypeId]
      },
      RoomTypeCapacityInput: {
        checkInOut: {
          checkIn,
          checkOut
        },
        initValue: {
          count: initCount,
          gender: guestCountValue.initGender
        }
      }
    }
  });
  const roomTypeDatePrices =
    queryDataFormater(
      data,
      "GetRoomTypeDatePrices",
      "roomTypeDatePrices",
      []
    ) || [];

  const roomType =
    queryDataFormater(data, "GetRoomTypeById", "roomType", undefined) ||
    undefined;

  if (networkStatus === 1)
    return (
      <Fragment>
        <div className="roomTypeCard roomTypeCard--loadingCard" />
        <PortalPreloader loading={countLoading} />
      </Fragment>
    );

  if (!roomType) {
    console.error(`can not load roomType with this id ${roomTypeId}`);
    return <div />;
  }

  if (roomTypeData.roomCount === 0) return <div />;

  let availableCount = {
    maleCount: 0,
    femaleCount: 0,
    roomCount: 0
  };

  if (instanceOfA<TDomitoryCapacity>(roomType.capacity, "availableCount")) {
    const {
      availableCount: { female, male }
    } = roomType.capacity;
    availableCount = {
      femaleCount: female,
      maleCount: male,
      roomCount: 0
    };
  } else {
    const { count } = roomType.capacity;
    availableCount = {
      femaleCount: 0,
      maleCount: 0,
      roomCount: count
    };
  }

  const truePrice = getAveragePrice(roomTypeDatePrices[0]?.datePrices || []);

  const formattedTruePrice = Math.floor(truePrice / 10) * 10;

  return (
    <RoomTypeCard
      roomTypeData={roomTypeData}
      windowWidth={windowWidth}
      availableCount={availableCount}
      setGuestCount={setGuestCount}
      guestCountValue={guestCountValue}
      truePrice={formattedTruePrice}
      lastCard={lastCard}
      reservationHooks={reservationHooks}
    />
  );
};

export default ErrProtecter(RoomTypeCardWrap);
