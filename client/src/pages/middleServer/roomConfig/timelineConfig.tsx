import { sharedProps } from '../../../atoms/timeline/Timeline';

// ModifyTimeline 으로 전달될 객체
const RoomTimelineDefaultProps = {
  ...sharedProps,
  fixedHeader: 'fixed',
  sidebarWidth: 360,
  canMove: false,
  canResize: false,
  canSelect: true,
  itemsSorted: true,
  itemTouchSendsClick: false,
  stackItems: true,
  itemHeightRatio: 1,
  showCursorLine: true,
  lineHeight: 36,
};

export default RoomTimelineDefaultProps;
