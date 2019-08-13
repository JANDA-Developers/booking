import React, {useEffect, Fragment, useState} from "react";
import "moment/locale/ko";
import ErrProtecter from "../../../utils/errProtect";
import Button from "../../../atoms/button/Button";
import "./RoomConfig.scss";
import {
  getAllRoomType_GetAllRoomType_roomTypes as IRoomType,
  getAllRoomType_GetAllRoomType_roomTypes,
  getAllRoomType_GetAllRoomType_roomTypes_rooms,
  getAllRoomTypeWithGuest_GetAllRoomType_roomTypes_rooms,
  changeIndexForRoomType,
  changeIndexForRoomTypeVariables
} from "../../../types/api";
import Preloader from "../../../atoms/preloader/Preloader";
import JDdayPicker from "../../../atoms/dayPicker/DayPicker";
import {
  GlobalCSS,
  PricingType,
  RoomGender,
  RoomGenderKr,
  PricingTypeKr
} from "../../../types/enum";
import JDIcon, {IconSize} from "../../../atoms/icons/Icons";
import {IUseDayPicker, useModal} from "../../../actions/hook";
import {IAssigGroup} from "../assig/components/assigIntrerface";
import {isEmpty, s4} from "../../../utils/utils";
import DrragList from "../../../atoms/animation/DrragList";
import RoomTypeModal from "./components/RoomModal";
import RoomTypeModalWrap, {
  IRoomTypeModalInfo
} from "./components/RoomTypeModalWrap";
import RoomModalWrap, {IRoomModalInfo} from "./components/RoomModalWrap";
import Card from "../../../atoms/cards/Card";
import JDbox from "../../../atoms/box/JDbox";
import CircleIcon from "../../../atoms/circleIcon/CircleIcon";
import {DEFAULT_ROOMTYPE, DEFAULT_ROOMTYPE_ROOM} from "../../../types/defaults";
import Gender from "../assig/components/item/gender";
import {MutationFn} from "react-apollo";
import EventListener from "react-event-listener";

let LAST_MOVED_ROOMTPYE = "";
let LAST_MOVED_INDEX = 0;

interface IProps {
  items?: any;
  defaultProps: any;
  setConfigMode: any;
  houseId: string;
  loading?: boolean;
  changeIndexMu?: MutationFn<
    changeIndexForRoomType,
    changeIndexForRoomTypeVariables
  >;
  roomTypesData: getAllRoomType_GetAllRoomType_roomTypes[];
}

interface IRenderGroupProps {
  group: IAssigGroup;
}

const RoomConfigNew: React.FC<IProps> = ({
  items,
  setConfigMode,
  defaultProps,
  changeIndexMu,
  roomTypesData,
  loading,
  houseId
}) => {
  const roomTypeModalHook = useModal<IRoomTypeModalInfo>(false, {});
  const roomModalHook = useModal<IRoomModalInfo>(false, {});

  const getRoomBox = (
    recode: IRoomType,
    room: getAllRoomTypeWithGuest_GetAllRoomType_roomTypes_rooms,
    index: number
  ) => (
    <JDbox
      clickable
      onClick={() => {
        roomModalHook.openModal({
          roomTypeId: recode._id,
          roomId: room._id
        });
      }}
      align="center"
      key={room._id}
    >
      <h6 className="roomConfig__roomTitle">{room.name}</h6>
    </JDbox>
  );

  const getGenderIcon = (roomGneder: RoomGender) => {
    if (roomGneder === RoomGender.ANY) return "genderBoth";
    if (roomGneder === RoomGender.FEMALE) return "genderFemale";
    if (roomGneder === RoomGender.MALE) return "genderMale";
    if (roomGneder === RoomGender.SEPARATELY) return "negative";
    return "negative";
  };

  // 연구중 🌾
  const handleWindowUnload: any = (mess: Window, e: BeforeUnloadEvent) => {
    // For IE and Firefox prior to version 4
    const ev = e || mess.event;

    if (ev) {
      ev.returnValue = "Sure?";
    }

    // For Safari
    return "Sure?";
  };

  return (
    <div id="RoomConfig" className="roomConfig container container--full">
      <div className="docs-section">
        <h3>방설정</h3>
        <Button
          onClick={() => {
            roomTypeModalHook.openModal({
              isAddMode: true
            });
          }}
          thema="primary"
          label="방타입 추가"
        />
        <DrragList data={roomTypesData} rowKey="_id">
          {(recode: getAllRoomType_GetAllRoomType_roomTypes, index: any) => (
            <Card
              key={recode._id}
              className={`roomConfig__roomType roomConfig__roomType${recode._id}`}
            >
              <div className="roomConfig__roomType_titleSection">
                <div className="roomConfig__roomType_titleAndIcons">
                  <h5 className="JDstandard-space">{recode.name}</h5>
                  <div className="roomConfig__iconsWrap">
                    <JDIcon
                      labelSize="large"
                      tooltip="방인원"
                      label={`${recode.peopleCount}`}
                      icon="persons"
                    />
                    <JDIcon
                      labelSize="large"
                      tooltip="방성별"
                      label={`${RoomGenderKr[recode.roomGender]}`}
                      icon={getGenderIcon(recode.roomGender)}
                    />
                    <JDIcon
                      labelSize="large"
                      tooltip="방타입"
                      label={PricingTypeKr[recode.pricingType]}
                      icon={"roomType"}
                    />
                    <JDIcon
                      labelSize="large"
                      tooltip="방갯수"
                      label={`${recode.rooms.length}`}
                      icon={"roomChange"}
                    />
                    <JDIcon
                      labelSize="large"
                      tooltip={`${recode.description}`}
                      label={"방설명"}
                      icon={"memo"}
                    />
                    <JDIcon
                      labelSize="large"
                      tooltip="기본 방가격"
                      label={`${recode.defaultPrice}`}
                      icon="money"
                    />
                  </div>
                </div>
                <Button
                  onClick={() => {
                    roomTypeModalHook.openModal({
                      roomTypeId: recode._id
                    });
                  }}
                  mode="border"
                  label="수정하기"
                  icon={"edit"}
                  size="small"
                />
              </div>
              <div className="roomConfig__roomsWrapWrap">
                <DrragList
                  className="roomConfig__roomsWrap"
                  data={recode.rooms}
                  rowKey="_id"
                >
                  {(
                    room: getAllRoomTypeWithGuest_GetAllRoomType_roomTypes_rooms,
                    index: number
                  ) => {
                    const RoomBox = getRoomBox(recode, room, index);
                    return <Fragment>{RoomBox}</Fragment>;
                  }}
                </DrragList>
                {/* add */}
                <JDbox
                  clickable
                  align="center"
                  mode="dashBorder"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    roomModalHook.openModal({
                      isAddMode: true,
                      roomTypeId: recode._id
                    });
                  }}
                  className="roomConfig__addRoomBox"
                  key={`add${recode._id}`}
                >
                  <h6 className="roomConfig__roomTitle">방추가</h6>
                </JDbox>
              </div>
            </Card>
          )}
        </DrragList>
      </div>
      <EventListener target="window" onBeforeUnload={handleWindowUnload} />
      <RoomTypeModalWrap
        houseId={houseId}
        modalHook={roomTypeModalHook}
        key={roomTypeModalHook.info.roomTypeId}
      />
      <RoomModalWrap
        key={roomModalHook.info.roomId}
        roomTypeData={roomTypesData}
        modalHook={roomModalHook}
        houseId={houseId}
      />
    </div>
  );
};

export default ErrProtecter(RoomConfigNew);
