import React, {useState, useEffect} from "react";
import $ from "jquery";
import {Link} from "react-router-dom";
import "moment/locale/ko";
import {MutationFn} from "react-apollo";
import _ from "lodash";
import JDdayPicker from "../../../atoms/dayPicker/DayPicker";
import windowSize, {WindowSizeProps} from "react-window-size";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  ASSIGT_IMELINE_HEIGHT,
  CustomHeader
} from "../../../atoms/timeline/Timeline";
import ErrProtecter from "../../../utils/errProtect";
import Button from "../../../atoms/button/Button";
import BookerModalWrap from "../../../components/bookerInfo/BookerModalWrap";
import {IUseDayPicker, useModal} from "../../../actions/hook";
import classnames from "classnames";
import {IAssigGroup, IAssigItem, IAssigItemCrush} from "./AssigTimelineWrap";
import assigGroupRendererFn from "./components/groupRenderFn";
import {IRoomType} from "../../../types/interface";
import Preloader from "../../../atoms/preloader/Preloader";
import "./AssigTimeline.scss";
import JDIcon, {IconSize} from "../../../atoms/icons/Icons";
import TooltipList, {
  ReactTooltip
} from "../../../atoms/tooltipList/TooltipList";
import {
  TimePerMs,
  PricingType,
  RoomGender,
  Gender,
  WindowSize as EWindowSize,
  GlobalCSS,
  GuestTypeAdd,
  GuestType
} from "../../../types/enum";
import {
  allocateGuestToRoom,
  allocateGuestToRoomVariables,
  updateBooker,
  updateBookerVariables,
  deleteGuests,
  deleteGuestsVariables,
  createBlock,
  createBlockVariables,
  deleteBlock,
  deleteBlockVariables
} from "../../../types/api";
import itemRendererFn, {
  CLASS_LINKED,
  CLASS_MOVING
} from "./components/itemRenderFn";
import {isEmpty, setMidNight, onCompletedMessage} from "../../../utils/utils";
import ItemMenu from "./components/itemMenu";
import CanvasMenu, {ICanvasMenuProps} from "./components/canvasMenu";
import MakeItemMenu from "./components/makeItemMenu";
import {DEFAULT_ASSIGITEM} from "../../../types/defaults";
import {JDtoastModal} from "../../../atoms/modal/Modal";
import moment, {Moment} from "moment-timezone";
import {setYYYYMMDD} from "../../../utils/setMidNight";
import JDbadge, {BADGE_THEMA} from "../../../atoms/badge/Badge";

// Temp 마킹용이 있는지
let MARKED = false;

interface IProps {
  houseId: string;
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
  deleteBlockMu: MutationFn<deleteBlock, deleteBlockVariables>;
  updateBookerMu: MutationFn<updateBooker, updateBookerVariables>;
  deleteGuestsMu: MutationFn<deleteGuests, deleteGuestsVariables>;
  createBlockMu: MutationFn<createBlock, createBlockVariables>;
  dataTime: {
    start: number;
    end: number;
  };
  setDataTime: React.Dispatch<
    React.SetStateAction<{
      start: number;
      end: number;
    }>
  >;
}
export type TToogleCheckIn = (
  guestId?: string | undefined,
  guestIndex?: number | undefined
) => void;

// 👿 모든 Util들과 서브함수들은 파일분리 순수한 timeline Hadnler만 남길것
const ShowTimeline: React.FC<IProps & WindowSizeProps> = ({
  dayPickerHook,
  defaultProps,
  groupData,
  loading,
  houseId,
  deafultGuestsData,
  defaultTimeStart,
  defaultTimeEnd,
  allocateMu,
  windowWidth,
  windowHeight,
  updateBookerMu,
  deleteGuestsMu,
  setDataTime,
  dataTime,
  createBlockMu,
  deleteBlockMu
}) => {
  // 임시 마킹 제거
  const isMobile = windowWidth <= EWindowSize.MOBILE;
  const isTabletDown = windowWidth <= EWindowSize.TABLET;
  const [guestValue, setGuestValue] = useState(deafultGuestsData);
  const confirmDelteGuestHook = useModal(false);
  const [canvasMenuProps, setCanvasMenuProps] = useState<ICanvasMenuProps>({
    start: 0,
    end: 0,
    groupId: ""
  });

  const findItemById = (guestId: string) => {
    const targetGuest = guestValue.find(guest => guest.id === guestId);
    if (!targetGuest)
      throw new Error("해당하는 게스트를 찾을수 없습니다. findItemById");
    return targetGuest;
  };
  // 마크제거 MARK REMOVE 마커 제거
  const removeMark = () => {
    setGuestValue([
      ...guestValue.filter(item => item.type !== GuestTypeAdd.MARK)
    ]);
  };

  // 툴팁들을 제거하고
  const handleWindowClickEvent = () => {
    if (MARKED) {
      removeMark();
      MARKED = false;
    }

    // 👿 툴팁 공통 클래스를 두는게좋을듯
    $("#canvasTooltip, #makeTooltip").removeClass(
      "canvasTooltip--show makeTooltip--show"
    );
  };

  // 툴팁 제거 이벤트들을 window에 달아줌 그리고 나갈때 제거
  useEffect(() => {
    window.addEventListener("click", handleWindowClickEvent);
    return () => {
      window.removeEventListener("click", handleWindowClickEvent);
    };
  });

  // 툴팁 리빌드
  useEffect(() => {
    ReactTooltip.rebuild();
  });

  // 예약자 팝업 모달
  const bookerModal = useModal(false);

  // 유틸 from 과 to 사이에 있는 게스트들을 찾습니다.
  // 옵션으로 roomId 까지 필터가능
  const filterTimeZone = (
    from: number,
    to: number,
    roomId?: string
  ): IAssigItem[] => {
    if (!roomId) {
      return guestValue.filter(
        guest =>
          (guest.start >= from && guest.start < to) ||
          (guest.end > from && guest.end <= to) ||
          (guest.end === from && guest.end === to)
      );
    }
    return guestValue.filter(
      guest =>
        (guest.start >= from && guest.start < to) ||
        (guest.end > from && guest.end <= to) ||
        (guest.end === from && guest.end === to)
    );
  };

  // 충돌시간 인터페이스
  // 단순히 안됨 보다 ~부터 ~가 안됨을 표시하기 위함
  // 게스트1이 이동하는 주체
  interface ICrushTime {
    crushGuest: string;
    crushGuest2: string;
    guestIndex: number;
    start: number;
    end: number;
  }

  // 유틸 두게스트의 충돌시간 구해줌 없다면 false를 반환함
  const crushTime = (
    guest: IAssigItem,
    guest2: IAssigItem
  ): ICrushTime | false => {
    const minEnd = guest.end < guest2.end ? guest.end : guest2.end;
    const minStart = guest.start < guest2.start ? guest.start : guest2.start;
    if (minStart >= minEnd) return false;
    return {
      crushGuest: guest.id,
      crushGuest2: guest2.id,
      guestIndex: guest.guestIndex,
      start: minStart,
      end: minEnd
    };
  };

  // 유틸 사람이 그장소에 그시간대에 있다면 충돌시간을 주고 아니면 false를 줌
  const isTherePerson = (
    startTime: number,
    endTime: number,
    groupId: string,
    guest: IAssigItem
  ) => {
    const atTimeGuests = filterTimeZone(startTime, endTime);
    const atTimePlaceGuests = atTimeGuests.filter(
      inGuest => inGuest.group === groupId
    );
    // 자기자신이 포함됨니다..
    if (atTimePlaceGuests.length > 1) {
      const crushTimes = atTimePlaceGuests.map(inGuest =>
        crushTime(inGuest, guest)
      );
      if (!isEmpty(crushTimes)) return crushTimes;
    }
    return false;
  };

  // 유틸 성별이 맞는지 검사하고 결과가 맞지않다면 CrushTime을 반환합니다.
  // targetGroup과 start end에 이동하고자하는 위치 또는 자신의 위치를 넣어서 해당 구간및 장소에
  // 성별이 안전한지 판별합니다.
  const isGenderSafe = (
    targetGroup: IAssigGroup,
    item: IAssigItem,
    start: number,
    end: number
  ): boolean | ICrushTime[] => {
    // 성별검사
    if (targetGroup.roomType.roomGender === RoomGender.ANY) {
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
      const crushGendersGuests = atTimeRoomGuests.filter(
        guest => guest.gender !== item.gender
      );
      return crushGendersGuests
        .map(guest => crushTime(item, guest))
        .filter(crushTime => crushTime)
        .map(
          (crushTime): ICrushTime => {
            if (!crushTime) {
              throw new Error("뀨");
            }
            return crushTime;
          }
        );
    }
    return true;
  };

  const deleteGuest = (guestId: string) => {
    const deleteGuestCallBackFn = (flag: boolean) => {
      if (flag) {
        deleteGuestsMu({
          variables: {
            guestIds: [guestId]
          }
        });
      }
    };
    confirmDelteGuestHook.openModal({
      callBack: deleteGuestCallBackFn,
      txt:
        "해당 게스트를 삭제하시겠습니까? </br> (해당 예약자가 예약한 다른 인원들은 지워지지 않습니다."
    });
  };

  const handleItemDoubleClick = (itemId: any, e: any, time: any) => {
    const target = findItemById(itemId);
    if (target.type === GuestTypeAdd.BLOCK) return;
    // if (target.type === "normal")
    // bookerModal.openModal({bookerId: target.bookerId});
    if (target.type === GuestTypeAdd.MAKE) {
      $("#makeTooltip")
        .css("left", e.clientX)
        .css("top", e.clientY)
        .addClass("makeTooltip--show");
    }
  };

  // 시간을 받아서 게스트들중 그시간대에 있는 게스트들을 반환함
  // Room Id 선택적 벨리데이션

  //  게스트가 그 시간대에 그 그룹에 괺찮은지 검사함 검사한 결과를 즉각반영.
  const oneGuestValidation = (
    guest: IAssigItem,
    start: number,
    end: number,
    groupId: string
  ) => {
    const tempGuest: IAssigItem = {
      ...guest,
      start,
      end,
      group: groupId
    };
    let validater: IAssigItemCrush[] = [];

    const isTherePersonResult = isTherePerson(start, end, groupId, tempGuest);
    // 자리충돌 발생
    if (isTherePersonResult) {
      const temp: any = isTherePersonResult.filter(inCrushTime => inCrushTime);
      const crushTimes: ICrushTime[] = temp;

      const validate = crushTimes.map(inCrushTime => ({
        guestIndex: inCrushTime.guestIndex,
        reason: "자리충돌",
        start: inCrushTime.start,
        end: inCrushTime.end
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
          reason: "성별문제",
          start,
          end
        };
        validater.push(validate);
      } else {
        const temp: any = isGenderSafeResult.filter(inCrushTime => inCrushTime);
        const crushTimes: ICrushTime[] = temp;
        const validate = crushTimes.map(inCrushTime => ({
          guestIndex: guest.guestIndex,
          reason: "자리충돌",
          start: inCrushTime.start,
          end: inCrushTime.end
        }));
        validater = [...validater, ...validate];
      }
    }

    if (guestValue[guest.guestIndex]) {
      guestValue[guest.guestIndex].validate = validater;
    }
    setGuestValue([...guestValue]);
  };

  // 방막기
  const addBlock = async (time: number, groupId: string) => {
    const targetGroup = groupData.find(group => group.id === groupId);
    if (!targetGroup) throw Error("그룹 아이디가 그룹데이터안에 없습니다.");
    const result = await createBlockMu({
      variables: {
        start: moment(time).toDate(),
        end: moment(time + TimePerMs.DAY).toDate(),
        houseId: houseId,
        roomId: targetGroup.roomId,
        bedIndex: targetGroup.bedIndex
      }
    });

    if (
      result &&
      result.data &&
      result.data.CreateBlock.ok &&
      result.data.CreateBlock.block
    ) {
      guestValue.push({
        ...DEFAULT_ASSIGITEM,
        roomId: targetGroup.roomId,
        bedIndex: targetGroup.bedIndex,
        type: GuestTypeAdd.BLOCK,
        id: result.data.CreateBlock.block._id,
        start: time,
        end: time + TimePerMs.DAY,
        group: groupId,
        canMove: false
      });
    }
    setGuestValue([
      ...guestValue.filter(item => item.type != GuestTypeAdd.MARK)
    ]);
  };

  // Id 로 게스트 찾아서 투글해주는 함수
  const genderToggle = (guestId: string) => {
    const targetGuest = findItemById(guestId);
    if (targetGuest)
      targetGuest.gender =
        targetGuest.gender === Gender.FEMALE ? Gender.MALE : Gender.FEMALE;
    setGuestValue([...guestValue]);
  };

  //  캔버스 클릭시 호출됨
  const handleCanvasClick = (
    groupId: string,
    time: number,
    e: React.MouseEvent<HTMLElement>
  ) => {
    if (isMobile) {
      handleCanvasDoubleClick(groupId, time, e);
    }
    if (e.ctrlKey) {
      addBlock(time, groupId);
    }
    $(".assigItem").removeClass(CLASS_LINKED);
  };

  // 유틸 리사이즈 되었을때 벨리데이션 해줍니다.
  const resizeValidater = (item: IAssigItem, time: number) => {
    const linkedGuests = guestValue.filter(
      guest => guest.bookerId === item.bookerId
    );

    linkedGuests.forEach(guest => {
      if (guest.bookerId === item.bookerId)
        oneGuestValidation(guest, guest.start, time, guest.group);
    });
  };

  // 핸들아이템이 그룹에 그시간대에 포함될수 있는지 검사해줍니다.
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

  // 핸들 캔버스 더블클릭시

  const handleCanvasDoubleClick = (
    groupId: string,
    time: number,
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.persist();
    e.preventDefault();
    e.stopPropagation();
    MARKED = true;

    $("#canvasTooltip")
      .css("left", e.clientX)
      .css("top", e.clientY)
      .addClass("canvasTooltip--show");

    setCanvasMenuProps({
      start: time,
      end: time + TimePerMs.DAY,
      groupId: groupId
    });

    const filteredGuestValue = guestValue.filter(
      guest => guest.type !== GuestTypeAdd.MARK
    );

    filteredGuestValue.push({
      ...DEFAULT_ASSIGITEM,
      id: `mark${groupId}${time}`,
      type: GuestTypeAdd.MARK,
      start: time,
      end: time + TimePerMs.DAY,
      group: groupId
    });

    setGuestValue([...filteredGuestValue]);
  };

  // 같은 예약자가 예약한 게스트들을 한번에 변경
  const resizeLinkedItems = (bookerId: string, newTime: number) => {
    // TODO 여기서 State를통하여 조작할수 있도록하자
    guestValue.forEach(guest => {
      const inGuest = guest;
      if (guest.bookerId === bookerId) inGuest.end = newTime;
    });
    setGuestValue([...guestValue]);
  };

  // 같은 예약자가 예약한 게스트들을 한번에 이동
  const moveLinkedItems = (bookerId: string, newTime: number) => {
    guestValue.forEach(guest => {
      const inGuest = guest;
      if (guest.bookerId === bookerId) {
        inGuest.end += newTime - guest.start;
        inGuest.start = newTime;
      }
    });
    setGuestValue([...guestValue]);
  };

  // 유틸 아이템을 화면에서 삭제
  const clearItem = async (id: string) => {
    const targetItem = findItemById(id);
    if (targetItem.type === GuestTypeAdd.BLOCK) {
      const result = await deleteBlockMu({
        variables: {
          blockId: id
        }
      });
      if (
        result &&
        result.data &&
        result.data.DeleteBlock &&
        result.data.DeleteBlock.ok
      ) {
        setGuestValue([...guestValue.filter(guest => guest.id !== id)]);
      }
    } else {
      setGuestValue([...guestValue.filter(guest => guest.id !== id)]);
    }
  };

  // 핸들 움직일때 벨리데이션 (마우스 움직이면 호출됨)
  // 새로운 시간을 리턴하거나 time을 리턴하세요.
  const handleMoveResizeValidator = (
    action: "move" | "resize",
    item: IAssigItem,
    time: number,
    resizeEdge: "left" | "right" | undefined
  ): number => {
    ReactTooltip.hide();
    if (action === "resize") {
      // 최소 아이템줌 설정
      if (item.start >= time) return item.end;
      if (setMidNight(Date.now()) >= time) return item.end;

      // resizeValidater(item, time);

      if (item.type !== GuestTypeAdd.BLOCK) {
        resizeLinkedItems(item.bookerId, time);
      }
    }

    if (action === "move") {
      if (item.start < setMidNight(moment().valueOf())) {
        return setMidNight(moment().valueOf());
      }
      $(`.assigItem--booker${item.bookerId}`).addClass(CLASS_MOVING);
      $(`#assigItem--guest${item.id}`).removeClass(CLASS_MOVING);

      const targetGroup = groupData.find(group => group.id === item.group);
      // 이동하는곳 성별 제한 확인
      if (targetGroup) {
        // 💔💔💔💔 아이템이 기존 아이템과 동일한 상태라서 group이 New 그룹이 아닙니다 ㅠㅠㅠ
      }
      moveLinkedItems(item.bookerId, time);
    }

    return time;
  };

  // 핸들 아이템 움직일시 (마우스 놓아야 호출됨)
  const handleItemMove = async (
    itemId: string,
    dragTime: number,
    newGroupOrder: number
  ) => {
    const guestValueOriginCopy = guestValue.slice();
    const guestValueCopy = guestValue.slice();
    const targetGuest = guestValueCopy.find(guest => guest.id === itemId);
    if (!targetGuest) return;
    targetGuest.group = groupData[newGroupOrder].id;
    setGuestValue([...guestValueCopy]);

    const newGroupId = groupData[newGroupOrder].roomId;

    $(`.${CLASS_MOVING}`).removeClass(CLASS_MOVING);

    // 배정 뮤테이션을 발생
    if (targetGuest.type === GuestTypeAdd.GUEST) {
      const result = await allocateMu({
        variables: {
          guestId: itemId,
          roomId: newGroupId,
          bedIndex: groupData[newGroupOrder].bedIndex
        }
      });
      // 실패하면 전부 되돌림

      if (result) {
        if (result.data) {
          if (!result.data.AllocateGuestToRoom.ok) {
            setGuestValue([...guestValueOriginCopy]);
          }
        }
      }
    }
  };

  // 핸들 아이템 리사이즈시 (마우스 놓아야 호출됨)
  const handleItemResize = async (
    itemId: string,
    time: number,
    edge: "left" | "right"
  ) => {
    const targetGuest = findItemById(itemId);
    if (targetGuest.type === GuestTypeAdd.BLOCK) {
      const guestValueOriginCopy = $.extend(true, [], guestValue);
      await resizeLinkedItems(targetGuest.bookerId, time);

      const result = await createBlockMu({
        variables: {
          bedIndex: targetGuest.bedIndex,
          end: time,
          houseId: houseId,
          roomId: targetGuest.roomId,
          start: targetGuest.start
        }
      });

      // 에러처리
      if (result && result.data && !result.data.CreateBlock.ok) {
        setGuestValue([...guestValueOriginCopy]);
      } else {
        console.error("block 변경 실패");
      }
    }
  };

  // 핸들 아이템 클릭
  const hanldeItemClick = async (
    itemId: string,
    e: React.MouseEvent<HTMLElement>,
    time: number
  ) => {
    const target = findItemById(itemId);

    if (target.bookerId === "block") return;

    if (isMobile) {
      handleItemDoubleClick(itemId, e, time);
    }

    // 컨트롤: 체크인
    if (e.ctrlKey) {
      toogleCheckInOut(itemId);
    }
    // 쉬프트 팝업
    if (e.shiftKey) {
      bookerModal.openModal({bookerId: target.bookerId});
    }
    // 알트: 배정확정
    if (e.altKey) {
      guestValue[target.guestIndex].isUnsettled = !guestValue[target.guestIndex]
        .isUnsettled;
      setGuestValue([...guestValue]);
    }
  };

  const allTooltipsHide = () => {
    ReactTooltip.hide();
    $(".canvasTooltip").removeClass("canvasTooltip--show");
    $(".makeTooltip").removeClass("makeTooltip--show");
  };
  // 타임라인 이동시
  const handleTimeChnage = (
    visibleTimeStart: number,
    visibleTimeEnd: number,
    updateScrollCanvas: any
  ) => {
    allTooltipsHide();
    const dataLimitEnd = dataTime.end - TimePerMs.DAY * 20;
    const dataLimitstart = dataTime.start + TimePerMs.DAY * 10;

    //  뒤로 요청
    if (visibleTimeStart < dataLimitstart) {
      const queryStart = visibleTimeStart - TimePerMs.DAY * 60;
      const queryEnd = visibleTimeEnd + TimePerMs.DAY * 30;

      setDataTime({
        start: setMidNight(queryStart),
        end: setMidNight(queryEnd)
      });
    }

    //  앞으로 요청
    if (dataLimitEnd < visibleTimeEnd) {
      const queryStart = visibleTimeStart - TimePerMs.DAY * 30;
      const queryEnd = visibleTimeEnd + TimePerMs.DAY * 60;

      setDataTime({
        start: setMidNight(queryStart),
        end: setMidNight(queryEnd)
      });
    }
    updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
  };

  // 체크인 투글함수
  const toogleCheckInOut: TToogleCheckIn = async (
    guestId?: string,
    guestIndex?: number
  ) => {
    let target: IAssigItem = DEFAULT_ASSIGITEM;
    if (guestIndex !== undefined) {
      target = guestValue[guestIndex];
    } else if (guestId) {
      const temp = guestValue.find(guest => guest.id === guestId);
      if (temp) target = temp;
    }

    const result = await updateBookerMu({
      variables: {
        bookerId: target.bookerId,
        params: {
          isCheckIn: {
            isIn: !guestValue[target.guestIndex].isCheckin
          }
        }
      }
    });

    // 아폴로 통신 성공
    if (result && result.data) {
      onCompletedMessage(result.data.UpdateBooker, "체크인", "실패");
      if (result.data.UpdateBooker.ok) {
        // 뮤테이션 성공시

        const updateGuests = guestValue.map(guest => {
          if (guest.bookerId === target.bookerId) {
            guest.isCheckin = !guest.isCheckin;
          }
          return guest;
        });

        setGuestValue([...updateGuests]);
      } else {
        // 뮤테이션 실패시
      }
    }
  };

  // 🐭 캔버스 오른쪽 클릭
  const handleCanvasContextMenu = (
    groupId: string,
    time: number,
    e: React.MouseEvent<HTMLElement>
  ) => {};

  // 🐭 아이템이 선택되었을때
  const handleItemSelect = async (
    itemId: string,
    e: React.MouseEvent<HTMLElement>,
    time: number
  ) => {
    const target = guestValue.find(guest => guest.id === itemId);
    if (target) {
      await $(".assigItem").removeClass(CLASS_LINKED);
      $(`.assigItem--booker${target.bookerId}`).addClass(CLASS_LINKED);
    }
  };

  const timelineClassNames = classnames("assigTimeline", undefined, {
    "assiTimeline--mobile": windowWidth <= 400
  });

  return (
    <div
      id="AssigTimeline"
      className={`${timelineClassNames} container container--full`}
    >
      <div className="docs-section">
        <h3>
          {"방배정"}
          {loading && <Preloader />}
        </h3>
        <div className="flex-grid flex-grid--end">
          <Link to="/middleServer/timelineConfig">
            <Button float="right" icon="roomChange" label="방구조 변경" />
          </Link>
        </div>
        <CanvasMenu
          addBlock={addBlock}
          canvasMenuProps={canvasMenuProps}
          guestValue={guestValue}
          setGuestValue={setGuestValue}
        />
        <MakeItemMenu
          groupData={groupData}
          guestValue={guestValue}
          bookerModalHook={bookerModal}
        />
        <ItemMenu
          deleteGuest={deleteGuest}
          toogleCheckInOut={toogleCheckInOut}
          bookerModalHook={bookerModal}
          guestValue={guestValue}
        />
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
          onTimeChange={handleTimeChnage}
          itemRenderer={(props: any) =>
            itemRendererFn({...props, clearItem, genderToggle})
          }
          groupRenderer={assigGroupRendererFn}
          defaultTimeEnd={
            isTabletDown ? defaultTimeEnd - TimePerMs.DAY * 5 : defaultTimeEnd
          }
          defaultTimeStart={defaultTimeStart}
          moveResizeValidator={handleMoveResizeValidator}
          onItemSelect={handleItemSelect}
          onCanvasContextMenu={handleCanvasContextMenu}
          sidebarWidth={isMobile ? 100 : 230}
        >
          <TimelineHeaders>
            <SidebarHeader>
              {({getRootProps}: any) => (
                <div className="rct-header-root__topLeft" {...getRootProps()}>
                  <JDdayPicker
                    isRange={false}
                    input
                    canSelectBeforeDays={false}
                    label="달력날자"
                    {...dayPickerHook}
                    className="JDwaves-effect JDoverflow-visible"
                    inputComponent={
                      <span>
                        <JDIcon
                          className="specificPrice__topLeftIcon"
                          size={IconSize.MEDEIUM_SMALL}
                          icon="calendar"
                        />
                      </span>
                    }
                  />
                </div>
              )}
            </SidebarHeader>
            <DateHeader
              intervalRenderer={({getIntervalProps, intervalContext}: any) => {
                const isToday = intervalContext.interval.startTime.isSame(
                  new Date(),
                  "day"
                );
                return (
                  <div
                    className={`rct-dateHeader ${isToday &&
                      "rct-dateHeader--today"}`}
                    {...getIntervalProps()}
                  >
                    {intervalContext.intervalText.replace("요일", "")}
                  </div>
                );
              }}
              height={GlobalCSS.TIMELINE_HEADER_HEIGHT}
              unit="day"
            />
            <DateHeader />
          </TimelineHeaders>
        </Timeline>
        {groupData.length === 0 && (
          <div className="assigTimeline__placeHolderWrap">
            <Link to="/middleServer/timelineConfig">
              <JDIcon
                className="assigTimeline__placeHolder"
                size={IconSize.LARGE}
                icon="addCircle"
              />
            </Link>
          </div>
        )}
      </div>
      <BookerModalWrap houseId={houseId} modalHook={bookerModal} />
      <JDtoastModal confirm {...confirmDelteGuestHook} />
    </div>
  );
};

export default ErrProtecter(ShowTimeline);
