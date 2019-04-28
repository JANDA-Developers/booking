/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useToggle, useDayPicker } from '../../../actions/hook';
import AssigTimeline from './AssigTimeline';
import { defaultProps } from './timelineConfig';

interface IProps {
  houseId: string;
}

const AssigTimelineWrap: React.SFC<IProps> = ({ houseId }) => {
  const dayPickerHook = useDayPicker(null, null);
  const [_, setConfigMode] = useToggle(false);

  //  TODO 1. 한번의 쿼리로 끝내야겠지 modify Timelines 에 있는 거를 끌고와서 수정해서 넣으면 잘들어갈듯
  //  🚫 Get Booking 이거 cursor 기반인데 어떻게하지... 우선 백엔드님 오면 물어봐야겠다.

  return <AssigTimeline dayPickerHook={dayPickerHook} setConfigMode={setConfigMode} defaultProps={defaultProps} />;
};

export default AssigTimelineWrap;
