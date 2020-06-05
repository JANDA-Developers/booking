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
  roomTypeDatas: IRoomType[] | null | undefined = []
) => {
  const roomGroups: IAssigGroup[] = [];

  if (!roomTypeDatas) return roomGroups;

  roomTypeDatas.map((roomTypeData, roomTypeIndex) => {
    // 우선 방들을 원하는 폼으로 변환

    const { rooms } = roomTypeData;

    // 빈방타입 제외
    if (!isEmpty(rooms)) {
      // 🏠 방타입일 경우

      const sharedProps = {
        roomTypeId: roomTypeData._id,
        roomTypeIndex: roomTypeData.index,
        stackItems: false,
        roomGender: roomTypeData.roomGender,
        roomType: roomTypeData,
        pricingType: roomTypeData.pricingType
      };

      if (roomTypeData.pricingType === "ROOM") {
        rooms.forEach((room, index) => {
          roomGroups.push({
            title: room.name,
            id: room._id + 0,
            roomId: room._id,
            roomIndex: index,
            room,
            bedIndex: 0,
            placeIndex: -1,
            isLastOfRoom: true,
            isLastOfRoomType: roomTypeData.roomCount === index,
            ...sharedProps
          });
        });
      }
      // 🛌 베드타입일경우
      if (roomTypeData.pricingType === "DOMITORY") {
        rooms.forEach((room, index) => {
          for (let i = 0; roomTypeData.peopleCountMax > i; i += 1) {
            roomGroups.push({
              id: room._id + i,
              title: room.name,
              room,
              roomIndex: index,
              roomId: room._id,
              bedIndex: i,
              placeIndex: i + 1,
              isLastOfRoom: roomTypeData.peopleCount === i + 1,
              ...sharedProps,
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
