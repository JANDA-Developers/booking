import React from "react";
import {IRoomType} from "../../types/interface";
import JDIcon from "../../atoms/icons/Icons";
import {getGenderIcon} from "../../utils/utils";
import {RoomGenderKr, PricingTypeKr} from "../../types/enum";
interface Iprops {
  roomType: IRoomType;
}

const RoomTypeInfo: React.FC<Iprops> = ({roomType}) => {
  return (
    <div className="roomConfig__iconsWrap">
      <div>
        <JDIcon
          labelSize="large"
          tooltip="방인원"
          label={`${roomType.peopleCount}`}
          icon="persons"
        />
      </div>
      <div>
        <JDIcon
          labelSize="large"
          tooltip="방성별"
          label={`${RoomGenderKr[roomType.roomGender]}`}
          icon={getGenderIcon(roomType.roomGender)}
        />
      </div>
      <div>
        <JDIcon
          labelSize="large"
          tooltip="방타입"
          label={PricingTypeKr[roomType.pricingType]}
          icon={"roomType"}
        />
      </div>
      <div>
        <JDIcon
          labelSize="large"
          tooltip="방갯수"
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
          tooltip="기본 방가격"
          label={`${roomType.defaultPrice}`}
          icon="money"
        />
      </div>
    </div>
  );
};

export default RoomTypeInfo;
