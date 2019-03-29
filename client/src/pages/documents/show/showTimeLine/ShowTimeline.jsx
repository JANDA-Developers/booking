import $ from 'jquery';
import React, { useState } from 'react';
import moment from 'moment';
import Timeline from '../../../../components/timeline/Timeline.jsx';
import generateFakeData from '../examples/timeline_fakedata';
import ErrProtecter from '../../../../utils/ErrProtecter';
import 'moment/locale/ko';
import DayPicker from '../../../../components/dayPicker/DayPicker';
import JDmodal from '../../../../atoms/modal/Modal';
import Button from '../../../../atoms/button/Buttons';
import { useBookPOP, useToggle } from '../../../../actions/hook';
import {
  propSender,
  keys,
  initGroups,
  initItems,
  krSubHeaderLabelFormats,
  krHeaderLabelFormats,
  defaultTimeEnd,
  defaultTimeStart,
} from './showTimelineConfig';
import POPbookerInfo from '../../../../components/bookerInfo/POPbookerModal';

moment.lang('kr');

let timer = null; // timer required to reset
const timeout = 200; // timer reset in ms

const ShowTimeline = () => {
  const [items, setItems] = useState(initItems);
  const [isConfigMode, setConfigMode] = useToggle(false);
  const {
    bookerModalIsOpen, bookerModalOpen, bookerModalClose, setModalInfo, bookerInfo,
  } = useBookPOP(false);

  // Handle -- item : doubleClick
  const handleItemDoubleClick = (itemId, e, time) => {
    // 퍼포먼스 향상을 위해서라면 ID 는 인덱스여야한다?
    timer = setTimeout(() => {
      timer = null;
    }, timeout);
    // items[itemID].key
    setModalInfo({
      bookerInfo: itemId,
      time,
    });
  };
  // Handle -- item : TripleClick
  window.addEventListener('click', (evt) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      bookerModalOpen();
    }
  });
  // Handle -- item : DoubleClick
  const handleCanvasDoubleClick = (group, time, e) => {
    setModalInfo({
      bookerInfo: 'Make',
      time,
    });
    bookerModalOpen();
  };
  // Handle --item : Move
  const handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const group = initGroups[newGroupOrder];

    setItems(
      items.map(item => (item.id === itemId
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
  const handleItemResize = (itemId, time, edge) => {
    setItems(
      items.map(item => (item.id === itemId
        ? Object.assign({}, item, {
          start: edge === 'left' ? time : item.start,
          end: edge === 'left' ? item.end : time,
        })
        : item)),
    );

    console.log(`Resized ${itemId}, ${time}, ${edge}`);
  };

  return (
    <div id="ShowTimeline" className="container container--full">
      <div className="docs-section">
        <div className="flex-grid flex-grid--end">
          <div className="flex-grid__col col--full-3 col--lg-4 col--md-6">
            <DayPicker input label="input" isRange={false} />
          </div>
          <Button float="right" onClick={setConfigMode} icon="roomChange" label="방구조 변경" />
        </div>
        <Timeline
          {...propSender}
          onItemMove={handleItemMove}
          onItemResize={handleItemResize}
          items={items}
          // 아래 속성은 퍼포먼스에 민감하게 작용합니다.
          verticalLineClassNamesForTime={(timeStart, timeEnd) => {
            if (timeStart < new Date().getTime()) return ['verticalLine', 'verticalLine--past'];
            return ['verticalLine'];
          }}
          horizontalLineClassNamesForGroup={group => ['group']}
          onItemDoubleClick={handleItemDoubleClick}
          onCanvasDoubleClick={handleCanvasDoubleClick}
        />
        <POPbookerInfo
          bookerModalIsOpen={bookerModalIsOpen}
          bookerInfo={bookerInfo}
          bookerModalClose={bookerModalClose}
        />
      </div>
    </div>
  );
};

export default ErrProtecter(ShowTimeline);