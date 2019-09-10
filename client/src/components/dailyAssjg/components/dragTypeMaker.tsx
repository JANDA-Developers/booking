import {
  getAllRoomTypeWithGuest_GetAllRoomType_roomTypes_rooms as IR,
  getAllRoomTypeWithGuest_GetGuests_guests as IG,
  getAllRoomTypeWithGuest_GetAllRoomType_roomTypes as IRT,
  getAllRoomTypeWithGuest_GetBlocks_blocks as IB,
  RoomGender
} from "../../../types/api";
import {instanceOfA} from "../../../utils/utils";
import {Gender} from "../../../types/enum";

// 🔴 정신차려 여긴 벡엔드 파트야

// const dragItemTypeMaker = (item: IG): string => {};

// const dragPlaceTypeMaker = (roomType: IRT, room: IR): string => {};

// const genderValidation = (
//   roomGender: RoomGender,
//   insideGender: Gender,
//   guestGender: Gender
// ): boolean => {
//   if (roomGender === RoomGender.ANY) return true;
//   if (roomGender === RoomGender.SEPARATELY && insideGender === guestGender)
//     return true;
//   if (roomGender === RoomGender.MALE && guestGender === Gender.MALE)
//     return true;
//   if (roomGender === RoomGender.FEMALE && guestGender === Gender.FEMALE)
//     return true;

//   return false;
// };

// const checkValidation = (): boolean => {
//   return true;
// };
