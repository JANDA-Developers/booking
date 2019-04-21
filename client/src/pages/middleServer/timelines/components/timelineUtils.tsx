import { ADD_ROOM } from '../ModifyTimelineWrap';

// 그룹을 렌더해야하는지 판별....
const isLastRendered = (group: any, last_roomtype: number): { renderGroup: boolean; inLast_roomtype: number } => {
  let renderGroup = true;
  let inLast_roomtype = last_roomtype;
  if (inLast_roomtype === group._id && group._id !== ADD_ROOM.ADDROOM_TYPE) renderGroup = false;
  else inLast_roomtype = group._id;
  return { renderGroup, inLast_roomtype };
};

export default isLastRendered;
