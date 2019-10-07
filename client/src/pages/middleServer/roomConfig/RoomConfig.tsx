import React, {useEffect, Fragment, useState} from "react";
import "moment/locale/ko";
import ErrProtecter from "../../../utils/errProtect";
import Button from "../../../atoms/button/Button";
import "./RoomConfig.scss";
import {
  getAllRoomType_GetAllRoomType_roomTypes as IRoomType,
  getAllRoomType_GetAllRoomType_roomTypes,
  getAllRoomTypeWithGuest_GetAllRoomType_roomTypes_rooms,
  changeIndexForRoomType,
  changeIndexForRoomTypeVariables,
  getAllRoomType_GetAllRoomType_roomTypes_rooms
} from "../../../types/api";
import Preloader from "../../../atoms/preloader/Preloader";
import JDIcon from "../../../atoms/icons/Icons";
import {useModal} from "../../../hooks/hook";
import DrragList from "../../../atoms/animation/DrragList";
import RoomTypeModalWrap, {
  IRoomTypeModalInfo
} from "./components/RoomTypeModalWrap";
import RoomModalWrap, {IRoomModalInfo} from "./components/RoomModalWrap";
import Card from "../../../atoms/cards/Card";
import JDbox from "../../../atoms/box/JDbox";
import {MutationFn} from "react-apollo";
import EventListener from "react-event-listener";
import {IContext} from "../../MiddleServerRouter";
import Help from "../../../atoms/Help/Help";
import RoomTypeInfo from "../../../components/roomTypeInfo/RoomTypeInfo";
import {PureQueryOptions} from "apollo-boost";
import Mbr from "../../../atoms/mbr/Mbr";

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

// 👿 여기 로딩처리를 해결할 방법이 안보인다.
//  아마도 DragList의 자체문제인것 같다.
const RoomConfigNew: React.FC<IProps> = ({
  context,
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
    room: getAllRoomType_GetAllRoomType_roomTypes_rooms,
    index: number
  ) => (
    <JDbox
      className="roomConfig__roomBox"
      align="flexVcenter"
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
          <Preloader size="large" noAnimation loading={loading} />
        </div>
        {roomTypesData.length === 0 && !loading && (
          <h4 className="JDtextColor--placeHolder JDmargin-bottom0">
            방타입이 <Mbr /> 존재하지 않습니다.
          </h4>
        )}
        <DrragList
          onUpdate={(info: any, data) => {
            const {newIndex, oldIndex} = info;
            if (!roomTypesData[oldIndex]) return;
            changeIndexForRoomTypeMu({
              variables: {
                houseId: house._id,
                index: newIndex,
                roomTypeId: roomTypesData[oldIndex]._id
              }
            });
          }}
          key={`roomTypeDrag${roomTypesData.length}`}
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
                {recode.rooms.map(room => {
                  const RoomBox = getRoomBox(recode, room, index);
                  return <Fragment key={room._id}>{RoomBox}</Fragment>;
                })}
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
                  align="flexVcenter"
                  className="roomConfig__addRoomBox"
                  key={`add${recode._id}`}
                >
                  <h6 className="roomConfig__roomTitle">
                    <span className="JDstandard-small-space">방추가</span>
                    <JDIcon icon="edit" />
                  </h6>
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
