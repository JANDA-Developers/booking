import moment from 'moment-timezone';
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import 'moment/locale/ko';
import { MutationFn } from 'react-apollo';
import _ from 'lodash';
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
import {
  IAssigGroup, IAssigItem, IAssigItemCrush, defaultItemProps,
} from './AssigTimelineWrap';
import assigGroupRendererFn from './components/groupRenderFn';
import { IRoomType } from '../../../types/interface';
import Preloader from '../../../atoms/preloader/Preloader';
import './AssigTimeline.scss';
import JDIcon, { IconSize } from '../../../atoms/icons/Icons';
import TooltipList, { ReactTooltip } from '../../../atoms/tooltipList/TooltipList';
import {
  TimePerMs, PricingType, RoomGender, Gender,
} from '../../../types/enum';
import { allocateGuestToRoom, allocateGuestToRoomVariables } from '../../../types/api';
import { CLASS_LINKED, CLASS_MOVING, CLASS_DISABLE } from './components/itemRenderFn';
import { number } from 'prop-types';
import { isEmpty, setMidNight } from '../../../utils/utils';
import ItemMenu from './components/itemMenu';
import CanvasMenu from './components/canvasMenu';

moment.tz.setDefault('Asia/Seoul');
moment.locale('kr');


// get timezone and locale from some config 

let timer: null | number = null; // timer required to reset
const timeout = 200; // timer reset in ms

interface IProps {
  defaultProps: any;
  dayPickerHook: IUseDayPicker;
  groupData: IAssigGroup[];
  loading: boolean;
  //  디프리 될수도
  roomTypesData: IRoomType[];
  deafultGuestsData: IAssigItem[];
  defaultTimeStart: number;
  defaultTimeEnd: number;
  allocateMu: MutationFn<allocateGuestToRoom, allocateGuestToRoomVariables>;
}

const ShowTimeline: React.SFC<IProps> = ({
  dayPickerHook,
  defaultProps,
  groupData,
  loading,
  deafultGuestsData,
  defaultTimeStart,
  defaultTimeEnd,
  allocateMu,
}) => {
  const [guestValue, setGuestValue] = useState(deafultGuestsData);
  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const bookerModal = useModal(false);
  // 🦄 유틸
  const filterTimeZone = (from: number, to: number, roomId?: string): IAssigItem[] => {
    if (!roomId) {
      return guestValue.filter(
        guest => (guest.start >= from && guest.start < to)
          || (guest.end > from && guest.end <= to)
          || (guest.end === from && guest.end === to),
      );
    }
    return guestValue.filter(
      guest => (guest.start >= from && guest.start < to)
        || (guest.end > from && guest.end <= to)
        || (guest.end === from && guest.end === to),
    );
  };
  interface ICrushTime {
    crushGuest: string;
    crushGuest2: string;
    guestIndex: number;
    start: number;
    end: number;
  }
  // 🦄 유틸 게스트 둘의 충돌시간을 구해줌 충돌시간을 구해줌 없다면 false
  const crushTime = (guest: IAssigItem, guest2: IAssigItem): ICrushTime | false => {
    const minEnd = guest.end < guest2.end ? guest.end : guest2.end;
    const minStart = guest.start < guest2.start ? guest.start : guest2.start;
    if (minStart >= minEnd) return false;
    return {
      crushGuest: guest.id,
      crushGuest2: guest2.id,
      guestIndex: guest.guestIndex,
      start: minStart,
      end: minEnd,
    };
  };
  // 🦄 유틸 사람이 그장소에 그시간대에 있다면 충돌시간을 주고 아니면 false를 줌
  const isTherePerson = (startTime: number, endTime: number, groupId: string, guest: IAssigItem) => {
    const atTimeGuests = filterTimeZone(startTime, endTime);
    const atTimePlaceGuests = atTimeGuests.filter(inGuest => inGuest.group === groupId);
    // 자기자신이 포함됨니다..
    if (atTimePlaceGuests.length > 1) {
      const crushTimes = atTimePlaceGuests.map(inGuest => crushTime(inGuest, guest));
      if (!isEmpty(crushTimes)) return crushTimes;
    }
    return false;
  };

  // 🦄 유틸 성별이 맞는지 검사하고 CrushTime을 반환합니다.
  const isGenderSafe = (
    targetGroup: IAssigGroup,
    item: IAssigItem,
    start: number,
    end: number,
  ): boolean | ICrushTime[] => {
    // 성별검사
    if (targetGroup.roomType.roomGender === RoomGender.MIXED) {
      return true;
    }
    if (targetGroup.roomType.roomGender === RoomGender.MALE) {
      return item.gender === Gender.MALE;
    }
    if (targetGroup.roomType.roomGender === RoomGender.FEMALE) {
      return item.gender === Gender.FEMALE;
    }
    if (targetGroup.roomType.roomGender === RoomGender.SEPARATELY) {
      const atTimeRoomGuests = filterTimeZone(start, end, targetGroup.roomId);
      const crushGendersGuests = atTimeRoomGuests.filter(guest => guest.gender !== item.gender);
      return crushGendersGuests
        .map(guest => crushTime(item, guest))
        .filter(crushTime => crushTime)
        .map(
          (crushTime): ICrushTime => {
            if (!crushTime) {
              throw new Error('뀨');
            }
            return crushTime;
          },
        );
    }
    return true;
  };

  const handleItemDoubleClick = (itemId: any, e: any, time: any) => {
    const target = guestValue.find(guest => guest.id === itemId);
    if (!target) return;
    // 퍼포먼스 향상을 위해서라면 ID 는 인덱스여야한다?
    timer = window.setTimeout(() => {
      timer = null;
    }, timeout);
    // items[itemID].key
    bookerModal.openModal({ bookerId: target.bookerId });
  };

  // 시간을 받아서 게스트들중 그시간대에 있는 게스트들을 반환함
  // Room Id 선택적 벨리데이션

  //  그 게스트가 그 시간에 그 그룹에 괺찮은지 검사함 검사한 결과를 즉각반영
  const oneGuestValidation = (guest: IAssigItem, start: number, end: number, groupId: string) => {
    const tempGuest: IAssigItem = {
      ...guest,
      start,
      end,
      group: groupId,
    };
    let validater: IAssigItemCrush[] = [];

    const isTherePersonResult = isTherePerson(start, end, groupId, tempGuest);
    // 자리충돌 발생
    if (isTherePersonResult) {
      const temp: any = isTherePersonResult.filter(inCrushTime => inCrushTime);
      const crushTimes: ICrushTime[] = temp;

      const validate = crushTimes.map(inCrushTime => ({
        guestIndex: inCrushTime.guestIndex,
        reason: '자리충돌',
        start: inCrushTime.start,
        end: inCrushTime.end,
      }));

      validater = [...validater, ...validate];
    }

    const targetGroup = groupData.find(group => group.id === groupId);
    if (!targetGroup) return;
    const isGenderSafeResult = isGenderSafe(targetGroup, tempGuest, start, end);

    // 성별충돌 발생
    if (isGenderSafeResult !== true) {
      if (isGenderSafeResult === false) {
        const validate = {
          guestIndex: guest.guestIndex,
          reason: '성별문제',
          start,
          end,
        };
        validater.push(validate);
      } else {
        const temp: any = isGenderSafeResult.filter(inCrushTime => inCrushTime);
        const crushTimes: ICrushTime[] = temp;
        const validate = crushTimes.map(inCrushTime => ({
          guestIndex: guest.guestIndex,
          reason: '자리충돌',
          start: inCrushTime.start,
          end: inCrushTime.end,
        }));
        validater = [...validater, ...validate];
      }
    }

    if (guestValue[guest.guestIndex]) {
      guestValue[guest.guestIndex].validate = validater;
    }
    setGuestValue([...guestValue]);
  };

  //  캔버스 클릭시 호출됨
  const handleCanvasClick = (groupId: string, time: number, e: React.MouseEvent<HTMLElement>) => {
    if (e.ctrlKey) {
      guestValue.push({
        ...defaultItemProps,
        type: 'block',
        id: `block${time}${groupId}`,
      });
      setGuestValue([...guestValue]);
    }
    $('.assigItem').removeClass(CLASS_LINKED);
  };

  // 리사이즈 되었을때 벨리데이션 해줍니다.
  const resizeValidater = (item: IAssigItem, time: number) => {
    const linkedGuests = guestValue.filter(guest => guest.bookerId === item.bookerId);

    linkedGuests.forEach((guest) => {
      if (guest.bookerId === item.bookerId) oneGuestValidation(guest, guest.start, time, guest.group);
    });
  };

  // 아이템이 그룹에 그시간대에 포함될수 있는지 검사해줍니다.
  // const moveValidater = (item: IAssigItem, targetGroup: IAssigGroup, time: number): IValidationResult[] => {
  //   const linkedGuests = guestValue.filter(guest => guest.bookerId === item.bookerId);
  //   // 좌우MOVE 일경우
  //   if (Math.abs(time - item.start) >= TimePerMs.DAY) {
  //     const validaterResults = linkedGuests.map((guest) => {
  //       const result = validater(guest);
  //       return result;
  //     });
  //     return validaterResults;
  //   }
  //   // 위아래 MOVE
  //   const validaterResult = validater(item);
  //   return [validaterResult];
  // };
  // Handle -- item : TripleClick

  window.addEventListener('click', (evt: any) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      bookerModal.openModal({});
    }
  });

  // 캔버스 더블클릭시
  const handleCanvasDoubleClick = (group: any, time: any, e: any) => {};

  // 같은 예약자가 예약한 게스트들을 한번에 변경
  const resizeLinkedItems = (bookerId: string, newTime: number) => {
    // TODO 여기서 State를통하여 조작할수 있도록하자
    guestValue.forEach((guest) => {
      const inGuest = guest;
      if (guest.bookerId === bookerId) inGuest.end = newTime;
    });
    setGuestValue([...guestValue]);
  };

  // 같은 예약자가 예약한 게스트들을 한번에 이동
  const moveLinkedItems = (bookerId: string, newTime: number) => {
    guestValue.forEach((guest) => {
      const inGuest = guest;
      if (guest.bookerId === bookerId) {
        inGuest.end += newTime - guest.start;
        inGuest.start = newTime;
      }
    });
    setGuestValue([...guestValue]);
  };

  // 🐭 마우스 움직이면 호출됨
  // 새로운 시간을 리턴하거나 time을 리턴하세요.
  const handleMoveResizeValidator = (
    action: 'move' | 'resize',
    item: IAssigItem,
    time: number,
    resizeEdge: 'left' | 'right' | undefined,
  ): number => {
    if (action === 'resize') {
      // 최소 아이템줌 설정
      if (item.start >= time) return item.end;
      if (setMidNight(new Date().getTime()) >= time) return item.end;

      resizeValidater(item, time);
      resizeLinkedItems(item.bookerId, time);
    }

    if (action === 'move') {
      $(`.assigItem--booker${item.bookerId}`).addClass(CLASS_MOVING);
      $(`#assigItem--guest${item.id}`).removeClass(CLASS_MOVING);

      const targetGroup = groupData.find(group => group.id === item.group);
      // 이동하는곳 성별 제한 확인
      if (targetGroup) {
        // 💔💔💔💔 아이템이 기존 아이템과 동일한 상태라서 group이 New 그룹이 아닙니다 ㅠㅠㅠ
        //  지금 모듈이 업데이트 중이라고하니 기다려봐야합니다.
        // (이동하는곳:마우스 끌고있는곳)이 베드라면 ?
        // const validateResult = moveValidater(item, targetGroup, time);
        // console.log('✴️validateResult');
        // console.log(validateResult);
        // 👽 STATE 생길수도 있음!
        // $(`.${CLASS_DISABLE}`).removeClass(CLASS_DISABLE);
        // if (!validateResult) $(`.assigItem--booker${item.bookerId}`).addClass(CLASS_DISABLE);
      }

      // 특정성별방이면 체크
      // 혼숙불가 방이라면
      // 안에 들어있는 사람을 체크

      // 이동하는 베드에 다른사람이 있는지 확인

      // 이동하는곳이 방이라면?

      moveLinkedItems(item.bookerId, time);
    }

    return time;
  };
  // 🐭마우스 놓아야 호출됨.
  const handleItemMove = async (itemId: string, dragTime: number, newGroupOrder: number) => {
    const guestValueOriginCopy = guestValue.slice();
    const guestValueCopy = guestValue.slice();
    const targetGuestIndex = guestValue.findIndex(guest => guest.id === itemId);
    guestValueCopy[targetGuestIndex] = {
      ...guestValueCopy[targetGuestIndex],
      group: groupData[newGroupOrder].id,
    };
    setGuestValue([...guestValueCopy]);

    const newGroupId = groupData[newGroupOrder].roomId;

    $(`.${CLASS_MOVING}`).removeClass(CLASS_MOVING);

    const result = await allocateMu({
      variables: {
        guestId: itemId,
        roomId: newGroupId,
        bedIndex: groupData[newGroupOrder].bedIndex,
      },
    });

    if (result && result.data && !result.data.AllocateGuestToRoom.ok) {
      setGuestValue([...guestValueOriginCopy]);
    }
  };

  // 🐭 마우스 놓아야 호출됨
  const handleItemResize = (itemId: string, time: number, edge: 'left' | 'right') => {};

  const hanldeItemClick = (itemId: string, e: React.MouseEvent<HTMLElement>, time: number) => {
    const target = guestValue.find(guest => guest.id === itemId);

    if (!target) return;
    if (target.bookerId === 'block') return;
    // 컨트롤: 체크인
    if (e.ctrlKey) {
      guestValue[target.guestIndex].isCheckin = !guestValue[target.guestIndex].isCheckin;
      setGuestValue([...guestValue]);
    }
    // 쉬프트 팝업
    if (e.shiftKey) {
      bookerModal.openModal({ bookerId: target.bookerId });
    }
    // 알트: 배정확정
    if (e.altKey) {
      guestValue[target.guestIndex].isUnsettled = !guestValue[target.guestIndex].isUnsettled;
      setGuestValue([...guestValue]);
    }
  };

  const parallax = () => new Date().getTimezoneOffset() * 1000 * 60;

  const handleCanvasContextMenu = (groupId: string, time: number, e: React.MouseEvent<HTMLElement>) => {

    guestValue.push({
      ...defaultItemProps,
      id: `mark${groupId}${time}`,
      type: 'mark',
      start: time,
      end: time + TimePerMs.DAY,
      group: groupId,
    });

    setGuestValue([...guestValue]);
  };

  // 🐭 아이템이 선택되었을때
  const handleItemSelect = async (itemId: string, e: React.MouseEvent<HTMLElement>, time: number) => {
    const target = guestValue.find(guest => guest.id === itemId);
    if (target) {
      await $('.assigItem').removeClass(CLASS_LINKED);
      $(`.assigItem--booker${target.bookerId}`).addClass(CLASS_LINKED);
    }
  };
  // 시간이 변경되었을떄
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
            <Button float="right" icon="roomChange" label="방구조 변경" />
          </Link>
        </div>
        <CanvasMenu />
        <ItemMenu />
        <Timeline
          onItemMove={handleItemMove}
          onItemResize={handleItemResize}
          items={guestValue}
          groups={groupData}
          {...defaultProps}
          onItemDoubleClick={handleItemDoubleClick}
          onItemClick={hanldeItemClick}
          onCanvasDoubleClick={handleCanvasDoubleClick}
          onCanvasClick={handleCanvasClick}
          onTimeChange={handleTimeChange}
          groupRenderer={assigGroupRendererFn}
          defaultTimeEnd={defaultTimeEnd}
          defaultTimeStart={defaultTimeStart}
          moveResizeValidator={handleMoveResizeValidator}
          onItemSelect={handleItemSelect}
          onCanvasContextMenu={handleCanvasContextMenu}
        >
          <TimelineHeaders>
            <SidebarHeader>
              {({ getRootProps }: any) => (
                <div className="rct-header-root__topLeft" {...getRootProps()}>
                  <JDdayPicker
                    isRange={false}
                    input
                    canSelectBeforeDays={false}
                    label="달력날자"
                    {...dayPickerHook}
                    className="JDwaves-effect JDoverflow-visible"
                    inputComponent={(
                      <span>
                        <JDIcon className="specificPrice__topLeftIcon" size={IconSize.MEDEIUM_SMALL} icon="calendar" />
                      </span>
)}
                  />
                </div>
              )}
            </SidebarHeader>
            <DateHeader height={34} unit="day" />
            <DateHeader />
          </TimelineHeaders>
        </Timeline>
        <BookerModalWrap modalHook={bookerModal} />
      </div>
    </div>
  );
};

export default ErrProtecter(ShowTimeline);
