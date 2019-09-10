import React, {useState, useEffect} from "react";
import $ from "jquery";
import {PricingType} from "../../../../types/enum";
import {ASSIGT_IMELINE_HEIGHT} from "../../../../atoms/timeline/Timeline";
import {arraySum} from "../../../../utils/elses";
import {
  IAssigGroup,
  IAssigTimelineUtils,
  IAssigTimelineContext,
  IAssigTimelineHooks,
  TGetGuestsInGroup
} from "./assigIntrerface";
import JDbadge from "../../../../atoms/badge/Badge";
import Dot from "../../../../atoms/dot/dot";

let LAST_ROOMTYPE = "unRendered";
let LAST_ROOM = "unRendered";

interface IRenderGroupProps {
  group?: IAssigGroup;
  getGuestsInGroup: TGetGuestsInGroup;
}

// 아이템 위치가 바뀔때마다 groupRender 되더라
const assigGroupRendererFn: React.FC<IRenderGroupProps> = ({
  group,
  ...props
}) => {
  if (!group || !group.roomType) {
    return <div />;
  }
  const isDomitory = group.roomType.pricingType === PricingType.DOMITORY;
  const placeCount = isDomitory ? group.roomType.peopleCount : 1;

  const roomTypeStyle = {
    minHeight: ASSIGT_IMELINE_HEIGHT - 1,
    zIndex: group.roomTypeIndex
  };
  const roomStyle = {
    height: Math.floor(ASSIGT_IMELINE_HEIGHT * placeCount) - 1,
    minHeight: ASSIGT_IMELINE_HEIGHT - 2
  };

  let renderRoomType: boolean = true;
  let renderRoom: boolean = true;

  if (LAST_ROOMTYPE === group.roomTypeId) renderRoomType = false;
  else LAST_ROOMTYPE = group.roomTypeId;

  if (LAST_ROOM === group.roomId) renderRoom = false;
  else LAST_ROOM = group.roomId;

  useEffect(() => {
    LAST_ROOMTYPE = "unRendered";
    LAST_ROOM = "unRendered";
  });

  useEffect(() => {
    if (renderRoom) {
      const target = $(`.assigGroups__place${group.roomId}`);
      const arrayHeights = target.map(function() {
        return $(this).height();
      });
      $(`#assigGroups__room${group.roomId}`).height(
        arraySum(arrayHeights.get()) + target.length - 1
      );
    }
    if (renderRoomType) {
      const target = $(`.assigGroups__place${group.roomTypeId}`);
      const arrayHeights = target.map(function() {
        const height = ($(this).height() || 0) + 1;
        return height;
      });

      $(`#assigGroups__roomType${group.roomTypeId}`).height(
        arraySum(arrayHeights.get()) + target.length - 1
      );
    }
  });

  if (group.type === "noneGroup") {
    return (
      <div>
        <div className="assigGroups custom-group">
          <div />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="assigGroups custom-group">
        {/* 방타입 */}
        {renderRoomType && (
          <div
            id={`assigGroups__roomType${group.roomTypeId}`}
            className={`assigGroups__roomType assigGroups__roomType${group.roomTypeId}`}
            style={roomTypeStyle}
          >
            <span className="assigGroups__names">{group.roomType.name}</span>
          </div>
        )}
        {renderRoom && (
          <div
            id={`assigGroups__room${group.roomId}`}
            className={`assigGroups__room assigGroups__room${group.roomId} ${
              isDomitory
                ? "assigGroups__room--domitory"
                : "assigGroups__room--roomType"
            } ${group.isLastOfRoomType && " assigGroups__room--last"}`}
            style={roomStyle}
          >
            <span className="assigGroups__names">{group.title}</span>
          </div>
        )}
        <div
          className={`assigGroups__place assigGroups__place${
            group.roomTypeId
          } assigGroups__place${group.roomId} title ${group.isLastOfRoom &&
            "assigGroups__place--last"}`}
        >
          <span className="assigGroups__placeIn">{group.placeIndex}</span>
        </div>
      </div>
    </div>
  );
};

export default assigGroupRendererFn;
