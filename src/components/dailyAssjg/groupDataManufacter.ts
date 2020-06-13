import { IRoomType } from "../../types/interface";
import { string, any } from "prop-types";
import { PricingType } from "../../types/enum";
import { s4 } from "../../utils/utils";

export type TDailyGroup = {
  _id: string;
  name: string;
  pricingType: PricingType;
  peopleCountMax: number;
  rooms: {
    _id: string;
    name: string;
    places: {
      _id: string;
      item: any;
    }[];
  }[];
};

export const groupDataManufacturer = (
  roomTypeDatas: IRoomType[] | null | undefined = []
): TDailyGroup[] => {
  return (
    roomTypeDatas?.map(roomTypeData => {
      const { pricingType, name, peopleCountMax, _id } = roomTypeData;
      const isDomi = pricingType === PricingType.DOMITORY;
      const value = {
        _id,
        name,
        pricingType,
        peopleCountMax,
        rooms: roomTypeData.rooms.map(room => {
          return {
            _id: room._id,
            name: room.name,
            places: Array(isDomi ? peopleCountMax : 1)
              .fill(null)
              .map(() => {
                return {
                  _id: s4(),
                  item: null
                };
              })
          };
        })
      };
      return value;
    }) || []
  );
};

//   if (isEmpty(roomType.rooms))
//   return <span key={roomType._id + index + "empty"} />;
// const dayPickerRenderCondition =
//   index === 0 && calendarPosition === "inside" && !IS_MOBILE;
// const { pricingType, peopleCountMax } = roomType;

//   // 방이 가득찼는지
//   const isFull = checkIsFull(
//     pricingType,
//     itemsInRoom.length,
//     peopleCountMax
//   );
//   const places = getPlaceArray(
//     pricingType,
//     itemsInRoom,
//     peopleCountMax
//   );
