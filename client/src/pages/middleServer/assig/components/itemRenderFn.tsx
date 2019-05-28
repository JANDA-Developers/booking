import React, {useState, useEffect, Fragment} from "react";
import $ from "jquery";
import {TimelineContext} from "react-calendar-timeline";
import classnames from "classnames";
import {IAssigItem} from "../AssigTimelineWrap";
import {ASSIGT_IMELINE_HEIGHT} from "../../../../atoms/timeline/Timeline";
import {ITimelineContext, IItemContext} from "../../../../types/interface";
import JDIcon, {IconSize} from "../../../../atoms/icons/Icons";
import TooltipList from "../../../../atoms/tooltipList/TooltipList";
import {GenderKr, TimePerMs, GuestTypeAdd} from "../../../../types/enum";
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
  clearItem(itemId: string): void;
  genderToggle(itemId: string): void;
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
  clearItem,
  genderToggle
}) => {
  const {left: leftResizeProps, right: rightResizeProps} = getResizeProps();

  const baseItemCalsses = `assigItem--booker${item.bookerId}`;
  const classNames = classnames("assigItem", baseItemCalsses, {
    "assigItem--unAllocated": item.isUnsettled,
    "assigItem--selected": itemContext.selected,
    "assigItem--checkIn": item.isCheckin,
    "assigItem--block": item.type === GuestTypeAdd.BLOCK,
    "assigItem--mark": item.type === GuestTypeAdd.MARK,
    "assigItem--make": item.type === GuestTypeAdd.MAKE
  });

  const props = getItemProps({
    className: classNames
  });

  /* getItemProps에 다양한 스타일 속성을 오버라이드 하기를 권장합니다. */
  props.style = {
    ...props.style,
    fontSize: "",
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
          case GuestTypeAdd.GUEST:
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

                {/* {item.validate.map(validate => {
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
                })} */}
                <span
                  data-tip={item.id}
                  data-place="top"
                  data-for="itemTooltip"
                  data-event="click"
                  id={`assigItem__configIconWrapId${item.id}`}
                  className="assigItem__configIconWrap"
                >
                  <JDIcon icon="config" size={IconSize.MEDEIUM_SMALL} />
                </span>
              </div>
            );
          case GuestTypeAdd.BLOCK:
            return (
              <div className="assigItem__content assigItem__content--block">
                {"자리막음"}
                <CircleIcon wave thema="white">
                  <JDIcon
                    onClick={e => {
                      e.preventDefault();
                      clearItem(item.id);
                    }}
                    icon="clear"
                  />
                </CircleIcon>
              </div>
            );
          case GuestTypeAdd.MARK:
            return <div />;
          case GuestTypeAdd.MAKE:
            return (
              <div className="assigItem__content assigItem__content--make">
                <div>
                  <span>새로운예약</span>
                  {item.gender && (
                    <span className="assigItem__gender">
                      <CircleIcon
                        onClick={() => {
                          genderToggle(item.id);
                        }}
                        wave
                        thema="white"
                      >
                        {item.gender && (
                          <span
                            className={`assigItem__gender ${`assigItem__gender--${item.gender.toLowerCase()}`}`}
                          >
                            {` (${GenderKr[item.gender]})`}
                          </span>
                        )}
                      </CircleIcon>
                    </span>
                  )}
                </div>
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
      {itemContext.useResizeHandle || item.type === GuestTypeAdd.BLOCK ? (
        <div {...rightResizeProps} className="assigItem__rightHandler" />
      ) : (
        ""
      )}
    </div>
  );
};

export default itemRendererFn;
