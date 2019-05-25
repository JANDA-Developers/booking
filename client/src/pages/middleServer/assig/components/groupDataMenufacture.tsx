import {IRoomType} from "../../../../types/interface";
import {IAssigGroup} from "../AssigTimelineWrap";
import {isEmpty} from "../../../../utils/utils";
import {DEFAULT_ASSIG_GROUP} from "../../../../types/defaults";

// 🛌 베드타입일경우에 ID는 + 0~(인덱스);
//  TODO: 메모를 사용해서 데이터를 아끼자
// 룸 데이타를 달력에서 사용할수있는 Group 데이터로 변경
export const roomDataManufacture = (
  roomTypeDatas: IRoomType[] | null | undefined = [],
  option?: any
) => {
  const roomGroups: IAssigGroup[] = [];

  if (!roomTypeDatas) return roomGroups;

  roomTypeDatas.map((roomTypeData, roomTypeIndex) => {
    // 우선 방들을 원하는 폼으로 변환

    const {rooms} = roomTypeData;

    // 빈방타입 제외
    if (!isEmpty(rooms)) {
      // 🏠 방타입일 경우
      if (roomTypeData.pricingType === "ROOM") {
        rooms.map((room, index) => {
          roomGroups.push({
            id: room._id + 0,
            title: room.name,
            roomTypeId: roomTypeData._id,
            roomTypeIndex: roomTypeData.index,
            roomIndex: room.index,
            roomType: roomTypeData,
            roomId: room._id,
            bedIndex: index,
            placeIndex: -1,
            isLastOfRoom: true,
            isLastOfRoomType: roomTypeData.roomCount === index,
            type: "normal"
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
              type: "normal",
              isLastOfRoomType:
                roomTypeData.roomCount === index + 1 &&
                roomTypeData.peopleCount === i + 1
            });
          }
        });
      }
      if (option) {
        roomGroups.push({
          ...DEFAULT_ASSIG_GROUP,
          id: `add${roomTypeData._id}${roomTypeIndex}`,
          roomTypeId: roomTypeData._id,
          roomTypeIndex: roomTypeData.index,
          type: "add"
        });
      }
    }
  });

  if (option) {
    roomGroups.push({
      ...DEFAULT_ASSIG_GROUP,
      id: `addRoomType`,
      type: "addRoomType"
    });
  }

  return roomGroups;
};
