import React, { Fragment, useState } from "react";
import "moment/locale/ko";
import Button from "../../../atoms/button/Button";
import "./RoomConfig.scss";
import _ from "lodash";
// @ts-ignore
import omitDeep from "omit-deep";
import { getAllRoomType_GetAllRoomType_roomTypes as IRoomType, OptionalItemUpsertInput } from "../../../types/api";
import { OptionalItemType } from "../../../types/enum";
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
import Swapping from "../../../utils/swapping";
import selectOpCreater from "../../../utils/selectOptionCreater";
import JDselect from "../../../atoms/forms/selectBox/SelectBox";
import OptionalProductModal, {IOptionModalInfo} from "./OptionalProductModal"
import TagModal, { TModalInfo } from "../../../components/tagModal/TagModal";
import { TChangeTags, THandleChangeOptionalProduct } from "./RoomConfigWrap";
import {
  JDtypho,
  dataURLtoFile,
  JDicon,
  JDmodal,
  JDbutton,
  useInput,
  JDalign,
  copytoClipboard
} from "@janda-com/front";
import { InputText } from "@janda-com/front";
import { ExtraRoomTypeConfig } from "../../../types/enum";
import ExtraConfigModal, {
  IExtraConfigProp
} from "./components/ExtraConfigModal";
import JDIcon from "../../../atoms/icons/Icons";

interface IProps {
  context: IContext;
  defaultData: {
    roomTypesData: IRoomType[];
    defaultAddTemp?: IRoomType[];
  };
  handleChangTags: TChangeTags;
  saveRoomsLoading?: boolean;
  onSubmit: (data: RoomConfigSubmitData) => void;
  submitRef?: React.MutableRefObject<null>;
  isStart?: boolean;
  loading?: boolean;
  handleOptionalProduct:  THandleChangeOptionalProduct
  upsertRoomTypeOptionLoading: boolean;
}

const RoomConfig: React.FC<IProps> = ({
  context,
  loading,
  onSubmit,
  submitRef,
  saveRoomsLoading,
  isStart,
  defaultData,
  handleChangTags,
  handleOptionalProduct,
  upsertRoomTypeOptionLoading
}) => {
  const optionalProductModalHook = useModal<IOptionModalInfo>();
  const tagModalHook = useModal<IExtraConfigProp>(false);
  const { defaultAddTemp, roomTypesData } = defaultData;
  const roomTypeModalHook = useModal<IRoomTypeModalInfo>(false, {});
  const roomModalHook = useModal<IRoomModalInfo>(false, {});
  const extraDescribtHook = useInput("");

  const defulatData = {
    original: roomTypesData,
    deleteIds: [],
    updateCreateData: $.extend(
      true,
      [],
      [...roomTypesData, ...(defaultAddTemp || [])]
    )
  };
  const [data, setData] = useState<IRoomDataSet>(defulatData);
  const shouldSave = data !== defulatData;
  const indexOp = selectOpCreater({
    count: data.updateCreateData.length || 1,
    labelAdd: LANG("index_unit"),
    start: 1
  });

  // 원하는 타입의 정보들을 반환
  const finder = (
    id: string,
    target: ("update" | "original" | "delete")[]
  ): (IRoomType | string)[] => {
    const findInOriginal = (id: string) => {
      return data.original.find(RT => RT._id === id);
    };

    const findInUpdate = (id: string) => {
      return data.updateCreateData.find(RT => RT._id === id);
    };

    const roomType = target.filter(t => {
      let target: IRoomType | undefined | string;
      if (t === "update") target = findInUpdate(id);
      if (t === "original" && !target) target = findInOriginal(id);
      if (t === "delete" && !target)
        target = data.deleteIds.find(_id => _id === id);
      return target;
    });

    return roomType;
  };

  // 오리지널에만 존재하는 데이터 로딩하는 순간에 이부분 필터가 안딘다..
  const originalUniqData = data.original.filter(d => {
    const targets = finder(d._id, ["update", "delete"]);
    if (isEmpty(targets)) return true;
    return false;
  });

  const viewRoomTypeData = saveRoomsLoading
    ? [...data.updateCreateData]
    : [...data.updateCreateData, ...originalUniqData];

  const isRoomTypeExist = viewRoomTypeData.length === 0 && !loading;

  function handleSubmit() {
    if (isStart && isEmpty(data.updateCreateData)) {
      toast.warn("방타입이 없습니다.");
      return false;
    }

    // 불필요한 정보를 객체안에서 제거
    const getClearUpdateInput = () => {
      return data.updateCreateData.map(RT => {
        const targetIsInOrigin = data.original.find(o => o._id === RT._id);

        if (targetIsInOrigin)
          // @ts-ignore
          RT["roomTypeId"] = RT._id;

        delete RT._id;
        delete RT.__typename;
        delete RT.roomCount;
        delete RT.createdAt;
        delete RT.updatedAt;
        delete RT.tags;
        delete RT.code;
        delete RT.optionalItems;

        RT.images =
          RT.uploadImg?.map(localFile =>
            dataURLtoFile(localFile.base64, localFile.fileName)
          ) || ([] as any);

        console.log("RT.uploadImg");
        console.log(RT.uploadImg);
        delete RT.uploadImg;

        RT.rooms.forEach(r => {
          if (targetIsInOrigin) {
            const isInOrigin = targetIsInOrigin.rooms.find(
              rin => rin._id === r._id
            );
            if (!isInOrigin) delete r._id;
          } else {
            delete r._id;
          }
          delete r.__typename;
        });
        return RT;
      });
    };

    const updateInput = getClearUpdateInput();
    const submitData: RoomConfigSubmitData = {
      ...data,
      updateCreateDatas: updateInput
    };

    onSubmit(submitData);
  }

  // 크리에이트와 업데이트에 해당 룸타입 제거 + 딜리트에 추가
  const removeRoomType = async (_id: string) => {
    // Remove in update && create
    _.remove(data.updateCreateData, RT => RT._id === _id);
    // Add to remove array
    data.deleteIds.push(_id);
  };

  // 새로운 룸타입을 업데이트 배열에 추가
  const updateRTfromOriginal = async (roomType: IRoomType) => {
    data.updateCreateData.push(roomType);
  };

  // 새로운 룸타입을 생성 배열 추가
  const createRoomType = async (roomType: IRoomType) => {
    // 새로운 아이디를 부여
    const tempId = s4();
    roomType._id = tempId;
    // 업데이트 배열에 추가
    data.updateCreateData.unshift(roomType);
  };

  const updateRTfromUpdate = async (roomType: IRoomType) => {
    var index = _.findIndex(data.updateCreateData, { _id: roomType._id });
    data.updateCreateData.splice(index, 1, roomType);
  };

  // 방타입 모달로 부터 정손받은 데이터를 정리함
  const handleRoomTypeModalSubmit = async (
    roomType: IRoomType,
    mode: TMode
  ) => {
    const { _id } = roomType;
    if (mode === "delete") await removeRoomType(_id);
    if (mode === "create") await createRoomType(roomType);
    if (mode === "update") {
      const isInUpdate = data.updateCreateData.find(RT => RT._id === _id);

      if (isInUpdate) updateRTfromUpdate(roomType);
      else updateRTfromOriginal(roomType);
    }
    setData({ ...data });
    roomTypeModalHook.closeModal();
  };

  // 방이 없을때 메세지
  const noRoomTypeMessage = (
    <h4 className="JDtextColor--placeHolder">
      {LANG("roomType_dose_not_exsist")}
    </h4>
  );

  // 룸 모달로 부터 반환된 정보를 종합적으로 검토해서 알맞은 배열에 추가 및 배열 수정
  const handleSubmitRoomModal: TRoomModalSubmit = async (
    rooms,
    roomType,
    mode,
    index
  ) => {
    const { hashTags, _id: roomTypeId, name } = roomType;
    const isInUpdate = !isEmpty(finder(roomTypeId, ["update"]));
    const originalCopy = $.extend(true, {}, roomType);

    if (index !== undefined && rooms[0]) {
      await changeRoomIndex(roomTypeId, rooms[0]._id, index);
    }

    if (mode === "delete") {
      const filteredRooms = roomType.rooms.filter(
        _room => rooms[0]._id !== _room._id
      );

      const deleteInOriginal = () => {
        originalCopy.rooms = filteredRooms;
        data.updateCreateData.push(originalCopy);
      };

      const deleteInUpdate = () => {
        roomType.rooms = filteredRooms;
      };

      if (!isInUpdate) deleteInOriginal();
      else deleteInUpdate();
    }

    if (mode === "update") {
      const updateFromOrigin = () => {
        originalCopy.rooms = rooms;
        data.updateCreateData.push(originalCopy);
      };

      const updateInUpdate = () => {
        rooms.forEach(room => {
          let target = roomType.rooms.find(_room => _room._id === room._id);
          if (target) target = room;
        });
      };

      if (!isInUpdate) updateFromOrigin();
      else updateInUpdate();
    }

    if (mode === "create") {
      const createInUpdate = () => {
        roomType.rooms = [...roomType.rooms, ...rooms];
      };

      const createFromOriginal = () => {
        data.updateCreateData.push(originalCopy);
      };

      if (!isInUpdate) createFromOriginal();
      else createInUpdate();
    }

    roomModalHook.closeModal();
    setData({ ...data });
  };

  const changeRoomTypeIndex = (roomTypeId: string, indexTo: number) => {
    // 모든데이터가 업데이트에 있다고 가정 합니다.
    const max = data.updateCreateData.length - 1;
    if (indexTo < 0 || indexTo > max)
      throw Error("인덱스가 존재하지 않습니다.");

    const targetIndex = data.updateCreateData.findIndex(
      rt => rt._id === roomTypeId
    );

    if (targetIndex === -1) throw Error("존재하지 않는 룸타입 아이디");

    Swapping(data.updateCreateData, targetIndex, indexTo);
    setData({ ...data });
  };

  const changeRoomIndex = async (
    roomTypeId: string,
    roomId: string,
    indexTo: number
  ) => {
    const roomType = data.updateCreateData.find(rt => rt._id === roomTypeId);
    if (!roomType) throw Error("존재하지 않는 룸타입 아이디");

    const targetIndex = roomType.rooms.findIndex(RT => RT._id === roomId);

    if (targetIndex === -1) throw Error("존재하지 않는 룸 아이디");

    Swapping(roomType.rooms, targetIndex, indexTo);

    return;
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
            <Preloader floating noAnimation loading={loading} />
          </div>
          {/* 방타입 카드 출력 */}
          {isRoomTypeExist && noRoomTypeMessage}
          {viewRoomTypeData.map((roomType, index) => {
            const { _id, name, tags,optionalItems } = roomType;
            return (
              <Card
                id={`RoomTypeCard${_id}`}
                key={`RoomTypeCard${_id}`}
                className={`TRoomTypeCard JDstandard-space0 roomConfig__roomType roomConfig__roomType${_id}`}
              >
                <div className="roomConfig__roomCardWrap">
                  <div className="roomConfig__roomType_titleSection">
                    {/* Card Head */}
                    <div className="roomConfig__roomType_titleAndIcons">
                      <h5 className="TRoomTypeName RoomTypeName JDstandard-space">
                        {name}
                      </h5>
                      <JDalign 
                      style={{
                        height: "min-content"
                      }}
                      flex={{
                        vCenter:true
                      }}>
                      <JDalign mr="small">
                        <Help
                          icon="info"
                          tooltip={<RoomTypeInfo roomType={roomType} />}
                        />
                      </JDalign>
                      <JDIcon
                      mr="small"
                        icon="gift"
                        className="JDtextColor--grey2"
                        hover
                        onClick={() => {
                          optionalProductModalHook.openModal({
                            roomTypeId:  _id,
                            defaultData: optionalItems || [],
                            handleSave: handleOptionalProduct
                          })
                        }}
                      />
                      <JDicon
                        color="grey2"
                        mr="small"
                        icon="gear"
                        hover
                        onClick={() => {
                          tagModalHook.openModal({
                            describ:
                              tags.find(
                                t => t.key === ExtraRoomTypeConfig.ExtraDescrib
                              )?.value || "",
                            roomTypeId: _id
                          });
                        }}
                      />
                      <JDicon
                        color="grey2"
                        icon="file"
                        hover
                        tooltip="상품코드 복사"
                        onClick={() => {
                          copytoClipboard(roomType.code)
                        }}
                      />
                      </JDalign>
                    </div>
                    {/* Room Type Update Btn */}
                    <div
                      className="JDflex"
                      style={{
                        position: "relative",
                        zIndex: data.updateCreateData.length + 10 - index
                      }}
                    >
                      <JDselect
                        autoSize
                        selectedOption={indexOp[index]}
                        onChange={v => {
                          changeRoomTypeIndex(roomType._id, v.value - 1);
                        }}
                        displayArrow={false}
                        options={indexOp}
                      />
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
                        label={LANG("modify")}
                        icon={"edit"}
                        size="small"
                      />
                    </div>
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
                              modalProp: {
                                head: {
                                  title: LANG("update_room_modal_title")(name)
                                }
                              },
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
                          modalProp: {
                            head: {
                              title: (
                                <div>
                                  <JDtypho size="h6" mb="normal">
                                    {LANG("create_room_modal_title")(name)}
                                  </JDtypho>
                                  <JDtypho size="small">
                                    {LANG("create_room_modal_desc")}
                                  </JDtypho>
                                </div>
                              )
                            }
                          },
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
      <OptionalProductModal loading={upsertRoomTypeOptionLoading} modalHook={optionalProductModalHook} />
      <ExtraConfigModal
        key={tagModalHook.info.roomTypeId + "ExtraConfigModal"}
        handleChangTags={handleChangTags}
        tagModalHook={tagModalHook}
      />
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
const memoRoomConfig = React.memo(RoomConfig, (prev, next) => {
  if (next.loading || next.saveRoomsLoading) return false;
  return true;
});

export default memoRoomConfig;
