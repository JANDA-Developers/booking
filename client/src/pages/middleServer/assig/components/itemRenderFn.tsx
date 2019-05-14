import React, { useState, useEffect } from 'react';
import { TimelineContext } from 'react-calendar-timeline';
import classnames from 'classnames';
import { IAssigItem } from '../AssigTimelineWrap';
import { ASSIGT_IMELINE_HEIGHT } from '../../../../atoms/timeline/Timeline';
import { ITimelineContext, IItemContext } from '../../../../types/interface';
import JDIcon, { IconSize } from '../../../../atoms/icons/Icons';
import TooltipList from '../../../../atoms/tooltipList/TooltipList';
import { GenderKr } from '../../../../types/enum';

interface IRenderItemProps {
  item: IAssigItem;
  timelineContext: ITimelineContext;
  itemContext: IItemContext;
  getItemProps(props?: any): any;
  getResizeProps(props?: any): any;
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
}) => {
  const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();

  const baseItemCalsses = `assigItem--booker${item.bookerId}`;
  const classNames = classnames('assigItem', baseItemCalsses, {
    'assigItem--unAllocated': item.isTempAllocation,
    'assigItem--selected': itemContext.selected,
  });
  const props = getItemProps({
    className: classNames,
  });
  /* getItemProps에 다양한 스타일 속성을 오버라이드 하기를 권장합니다. */
  props.style = {
    ...props.style,
    background: '',
    border: '',
    color: '',
  };

  return (
    <div {...props} id={`assigItem--guest${item.id}`}>
      {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ''}
      <div
        className="rct-item-content assigItem__content myClasses"
        style={{ maxHeight: `${itemContext.dimensions.height}` }}
      >
        <span>
          {item.name}
          {item.gender && (
            <span className={`assigItem__gender ${`assigItem__gender--${item.gender.toLowerCase()}`}`}>
              {` (${GenderKr[item.gender]})`}
            </span>
          )}
        </span>
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
      {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ''}
    </div>
  );
};

export default itemRendererFn;
