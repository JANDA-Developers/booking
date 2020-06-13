import React from "react";
import { useDrop, DragObjectWithType } from "react-dnd";
import {
  getAllRoomType_GetAllRoomType_roomTypes_rooms as IR,
  getGuests_GetGuests_guests as IG,
  getAllRoomType_GetAllRoomType_roomTypes as IRT,
  getGuests_GetBlocks_blocks as IB
} from "../../../types/api";
import DragItem, { IDragItemProp } from "./DragItem";
import classNames from "classnames";
import { instanceOfA, s4, isEmpty } from "../../../utils/utils";
import { TDailyGroup } from "../groupDataManufacter";

export type TRoom = {
  _id: string;
  name: string;
  places: {
    _id: string;
  }[];
};

export type THandleDrop = (
  item: IG & DragObjectWithType,
  room: TRoom,
  place: number
) => void;

interface IDragBoxPlace {
  room: TRoom;
  placeId: string;
  onDrop: THandleDrop;
  itemsInPlace: IG | IB | null;
  roomType: TDailyGroup;
  isFull: boolean;
  place: number;
}

export const DragBoxPlace: React.FC<IDragBoxPlace> = ({
  room,
  onDrop,
  itemsInPlace,
  isFull,
  roomType,
  placeId,
  place
}) => {
  const [{ isOver }, drop] = useDrop({
    accept: roomType._id,
    drop: (item: any) => onDrop(item, room, place),
    collect: monitor => {
      // Performance 이슈
      return {
        isOver: monitor.isOver()
      };
    }
  });

  const dragItemManufacter = (
    item: IG | IB | null
  ): (IG & IDragItemProp) | (IB & IDragItemProp) | null => {
    if (!item) return null;
    if (instanceOfA<IG>(item, "roomType"))
      return Object.assign({ type: item.roomType._id }, item);
    return Object.assign({ type: "block" }, item);
  };

  const classes = classNames("dailyAssig__place", undefined, {
    "dailyAssig__place--full": isFull,
    "dailyAssig__place--canDrop": isOver,
    "dailyAssig__place--canAssigAndOver": isOver
  });


  return (
    <div className={classes} ref={drop}>
      <DragItem
        key={itemsInPlace?._id || placeId + "place"}
        item={dragItemManufacter(itemsInPlace)}
        roomType={roomType}
        room={room}
        place={place}
      />
    </div>
  );
};

export default React.memo(
  DragBoxPlace,
  ({ itemsInPlace: item1, room }, { itemsInPlace: item2 }) => {
    1;
    const noItem = !item1 && !item2;
    false;

    if (noItem) return true;

    // 작업중
    // updateAt을 비교해야합니다.
    // 하지만 현재 Guest에 updateAt이 없는상태

    const isSame = item1?._id === item2?._id;
    if (isSame) return true;

    return false;
  }
);
