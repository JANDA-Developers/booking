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
import {IContext} from "../../MiddleServerRouter";
import Help from "../../../atoms/Help/Help";
import RoomTypeInfo from "../../../components/roomTypeInfo/roomTypeInfo";
import {PureQueryOptions} from "apollo-boost";

let LAST_MOVED_ROOMTPYE = "";
let LAST_MOVED_INDEX = 0;

interface IProps {
  items?: any;
  defaultProps: any;
  setConfigMode: any;
  context: IContext;
  loading?: boolean;
  changeIndexForRoomTypeMu: MutationFn<
    changeIndexForRoomType,
    changeIndexForRoomTypeVariables
  >;
  refetchQueries: (PureQueryOptions | string)[];
  roomTypesData: getAllRoomType_GetAllRoomType_roomTypes[];
}

const RoomConfigNew: React.FC<IProps> = ({
  items,
  context,
  setConfigMode,
  defaultProps,
  changeIndexForRoomTypeMu,
  roomTypesData,
  refetchQueries,
  loading
}) => {
  const {house} = context;
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
      textAlign="center"
      key={room._id}
    >
      <h6 className="roomConfig__roomTitle">{room.name}</h6>
    </JDbox>
  );

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
        <div>
          <Preloader size="large" loading={loading} />
        </div>
        {roomTypesData.length === 0 && (
          <h4 className="JDtextColor--placeHolder JDmargin-bottom0">
            방타입이 존재하지 않습니다.
          </h4>
        )}
        <DrragList
          onUpdate={(info: any, data) => {
            const {newIndex, oldIndex} = info;
            changeIndexForRoomTypeMu({
              variables: {
                houseId: house._id,
                index: newIndex,
                roomTypeId: roomTypesData[oldIndex]._id
              }
            });
          }}
          data={roomTypesData}
          rowKey="_id"
        >
          {(recode: getAllRoomType_GetAllRoomType_roomTypes, index: any) => (
            <Card
              key={recode._id}
              className={`roomConfig__roomType roomConfig__roomType${recode._id}`}
            >
              <div className="roomConfig__roomType_titleSection">
                <div className="roomConfig__roomType_titleAndIcons">
                  <h5 className="JDstandard-space">{recode.name}</h5>
                  <Help
                    icon="info"
                    tooltip={<RoomTypeInfo roomType={recode} />}
                  />
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
                  textAlign="center"
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
        context={context}
        modalHook={roomTypeModalHook}
        key={roomTypeModalHook.info.roomTypeId}
      />
      <RoomModalWrap
        refetchQueries={refetchQueries}
        context={context}
        key={roomModalHook.info.roomId}
        roomTypeData={roomTypesData}
        modalHook={roomModalHook}
      />
    </div>
  );
};

export default ErrProtecter(RoomConfigNew);
