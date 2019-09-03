import React from "react";
import {ConnectDropTarget, DropTargetMonitor, useDrop} from "react-dnd";
import {DropTarget} from "react-dnd";
import {
  getAllRoomTypeWithGuest_GetAllRoomType_roomTypes_rooms,
  getAllRoomTypeWithGuest_GetGuests_guests,
  getAllRoomTypeWithGuest_GetAllRoomType_roomTypes
} from "../../../types/api";
import DragItem, {IDragItemProp} from "./DragItem";
import EmptyRoomItem from "./EmptyRoomItem";
import classNames from "classnames";
import {PricingType} from "../../../types/enum";

interface DragBoxRoom {
  room: getAllRoomTypeWithGuest_GetAllRoomType_roomTypes_rooms;
  onDrop: (
    item: getAllRoomTypeWithGuest_GetGuests_guests & IDragItemProp
  ) => void;
  itemsInRoom: getAllRoomTypeWithGuest_GetGuests_guests[];
  roomType: getAllRoomTypeWithGuest_GetAllRoomType_roomTypes;
}

export const DragBoxRoom: React.FC<DragBoxRoom> = ({
  room,
  onDrop,
  itemsInRoom,
  roomType
}) => {
  const inItemCount = itemsInRoom.length;
  const isFull =
    roomType.pricingType === PricingType.DOMITORY
      ? itemsInRoom.length === roomType.peopleCountMax
      : itemsInRoom.length > 1;
  const [{isOver, canDrop}, drop] = useDrop({
    accept: roomType._id,
    drop: onDrop,
    collect: monitor => {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
      };
    }
  });

  const dragItemManufacter = (
    item: getAllRoomTypeWithGuest_GetGuests_guests
  ): getAllRoomTypeWithGuest_GetGuests_guests & IDragItemProp => {
    return Object.assign({type: item.roomType!._id}, item);
  };

  const classes = classNames("dailyAssig__room", undefined, {
    "dailyAssig__room--full": isFull,
    "dailyAssig__room--canDrop": canDrop,
    "dailyAssig__room--canAssigAndOver": (canDrop && isOver) || isFull
  });

  return (
    <div ref={drop} key={`room${room._id}`} className={classes}>
      <div className="dailyAssig__roomTitle">{room.name}</div>
      {itemsInRoom.map(item => (
        <DragItem key={item._id} item={dragItemManufacter(item)} />
      ))}
      {inItemCount === 0 && <EmptyRoomItem />}
    </div>
  );
};

export default DragBoxRoom;
