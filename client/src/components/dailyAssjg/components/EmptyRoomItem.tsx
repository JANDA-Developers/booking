import React from "react";
interface Iprops {}

const EmptyRoomItem: React.FC<Iprops> = () => {
  return (
    <div className="dailyAssig__itemBlockWrap">
      <div className="dailyAssig__itemBlock dailyAssig__empty dailyAssig__guestBlock">
        빈방
      </div>
    </div>
  );
};

export default EmptyRoomItem;
