import React from "react";
import JDbox from "../../../../atoms/box/JDbox";
import { RoomBoxProp } from "../declation";

// 상자 형태의 [방] 출력
export const RoomBox = ({ roomId, roomName, onClick }: RoomBoxProp) => (
  <JDbox
    id={`RoomBox${roomId}`}
    className="TRoomBox roomConfig__roomBox"
    align="flexVcenter"
    clickable
    onClick={onClick}
    textAlign="center"
    key={roomId}
  >
    <span className="roomConfig__roomTitle">{roomName}</span>
  </JDbox>
);
