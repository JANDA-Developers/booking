import React, {useState, useEffect, Fragment} from "react";
import $ from "jquery";
import {TimelineContext} from "react-calendar-timeline";
import classnames from "classnames";
import {IAssigItem} from "../AssigTimelineWrap";
import {ASSIGT_IMELINE_HEIGHT} from "../../../../atoms/timeline/Timeline";
import {ITimelineContext, IItemContext} from "../../../../types/interface";
import JDIcon, {IconSize} from "../../../../atoms/icons/Icons";
import TooltipList from "../../../../atoms/tooltipList/TooltipList";
import {GenderKr, TimePerMs} from "../../../../types/enum";
import CircleIcon from "../../../../atoms/circleIcon/CircleIcon";

const CLASS_LINKED = "assigItem--linkedSelected";
const CLASS_MOVING = "assigItem--moving";
const CLASS_DISABLE = "assigItem--disable";
export {CLASS_DISABLE, CLASS_MOVING, CLASS_LINKED};

interface IRenderItemProps {
  item: IAssigItem;
  timelineContext: ITimelineContext;
  itemContext: IItemContext;
  getItemProps(props?: any): any;
  getResizeProps(props?: any): any;
  clearItem(itemId: string): any;
}
// getItemProps 는 다음을 반환합니다.
// className: "rct-item "
// key: "5cd62c1267dbc8075054b43a"
// onContextMenu: ƒ (event)
// onDoubleClick: ƒ (event)
// onMouseDown: ƒ (event)
// onMouseUp: ƒ (event)
// onTouchEnd: ƒ (event)
// onTouchStart: ƒ (event)
// ref: ƒ (el)
// style: {fontSize: 12, color: "white", cursor: "pointer", background: "#2196f3", border: "1px solid #1a6fb3", …}
// title: "5cd62c1267dbc8075054b43a"

const itemRendererFn: React.FC<IRenderItemProps> = ({
  item,
  itemContext,
  timelineContext,
  getItemProps,
  getResizeProps,
  clearItem
}) => {
  const {left: leftResizeProps, right: rightResizeProps} = getResizeProps();

  const baseItemCalsses = `assigItem--booker${item.bookerId}`;
  const classNames = classnames("assigItem", baseItemCalsses, {
    "assigItem--unAllocated": item.isUnsettled,
    "assigItem--selected": itemContext.selected,
    "assigItem--checkIn": item.isCheckin,
    "assigItem--block": item.type === "block",
    "assigItem--mark": item.type === "mark",
    "assigItem--make": item.type === "make"
  });
  const props = getItemProps({
    className: classNames
  });
  /* getItemProps에 다양한 스타일 속성을 오버라이드 하기를 권장합니다. */
  props.style = {
    ...props.style,
    background: "",
    border: "",
    color: "",
    height: `${ASSIGT_IMELINE_HEIGHT - 2}px`
  };

  return (
    <div {...props} id={`assigItem--guest${item.id}`}>
      {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ""}
      {(() => {
        switch (item.type) {
          case "normal":
            return (
              <div
                className="rct-item-content assigItem__content myClasses"
                style={{maxHeight: `${itemContext.dimensions.height}`}}
              >
                <span>
                  {item.name}
                  {item.gender && (
                    <span
                      className={`assigItem__gender ${`assigItem__gender--${item.gender.toLowerCase()}`}`}
                    >
                      {` (${GenderKr[item.gender]})`}
                    </span>
                  )}
                </span>

                {item.validate.map(validate => {
                  if (validate.start && validate.end) {
                    const CellWidth = $(".rct-dateHeader").width() || 0;
                    const cellFrom =
                      (item.start - validate.start) / TimePerMs.DAY;
                    const cellCount =
                      (validate.end - validate.start) / TimePerMs.DAY;
                    const style = {
                      left: cellFrom * CellWidth,
                      width: cellCount * CellWidth
                    };
                    return (
                      <span
                        style={style}
                        className="assigItem__validateMarker"
                      />
                    );
                  }
                })}
                <span
                  data-tip="1"
                  data-place="top"
                  data-for="itemTooltip"
                  data-event="click"
                  className="assigItem__configIconWrap"
                >
                  <JDIcon icon="config" size={IconSize.MEDEIUM_SMALL} />
                </span>
              </div>
            );
          case "block":
            return (
              <div className="assigItem__content assigItem__content--block">
                {"자리막음"}
                <CircleIcon wave thema="white">
                  <JDIcon
                    onClick={() => {
                      clearItem(item.id);
                    }}
                    icon="clear"
                  />
                </CircleIcon>
              </div>
            );
          case "mark":
            return <div />;
          case "make":
            return (
              <div className="assigItem__content assigItem__content--make">
                <span>
                  새로운예약
                  {item.gender && (
                    <span className="assigItem__gender">
                      <CircleIcon wave thema="white">
                        <span
                          className={`assigItem__gender ${`assigItem__gender--${item.gender.toLowerCase()}`}`}
                        >
                          {` (${GenderKr[item.gender]})`}
                        </span>
                      </CircleIcon>
                    </span>
                  )}
                </span>
                <CircleIcon
                  onClick={() => {
                    clearItem(item.id);
                  }}
                  wave
                  thema="white"
                >
                  <JDIcon icon="clear" />
                </CircleIcon>
              </div>
            );
          default:
            return <div />;
        }
      })()}
      {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ""}
    </div>
  );
};

export default itemRendererFn;
