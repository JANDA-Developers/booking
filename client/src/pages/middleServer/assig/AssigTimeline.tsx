import moment from 'moment';
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import 'moment/locale/ko';
import JDdayPicker from '../../../atoms/dayPicker/DayPicker';
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  ASSIGT_IMELINE_HEIGHT,
} from '../../../atoms/timeline/Timeline';
import ErrProtecter from '../../../utils/errProtect';
import Button from '../../../atoms/button/Button';
import BookerModalWrap from '../../../components/bookerInfo/BookerModalWrap';
import { IUseDayPicker, useModal } from '../../../actions/hook';
import { IAssigGroup, IAssigItem } from './AssigTimelineWrap';
import assigGroupRendererFn from './components/groupRenderFn';
import { IRoomType } from '../../../types/interface';
import Preloader from '../../../atoms/preloader/Preloader';
import './AssigTimeline.scss';
import JDIcon, { IconSize } from '../../../atoms/icons/Icons';
import TooltipList, { ReactTooltip } from '../../../atoms/tooltipList/TooltipList';
import { TimePerMs } from '../../../types/enum';

moment.lang('kr');
let timer: null | number = null; // timer required to reset
const timeout = 200; // timer reset in ms

interface IProps {
  defaultProps: any;
  setConfigMode: any;
  dayPickerHook: IUseDayPicker;
  roomData: IAssigGroup[];
  loading: boolean;
  //  디프리 될수도
  roomTypesData: IRoomType[];
  guestsData: IAssigItem[];
  defaultTimeStart: number;
  defaultTimeEnd: number;
}

const ShowTimeline: React.SFC<IProps> = ({
  dayPickerHook,
  setConfigMode,
  defaultProps,
  roomData,
  loading,
  guestsData,
  defaultTimeStart,
  defaultTimeEnd,
}) => {
  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const bookerModal = useModal(false);
  // ❕EXAMPLE 하지만 우리는 바로 넣을겁니다 바로바로 변경시켜서 바로 리패치 시키는 형태로
  // const [items, setItems] = useState<any>([]);

  const handleItemDoubleClick = (itemId: any, e: any, time: any) => {
    const target = guestsData.find(guest => guest.id === itemId);
    if (!target) return;
    // 퍼포먼스 향상을 위해서라면 ID 는 인덱스여야한다?
    timer = window.setTimeout(() => {
      timer = null;
    }, timeout);
    // items[itemID].key
    bookerModal.openModal({ bookerId: target.bookerId });
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

  const resizeLinkedItems = (bookerId: string, itemEnd: number, newTime: number) => {
    let cell = Math.ceil((newTime - itemEnd) / TimePerMs.DAY);
    if (cell === 0) cell = 1;
    cell > 0 && cell + 1;
    cell < 0 && cell - 1;
    const headerWidth = $('.rct-dateHeader').width();
    if (headerWidth) {
      $(`.assigItem--booker${bookerId}`).width(headerWidth * cell);
    }
  };

  const handleMoveResizeValidator = (
    action: 'move' | 'resize',
    item: IAssigItem,
    time: number,
    resizeEdge: 'left' | 'right' | undefined,
  ) => {
    if (action === 'resize') {
      resizeLinkedItems(item.bookerId, item.end, time);
    }

    return time;
  };
  // Handle --item : Move
  // 호출되는 시점 : 당기는 시작부터 마우스 움직이며 계속 호출
  const handleItemMove = (
    action: 'move' | 'resize',
    itemId: string,
    time: number,
    resizeEdge: 'left' | 'right' | undefined,
  ) => {};
  // Handle --item : Resize
  // 호출되는 시점 : 끝내고난후
  const handleItemResize = (itemId: string, time: number, edge: 'left' | 'right') => {
    // 여기서 마우서업 되면 요청을 보내자
  };

  const handleItemSelect = (itemId: string, e: React.MouseEvent<HTMLElement>, time: number) => {
    console.log('itemId');
    console.log(itemId);
    const target = guestsData.find(guest => guest.id === itemId);
    console.log('target');
    console.log(target);
    const linkedClass = '.assigItem--linkedSelected';
    if (target) {
      $('.assigItem').removeClass(linkedClass);
      $(`.assigItem--booker${target.bookerId}`).addClass(linkedClass);
    }
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
          <Link to="/middleServer/timelineConfig">
            <Button float="right" onClick={setConfigMode} icon="roomChange" label="방구조 변경" />
          </Link>
        </div>
        <TooltipList unPadding getContent={() => <span>핸드폰 인증후 사용가능</span>} id="itemTooltip">
          <ul>
            <li>
              <Button label="체크아웃" mode="flat" color="white" />
            </li>
            <li>
              <Button label="배정확정" mode="flat" color="white" />
            </li>
            <li>
              <Button label="삭제" mode="flat" color="white" />
            </li>
          </ul>
        </TooltipList>
        <Timeline
          onItemMove={handleItemMove}
          onItemResize={handleItemResize}
          items={guestsData}
          groups={roomData}
          // 아래 속성은 퍼포먼스에 민감하게 작용합니다.
          verticalLineClassNamesForTime={(timeStart: any, timeEnd: any) => {
            if (timeStart < new Date().getTime()) return ['verticalLine', 'verticalLine--past'];
            return ['verticalLine'];
          }}
          {...defaultProps}
          onItemDoubleClick={handleItemDoubleClick}
          onCanvasDoubleClick={handleCanvasDoubleClick}
          onTimeChange={handleTimeChange}
          groupRenderer={assigGroupRendererFn}
          defaultTimeEnd={defaultTimeEnd}
          defaultTimeStart={defaultTimeStart}
          moveResizeValidator={handleMoveResizeValidator}
          onItemSelect={handleItemSelect}
        >
          <TimelineHeaders>
            <SidebarHeader>
              {({ getRootProps }: any) => (
                <div {...getRootProps()}>
                  <JDdayPicker
                    isRange={false}
                    input
                    canSelectBeforeDays={false}
                    label="달력날자"
                    {...dayPickerHook}
                    inputComponent={(
                      <span>
                        <JDIcon className="specificPrice__topLeftIcon" size={IconSize.MEDEIUM_SMALL} icon="calendar" />
                      </span>
)}
                  />
                </div>
              )}
            </SidebarHeader>
            <DateHeader unit="day" />
            <DateHeader />
          </TimelineHeaders>
        </Timeline>
        <BookerModalWrap modalHook={bookerModal} />
      </div>
    </div>
  );
};

export default ErrProtecter(ShowTimeline);
