import React, {useEffect} from "react";
import "moment/locale/ko";
import {Link} from "react-router-dom";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  ASSIGT_IMELINE_HEIGHT
} from "../../../atoms/timeline/Timeline";
import ErrProtecter from "../../../utils/errProtect";
import Button from "../../../atoms/button/Button";
import "./RoomConfig.scss";
import {getAllRoomType_GetAllRoomType_roomTypes as IRoomType} from "../../../types/api";
import {ADD_ROOM} from "./RoomConfigWrap";
import Preloader from "../../../atoms/preloader/Preloader";
import JDdayPicker from "../../../atoms/dayPicker/DayPicker";
import {GlobalCSS, PricingType} from "../../../types/enum";
import JDIcon, {IconSize} from "../../../atoms/icons/Icons";
import {IUseDayPicker} from "../../../actions/hook";
import {IAssigGroup} from "../assig/components/assigIntrerface";

let LAST_ROOMTYPE = "unRendered";
let LAST_ROOM = "unRendered";

interface IProps {
  items?: any;
  roomData: IAssigGroup[];
  roomModal: any;
  defaultProps: any;
  setConfigMode: any;
  timelineProps?: any;
  roomTypeModal: any;
  loading?: boolean;
  dayPickerHook: IUseDayPicker;
  roomTypesData: IRoomType[] | undefined | null;
}

interface IRenderGroupProps {
  group: IAssigGroup;
}

const RoomConfigTimeline: React.SFC<IProps> = ({
  items,
  roomData,
  roomModal,
  setConfigMode,
  roomTypeModal,
  defaultProps,
  roomTypesData,
  loading,
  dayPickerHook,
  ...timelineProps
}) => {
  // 그룹 렌더 이건 밖으로 뺄수 있을것이다.
  const ModifyGroupRendererFn = ({group}: IRenderGroupProps) => {
    if (!group || !group.roomType) {
      return <div />;
    }

    const isDomitory = group.roomType.pricingType === PricingType.DOMITORY;
    const placeCount = isDomitory ? group.roomType.peopleCount : 1;

    const roomTypeStyle = {
      height:
        ASSIGT_IMELINE_HEIGHT * placeCount * (group.roomType.roomCount || 1) +
        (group.roomType.roomCount && ASSIGT_IMELINE_HEIGHT),
      minHeight: ASSIGT_IMELINE_HEIGHT
    };
    const roomStyle = {
      height: ASSIGT_IMELINE_HEIGHT * placeCount,
      minHeight: ASSIGT_IMELINE_HEIGHT
    };

    let renderRoomType: boolean = true;
    let renderRoom: boolean = true;

    if (LAST_ROOMTYPE === group.roomTypeId) renderRoomType = false;
    else LAST_ROOMTYPE = group.roomTypeId;

    if (LAST_ROOM === group.roomId) renderRoom = false;
    else LAST_ROOM = group.roomId;

    if (group.type === "addRoomType") renderRoom = true;

    useEffect(() => {
      LAST_ROOMTYPE = "unRendered";
      LAST_ROOM = "unRendered";
    }, []);

    return (
      <div>
        <div className="assigGroups custom-group">
          {/* 방타입 */}
          {renderRoomType && (
            <div
              id={`assigGroups__roomType${group.roomTypeId}`}
              className={`modifyGroups__roomGroup modifyGroups__roomType${
                group.roomTypeId
              }`}
            >
              <Button
                className="modifyGroups__roomGroupBtn"
                style={roomTypeStyle}
                thema="point"
                label={
                  group.type === "addRoomType"
                    ? "방타입추가"
                    : group.roomType.name
                }
                icon={group.type === "addRoomType" ? "add" : undefined}
                onClick={() => {
                  roomTypeModal.openModal({
                    roomTypeId: group.roomTypeId,
                    roomTypeIndex: group.roomTypeIndex
                  });
                }}
              />
            </div>
          )}
          {renderRoom && (
            <div
              style={roomStyle}
              id={`modifyGroups__room${group.roomId}`}
              className={`modifyGroups modifyGroups__room modifyGroups__room modifyGroups__room${
                group.roomId
              } ${
                isDomitory
                  ? "modifyGroups__room--domitory"
                  : "modifyGroups__room--roomType"
              } ${group.isLastOfRoomType && " modifyGroups__room--last"}`}
            >
              <Button
                label={group.type !== "normal" ? "방추가" : group.title}
                thema="primary"
                mode="flat"
                style={roomStyle}
                disabled={group.roomTypeIndex === ADD_ROOM.ADDROOM_TYPE}
                onClick={() => {
                  roomModal.openModal({
                    roomTypeIndex: group.roomTypeIndex,
                    roomTypeId: group.roomTypeId,
                    roomIndex: group.roomIndex,
                    roomId: group.roomId
                  });
                }}
                className="modifyGroups__button"
              />
            </div>
          )}
          {isDomitory && (
            <div
              className={`modifyGroups__place modifyGroups__place${
                group.roomTypeId
              } modifyGroups__place${group.roomId} title ${group.isLastOfRoom &&
                "modifyGroups__place--last"}`}
            >
              <span className="modifyGroups__placeIn">
                {group.placeIndex === -1 ? "+" : group.placeIndex}
              </span>
            </div>
          )}
        </div>
      </div>
      // <div>
      //   {/* 방타입 */}
      //   <div className="modifyGroups custom-group">
      //     {renderGroup && (

      //     )}
      //     {/* 방 */}
      //     <span className="title">
      //       <Button
      //         label={group.title}
      //         thema="primary"
      //         mode="flat"
      //         disabled={group.roomTypeIndex === ADD_ROOM.ADDROOM_TYPE}
      //         onClick={() => {
      //           roomModal.openModal({
      //             roomTypeIndex: group.roomTypeIndex,
      //             roomTypeId: group.roomTypeId,
      //             roomIndex: group.roomIndex,
      //             roomId: group.id
      //           });
      //         }}
      //         className="modifyGroups__button"
      //       />
      //     </span>
      //     <p className="tip">{group.tip}</p>
      //   </div>
      // </div>
    );
  };
  // 아이템 렌더
  const itemRendererFn = ({
    item,
    itemContext,
    getItemProps,
    getResizeProps
  }: any) => {
    const {left: leftResizeProps, right: rightResizeProps} = getResizeProps();
    return (
      <div {...getItemProps(item.itemProps)}>
        {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ""}
        <div
          className="rct-item-content myClasses"
          style={{maxHeight: `${itemContext.dimensions.height}`}}
        >
          {itemContext.title}
        </div>
        {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ""}
      </div>
    );
  };
  // 사이드 탑 렌더
  const modifySideBarRendererFn = () => <div className="modify__sideTop" />;

  return (
    <div id="RoomConfigTimeline" className="container container--full">
      <div className="docs-section">
        <h3>방생성 및 수정</h3>
        <div className="flex-grid flex-grid--end">
          <Link to="/assigTimeline">
            <Button
              float="right"
              onClick={setConfigMode}
              icon="persons"
              label="배정화면으로"
            />
          </Link>
        </div>
        <div className="RoomConfigTimeline__timelineWrapScroll">
          <div className="RoomConfigTimeline__timelineWrap">
            <Timeline
              {...defaultProps}
              {...timelineProps}
              items={[{}]}
              groups={roomData}
              itemRenderer={itemRendererFn}
              groupRenderer={ModifyGroupRendererFn}
              sidebarContent={modifySideBarRendererFn()}
            >
              <TimelineHeaders>
                <SidebarHeader>
                  {({getRootProps}: any) => (
                    <div
                      className="rct-header-root__topLeft"
                      {...getRootProps()}
                    >
                      <JDdayPicker
                        isRange={false}
                        input
                        {...dayPickerHook}
                        canSelectBeforeDays={false}
                        label="달력날자"
                        className="JDwaves-effect JDoverflow-visible"
                        inputComponent={
                          <span>
                            <JDIcon
                              className="specificPrice__topLeftIcon"
                              size={IconSize.MEDEIUM_SMALL}
                              icon="calendar"
                            />
                          </span>
                        }
                      />
                    </div>
                  )}
                </SidebarHeader>
                <DateHeader
                  height={GlobalCSS.TIMELINE_HEADER_HEIGHT}
                  unit="day"
                />
                <DateHeader />
              </TimelineHeaders>
            </Timeline>
            <Preloader
              className="RoomConfigTimeline__mainPreloader"
              size="medium"
              floating
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrProtecter(RoomConfigTimeline);
