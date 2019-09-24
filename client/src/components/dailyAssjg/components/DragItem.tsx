import {useDrag} from "react-dnd";
import React, {useEffect} from "react";
import {
  getAllRoomTypeWithGuest_GetAllRoomType_roomTypes_rooms as IR,
  getAllRoomTypeWithGuest_GetGuests_guests as IG,
  getAllRoomTypeWithGuest_GetAllRoomType_roomTypes as IRT,
  getAllRoomTypeWithGuest_GetBlocks_blocks as IB
} from "../../../types/api";
import {instanceOfA} from "../../../utils/utils";
import JDIcon, {IconSize} from "../../../atoms/icons/Icons";
import {ReactTooltip} from "../../../atoms/tooltip/Tooltip";
import moment from "moment";
import classNames from "classnames";
import Gender from "../../../pages/middleServer/assig/components/items/Gender";

export interface IDragItemProp {
  type: string;
}

interface IProps {
  item: IG & IDragItemProp | IB & IDragItemProp | null;
  roomType: IRT;
  room: IR;
  place: number;
}

const DragItem: React.FC<IProps> = ({item, place, room, roomType}) => {
  const palceInfo = JSON.stringify({
    roomTypeId: roomType._id,
    roomId: room._id,
    place: place
  });

  useEffect(() => {
    console.log("Aaa");
    ReactTooltip.rebuild();
  });

  if (!item) {
    return (
      <div className="dailyAssigItem__itemBlockWrap">
        <div
          data-tip={palceInfo}
          data-place="top"
          data-for="placeTooltip"
          data-event="click"
          className="dailyAssigItem__itemBlock dailyAssigItem__empty dailyAssigItem__guestBlock"
        >
          {" - "}
        </div>
      </div>
    );
  }
  const [, drag] = useDrag({
    item
  });

  return (
    <div ref={drag} className="dailyAssigItem__itemBlockWrap">
      {(() => {
        if (instanceOfA<IG & IDragItemProp>(item, "name")) {
          const guestBlockClasses = classNames(
            "dailyAssigItem__guest",
            undefined,
            {
              "dailyAssigItem__guest--checkIn": item.booking.checkInInfo.isIn
            }
          );

          return (
            <div
              data-tip={`${moment(item.checkIn).format("MM-DD일")} ~ ${moment(
                item.checkOut
              ).format("MM-DD일")}`}
              data-for="guestCheckInOutToolTip"
              className={`dailyAssigItem__itemBlock ${guestBlockClasses}`}
            >
              <span className="dailyAssigItem__itemName">
                <Gender gender={item.gender} /> {item.name}
              </span>
              <span
                data-tip={item._id}
                data-place="top"
                data-for="guestTooltip"
                data-event="click"
                id={`dailyAssigItem__configIconWrapId${item._id}`}
                className="dailyAssigItem__configIconWrap"
              >
                <JDIcon icon="dotMenuVertical" size={IconSize.MEDEIUM_SMALL} />
              </span>
            </div>
          );
        } else if (true) {
          return (
            <div
              data-tip={item._id}
              data-place="top"
              data-for="blockTooltip"
              data-event="click"
              id={`dailyAssigItem__block${item._id}`}
              className="dailyAssigItem__itemBlock dailyAssigItem__blockBlock"
            >
              자리막기
            </div>
          );
        }
      })()}
    </div>
  );
};

export default DragItem;
