import {arraySum} from "./elses";
import {IHouse} from "../types/interface";

const getRoomCountFromHouse = (house: IHouse): number => {
  if (!house) return 0;
  const roomTypes = house.roomTypes || [];
  const roomCount = arraySum(roomTypes.map(roomType => roomType.roomCount));

  return roomCount || 0;
};

export default getRoomCountFromHouse;
