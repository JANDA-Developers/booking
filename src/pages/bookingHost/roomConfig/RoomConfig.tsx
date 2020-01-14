import React, { Fragment, useState } from "react";
import "moment/locale/ko";
import Button from "../../../atoms/button/Button";
import "./RoomConfig.scss";
import _ from "lodash";
// @ts-ignore
import omitDeep from "omit-deep";
import {
  getAllRoomType_GetAllRoomType_roomTypes as IRoomType,
  UpsertRoomTypeInput
} from "../../../types/api";
import Preloader from "../../../atoms/preloader/Preloader";
import { useModal, LANG } from "../../../hooks/hook";
import Card from "../../../atoms/cards/Card";
import { IContext } from "../../bookingHost/BookingHostRouter";
import Help from "../../../atoms/Help/Help";
import RoomTypeInfo from "../../../components/roomTypeInfo/RoomTypeInfo";
import PageHeader from "../../../components/pageHeader/PageHeader";
import PageBody from "../../../components/pageBody/PageBody";
import RoomModal from "./components/RoomModal";
import RoomTypeModal from "./components/RoomTypeModal";
import { DEFAULT_ROOMTYPE } from "../../../types/defaults";
import { RoomTypeAddBtn, RoomAddBtn } from "./components/AddBtns";
import {
  TMode,
  IRoomDataSet,
  IRoomTypeModalInfo,
  TRoomModalSubmit,
  IRoomModalInfo
} from "./declation";
import $ from "jquery";
import { s4, isEmpty } from "../../../utils/utils";
import { RoomBox } from "./components/RoomBox";
import { toast } from "react-toastify";
import { RoomConfigSubmitData } from "../../../components/bookingModal/declaration";

interface IProps {
  context: IContext;
  defaultData: {
    roomTypesData: IRoomType[];
    defaultCreateRoomType: IRoomType[];
  };
  onSubmit: (data: RoomConfigSubmitData) => void;
  submitRef?: React.MutableRefObject<null>;
  isStart?: boolean;
  loading?: boolean;
}

const RoomConfig: React.FC<IProps> = ({
  context,
  loading,
  onSubmit,
  submitRef,
  isStart,
  defaultData
}) => {
  const { defaultCreateRoomType, roomTypesData } = defaultData;
  const roomTypeModalHook = useModal<IRoomTypeModalInfo>(false, {});
  const roomModalHook = useModal<IRoomModalInfo>(false, {});
  const defulatData = {
    original: roomTypesData,
    createDatas: defaultCreateRoomType,
    deleteIds: [],
    updateDatas: $.extend(true, [], roomTypesData)
  };
  const [data, setData] = useState<IRoomDataSet>(defulatData);
  const shouldSave = data !== defulatData;
  const finder = (
    id: string,
    target: ("update" | "create" | "original" | "delete")[]
  ): (IRoomType | string)[] => {
    const findInCreate = (id: string) => {
      return data.createDatas.find(RT => RT._id === id);
    };
    const findInOriginal = (id: string) => {
      return data.original.find(RT => RT._id === id);
    };

    const findInUpdate = (id: string) => {
      return data.updateDatas.find(RT => RT._id === id);
    };

    const roomType = target.filter(t => {
      let target: IRoomType | undefined | string;
      if (t === "update") target = findInUpdate(id);
      if (t === "create" && !target) target = findInCreate(id);
      if (t === "original" && !target) target = findInOriginal(id);
      if (t === "delete" && !target)
        target = data.deleteIds.find(_id => _id === id);
      return target;
    });

    return roomType;
  };

  const originalUniqData = data.original.filter(d => {
    const targets = finder(d._id, ["create", "update", "delete"]);
    if (isEmpty(targets)) return true;
    return false;
  });

  const viewRoomTypeData = [
    ...data.createDatas,
    ...data.updateDatas,
    ...originalUniqData
  ];

  const isRoomTypeExist = viewRoomTypeData.length === 0 && !loading;

  function handleSubmit() {
    if (isStart) {
      if (isEmpty(data.createDatas)) {
        toast.warn("Empty roomType");
        return false;
      }
    }

    const deleteDatas = {
      __typename: undefined,
      index: undefined,
      roomCount: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      _id: undefined
    };

    const removeUnExisistId = (roomTypeId: string, room: any) => {
      const targetRoomType = data.original.find(o => o._id === roomTypeId);
      room.__typename = undefined;

      if (!targetRoomType) {
        room._id = undefined;
        return room;
      }

      const targetRoom = targetRoomType.rooms.find(r => r._id === room._id);
      if (!targetRoom) {
        room._id = undefined;
      }

      console.log("room");
      return room;
    };

    const updateInput: UpsertRoomTypeInput[] = data.updateDatas.map(
      RT =>
        omitDeep({
          ...RT,
          img: omitDeep(RT.img, ["__typename"]),
          rooms: RT.rooms.map(r => removeUnExisistId(RT._id, r)),
          ...deleteDatas,
          roomTypeId: RT._id
        }),
      ["__typename"]
    );

    const createInput: UpsertRoomTypeInput[] = data.createDatas.map(
      RT =>
        omitDeep({
          ...RT,
          img: omitDeep(RT.img, ["__typename"]),
          rooms: RT.rooms.map(r => removeUnExisistId(RT._id, r)),
          ...deleteDatas
        }),
      ["__typename"]
    );

    const submitData: RoomConfigSubmitData = {
      ...data,
      updateDatas: updateInput,
      createDatas: createInput
    };

    console.log("submitData");
    console.log(submitData);

    onSubmit(submitData);
  }

  const removeRoomType = async (_id: string) => {
    // Remove in update && create
    _.remove(data.createDatas, RT => RT._id === _id);
    _.remove(data.updateDatas, RT => RT._id === _id);
    // Add to remove array
    data.deleteIds.push(_id);
  };

  const addNewUpdate = async (roomType: IRoomType) => {
    data.updateDatas.push(roomType);
  };

  const createRoomType = async (roomType: IRoomType) => {
    // Add new id to roomType
    const tempId = s4();
    roomType._id = tempId;
    // Add to create array
    data.createDatas.unshift(roomType);
  };

  const updateRoomType = async (roomType: IRoomType) => {
    console.log("this is happend");
    var index = _.findIndex(data.updateDatas, { _id: roomType._id });
    data.updateDatas.splice(index, 1, roomType);
  };

  const handleRoomTypeModalSubmit = async (
    roomType: IRoomType,
    mode: TMode
  ) => {
    // TODO :: Do validation
    const { _id } = roomType;
    if (mode === "delete") {
      console.log(1);
      if (!isEmpty(finder(_id, ["create"]))) {
        console.log(2);
        data.createDatas = data.createDatas.filter(rt => rt._id !== _id);
      } else {
        console.log(3);
        await removeRoomType(_id);
      }
    } else if (mode === "create") {
      await createRoomType(roomType);
    } else if (mode === "update") {
      const isInCreate = data.createDatas.find(RT => RT._id === _id);
      const isInUpdate = data.updateDatas.find(RT => RT._id === _id);

      // update in create
      if (isInCreate) {
        var index = _.findIndex(data.createDatas, { _id: _id });
        data.createDatas.splice(index, 1, roomType);
      } else if (isInUpdate) {
        updateRoomType(roomType);
      } else {
        //
        addNewUpdate(roomType);
      }
    }
    setData({ ...data });
    roomTypeModalHook.closeModal();
  };

  const noRoomTypeMessage = (
    <h4 className="JDtextColor--placeHolder">
      {LANG("roomType_dose_not_exsist")}
    </h4>
  );

  const handleSubmitRoomModal: TRoomModalSubmit = (rooms, roomType, mode) => {
    if (mode === "delete") {
      const filteredRooms = roomType.rooms.filter(
        _room => rooms[0]._id !== _room._id
      );

      const targetRoomType = finder(roomType._id, ["create", "update"]);
      if (isEmpty(targetRoomType)) {
        const originalCopy = $.extend(true, {}, roomType);
        originalCopy.rooms = filteredRooms;
        data.updateDatas.push(originalCopy);
      } else {
        roomType.rooms = filteredRooms;
      }
    } else if (mode === "update") {
      rooms.forEach(room => {
        const target = roomType.rooms.find(_room => _room._id === room._id);
        if (target) room = target;
      });
      if (isEmpty(finder(roomType._id, ["create", "update"]))) {
        data.updateDatas.push(roomType);
      }
    } else if (mode === "create") {
      roomType.rooms = [...roomType.rooms, ...rooms];
      if (isEmpty(finder(roomType._id, ["create", "update"]))) {
        data.updateDatas.push(roomType);
      }
    }
    roomModalHook.closeModal();
    setData({ ...data });
  };

  return (
    <div id="RoomConfig" className="roomConfig">
      <PageHeader
        title={LANG("room_setting")}
        desc={LANG("room_config_desc")}
      />
      <PageBody>
        <div>
          <RoomTypeAddBtn
            mode={isStart ? "flat" : undefined}
            onClick={() => {
              roomTypeModalHook.openModal({
                roomType: DEFAULT_ROOMTYPE,
                mode: "create"
              });
            }}
          />
          <Button
            hidden={isStart}
            pulse={shouldSave}
            id="RoomConfigSubmitBtn"
            mode={isStart ? "flat" : undefined}
            refContainer={submitRef}
            thema="point"
            label={LANG("save")}
            onClick={() => {
              handleSubmit();
            }}
          />
        </div>
        <Fragment>
          <div>
            <Preloader size="large" noAnimation loading={loading} />
          </div>
          {/* 방타입 카드 출력 */}
          {isRoomTypeExist && noRoomTypeMessage}
          {viewRoomTypeData.map((roomType, index) => {
            const { _id, name } = roomType;
            return (
              <Card
                id={`RoomTypeCard${_id}`}
                key={_id}
                className={`TRoomTypeCard JDstandard-space0 roomConfig__roomType roomConfig__roomType${_id}`}
              >
                <div className="roomConfig__roomCardWrap">
                  <div className="roomConfig__roomType_titleSection">
                    {/* Card Head */}
                    <div className="roomConfig__roomType_titleAndIcons">
                      <h5 className="TRoomTypeName RoomTypeName JDstandard-space">
                        {name}
                      </h5>
                      <Help
                        icon="info"
                        tooltip={<RoomTypeInfo roomType={roomType} />}
                      />
                    </div>
                    {/* Room Type Update Btn */}
                    <Button
                      className="TRoomTypeUpdateBtn"
                      id={`RoomTypeModifyBtn${index}`}
                      onClick={() => {
                        roomTypeModalHook.openModal({
                          roomType: roomType,
                          mode: "update"
                        });
                      }}
                      mode="border"
                      label={LANG("do_modify")}
                      icon={"edit"}
                      size="small"
                    />
                  </div>
                  <div className="roomConfig__roomsWrapWrap">
                    {/* Room */}
                    {roomType.rooms.map((room, index) => {
                      const { _id, name } = room;
                      return (
                        <RoomBox
                          key={_id}
                          onClick={() => {
                            roomModalHook.openModal({
                              roomType,
                              room,
                              mode: "update"
                            });
                          }}
                          roomName={name}
                          roomTypeId={roomType._id}
                          roomId={_id}
                        />
                      );
                    })}
                    <RoomAddBtn
                      onClick={(e: any) => {
                        e.preventDefault();
                        e.stopPropagation();
                        roomModalHook.openModal({
                          roomType,
                          mode: "create"
                        });
                      }}
                      index={index}
                      roomTypeId={roomType._id}
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </Fragment>
      </PageBody>
      <RoomTypeModal
        key={`${roomTypeModalHook.isOpen}`}
        onSubmit={handleRoomTypeModalSubmit}
        context={context}
        modalHook={roomTypeModalHook}
      />
      <RoomModal
        context={context}
        key={roomModalHook.info.room?._id || s4()}
        modalHook={roomModalHook}
        onSubmit={handleSubmitRoomModal}
      />
    </div>
  );
};

export default RoomConfig;
