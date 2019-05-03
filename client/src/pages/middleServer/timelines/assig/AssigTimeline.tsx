import moment from 'moment';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'moment/locale/ko';
import DayPicker from '../../../../components/dayPicker/DayPicker';
import Timeline from '../../../../components/timeline/Timeline';
import ErrProtecter from '../../../../utils/ErrProtecter';
import Button from '../../../../atoms/button/Button';
import BookerModal from '../../../../components/bookerInfo/BookerModal';
import { IUseDayPicker, useModal2 } from '../../../../actions/hook';
import { initItems, initGroups } from '../timelineConfig';
import { IGroup } from './AssigTimelineWrap';
import assigGroupRendererFn from './components/groupRenderFn';
import { IRoomType, IGuests } from '../../../../types/interface';
import Preloader from '../../../../atoms/preloader/Preloader';
import './AssigTimeline.scss';

moment.lang('kr');
let timer: null | number = null; // timer required to reset
const timeout = 200; // timer reset in ms

interface IProps {
  defaultProps: any;
  setConfigMode: any;
  dayPickerHook: IUseDayPicker;
  roomData: IGroup[];
  loading: boolean;
  //  디프리 될수도
  roomTypesData: IRoomType[];
  guestsData: IGuests[];

}

const ShowTimeline: React.SFC<IProps> = ({
  dayPickerHook,
  setConfigMode,
  defaultProps,
  roomData,
  roomTypesData,
  loading,
  guestsData,
}) => {
  const bookerModal = useModal2(false);
  const [items, setItems] = useState(initItems);
  const [visibleTime, setVisibleTime] = useState({
    start: moment()
      .startOf('day')
      .toDate(),
    end: moment()
      .startOf('day')
      .add(7, 'day')
      .toDate(),
  });

  console.log('guestsData');
  console.log(guestsData);
  const handleItemDoubleClick = (itemId: any, e: any, time: any) => {
    // 퍼포먼스 향상을 위해서라면 ID 는 인덱스여야한다?
    timer = window.setTimeout(() => {
      timer = null;
    }, timeout);
    // items[itemID].key
    bookerModal.openModal({});
  };
  // Handle -- item : TripleClick
  window.addEventListener('click', (evt: any) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      bookerModal.openModal({});
    }
  });
  // Handle -- item : DoubleClick
  const handleCanvasDoubleClick = (group: any, time: any, e: any) => {
    bookerModal.openModal({
      bookerInfo: 'Make',
      time,
    });
  };
  // Handle --item : Move
  const handleItemMove = (itemId: any, dragTime: any, newGroupOrder: any) => {
    const group = initGroups[newGroupOrder];

    setItems(
      items.map((item: any) => (item.id === itemId
        ? Object.assign({}, item, {
          start: dragTime,
          end: dragTime + (item.end - item.start),
          group: group.id,
        })
        : item)),
    );

    console.log(`Moved ${itemId}, ${dragTime}, ${newGroupOrder}`);
  };
  // Handle --item : Resize
  const handleItemResize = (itemId: any, time: any, edge: any) => {
    setItems(
      items.map((item: any) => (item.id === itemId
        ? Object.assign({}, item, {
          start: edge === 'left' ? time : item.start,
          end: edge === 'left' ? item.end : time,
        })
        : item)),
    );
    console.log(`Resized ${itemId}, ${time}, ${edge}`);
  };

  const handleTimeChange = (visibleTimeStart: number, visibleTimeEnd: number, updateScrollCanvas: any) => {
    updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
  };

  return (
    <div id="AssigTimeline" className="container container--full">
      <div className="docs-section">
        <h3>
          {'방배정'}
          {loading && <Preloader />}
        </h3>
        <div className="flex-grid flex-grid--end">
          <div className="flex-grid__col col--full-3 col--lg-4 col--md-6">
            <DayPicker {...dayPickerHook} input label="input" isRange={false} />
          </div>
          <Link to="/middleServer/timelineConfig">
            <Button float="right" onClick={setConfigMode} icon="roomChange" label="방구조 변경" />
          </Link>
        </div>
        <Timeline
          {...defaultProps}
          onItemMove={handleItemMove}
          onItemResize={handleItemResize}
          items={guestsData}
          groups={roomData}
          // 아래 속성은 퍼포먼스에 민감하게 작용합니다.
          verticalLineClassNamesForTime={(timeStart: any, timeEnd: any) => {
            if (timeStart < new Date().getTime()) return ['verticalLine', 'verticalLine--past'];
            return ['verticalLine'];
          }}
          horizontalLineClassNamesForGroup={(group: any) => ['group']}
          onItemDoubleClick={handleItemDoubleClick}
          onCanvasDoubleClick={handleCanvasDoubleClick}
          onTimeChange={handleTimeChange}
          groupRenderer={assigGroupRendererFn}
        />
        <BookerModal bookerInfo={undefined} modalHook={bookerModal} />
      </div>
    </div>
  );
};

export default ErrProtecter(ShowTimeline);
