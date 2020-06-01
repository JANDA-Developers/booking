import { useDrag } from "react-dnd";
import React, { useEffect } from "react";
import {
  getAllRoomType_GetAllRoomType_roomTypes_rooms as IR,
  getGuests_GetGuests_guests as IG,
  getAllRoomType_GetAllRoomType_roomTypes as IRT,
  getGuests_GetBlocks_blocks as IB
} from "../../../types/api";
import { instanceOfA } from "../../../utils/utils";
import JDIcon from "../../../atoms/icons/Icons";
import { ReactTooltip } from "../../../atoms/tooltip/Tooltip";
import classNames from "classnames";
import { PaymentStatus } from "../../../types/enum";
import { LANG } from "../../../hooks/hook";
import StatusMarker from "../../../pages/bookingHost/assig/components/items/StatusMarker";
import { IDiv } from "../../../types/interface";
import { dateFromTo } from "../helpert";
import { TDailyGroup } from "../groupDataManufacter";
import { TRoom } from "./DragBoxPlace";

export interface IDragItemProp {
  type: string;
}

interface IProps {
  item: (IG & IDragItemProp) | (IB & IDragItemProp) | null;
  roomType: TDailyGroup;
  room: TRoom;
  place: number;
}

interface IWrapProp extends IDiv {}

const Wrap = React.forwardRef<HTMLDivElement, IWrapProp>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={`dailyAssigItem__itemBlockWrap ${className}`}
      >
        {children}
      </div>
    );
  }
);

export type TPlaceInfo = {
  roomTypeId: string;
  roomId: string;
  place: number;
};

const DragItem: React.FC<IProps> = ({ item, place, room, roomType }) => {
  useEffect(() => {
    ReactTooltip.rebuild();
  });


  if (!item) {
    const placeInfo: TPlaceInfo = {
      roomTypeId: roomType._id,
      roomId: room._id,
      place: place
    };

    const palceInfoString = JSON.stringify(placeInfo);

    return (
      <Wrap>
        <div
          data-tip={palceInfoString}
          data-place="top"
          data-for="placeTooltip"
          data-event="click"
          className="dailyAssigItem__itemBlock dailyAssigItem__empty dailyAssigItem__guestBlock"
        />
      </Wrap>
    );
  }

  const [, drag] = useDrag({
    item
  });



  const isBlock = !instanceOfA<IG & IDragItemProp>(item, "booking");

  if (isBlock)
    return (
      <Wrap ref={drag} className="dailyAssigItem__itemBlockWrap">
        <div
          data-tip={item._id}
          data-place="top"
          data-for="blockTooltip"
          data-event="click"
          id={`dailyAssigItem__block${item._id}`}
          className="dailyAssigItem__itemBlock dailyAssigItem__blockBlock"
        >
          {LANG("block_place")}
        </div>
      </Wrap>
    );

  const { booking, checkIn, checkOut, _id } = item as IG;
  const { checkInInfo, name, payment, memo, breakfast } = booking;
  const { status: paymentStatus } = payment;
  const isUnpaid = paymentStatus !== PaymentStatus.COMPLETED;
  const guestBlockClasses = classNames(
    "dailyAssigItem__itemBlock dailyAssigItem__guest",
    undefined,
    {
      "dailyAssigItem__guest--checkIn": checkInInfo.isIn
    }
  );

  return (
    <Wrap
      ref={drag}
      data-place="top"
      data-tip={dateFromTo(checkIn, checkOut)}
      data-for={"guestCheckInOutToolTip"}
    >
      <div className={guestBlockClasses}>
        <span className="dailyAssigItem__itemName">
          <StatusMarker
            gender={
              // @ts-ignore
              item.gender
            }
            darkImg={item.checkIn}
            breakfast={breakfast}
            isUnpaid={isUnpaid}
            memo={memo || ""}
          />
          {name}
        </span>
        <span
          data-tip={_id}
          data-place="right"
          data-for="guestTooltip"
          data-event="click"
          id={`dailyAssigItem__configIconWrapId${_id}`}
          className="dailyAssigItem__configIconWrap"
        >
          <JDIcon icon="dotMenuVertical" size={"small"} />
        </span>
      </div>
    </Wrap>
  );
};

export default DragItem;
