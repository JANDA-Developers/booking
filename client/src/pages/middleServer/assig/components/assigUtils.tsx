import React from "react";
import {
  TRemoveMark,
  TGetItemById,
  TGetGroupById,
  TIsTherePerson,
  TFilterTimeZone,
  TAllTooltipsHide,
  ICrushTime,
  TGetCrushTimeByTwoGuest,
  TIsGenderSafe,
  TDeleteGuestById,
  IAssigItemCrush,
  TAddBlock,
  TGenderToggleById,
  TResizeValidater,
  TResizeLinkedItems,
  TMoveLinkedItems,
  TDeleteItemById,
  GuestTypeAdd,
  IAssigTimelineUtils,
  IAssigDataControl,
  IAssigTimelineContext,
  IAssigTimelineHooks,
  IAssigItem,
  TToogleCheckIn,
  TOpenCanvasMenuTooltip,
  TOpenBlockMenu,
  TOpenMakeMenu,
  TMakeMark,
  TDeleteBookingById,
  TGetBookingIdByGuestId,
  TResizeBlockBlock,
  TAllocateItem,
  TAllocateGuest,
  TPopUpItemMenuTooltip,
  IGetGuestByBookingId,
  THilightGuestBlock,
  TChangeMakeBlock,
  TBookingCheckedNew,
  IAssigGroup,
  TDleteGhost,
  TGetAssigInfoFromItems,
  IAssigInfo,
  TGetGuestsInGroup
} from "./assigIntrerface";
import {
  isEmpty,
  onCompletedMessage,
  muResult,
  targetBlink,
  JDscrollTo,
  s4
} from "../../../../utils/utils";
import {ReactTooltip} from "../../../../atoms/tooltipList/TooltipList";
import {RoomGender, TimePerMs, Gender} from "../../../../types/enum";
import moment from "moment";
import {DEFAULT_ASSIG_ITEM} from "../../../../types/defaults";
import $ from "jquery";
import {
  createBlock_CreateBlock_block,
  getBooking,
  getBooking_GetBooking_booking_guests_GuestRoom_roomType,
  getBooking_GetBooking_booking_guests,
  PricingType
} from "../../../../types/api";
import JDisNetworkRequestInFlight from "../../../../utils/netWorkStatusToast";
import {assigSharedDleteGuestConfirmMessage} from "./items/shared";
import {blockDataManufacture} from "../AssigTimelineWrap";
import {IGuest} from "../../../../types/interface";

export function getAssigUtils(
  {
    setGuestValue,
    guestValue,
    confirmDelteGuestHook,
    setBlockMenuProps,
    setCanvasMenuTooltipProps,
    setMakeMenuProps
  }: IAssigTimelineHooks,
  {
    allocateMu,
    deleteGuestsMu,
    createBlockMu,
    deleteBlockMu,
    deleteBookingMu,
    updateBookingMu,
    startPolling,
    stopPolling,
    networkStatus,
    totalMuLoading
  }: IAssigDataControl,
  {houseId, groupData}: IAssigTimelineContext
): IAssigTimelineUtils {
  console.time("--");
  // 마크제거 MARK REMOVE 마커 제거
  const removeMark: TRemoveMark = () => {
    console.info("removeMark");
    setGuestValue([
      ...guestValue.filter(item => item.type !== GuestTypeAdd.MARK)
    ]);
  };

  const deleteGhost: TDleteGhost = () => {
    console.info("deleteGhost");
    setGuestValue([
      ...guestValue.filter(item => item.type !== GuestTypeAdd.GHOST)
    ]);
  };

  const getItemById: TGetItemById = guestId => {
    const targetGuest = guestValue.find(guest => guest.id === guestId);
    if (!targetGuest)
      throw new Error("해당하는 게스트를 찾을수 없습니다. <<getItemById>>");
    return targetGuest;
  };

  const getAssigInfoFromItems: TGetAssigInfoFromItems = items => {
    const temp = items
      .map(
        (item): IAssigInfo => {
          const group = getGroupById(item.group);
          return {
            bedIndex: group.bedIndex!,
            roomId: group.roomId,
            gender: item.gender
          };
        }
      )
      .filter(group => group.bedIndex !== -1);

    return temp;
  };

  const getGroupById: TGetGroupById = groupId => {
    const targetGroup = groupData.find(group => group.id === groupId);
    if (!targetGroup)
      throw new Error("해당하는 그룹을 찾을수 없습니다. <<getGroupById>>");
    return targetGroup;
  };

  const bookingCheckedNew: TBookingCheckedNew = bookingId => {
    const targets = getGuestsByBookingId(bookingId);
    targets.forEach(target => (target.showNewBadge = false));
    setGuestValue([...guestValue]);
  };

  const popUpItemMenuTooltip: TPopUpItemMenuTooltip = async (
    location: {clientX: number; clientY: number},
    target: IAssigItem
  ) => {
    await allTooltipsHide();
    await removeMark();

    if (target.type === GuestTypeAdd.BLOCK) {
      await openBlockMenu(location, {item: target});
    }
    // if (target.type === "normal")
    // bookingModal.openModal({bookingId: target.bookingId});
    if (target.type === GuestTypeAdd.MAKE) {
      openMakeMenu(location, {item: target});
    }
  };

  // 곧추가될것 까지 커버가능
  const hilightGuestBlock: THilightGuestBlock = ({itemId, bookingId}) => {
    let targetDom;
    if (itemId) {
      targetDom = $(`#assigItem--item${itemId}`);
    } else {
      targetDom = $(`.assigItem--booking${bookingId}`);
    }

    if (!targetDom || targetDom.length === 0) {
      setTimeout(() => {
        hilightGuestBlock({itemId, bookingId});
      }, 1000);
      return;
    }

    targetBlink(targetDom);
    JDscrollTo(targetDom, $(`.rct-scroll`));
  };

  // 유틸 사람이 그장소에 그시간대에 있다면 충돌시간을 주고 아니면 false를 줌
  const isTherePerson: TIsTherePerson = (
    startTime,
    endTime,
    groupId,
    guest
  ) => {
    const atTimeGuests = filterTimeZone(startTime, endTime);
    const atTimePlaceGuests = atTimeGuests.filter(
      inGuest => inGuest.group === groupId
    );
    // 자기자신이 포함됨니다..
    if (atTimePlaceGuests.length > 1) {
      const crushTimes = atTimePlaceGuests.map(inGuest =>
        getCrushTimeByTwoGuest(inGuest, guest)
      );
      if (!isEmpty(crushTimes)) return crushTimes;
    }
    return false;
  };

  // 유틸 from 과 to 사이에 있는 모든 아이템을 찾습니다.
  // 옵션으로 roomId 까지 필터가능
  const filterTimeZone: TFilterTimeZone = (from, to, roomId) => {
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

  // 체크인 투글함수
  // 게스트인덱스는 쓰지않는게 좋음
  const toogleCheckInOut: TToogleCheckIn = async (
    guestId?: string,
    itemIndex?: number
  ) => {
    if (JDisNetworkRequestInFlight(networkStatus)) return;
    let target: IAssigItem = DEFAULT_ASSIG_ITEM;

    if (itemIndex !== undefined) {
      target = guestValue[itemIndex];
    } else if (guestId) {
      const temp = guestValue.find(guest => guest.id === guestId);
      if (temp) target = temp;
    }

    const result = await updateBookingMu({
      variables: {
        bookingId: target.bookingId,
        params: {
          checkInInfo: {
            isIn: !guestValue[target.itemIndex].checkInInfo
          }
        }
      }
    });

    // 아폴로 통신 성공
    if (result && result.data) {
      const message = guestValue[target.itemIndex].checkInInfo
        ? "체크아웃"
        : "체크인";
      onCompletedMessage(result.data.UpdateBooking, message, "실패");
      if (result.data.UpdateBooking.ok) {
        // 뮤테이션 성공시

        const updateGuests = guestValue.map(guest => {
          if (guest.bookingId === target.bookingId) {
            guest.checkInInfo = !guest.checkInInfo;
          }
          return guest;
        });

        setGuestValue([...updateGuests]);
      } else {
        // 뮤테이션 실패시
      }
    }
  };

  // 모든 툴팁을 팝업에서 제거
  const allTooltipsHide: TAllTooltipsHide = except => {
    ReactTooltip.hide();
    if (except !== "blockMenu")
      $("#blockMenu").removeClass("assig__tooltips--show");
    if (except !== "canvasMenu")
      $("#canvasMenu").removeClass("assig__tooltips--show");
    if (except !== "makeMenu")
      $("#makeMenu").removeClass("assig__tooltips--show");
    if (except !== "itemTooltip")
      $("#itemTooltip").removeClass("assig__tooltips--show");
  };

  // 유틸 두게스트의 충돌시간 구해줌 없다면 false를 반환함
  const getCrushTimeByTwoGuest: TGetCrushTimeByTwoGuest = (guest, guest2) => {
    const minEnd = guest.end < guest2.end ? guest.end : guest2.end;
    const minStart = guest.start < guest2.start ? guest.start : guest2.start;
    if (minStart >= minEnd) return false;
    return {
      crushGuest: guest.id,
      crushGuest2: guest2.id,
      itemIndex: guest.itemIndex,
      start: minStart,
      end: minEnd
    };
  };

  // 유틸 성별이 맞는지 검사하고 결과가 맞지않다면 CrushTime을 반환합니다.
  // targetGroup과 start end에 이동하고자하는 위치 또는 자신의 위치를 넣어서 해당 구간및 장소에
  // 성별이 안전한지 판별합니다.
  const isGenderSafe: TIsGenderSafe = (targetGroup, item, start, end) => {
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
        .map(guest => getCrushTimeByTwoGuest(item, guest))
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

  // 유틸 그자리에 마크를 생성
  const makeMark: TMakeMark = (time: number, groupId: string) => {
    console.info("makeMark");
    const filteredGuestValue = guestValue.filter(
      guest => guest.type !== GuestTypeAdd.MARK
    );

    filteredGuestValue.push({
      ...DEFAULT_ASSIG_ITEM,
      id: `mark${groupId}${time}`,
      type: GuestTypeAdd.MARK,
      start: time,
      end: time + TimePerMs.DAY,
      group: groupId
    });

    setGuestValue([...filteredGuestValue]);
  };

  const getGuestsByBookingId: IGetGuestByBookingId = (bookingId: string) =>
    guestValue.filter(guest => guest.bookingId === bookingId);

  // 예약을 예약 아이디로 삭제
  const deleteBookingById: TDeleteBookingById = async (bookingId: string) => {
    const result = await deleteBookingMu({
      variables: {
        bookingId
      }
    });

    if (result && result.data && result.data.DeleteBooking.ok) {
      setGuestValue(guestValue.filter(guest => guest.bookingId !== bookingId));
    }
  };

  //  예약아이디를 게스트아이디로 찾음
  const getBookingIdByGuestId: TGetBookingIdByGuestId = (
    guestId: string
  ): string => {
    const target = guestValue.find(guest => guest.id === guestId);
    if (!target) {
      throw Error("guestId not exist :: getBookingByGuestId");
    }
    return target.bookingId;
  };

  // 해당 게스트를 찾아서 제거함
  const deleteGuestById: TDeleteGuestById = guestId => {
    if (JDisNetworkRequestInFlight(networkStatus)) return;
    const deleteGuestCallBackFn = (flag: boolean, key: string) => {
      if (key === "deleteAll") {
        deleteBookingById(getBookingIdByGuestId(guestId));
      }

      if (flag) {
        deleteGuestsMu({
          variables: {
            guestIds: [guestId]
          }
        });
        deleteItemById(guestId);
      }
    };

    confirmDelteGuestHook.openModal({
      callBack: deleteGuestCallBackFn,
      ...assigSharedDleteGuestConfirmMessage
    });
  };

  const getGuestsInGroup: TGetGuestsInGroup = (group: IAssigGroup) =>
    guestValue.filter(guest => guest.group === group.id);

  // 게스트가 그 시간대에 그 그룹에 괺찮은지 검사함
  // 검사한 결과를 Validation에 기입.

  const resizeBlockBlock: TResizeBlockBlock = async (
    targetGuest: IAssigItem,
    time: number
  ) => {
    const guestValueOriginCopy = $.extend(true, [], guestValue);

    targetGuest.end = time;
    setGuestValue([...guestValue]);

    const result = await createBlockMu({
      variables: {
        bedIndex: targetGuest.bedIndex,
        checkOut: time,
        houseId: houseId,
        roomId: targetGuest.roomId,
        checkIn: targetGuest.start
      }
    });

    // 에러처리
    const newBlock: any = muResult<createBlock_CreateBlock_block>(
      result,
      "CreateBlock",
      "block"
    );
    if (typeof newBlock !== "boolean") {
      // setGuestValue([...guestValueOriginCopy,]);
    } else {
      setGuestValue([...guestValueOriginCopy]);
    }
  };

  const allocateItem: TAllocateItem = async (
    targetGuest: IAssigItem,
    newGroupOrder: number
  ) => {
    const guestValueOriginCopy = $.extend(true, [], guestValue);

    targetGuest.group = groupData[newGroupOrder].id;
    setGuestValue([...guestValue]);

    // 배정 뮤테이션을 발생
    if (targetGuest.type === GuestTypeAdd.GUEST) {
      allocateGuest(targetGuest.id, newGroupOrder, guestValueOriginCopy);
    }
  };

  const allocateGuest: TAllocateGuest = async (
    itemId: string,
    newGroupOrder: number,
    guestValueOriginCopy?: IAssigItem[]
  ) => {
    if (JDisNetworkRequestInFlight(networkStatus)) return;
    const newGroupId = groupData[newGroupOrder].roomId;
    const result = await allocateMu({
      variables: {
        guestId: itemId,
        roomId: newGroupId,
        bedIndex: groupData[newGroupOrder].bedIndex - 1
      }
    });
    // 실패하면 전부 되돌림

    // 👿 이반복을 함수 if 로 만들면 어떨까?
    if (!muResult(result, "AllocateGuestToRoom"))
      if (guestValueOriginCopy) {
        setGuestValue([...guestValueOriginCopy]);
      } else {
        location.reload();
      }
  };
  // 방막기
  const addBlock: TAddBlock = async (time, groupId) => {
    if (JDisNetworkRequestInFlight(networkStatus)) return;
    allTooltipsHide();
    const guestValueOriginCopy = $.extend(true, [], guestValue);

    const targetGroup = groupData.find(group => group.id === groupId);
    if (!targetGroup) throw Error("그룹 아이디가 그룹데이터안에 없습니다.");

    const start = moment(time).toDate();
    const end = moment(time + TimePerMs.DAY).toDate();

    const tempId = s4();
    const tempItem = {
      ...DEFAULT_ASSIG_ITEM,
      bookingId: s4(),
      roomId: targetGroup.roomId,
      bedIndex: targetGroup.bedIndex,
      itemIndex: guestValueOriginCopy.length,
      type: GuestTypeAdd.GHOST,
      id: tempId,
      start: time,
      end: time + TimePerMs.DAY,
      group: groupId,
      canMove: false,
      loading: true
    };

    const nextGuestValue = guestValue.filter(
      item => item.type != GuestTypeAdd.MARK
    );

    nextGuestValue.push(tempItem);
    setGuestValue([...nextGuestValue]);

    const result = await createBlockMu({
      variables: {
        checkIn: start,
        checkOut: end,
        houseId: houseId,
        roomId: targetGroup.roomId,
        bedIndex: targetGroup.bedIndex
      }
    });

    const block = muResult<createBlock_CreateBlock_block>(
      result,
      "CreateBlock",
      "block"
    );

    if (typeof block === "boolean") {
      setGuestValue(guestValueOriginCopy);
    } else {
      tempItem.id = block._id;
      tempItem.type = GuestTypeAdd.BLOCK;
      setGuestValue([...nextGuestValue]);
    }
  };

  // Id 로 게스트 찾아서 투글해주는 함수
  const genderToggleById: TGenderToggleById = guestId => {
    const targetGuest = getItemById(guestId);
    if (targetGuest)
      targetGuest.gender =
        targetGuest.gender === Gender.FEMALE ? Gender.MALE : Gender.FEMALE;
    setGuestValue([...guestValue]);
  };

  // 유틸 리사이즈 되었을때 벨리데이션 해줍니다.
  const resizeValidater: TResizeValidater = (item, time) => {
    const linkedGuests = guestValue.filter(
      guest => guest.bookingId === item.bookingId
    );
  };

  // 같은 예약자가 예약한 게스트들을 한번에 변경
  const resizeLinkedItems: TResizeLinkedItems = (bookingId, newTime) => {
    // TODO 여기서 State를통하여 조작할수 있도록하자
    guestValue.forEach(guest => {
      const inGuest = guest;
      if (guest.bookingId === bookingId) inGuest.end = newTime;
    });
    setGuestValue([...guestValue]);
  };

  // 같은 예약자가 예약한 게스트들을 한번에 이동
  const moveLinkedItems: TMoveLinkedItems = (bookingId, newTime) => {
    guestValue.forEach(guest => {
      const inGuest = guest;
      if (guest.bookingId === bookingId) {
        inGuest.end += newTime - guest.start;
        inGuest.start = newTime;
      }
    });
    setGuestValue([...guestValue]);
  };

  // block 용 메뉴오픈
  const openBlockMenu: TOpenBlockMenu = (location, blockMenuProps) => {
    if (blockMenuProps) {
      setBlockMenuProps(blockMenuProps);
    }

    $("#blockMenu")
      .css("left", location.clientX)
      .css("top", location.clientY)
      .addClass("assig__tooltips--show");
  };

  // make블러들을 ghost로 변환
  const changeMakeBlock: TChangeMakeBlock = () => {
    const makeBlock = guestValue.filter(
      guest => guest.type === GuestTypeAdd.MAKE
    );
    makeBlock.forEach(makeBlock => {
      makeBlock.loading = true;
      makeBlock.type = GuestTypeAdd.GHOST;
    });
    setGuestValue([...guestValue]);
  };

  // canvas 용 메뉴오픈
  const openCanvasMenuTooltip: TOpenCanvasMenuTooltip = (
    location,
    canvasMenuProps
  ) => {
    if (canvasMenuProps) {
      setCanvasMenuTooltipProps(canvasMenuProps);
    }
    $("#canvasMenu")
      .css("left", location.clientX + 5)
      .css("top", location.clientY + 3)
      .addClass("assig__tooltips--show");
  };

  // 유틸 아이템을 화면에서 삭제
  const deleteItemById: TDeleteItemById = async id => {
    allTooltipsHide();
    const targetItem = getItemById(id);
    if (targetItem.type === GuestTypeAdd.BLOCK) {
      const result = await deleteBlockMu({
        variables: {
          blockId: id
        }
      });
      if (!muResult(result, "DeleteBlock ")) {
        setGuestValue([...guestValue.filter(guest => guest.id !== id)]);
      }
    } else {
      setGuestValue([...guestValue.filter(guest => guest.id !== id)]);
    }
  };

  // make 툴팁 오픈
  const openMakeMenu: TOpenMakeMenu = (e, makeMenuProp) => {
    if (makeMenuProp) setMakeMenuProps(makeMenuProp);
    $("#makeMenu")
      .css("left", e.clientX)
      .css("top", e.clientY)
      .addClass("assig__tooltips--show");
  };

  // 👼 컴포넌트들 내부에 prop를 전달하기 힘드니까 이렇게 전달하자.
  const assigUtils: IAssigTimelineUtils = {
    changeMakeBlock,
    getItemById,
    getGroupById,
    removeMark,
    isTherePerson,
    filterTimeZone,
    allTooltipsHide,
    getCrushTimeByTwoGuest,
    deleteGuestById,
    deleteItemById,
    openMakeMenu,
    isGenderSafe,
    getGuestsByBookingId,
    addBlock,
    allocateGuest,
    allocateItem,
    resizeBlockBlock,
    genderToggleById,
    resizeValidater,
    bookingCheckedNew,
    resizeLinkedItems,
    moveLinkedItems,
    toogleCheckInOut,
    openBlockMenu,
    openCanvasMenuTooltip,
    makeMark,
    getAssigInfoFromItems,
    deleteBookingById,
    getGuestsInGroup,
    popUpItemMenuTooltip,
    getBookingIdByGuestId,
    hilightGuestBlock,
    deleteGhost
  };

  console.timeEnd("--");
  return assigUtils;
}
