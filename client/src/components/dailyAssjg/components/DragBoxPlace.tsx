import React from "react";
import {
  ConnectDropTarget,
  DropTargetMonitor,
  useDrop,
  DragObjectWithType
} from "react-dnd";
import {DropTarget} from "react-dnd";
import {
  getAllRoomTypeWithGuest_GetAllRoomType_roomTypes_rooms as IR,
  getAllRoomTypeWithGuest_GetGuests_guests as IG,
  getAllRoomTypeWithGuest_GetAllRoomType_roomTypes as IRT,
  getAllRoomTypeWithGuest_GetBlocks_blocks as IB
} from "../../../types/api";
import DragItem, {IDragItemProp} from "./DragItem";
import classNames from "classnames";
import {PricingType} from "../../../types/enum";
import {instanceOfA, isEmpty, s4} from "../../../utils/utils";

interface DragBoxPlace {
  room: IR;
  onDrop: (item: IG & DragObjectWithType, room: IR, place: number) => void;
  itemsInPlace: (IG | IB | null)[];
  roomType: IRT;
  isFull: boolean;
  place: number;
}

export const DragBoxPlace: React.FC<DragBoxPlace> = ({
  room,
  onDrop,
  itemsInPlace,
  isFull,
  roomType,
  place
}) => {
  const [{isOver, canDrop}, drop] = useDrop({
    accept: roomType._id,
    drop: (item: any) => onDrop(item, room, place),
    collect: monitor => {
      // ⭐️⭐️⭐️ (물어볼가치가 있다면 && 드래그중 && 해당아이템을 이미 물어보지 않았다면) => query
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
      };
    }
  });

  const dragItemManufacter = (
    item: IG | IB | null
  ): (IG & IDragItemProp) | (IB & IDragItemProp) | null => {
    if (!item) return null;
    if (instanceOfA<IG>(item, "roomType")) {
      return Object.assign({type: item.roomType!._id}, item);
    } else {
      return Object.assign({type: "block"}, item);
    }
  };

  const classes = classNames("dailyAssig__place", undefined, {
    "dailyAssig__place--full": isFull,
    "dailyAssig__place--canDrop": canDrop,
    "dailyAssig__place--canAssigAndOver": (canDrop && isOver) || isFull
  });

  return (
    <div className={classes} ref={drop}>
      {itemsInPlace.map(item => {
        return (
          <DragItem
            key={item === null ? s4() : item._id}
            item={dragItemManufacter(item)}
          />
        );
      })}
    </div>
  );
};

export default DragBoxPlace;
