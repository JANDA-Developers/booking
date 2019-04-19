import React from 'react';
import 'moment/locale/ko';
import { Link } from 'react-router-dom';
import Timeline from '../../../components/timeline/Timeline';
import ErrProtecter from '../../../utils/ErrProtecter';
import Button from '../../../atoms/button/Button';
import './ModifyTimeline.scss';
import { getAllRoomType_GetAllRoomType_roomTypes as IRoomType } from '../../../types/api';
import { ADD_ROOM } from './ModifyTimelineWrap';
import Preloader from '../../../atoms/preloader/Preloader';
import isLastRendered from './components/timelineUtils';

let LAST_ROOMTYPE: any = 'unRendered'; // 방들중에 방타입이 다른 마지막을 체크할것

interface IProps {
  items: any;
  roomData: any;
  defaultProps: any;
  timelineProps: any;
  loading: boolean;
  roomTypesData: IRoomType[] | undefined;
}

const ModifyTimeline: React.SFC<IProps> = ({
  items,
  roomData,
  defaultProps,
  roomTypesData,
  loading,
  ...timelineProps
}) => {
  // 그룹 렌더
  const ModifyGroupRendererFn = ({ group }: any) => {
    const roomType: IRoomType | undefined = roomTypesData && roomTypesData[group.roomTypeIndex];
    const roomTypeCount: number = roomType ? roomType.roomCount : 0;
    const roomGroupStyle = {
      height: 36 * (roomTypeCount + 1),
      minHeight: 36,
    };

    //  룹타입 부분 렌더할지 체크
    const { renderGroup, inLast_roomtype } = isLastRendered(group, LAST_ROOMTYPE);
    LAST_ROOMTYPE = inLast_roomtype;

    return (
      <div>
        {/* 방타입 */}
        <div className="modifyGroups custom-group">
          <div style={roomGroupStyle}>
            {renderGroup && (roomType && roomType.name)}
            {/* 방 */}
          </div>
          <span className="title">{group.title}</span>
        </div>
      </div>
    );
  };
  
  // 아이템 렌더
  const itemRendererFn = ({
    item, itemContext, getItemProps, getResizeProps,
  }: any) => {
    return (

    );
  };
  // 사이드 탑 렌더
  const modifySideBarRendererFn = () => <div className="modify__sideTop" />;

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
              sidebarContent={modifySideBarRendererFn()}
            />
            {loading && <Preloader />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrProtecter(ModifyTimeline);
