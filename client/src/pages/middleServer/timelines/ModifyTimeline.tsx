import React from 'react';
import 'moment/locale/ko';
import { Link } from 'react-router-dom';
import Timeline from '../../../components/timeline/Timeline';
import ErrProtecter from '../../../utils/ErrProtecter';
import Button from '../../../atoms/button/Buttons';
import './ModifyTimeline.scss';
import { getAllRoomType_GetAllRoomType_roomTypes } from '../../../types/api';
import { ADD_ROOM } from './ModifyTimelineWrap';
import Preloader from '../../../atoms/preloader/Preloader';

let LAST_ROOMTYPE = 'unRendered'; // 방들중에 방타입이 다른 마지막을 체크할것

interface IProps {
  items: any;
  roomData: any;
  roomModal: any;
  defaultProps: any;
  setConfigMode: any;
  timelineProps: any;
  roomTypeModal: any;
  loading: boolean;
  roomTypesData: getAllRoomType_GetAllRoomType_roomTypes[] | undefined;
}

const ModifyTimeline: React.SFC<IProps> = ({
  items,
  roomData,
  roomModal,
  setConfigMode,
  roomTypeModal,
  defaultProps,
  roomTypesData,
  loading,
  ...timelineProps
}) => {
  // 그룹 렌더
  const ModifyGroupRendererFn = ({ group }: any) => {
    const roomType: getAllRoomType_GetAllRoomType_roomTypes | undefined = roomTypesData && roomTypesData[group.roomTypeIndex];
    const roomTypeCount: number = roomType ? roomType.roomCount : 0;
    const roomGroupStyle = {
      height: 36 * (roomTypeCount + 1),
      minHeight: 36,
    };

    let renderGroup: boolean = true;

    if (LAST_ROOMTYPE === group.roomTypeId && group.roomTypeId !== ADD_ROOM.ADDROOM_TYPE) renderGroup = false;
    else LAST_ROOMTYPE = group.roomTypeId;
    return (
      <div>
        {/* 방타입 */}
        <div className="modifyGroups custom-group">
          {renderGroup && (
            <Button
              className="modifyGroups__roomGroup"
              thema="secondary"
              label={roomType ? roomType.name : '방타입추가'}
              style={roomGroupStyle}
              icon={group.roomTypeIndex === ADD_ROOM.ADDROOM_TYPE ? 'add' : undefined}
              onClick={() => {
                roomTypeModal.openModal({ roomTypeId: group.roomTypeId, roomTypeIndex: group.roomTypeIndex });
              }}
            />
          )}
          {/* 방 */}
          <span className="title">
            <Button
              label={group.title}
              thema="primary"
              mode="flat"
              disabled={group.roomTypeIndex === ADD_ROOM.ADDROOM_TYPE}
              onClick={() => {
                roomModal.openModal({
                  roomTypeIndex: group.roomTypeIndex,
                  roomTypeId: group.roomTypeId,
                  roomIndex: group.roomIndex,
                  roomId: group.id,
                });
              }}
              className="modifyGroups__button"
            />
          </span>
          <p className="tip">{group.tip}</p>
        </div>
      </div>
    );
  };
  // 아이템 렌더
  const itemRendererFn = ({
    item, itemContext, getItemProps, getResizeProps,
  }: any) => {
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
    return (
      <div {...getItemProps(item.itemProps)}>
        {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ''}
        <div className="rct-item-content myClasses" style={{ maxHeight: `${itemContext.dimensions.height}` }}>
          {itemContext.title}
        </div>
        {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ''}
      </div>
    );
  };

  return (
    <div id="ModifyTimeline" className="container container--full">
      <div className="docs-section">
        <div className="flex-grid flex-grid--end">
          <div className="flex-grid__col col--full-4 col--lg-4 col--md-6">
            <h3>방생성 및 수정</h3>
          </div>
          <Link to="/middleServer/timeline">
            <Button float="right" onClick={setConfigMode} icon="persons" label="배정화면으로" />
          </Link>
        </div>
        <div className="ModifyTimeline__timelineWrapScroll">
          <div className="ModifyTimeline__timelineWrap">
            <Timeline
              {...defaultProps}
              {...timelineProps}
              items={[{}]}
              groups={roomData}
              itemRenderer={itemRendererFn}
              groupRenderer={ModifyGroupRendererFn}
            />
            {loading && <Preloader />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrProtecter(ModifyTimeline);
