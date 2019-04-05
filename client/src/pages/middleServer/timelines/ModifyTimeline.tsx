import React from 'react';
import 'moment/locale/ko';
import { Link } from 'react-router-dom';
import Timeline from '../../../components/timeline/Timeline';
import ErrProtecter from '../../../utils/ErrProtecter';
import Button from '../../../atoms/button/Buttons';
import './ModifyTimeline.scss';

const LAST_GROUP = 'unRendered'; // 방들중에 방타입이 다른 마지막을 체크할것

interface IProps {
  items: any;
  roomData: any;
  roomModal: any;
  defaultProps: any;
  setConfigMode: any;
  timelineProps: any;
  roomTypeModal: any;
}

const ModifyTimeline: React.SFC<IProps> = ({
  items,
  roomData,
  roomModal,
  setConfigMode,
  roomTypeModal,
  defaultProps,
  ...timelineProps
}) => {
  // 그룹 렌더
  const ModifyGroupRendererFn = ({ group }: any) => {
    const roomGroupStyle = {
      height: 36, // 여기다가 * group.roomType.roomCount 곱함
    };

    console.log(roomData);

    return (
      <div>
        <div className="modifyGroups custom-group">
          {/* {LAST_GROUP ==='group.roomType.name' && <div>   } */}
          <div className="modifyGroups__roomGroup" style={roomGroupStyle}>
            {'룸그룹'}
          </div>
          <span className="title">
            <Button
              label={group.title}
              thema="primary"
              mode="flat"
              onClick={() => {
                roomModal.openModal({ roomTypeId: group.roomTypeId });
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
        <Timeline
          {...defaultProps}
          {...timelineProps}
          items={[{}]}
          groups={roomData}
          itemRenderer={itemRendererFn}
          groupRenderer={ModifyGroupRendererFn}
        />
        <div className="ModifyTimeline__bottom">
          <Button onClick={roomTypeModal.openModal} label="추가" />
        </div>
      </div>
    </div>
  );
};

export default ErrProtecter(ModifyTimeline);
