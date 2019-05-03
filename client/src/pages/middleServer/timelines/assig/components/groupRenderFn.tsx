import React, { useState } from 'react';
import { IGroup } from '../AssigTimelineWrap';
import { ASSIGT_IMELINE_HEIGHT } from '../../timelineConfig';
import { PricingType } from '../../../../../types/apiEnum';

let LAST_ROOMTYPE = 'unRendered';
let LAST_ROOM = 'unRendered';

interface IRenderGroupProps {
  group: IGroup;
}

const assigGroupRendererFn: React.FC<IRenderGroupProps> = ({ group }) => {
  if (!group || !group.roomType) {
    return <div />;
  }
  const isDomitory = group.roomType.pricingType === PricingType.DOMITORY;
  const placeCount = isDomitory ? group.roomType.peopleCount : 1;

  const roomTypeStyle = {
    height: ASSIGT_IMELINE_HEIGHT * placeCount * group.roomType.roomCount,
    minHeight: ASSIGT_IMELINE_HEIGHT,
  };
  const roomStyle = {
    height: ASSIGT_IMELINE_HEIGHT * placeCount,
    minHeight: ASSIGT_IMELINE_HEIGHT,
  };

  let renderRoomType: boolean = true;
  let renderRoom: boolean = true;

  if (LAST_ROOMTYPE === group.roomTypeId) renderRoomType = false;
  else LAST_ROOMTYPE = group.roomTypeId;

  if (LAST_ROOM === group.roomId) renderRoom = false;
  else LAST_ROOM = group.roomId;

  return (
    <div>
      <div className="assigGroups custom-group">
        {/* 방타입 */}
        {renderRoomType && (
          <div className="assigGroups__roomType" style={roomTypeStyle}>
            {group.roomType.name}
          </div>
        )}
        {/* 방 */}
        {renderRoom && (
          <div
            className={`assigGroups__room ${
              isDomitory ? 'assigGroups__room--domitory' : 'assigGroups__room--roomType'
            }`}
            style={roomStyle}
          >
            {group.title}
          </div>
        )}
        {isDomitory && (
          <div className="assigGroups__place title">
            <span className="assigGroups__placeIn">{group.placeIndex}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default assigGroupRendererFn;
