import {useDrag} from "react-dnd";
import React from "react";
import {getAllRoomTypeWithGuest_GetGuests_guests} from "../../../types/api";

interface dragItemProp {
  type: string;
}

interface Iprops {
  item: getAllRoomTypeWithGuest_GetGuests_guests & dragItemProp;
}

const DragItem: React.FC<Iprops> = ({item}) => {
  const [, drag] = useDrag({
    item
  });
  return (
    <div ref={drag} className="dailyAssig__itemBlockWrap">
      <div className="dailyAssig__itemBlock dailyAssig__empty dailyAssig__guestBlock">
        {item.name}
      </div>
    </div>
  );
};

export default DragItem;