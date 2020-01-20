import { RoomGender } from "../types/enum";
import { IIcons } from "../atoms/icons/declation";

// 룸젠더를 받아서 해당에 맞는 icon 이름으로 바꾸어줌
const getGenderIcon = (roomGneder: RoomGender): IIcons => {
  if (roomGneder === RoomGender.ANY) return "genderBoth";
  if (roomGneder === RoomGender.FEMALE) return "genderFemale";
  if (roomGneder === RoomGender.MALE) return "genderMale";
  if (roomGneder === RoomGender.SEPARATELY) return "negative";
  return "negative";
};

export default getGenderIcon;
