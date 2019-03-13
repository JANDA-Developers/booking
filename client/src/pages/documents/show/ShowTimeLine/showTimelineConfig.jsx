import moment from 'moment';
import React from 'react';
import { defaultHeaderLabelFormats, defaultSubHeaderLabelFormats } from '../../../../components/timeline/Timeline.jsx';
import generateFakeData from '../examples/timeline_fakedata';
import groupRendererFn from '../components/groupRender';
import itemRendererFn from '../components/itemRender';

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

const krSubHeaderLabelFormats = Object.assign({}, defaultSubHeaderLabelFormats, {
  monthLong: 'MM 월', // 년 월 필요
  hourLong: 'M월 D일 ddd', // 월 일
});

const krHeaderLabelFormats = Object.assign({}, defaultHeaderLabelFormats, {});

const defaultTimeStart = moment()
  .startOf('day')
  .toDate();

// 시작시 끝까지 보일범위
const defaultTimeEnd = moment()
  .startOf('day')
  .add(7, 'day')
  .toDate();

// Timeline 으로 전달될 객체
const propSender = {
  minZoom: 7 * 24 * 60 * 60 * 1000,
  maxZoom: 180 * 24 * 60 * 60 * 1000,
  dragSnap: 24 * 60 * 60 * 1000,
  subHeaderLabelFormats: krSubHeaderLabelFormats,
  headerLabelFormats: krHeaderLabelFormats,
  timeSteps: {
    hour: 24,
    day: 1,
    month: 1,
    year: 1,
  },
  keys,
  defaultTimeStart,
  defaultTimeEnd,
  // 동적 변화시 올려야함
  groups: initGroups,
  groupRenderer: groupRendererFn,
  itemRenderer: itemRendererFn,
  fixedHeader: 'fixed',
  sidebarWidth: 150,
  sidebarContent: <div>Above The Left</div>,
  canMove: true,
  canResize: 'right',
  canSelect: true,
  itemsSorted: true,
  itemTouchSendsClick: false,
  stackItems: true,
  itemHeightRatio: 1,
  showCursorLine: true,
};
export {
  propSender,
  keys,
  initGroups,
  initItems,
  krSubHeaderLabelFormats,
  krHeaderLabelFormats,
  defaultTimeEnd,
  defaultTimeStart,
};
