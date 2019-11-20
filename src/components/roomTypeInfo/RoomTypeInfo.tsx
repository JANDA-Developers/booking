import React from "react";
import {IRoomType} from "../../types/interface";
import JDIcon from "../../atoms/icons/Icons";
import {getGenderIcon} from "../../utils/utils";
import {LANG} from "../../hooks/hook";
interface Iprops {
  roomType: IRoomType;
}

const RoomTypeInfo: React.FC<Iprops> = ({roomType}) => {
  return (
    <div className="roomConfig__iconsWrap">
      <div>
        <JDIcon
          labelSize="large"
          tooltip={LANG("personnel")}
          label={`${roomType.peopleCount}`}
          icon="persons"
        />
      </div>
      <div>
        <JDIcon
          labelSize="large"
          tooltip={LANG("room_gender")}
          label={`${LANG(roomType.roomGender)}`}
          icon={getGenderIcon(roomType.roomGender)}
        />
      </div>
      <div>
        <JDIcon
          labelSize="large"
          tooltip={LANG("roomType")}
          label={LANG(roomType.pricingType)}
          icon={"roomType"}
        />
      </div>
      <div>
        <JDIcon
          labelSize="large"
          tooltip={LANG("room_count")}
          label={`${roomType.rooms.length}`}
          icon={"roomChange"}
        />
      </div>
      <div>
        <JDIcon
          labelSize="large"
          tooltip={`${roomType.description}`}
          label={roomType.description || ""}
          icon={"memo"}
        />
      </div>
      <div>
        <JDIcon
          labelSize="large"
          tooltip={LANG("basic_room_price")}
          label={`${roomType.defaultPrice}`}
          icon="money"
        />
      </div>
    </div>
  );
};

export default RoomTypeInfo;
