import {useDrag} from "react-dnd";
import React from "react";
import {
  getAllRoomTypeWithGuest_GetGuests_guests as IG,
  getAllRoomTypeWithGuest_GetBlocks_blocks as IB
} from "../../../types/api";
import {GuestType} from "../../../types/enum";
import {GuestTypeAdd} from "../../../pages/middleServer/assig/components/assigIntrerface";
import {instanceOfA} from "../../../utils/utils";
import JDIcon, {IconSize} from "../../../atoms/icons/Icons";

export interface IDragItemProp {
  type: string;
}

interface IProps {
  item: IG & IDragItemProp | IB & IDragItemProp;
}

const DragItem: React.FC<IProps> = ({item}) => {
  const [, drag] = useDrag({
    item
  });

  return (
    <div ref={drag} className="dailyAssig__itemBlockWrap">
      {(() => {
        if (instanceOfA<IG & IDragItemProp>(item, "name")) {
          return (
            <div className="dailyAssig__guest dailyAssig__itemBlock">
              <span className="dailyAssig__itemName">{item.name}</span>
              <span
                data-tip={item._id}
                data-place="top"
                data-for="guestTooltip"
                data-event="click"
                id={`assigItem__configIconWrapId${item._id}`}
                className="assigItem__configIconWrap"
              >
                <JDIcon icon="dotMenuVertical" size={IconSize.MEDEIUM_SMALL} />
              </span>
            </div>
          );
        } else if (instanceOfA<IB & IDragItemProp>(item, "_id")) {
          return (
            <div className="dailyAssig__itemBlock dailyAssig__empty dailyAssig__guestBlock">
              자리막기
            </div>
          );
        }
      })()}
    </div>
  );
};

export default DragItem;
