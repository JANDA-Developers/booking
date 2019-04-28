import moment from 'moment';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'moment/locale/ko';
import DayPicker from '../../../components/dayPicker/DayPicker';
import Timeline from '../../../components/timeline/Timeline';
import ErrProtecter from '../../../utils/ErrProtecter';
import Button from '../../../atoms/button/Button';
import POPbookerInfo from '../../../components/bookerInfo/BookerModal';
import { IUseDayPicker, useBookPOP } from '../../../actions/hook';
import { initItems, initGroups } from './timelineConfig';

moment.lang('kr');
let timer: null | number = null; // timer required to reset
const timeout = 200; // timer reset in ms

interface IProps {
  defaultProps: any;
  setConfigMode: any;
  dayPickerHook: IUseDayPicker;
}

const ShowTimeline: React.SFC<IProps> = ({ dayPickerHook, setConfigMode, defaultProps }) => {
  const bookerModal = useBookPOP(false);
  // 일단 이부분은 쿼리로 대체해보고 시간이 얼마나 걸리는지 재봐야할것같다
  //  !@#!@$!@#!@#!@# 아 몰라 일단 Query 로 해봐 Query 로 해!!!!!!!!!!@!!!!!!!@$$@!$!$@!@

  const [items, setItems] = useState(initItems);
  // Handle -- item : doubleClick
  // onTimeChange(visibleTimeStart, visibleTimeEnd, updateScrollCanvas)
  // 이게바뀌며 계속해서 새로운 쿼리를 보내면 되니까 ? => 드래그 될때마다 새로운 쿼리를 날릴것인가?
  // 스크롤 임계점이 필요하다 스크롤 임계점에 다가갔는지 검사하는 예시가 다행이 있으니
  // 임계점이 넘을때마다 밖에있는 state를 바꾸어 새로운 데이터를 요청하면된다.. <내생각>

  const [visibleTime, setVisibleTime] = useState({
    start: moment()
      .startOf('day')
      .toDate(),
    end: moment()
      .startOf('day')
      .add(7, 'day')
      .toDate(),
  });

  const handleItemDoubleClick = (itemId: any, e: any, time: any) => {
    // 퍼포먼스 향상을 위해서라면 ID 는 인덱스여야한다?
    timer = window.setTimeout(() => {
      timer = null;
    }, timeout);
    // items[itemID].key
    bookerModal.openModal();
  };
  // Handle -- item : TripleClick
  window.addEventListener('click', (evt: any) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      bookerModal.openModal();
    }
  });
  // Handle -- item : DoubleClick
  const handleCanvasDoubleClick = (group: any, time: any, e: any) => {
    bookerModal.setModalInfo({
      bookerInfo: 'Make',
      time,
    });
    bookerModal.openModal();
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
    <div id="ShowTimeline" className="container container--full">
      <div className="docs-section">
        <div className="flex-grid flex-grid--end">
          <div className="flex-grid__col col--full-3 col--lg-4 col--md-6">
            <DayPicker {...dayPickerHook} onChange={() => {}} input label="input" isRange={false} />
          </div>
          <Link to="/middleServer/timelineConfig">
            <Button float="right" onClick={setConfigMode} icon="roomChange" label="방구조 변경" />
          </Link>
        </div>
        <Timeline
          {...defaultProps}
          onItemMove={handleItemMove}
          onItemResize={handleItemResize}
          items={items}
          groups={initGroups}
          // 아래 속성은 퍼포먼스에 민감하게 작용합니다.
          verticalLineClassNamesForTime={(timeStart: any, timeEnd: any) => {
            if (timeStart < new Date().getTime()) return ['verticalLine', 'verticalLine--past'];
            return ['verticalLine'];
          }}
          horizontalLineClassNamesForGroup={(group: any) => ['group']}
          onItemDoubleClick={handleItemDoubleClick}
          onCanvasDoubleClick={handleCanvasDoubleClick}
          visibleTimeStart={visibleTime.start}
          visibleTimeEnd={visibleTime.end}
          onTimeChange={handleTimeChange}
        />
        <POPbookerInfo
          bookerInfo={undefined}
          bookerModalIsOpen={bookerModal.isOpen}
          bookerModalClose={bookerModal.closeModal}
        />
      </div>
    </div>
  );
};

export default ErrProtecter(ShowTimeline);
