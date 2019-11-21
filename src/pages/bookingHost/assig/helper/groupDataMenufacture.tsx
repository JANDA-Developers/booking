import { IRoomType } from "../../../../types/interface";
import { isEmpty } from "../../../../utils/utils";
import { DEFAULT_ASSIG_GROUP } from "../../../../types/defaults";
import { RoomGender, Gender, PricingType } from "../../../../types/enum";
import { IAssigGroup } from "../components/assigIntrerface";

// 룸젠더에 값을넣어 게스트성별을 받음
// separately 나 Any 의 경우에는 남자 반환
export const roomGenderToGedner = (
  roomGender: RoomGender | null | Gender,
  pricingType: PricingType
) => {
  if (roomGender === RoomGender.MALE) return Gender.MALE;
  if (roomGender === RoomGender.FEMALE) return Gender.FEMALE;

  if (pricingType === PricingType.DOMITORY) {
    if (roomGender === RoomGender.ANY) return Gender.MALE;
    if (roomGender === RoomGender.SEPARATELY) return Gender.MALE;
  } else if (pricingType === PricingType.ROOM) {
    if (roomGender === RoomGender.ANY) return null;
    if (roomGender === RoomGender.SEPARATELY) return null;
  }
  return null;
};
// 🛌 베드타입일경우에 ID는 + 0~(인덱스);
//  TODO: 메모를 사용해서 데이터를 아끼자
//  isAdd 는 방타입 생성에서 추가 버튼을 위한것
export const roomDataManufacturer = (
  roomTypeDatas: IRoomType[] | null | undefined = [],
  isAdd?: boolean
) => {
  const roomGroups: IAssigGroup[] = [];

  if (!roomTypeDatas) return roomGroups;

  roomTypeDatas.map((roomTypeData, roomTypeIndex) => {
    // 우선 방들을 원하는 폼으로 변환

    const { rooms } = roomTypeData;

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
            room: {
              _id: room._id,
              name: room.name
            },
            pricingType: roomTypeData.pricingType,
            bedIndex: 0,
            placeIndex: -1,
            isLastOfRoom: true,
            isLastOfRoomType: roomTypeData.roomCount === index,
            type: "normal",
            roomGender: roomTypeData.roomGender
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
              room: {
                _id: room._id,
                name: room.name
              },
              roomTypeId: roomTypeData._id,
              roomTypeIndex: roomTypeData.index,
              roomIndex: room.index,
              roomType: roomTypeData,
              roomId: room._id,
              bedIndex: i,
              placeIndex: i + 1,
              isLastOfRoom: roomTypeData.peopleCount === i + 1,
              type: "normal",
              roomGender: roomTypeData.roomGender,
              pricingType: roomTypeData.pricingType,
              isLastOfRoomType:
                roomTypeData.roomCount === index + 1 &&
                roomTypeData.peopleCount === i + 1
            });
          }
        });
      }
      // 방생성중일떄만 will be deprecate ⛔️
      if (isAdd) {
        roomGroups.push({
          ...DEFAULT_ASSIG_GROUP,
          id: `add${roomTypeData._id}${roomTypeIndex}`,
          roomTypeId: roomTypeData._id,
          roomTypeIndex: roomTypeData.index,
          type: "add"
        });
      }
      // 방생성중일떄만 will be deprecate ⛔️
    } else if (isAdd) {
      if (roomTypeData.pricingType === "ROOM") {
        roomGroups.push({
          ...DEFAULT_ASSIG_GROUP,
          id: `add${roomTypeData._id}${roomTypeIndex}`,
          roomTypeId: roomTypeData._id,
          roomTypeIndex: roomTypeData.index,
          roomType: roomTypeData,
          roomGender: roomTypeData.roomGender,
          roomId: `${roomTypeData._id}add`,
          type: "add"
        });
      } else {
        for (let i = 0; roomTypeData.peopleCount > i; i += 1) {
          roomGroups.push({
            ...DEFAULT_ASSIG_GROUP,
            id: `add${roomTypeData._id}${roomTypeIndex}` + i,
            roomTypeId: roomTypeData._id,
            roomTypeIndex: roomTypeData.index,
            roomType: roomTypeData,
            roomGender: roomTypeData.roomGender,
            roomId: `${roomTypeData._id}add`,
            type: "add",
            placeIndex: i + 1,
            isLastOfRoom: roomTypeData.peopleCount === i + 1,
            isLastOfRoomType: true
          });
        }
      }
    }
  });

  // 방생성중일떄만
  if (isAdd) {
    roomGroups.push({
      ...DEFAULT_ASSIG_GROUP,
      id: `addRoomType`,
      type: "addRoomType"
    });
  }
  return roomGroups;
};
