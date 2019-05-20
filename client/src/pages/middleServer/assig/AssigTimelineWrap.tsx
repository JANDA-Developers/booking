/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from "react";
import {Query, Mutation} from "react-apollo";
import moment from "moment-timezone";
import _ from "lodash";
import assigDefaultProps from "./timelineConfig";
import {
  getAllRoomTypeWithGuest,
  getAllRoomTypeWithGuestVariables,
  allocateGuestToRoom,
  allocateGuestToRoomVariables,
  updateBooker,
  updateBookerVariables
} from "../../../types/api";
import {useToggle, useDayPicker} from "../../../actions/hook";
import {IRoomType, IGuests} from "../../../types/interface";
import {
  isEmpty,
  setMidNight,
  showError,
  queryDataFormater,
  onCompletedMessage
} from "../../../utils/utils";
import EerrorProtect from "../../../utils/errProtect";
import {Gender} from "../../../types/enum";
import {
  GET_ALL_ROOMTYPES_WITH_GUESTS,
  ALLOCATE_GUEST_TO_ROOM,
  UPDATE_BOOKER
} from "../../../queries";
import AssigTimeline from "./AssigTimeline";
import {setYYYYMMDD, parallax} from "../../../utils/setMidNight";

moment.tz.setDefault("UTC");

class UpdateBookerMu extends Mutation<updateBooker, updateBookerVariables> {}

export interface IAssigGroup {
  id: string;
  title: string;
  roomTypeId: string;
  roomTypeIndex: number;
  roomIndex: number;
  roomType: IRoomType;
  roomId: string;
  placeIndex: number;
  isLastOfRoom: boolean;
  isLastOfRoomType: boolean;
  bedIndex: number;
}

export interface IAssigItem {
  id: string;
  guestIndex: number;
  name: string;
  group: string;
  bookerId: string;
  isCheckin: boolean;
  roomTypeId: string;
  roomId: string;
  bedIndex: number;
  start: number;
  end: number;
  gender: Gender | null;
  isUnsettled: boolean;
  validate: IAssigItemCrush[];
  type: "normal" | "mark" | "make" | "block";
}

export const defaultItemProps = {
  guestIndex: -1,
  name: "",
  group: "",
  bookerId: "",
  isCheckin: false,
  roomTypeId: "",
  roomId: "",
  start: 0,
  end: 0,
  gender: null,
  bedIndex: -1,
  isUnsettled: false,
  validate: []
};

export interface IAssigItemCrush {
  guestIndex: number;
  reason: string;
  start: number | null;
  end: number | null;
}

interface IProps {
  houseId: string;
}

class GetAllRoomTypeWithGuestQuery extends Query<
  getAllRoomTypeWithGuest,
  getAllRoomTypeWithGuestVariables
> {}
class AllocateGuestToRoomMu extends Mutation<
  allocateGuestToRoom,
  allocateGuestToRoomVariables
> {}

const AssigTimelineWrap: React.SFC<IProps> = ({houseId}) => {
  const dayPickerHook = useDayPicker(null, null);
  const defaultStartDate = dayPickerHook.from
    ? moment(dayPickerHook.from).valueOf()
    : moment().valueOf();
  const defaultEndDate = setMidNight(
    dayPickerHook.from
      ? moment(dayPickerHook.from)
          .add(7, "days")
          .valueOf()
      : moment()
          .add(7, "days")
          .valueOf()
  );
  const [dataTime, setDataTime] = useState({
    start: setMidNight(
      moment()
        .subtract(5, "days")
        .valueOf()
    ),
    end: setMidNight(
      moment()
        .add(14, "days")
        .valueOf()
    )
  });

  //  TODO: 메모를 사용해서 데이터를 아끼자
  // 게스트 데이터를 달력에서 쓸수있는 Item 데이터로 변경 절차
  const guestsDataManufacture = (
    guestsData: IGuests[] | null | undefined = []
  ) => {
    const alloCateItems: IAssigItem[] = [];
    if (!guestsData) return alloCateItems;

    guestsData.forEach((guestData, index) => {
      const isDomitory = guestData.pricingType === "DOMITORY";

      if (
        guestData &&
        guestData.booking &&
        guestData.roomType &&
        guestData.allocatedRoom
      ) {
        alloCateItems.push({
          id: guestData._id,
          guestIndex: index,
          name: guestData.name,
          bookerId: guestData.booking.booker._id,
          isCheckin: guestData.booking.booker.isCheckIn,
          gender: guestData.gender,
          roomTypeId: guestData.roomType._id,
          roomId: guestData.allocatedRoom._id,
          isUnsettled: guestData.isUnsettled,
          group: guestData.allocatedRoom._id + guestData.bedIndex,
          start: moment(guestData.start).valueOf(),
          end: moment(guestData.end).valueOf(),
          validate: [],
          type: "normal",
          bedIndex: guestData.bedIndex
        });
      }
    });

    return alloCateItems;
  };

  // 🛌 베드타입일경우에 ID는 + 0~(인덱스);
  //  TODO: 메모를 사용해서 데이터를 아끼자
  // 룸 데이타를 달력에서 사용할수있는 Group 데이터로 변경
  const roomDataManufacture = (
    roomTypeDatas: IRoomType[] | null | undefined = []
  ) => {
    const roomGroups: IAssigGroup[] = [];

    if (!roomTypeDatas) return roomGroups;

    roomTypeDatas.map(roomTypeData => {
      // 우선 방들을 원하는 폼으로 변환

      const {rooms} = roomTypeData;

      // 빈방타입 제외
      if (!isEmpty(rooms)) {
        // 🏠 방타입일 경우
        if (roomTypeData.pricingType === "ROOM") {
          rooms.map((room, index) => {
            roomGroups.push({
              id: room._id,
              title: room.name,
              roomTypeId: roomTypeData._id,
              roomTypeIndex: roomTypeData.index,
              roomIndex: room.index,
              roomType: roomTypeData,
              roomId: room._id,
              bedIndex: index,
              placeIndex: -1,
              isLastOfRoom: true,
              isLastOfRoomType: roomTypeData.roomCount === index
            });
          });
        }
        // 🛌 베드타입일경우
        if (roomTypeData.pricingType === "DOMITORY") {
          rooms.map((room, index) => {
            for (let i = 0; roomTypeData.peopleCount > i; i += 1) {
              roomGroups.push({
                id: room._id + i,
                title: room.name,
                roomTypeId: roomTypeData._id,
                roomTypeIndex: roomTypeData.index,
                roomIndex: room.index,
                roomType: roomTypeData,
                roomId: room._id,
                bedIndex: i,
                placeIndex: i + 1,
                isLastOfRoom: roomTypeData.peopleCount === i + 1,
                isLastOfRoomType:
                  roomTypeData.roomCount === index + 1 &&
                  roomTypeData.peopleCount === i + 1
              });
            }
          });
        }
      }
    });

    return roomGroups;
  };

  const updateVariables = {
    houseId,
    start: setYYYYMMDD(moment(dataTime.start)),
    end: setYYYYMMDD(moment(dataTime.end))
  };
  return (
    <GetAllRoomTypeWithGuestQuery
      fetchPolicy="cache-and-network"
      query={GET_ALL_ROOMTYPES_WITH_GUESTS}
      variables={updateVariables}
    >
      {({data, loading, error}) => {
        showError(error);
        const roomTypesData = queryDataFormater(
          data,
          "GetAllRoomType",
          "roomTypes",
          undefined
        ); // 원본데이터
        const guestsData = queryDataFormater(
          data,
          "GetGuests",
          "guests",
          undefined
        ); // 원본데이터
        const formatedRoomData = roomDataManufacture(roomTypesData); // 타임라인을 위해 가공된 데이터
        const formatedGuestsData = guestsDataManufacture(guestsData); // 타임라인을 위해 가공된 데이터

        return (
          <AllocateGuestToRoomMu
            onCompleted={({AllocateGuestToRoom}) => {
              onCompletedMessage(AllocateGuestToRoom, "배정완료", "배정실패");
            }}
            update={(cache, {data: inData}) => {
              const cacheData: getAllRoomTypeWithGuest | null = cache.readQuery(
                {
                  query: GET_ALL_ROOMTYPES_WITH_GUESTS,
                  variables: updateVariables
                }
              );
              if (cacheData && inData) {
                const result = _.unionBy(
                  [inData.AllocateGuestToRoom.guest],
                  cacheData.GetGuests.guests,
                  "_id"
                );

                cache.writeQuery({
                  query: GET_ALL_ROOMTYPES_WITH_GUESTS,
                  data: {
                    GetAllRoomType: cacheData.GetAllRoomType,
                    GetGuests: {
                      ...cacheData.GetGuests,
                      guests: result
                    }
                  }
                });
              }
            }}
            // refetchQueries={[{
            //   query: GET_ALL_ROOMTYPES_WITH_GUESTS ,
            //   variables: {
            //     houseId,
            //     start: setYYYYMMDD(moment(dataTime.start)),
            //     end: setYYYYMMDD(moment(dataTime.end)),
            // }}]}
            mutation={ALLOCATE_GUEST_TO_ROOM}
          >
            {allocateMu => (
              <UpdateBookerMu mutation={UPDATE_BOOKER} onError={showError}>
                {updateBookerMu => (
                  <AssigTimeline
                    houseId={houseId}
                    loading={loading}
                    groupData={formatedRoomData}
                    deafultGuestsData={formatedGuestsData || []}
                    dayPickerHook={dayPickerHook}
                    defaultProps={assigDefaultProps}
                    allocateMu={allocateMu}
                    roomTypesData={roomTypesData || []}
                    defaultTimeStart={defaultStartDate}
                    updateBookerMu={updateBookerMu}
                    defaultTimeEnd={defaultEndDate}
                    key={`timeline${defaultStartDate}${defaultEndDate}${loading &&
                      "loading"}`}
                  />
                )}
              </UpdateBookerMu>
            )}
          </AllocateGuestToRoomMu>
        );
      }}
    </GetAllRoomTypeWithGuestQuery>
  );
};

export default EerrorProtect(AssigTimelineWrap);
