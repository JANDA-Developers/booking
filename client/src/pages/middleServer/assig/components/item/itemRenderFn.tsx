import React from "react";
import classnames from "classnames";
import {ASSIGT_IMELINE_HEIGHT} from "../../../../../atoms/timeline/Timeline";
import {ITimelineContext, IItemContext} from "../../../../../types/interface";
import CircleIcon from "../../../../../atoms/circleIcon/CircleIcon";
import {
  IAssigTimelineUtils,
  IAssigTimelineContext,
  IAssigTimelineHooks,
  GuestTypeAdd,
  IAssigItem
} from "../assigIntrerface";
import Preloader from "../../../../../atoms/preloader/Preloader";
import Gender from "./gender";
import GuestBlock from "./guestBlock";

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
  genderToggleById(itemId: string): void;
  assigUtils: IAssigTimelineUtils;
  assigContext: IAssigTimelineContext;
  assigHooks: IAssigTimelineHooks;
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
  assigUtils,
  assigContext,
  assigHooks
}) => {
  const {left: leftResizeProps, right: rightResizeProps} = getResizeProps();

  const baseItemCalsses = `assigItem--booking${item.bookingId}`;
  const classNames = classnames("assigItem", baseItemCalsses, {
    "assigItem--unAllocated": item.isUnsettled,
    "assigItem--selected": itemContext.selected,
    "assigItem--checkIn": item.isCheckin,
    "assigItem--block": item.type === GuestTypeAdd.BLOCK,
    "assigItem--mark": item.type === GuestTypeAdd.MARK,
    "assigItem--make": item.type === GuestTypeAdd.MAKE,
    "assigItem--ghost": item.type === GuestTypeAdd.GHOST,
    "JDtext-blink": item.showEffect
  });

  const props = getItemProps({
    className: classNames
  });

  /* getItemProps에 다양한 스타일 속성을 오버라이드 하기를 권장합니다. */

  const {isMobile} = assigContext;

  const targetGroup = assigUtils.getGroupById(item.group);

  props.style = {
    ...props.style,
    fontSize: "",
    background: "",
    border: "",
    color: "",
    height: `${ASSIGT_IMELINE_HEIGHT}px`,
    zIndex: `80${targetGroup.roomTypeIndex}${targetGroup.roomIndex}${targetGroup.placeIndex}`
  };

  if (item.type === GuestTypeAdd.GUEST) itemContext.useResizeHandle = false;

  return (
    <div {...props} id={`assigItem--item${item.id}`}>
      {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ""}
      {(() => {
        switch (item.type) {
          case GuestTypeAdd.GUEST:
            return (
              <GuestBlock
                assigHooks={assigHooks}
                assigContext={assigContext}
                assigUtils={assigUtils}
                itemContext={itemContext}
                item={item}
              />
            );
          case GuestTypeAdd.BLOCK:
            return (
              <div className="assigItem__content assigItem__content--block">
                <span className="assigItem__titleWrap">
                  <span className="assigItem__title">{"자리막음"}</span>
                </span>
              </div>
            );
          case GuestTypeAdd.MARK:
            return <div />;
          case GuestTypeAdd.MAKE:
            return (
              <div className="assigItem__content JDtext-blink assigItem__content--make">
                <span className="assigItem__titleWrap">
                  {isMobile ? (
                    <Gender item={item} />
                  ) : (
                    item.gender && (
                      <span className="assigItem__gender">
                        <CircleIcon
                          className="assigItem__genderCircle"
                          onClick={() => {
                            assigUtils.genderToggleById(item.id);
                          }}
                          wave
                          thema="white"
                        >
                          <Gender item={item} />
                        </CircleIcon>
                      </span>
                    )
                  )}
                  <span className="assigItem__title">새로운예약</span>
                </span>
              </div>
            );
          case GuestTypeAdd.GHOST:
            return (
              <div className="assigItem__content JDtext-blink assigItem__content--ghost">
                <span className="assigItem__titleWrap">
                  <span className="assigItem__title">{item.name}</span>
                  <Preloader loading={item.loading} />
                </span>
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
