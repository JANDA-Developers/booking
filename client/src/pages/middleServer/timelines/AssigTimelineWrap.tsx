/* eslint-disable react-hooks/rules-of-hooks */
import moment from 'moment';
import React, { useState } from 'react';
import { useBookPOP, useToggle } from '../../../actions/hook';
import AssigTimeline from './AssigTimeline';
import { defaultProps, initGroups, initItems } from './timelineConfig';

moment.lang('kr');
let timer: null | number = null; // timer required to reset
const timeout = 200; // timer reset in ms

const AssigTimelineWrap = () => {
  const [items, setItems] = useState(initItems);
  const [_, setConfigMode] = useToggle(false);
  console.log(_);
  const bookerModal = useBookPOP(false);
  // Handle -- item : doubleClick
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

  return (
    <AssigTimeline
      handleCanvasDoubleClick={handleCanvasDoubleClick}
      bookerModal={bookerModal}
      handleItemResize={handleItemResize}
      handleItemMove={handleItemMove}
      handleItemDoubleClick={handleItemDoubleClick}
      setConfigMode={setConfigMode}
      defaultProps={defaultProps}
      items={items}
    />
  );
};

export default AssigTimelineWrap;
