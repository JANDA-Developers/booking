import React from "react";
import Button from "../../../../atoms/button/Button";
import { LANG } from "../../../../hooks/hook";

export const RoomTypeAddBtn = ({ onClick }: any) => (
  <Button
    id="AddRoomTypeBtn"
    onClick={onClick}
    thema="primary"
    label={LANG("add_roomType")}
  />
);

export const RoomAddBtn = ({
  index,
  roomTypeId,
  onClick
}: {
  index: number;
  roomTypeId: string;
  onClick: any;
}) => (
  <Button
    id={`AddRoomBtn${index}`}
    mode="border"
    size="small"
    onClick={onClick}
    icon="add"
    label={LANG("add_room")}
    className="roomConfig__addRoomBox JDstandard-margin-bottom"
    key={`add${roomTypeId}`}
  />
);
