import React, { useState } from 'react';
import moment from 'moment';
import Timeline from '../../../components/timeline/Timeline';
import './ShowComponentsTimeline.scss';
import generateFakeData from './examples/timeline_fakedata';
import ErrProtecter from '../../../utils/ErrProtecter';

const keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start',
  itemTimeEndKey: 'end',
  groupLabelKey: 'title',
};

const { groups: initGroups, items: initItems } = generateFakeData();

// 안쪽에 있어야함
initGroups.forEach((item) => {
  const { start, end } = item;
  item.canMove = start > new Date().getTime();
  item.canResize = start > new Date().getTime()
    ? end > new Date().getTime()
      ? 'both'
      : 'left'
    : end > new Date().getTime()
      ? 'right'
      : false;
});
const ShowComponentsTimeline = () => {
  const [openGroups, setOpenGroups] = useState({});
  const groupGroup = groups => groups.map((group) => {
    const isRoot = (parseInt(group.id, 10) - 1) % 3 === 0;
    const parent = isRoot ? null : Math.floor((parseInt(group.id, 10) - 1) / 3) * 3 + 1;
    return Object.assign({}, group, {
      root: isRoot,
      parent,
    });
  });
  const [newGroups, setGroups] = useState(groupGroup(initGroups));
  const [items, setItems] = useState(initItems);

  console.log('newGroups');
  console.log(newGroups);

  const defaultTimeStart = moment()
    .startOf('day')
    .toDate();
  const defaultTimeEnd = moment()
    .startOf('day')
    .add(1, 'day')
    .toDate();

  const toggleGroup = (id) => {
    setOpenGroups({
      ...openGroups,
      [id]: !openGroups[id],
    });
  };

  console.log(items);
  const handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const group = newGroups[newGroupOrder];

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

  const newGroupsa = newGroups
    .filter(g => g.root || openGroups[g.parent])
    .map(group => Object.assign({}, group, {
      title: group.root ? (
        <div role="button" onClick={() => toggleGroup(parseInt(group.id, 10))} style={{ cursor: 'pointer' }}>
          {openGroups[parseInt(group.id, 10)] ? '[-]' : '[+]'}
          {' '}
          {group.title}
        </div>
      ) : (
        <div style={{ paddingLeft: 20 }}>{group.title}</div>
      ),
    }));

  return (
    <div id="ShowComponentsTimeline" className="container container--full">
      <div className="docs-section">
        <Timeline
          groups={newGroupsa}
          items={items}
          fixedHeader="fixed"
          sidebarWidth={150}
          sidebarContent={<div>Above The Left</div>}
          canMove
          canResize="right"
          canSelect
          itemsSorted
          itemTouchSendsClick={false}
          stackItems
          itemHeightRatio={0.75}
          showCursorLine
          defaultTimeStart={defaultTimeStart}
          defaultTimeEnd={defaultTimeEnd}
          keys={keys}
          onItemMove={handleItemMove}
          onItemResize={handleItemResize}
        />
      </div>
    </div>
  );
};

export default ErrProtecter(ShowComponentsTimeline);
