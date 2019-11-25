import React from "react";
import classnames from "classnames";
import { ITimelineContext, IItemContext } from "../../../../../types/interface";
import {
  IAssigTimelineUtils,
  IAssigTimelineContext,
  IAssigTimelineHooks,
  GuestTypeAdd,
  IAssigItem
} from "../assigIntrerface";
import GuestBlock from "./GuestBlock";
import BlockBlock from "./BlockBlock";
import GhostBlock from "./GhostBlock";
import { BookingStatus } from "../../../../../types/enum";
import { ASSIG_IMELINE_HEIGHT } from "../../../../../atoms/timeline/config";

const CLASS_LINKED = "assigItem--linkedSelected";
const CLASS_MOVING = "assigItem--moving";
const CLASS_DISABLE = "assigItem--disable";
export { CLASS_DISABLE, CLASS_MOVING, CLASS_LINKED };

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
  const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();

  const baseItemCalsses = `assigItem--booking${item.bookingId}`;
  const classNames = classnames("assigItem", baseItemCalsses, {
    "assigItem--selected": itemContext.selected,
    "assigItem--checkIn": item.checkInInfo,
    "assigItem--progressing": item.status === BookingStatus.PROGRESSING,
    "assigItem--block": item.type === GuestTypeAdd.BLOCK,
    "assigItem--mark": item.type === GuestTypeAdd.MARK,
    "assigItem--ghost": item.type === GuestTypeAdd.GHOST,
    "JDtext-blink": item.showEffect
  });

  const props = getItemProps({
    className: classNames
  });

  /* getItemProps에 다양한 스타일 속성을 오버라이드 하기를 권장합니다. */

  const { isMobile } = assigContext;

  const targetGroup = assigUtils.getGroupById(item.group);

  props.style = {
    ...props.style,
    fontSize: "",
    background: "",
    border: "",
    color: "",
    height: `${ASSIG_IMELINE_HEIGHT}px`,
    zIndex: `80${targetGroup.roomTypeIndex}${targetGroup.roomIndex}${
      targetGroup.placeIndex < 0 ? 0 : targetGroup.placeIndex
    }`
  };

  if (item.type === GuestTypeAdd.GUEST) itemContext.useResizeHandle = false;

  return (
    <div {...props} title={item.memo} id={`assigItem--item${item.id}`}>
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
            return <BlockBlock />;
          case GuestTypeAdd.MARK:
            return <div />;
          case GuestTypeAdd.GHOST:
            return <GhostBlock loading={item.loading} name={item.name} />;
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
