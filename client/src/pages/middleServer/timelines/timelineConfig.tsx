import moment from 'moment';
import React from 'react';
import { VerticalAlignProperty } from 'csstype';
import { defaultHeaderLabelFormats, defaultSubHeaderLabelFormats } from '../../../components/timeline/Timeline';
import generateFakeData from './components/timeline_fakedata';
import groupRendererFn from './components/groupRender';
import itemRendererFn from './components/itemRender';

// 변수설정
const ASSIGT_IMELINE_HEIGHT = 30;
export { ASSIGT_IMELINE_HEIGHT };

moment.lang('kr');

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

const priceTimelineKeys = {
  groupIdKey: '_id',
  groupTitleKey: 'name',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'name',
  itemDivTitleKey: 'name',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start',
  itemTimeEndKey: 'end',
  groupLabelKey: 'name',
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

const sharedProps = {
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
  fixedHeader: 'fixed',
  verticalLineClassNamesForTime: (timeStart: any, timeEnd: any) => {
    if (timeStart < new Date().getTime()) return ['verticalLine', 'verticalLine--past'];
    return ['verticalLine'];
  },
  horizontalLineClassNamesForGroup: (group: any) => ['group'],
};

// Assig Timeline 으로 전달될 객체
const assigDefaultProps = {
  ...sharedProps,
  keys,
  defaultTimeStart,
  defaultTimeEnd,
  groupRenderer: groupRendererFn,
  itemRenderer: itemRendererFn,
  fixedHeader: 'fixed',
  sidebarWidth: 230,
  sidebarContent: <div>Above The Left</div>,
  canMove: true,
  canResize: 'right',
  canSelect: true,
  itemsSorted: true,
  itemTouchSendsClick: false,
  stackItems: true,
  itemHeightRatio: 1,
  showCursorLine: true,
  lineHeight: ASSIGT_IMELINE_HEIGHT,
};

// ModifyTimeline 으로 전달될 객체
const ModifydefaultProps = {
  ...sharedProps,
  keys,
  defaultTimeStart,
  defaultTimeEnd,
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

const PriceDefaultProps = {
  ...sharedProps,
  keys: priceTimelineKeys,
  fixedHeader: 'fixed',
  sidebarWidth: 300,
  canMove: false,
  canResize: false,
  canSelect: false,
  itemsSorted: true,
  canChangeGroup: false,
  itemTouchSendsClick: false,
  stackItems: true,
  traditionalZoom: false,
  itemHeightRatio: 1,
  showCursorLine: false,
  lineHeight: 54,
};

export {
  initItems, initGroups, assigDefaultProps, krHeaderLabelFormats, ModifydefaultProps, PriceDefaultProps,
};
