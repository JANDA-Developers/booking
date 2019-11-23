import _ from "lodash";
import {
  TRemoveMark,
  TGetItemById,
  TGetGroupById,
  TIsTherePerson,
  TFilterTimeZone,
  TAllTooltipsHide,
  TIsGenderSafe,
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
  TCreateMark,
  TDeleteBookingById,
  TGetBookingIdByGuestId,
  TResizeBlockBlock,
  TAllocateItem,
  TAllocateGuest,
  TPopUpItemMenuTooltip,
  IGetGuestByBookingId,
  THilightGuestBlock,
  TBookingCheckedNew,
  IAssigGroup,
  TDleteGhost,
  TGetAssigInfoFromItems,
  IAssigInfo,
  TGetGuestsInGroup,
  ICanvasMenuTooltipProps,
  ICreateCreateItem,
  TChangeMarkToGhost,
  TGetInfoesFromMarks,
  THilightHeader
} from "../components/assigIntrerface";
import {
  onCompletedMessage,
  muResult,
  targetBlink,
  JDscrollTo,
  s4,
  isEmpty
} from "../../../../utils/utils";
import { ReactTooltip } from "../../../../atoms/tooltipList/TooltipList";
import { RoomGender, Gender, PricingType } from "../../../../types/enum";
import {
  DEFAULT_ASSIG_ITEM,
  DEFAULT_ROOMTYPE,
  DEFAULT_BOOKING
} from "../../../../types/defaults";
import $ from "jquery";
import {
  createBlock_CreateBlock_block,
  getBooking_GetBooking_booking_roomTypes,
  getBooking_GetBooking_booking_guests
} from "../../../../types/api";
import JDisNetworkRequestInFlight from "../../../../utils/netWorkStatusToast";
import {
  GB_booking,
  TBookingModalOpenWithMark
} from "../../../../types/interface";
import { LANG } from "../../../../hooks/hook";
import { IBookingModalProp } from "../../../../components/bookingModal/declaration";

export function getAssigUtils(
  {
    setGuestValue,
    guestValue,
    setBlockMenuProps,
    bookingModal,
    confirmModalHook
  }: IAssigTimelineHooks,
  {
    allocateMu,
    deleteGuestsMu,
    createBlockMu,
    deleteBlockMu,
    deleteBookingMu,
    updateBookingMu,
    networkStatus,
    refetch
  }: IAssigDataControl,
  { houseId, groupData }: IAssigTimelineContext
): IAssigTimelineUtils {
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

  // TODO
  // const getItemByTypes

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
    location: { clientX: number; clientY: number },
    target: IAssigItem
  ) => {
    await allTooltipsHide();
    await removeMark();

    if (target.type === GuestTypeAdd.BLOCK) {
      await openBlockMenu(location, { item: target });
    }
  };

  // 추가되는 블록을 하일라이팅 해줍니다.
  // 아이템 아이디 또는 부킹아이디로 지정가능합니다.
  const hilightGuestBlock: THilightGuestBlock = ({
    itemId,
    bookingId,
    scrollMove
  }) => {
    let targetDom;
    if (itemId) {
      targetDom = $(`#assigItem--item${itemId}`);
    } else {
      targetDom = $(`.assigItem--booking${bookingId}`);
    }

    if (!targetDom || targetDom.length === 0) {
      setTimeout(() => {
        hilightGuestBlock({ itemId, bookingId });
      }, 1000);
      return;
    }

    targetBlink(targetDom);
    if (scrollMove) {
      JDscrollTo(targetDom, $(`.rct-scroll`));
    }
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
      return true;
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
        ? LANG("checkOut")
        : LANG("checkIn");
      onCompletedMessage(
        result.data.UpdateBooking,
        message,
        LANG("checkin_change_fail")
      );
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
    if (except !== "createMenu")
      $("#createMenu").removeClass("assig__tooltips--show");
    if (except !== "itemTooltip")
      $("#itemTooltip").removeClass("assig__tooltips--show");
  };

  // 유틸 두게스트의 충돌시간 구해줌 없다면 false를 반환함
  // const getCrushTimeByTwoGuest: TGetCrushTimeByTwoGuest = (guest, guest2) => {
  //   const minEnd = guest.end < guest2.end ? guest.end : guest2.end;
  //   const minStart = guest.start < guest2.start ? guest.start : guest2.start;
  //   if (minStart >= minEnd) return false;
  //   return {
  //     crushGuest: guest.id,
  //     crushGuest2: guest2.id,
  //     itemIndex: guest.itemIndex,
  //     start: minStart,
  //     end: minEnd
  //   };
  // };

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
      return crushGendersGuests ? false : true;
    }
    return true;
  };

  // 유틸 그자리에 마크를 생성
  const createMark: TCreateMark = (
    start: number,
    end: number,
    groupIds: string[]
  ) => {
    console.info("createMark");
    // TODO 시프트로 할려면 특별한 장치가 필요할것같다.
    const filteredGuestValue = guestValue.filter(
      guest => guest.type !== GuestTypeAdd.MARK
    );

    groupIds.forEach((id, i) => {
      const group = getGroupById(id);
      filteredGuestValue.push({
        ...DEFAULT_ASSIG_ITEM,
        roomTypeId: group.roomTypeId,
        bedIndex: group.bedIndex,
        roomId: group.roomId,
        itemIndex: guestValue.length + i + 1,
        id: `mark${id}${start}`,
        type: GuestTypeAdd.MARK,
        start: start,
        end: end,
        canSelect: false,
        group: id
      });
    });

    setGuestValue([...filteredGuestValue]);
  };

  const getGuestsByBookingId: IGetGuestByBookingId = (bookingId: string) =>
    guestValue.filter(guest => guest.bookingId === bookingId);

  // 예약을 예약 아이디로 삭제
  const deleteBookingById: TDeleteBookingById = async (bookingId, confirm) => {
    // 예약 삭제 진행
    const callBackFn = async (flag: boolean) => {
      if (flag) {
        const result = await deleteBookingMu({
          variables: {
            bookingId
          }
        });

        if (result && result.data && result.data.DeleteBooking.ok) {
          setGuestValue(
            guestValue.filter(guest => guest.bookingId !== bookingId)
          );
        }
      }
    };

    // 확인메시지 출력여부
    if (!confirm) callBackFn(true);
    else {
      confirmModalHook.openModal({
        txt: LANG("are_you_sure_you_want_to_delete_the_reservation"),
        callBack: callBackFn
      });
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
    const newBlock = muResult(result, "CreateBlock", "block");
    if (newBlock) {
      // setGuestValue([...guestValueOriginCopy,]);
    } else {
      // 복구 처리
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
    const group = groupData[newGroupOrder];
    const newGroupId = group.roomId;
    const result = await allocateMu({
      variables: {
        guestId: itemId,
        allocateInfo: {
          bedIndex: group.bedIndex,
          roomId: newGroupId
        }
      }
    });
    // 실패시 복구
    if (!muResult(result, "AllocateGuestToRoom")) {
      if (guestValueOriginCopy) {
        setGuestValue([...guestValueOriginCopy]);
      } else {
        location.reload();
      }
    }
  };

  // 방막기
  const addBlock: TAddBlock = async (start, end, groupIds) => {
    console.info("addBlock");
    if (JDisNetworkRequestInFlight(networkStatus)) return;
    allTooltipsHide();
    const guestValueOriginCopy = $.extend(true, [], guestValue);

    const tempNewBlocks: IAssigItem[] = [];

    // 새로운 방막기들을 생성함
    groupIds.forEach(groupId => {
      const targetGroup = groupData.find(group => group.id === groupId);
      if (!targetGroup) throw Error("그룹 아이디가 그룹데이터안에 없습니다.");
      const tempId = s4();
      const tempItem = {
        ...DEFAULT_ASSIG_ITEM,
        bookingId: s4(),
        roomId: targetGroup.roomId,
        bedIndex: targetGroup.bedIndex,
        itemIndex: guestValueOriginCopy.length,
        type: GuestTypeAdd.GHOST,
        id: tempId,
        start,
        end,
        group: groupId,
        canMove: false,
        loading: true
      };
      tempNewBlocks.push(tempItem);
    });

    const withOutMarks = guestValue.filter(
      item => item.type != GuestTypeAdd.MARK
    );

    const withTempBlocks = [...withOutMarks, ...tempNewBlocks];

    setGuestValue([...withTempBlocks]);

    let i = 0;

    for (let groupId of groupIds) {
      const targetGroup = getGroupById(groupId);
      const result = await createBlockMu({
        variables: {
          checkIn: start,
          checkOut: end,
          houseId: houseId,
          roomId: targetGroup.roomId,
          bedIndex: targetGroup.bedIndex
        }
      });

      const block = muResult(result, "CreateBlock", "block");

      if (!block) {
        setGuestValue(guestValueOriginCopy);
      } else {
      }
      i++;
    }
    refetch();
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

  // 마크와함께 부킹시작
  const startBookingModalWithMark: TBookingModalOpenWithMark = startBookingCallBack => {
    const createItems = getItems(GuestTypeAdd.MARK);

    // 아이템들의 그룹들
    const createItemTempGroups = createItems.map(item =>
      getGroupById(item.group)
    );
    // 아이템들의 룸타입들
    const roomTypes = groupToRoomType(createItemTempGroups);

    // 모달로 보낼 게스트들집합
    const createTempGuests = itemsToGuets(createItems, groupData);

    // 모달안에 넣어줄 새로만들 부킹정보
    const createParam: GB_booking = {
      __typename: "Booking",
      ...DEFAULT_BOOKING,
      _id: s4(),
      checkIn: createItems[0].start,
      checkOut: createItems[0].end,
      agreePrivacyPolicy: true,
      guests: createTempGuests,
      roomTypes
    };

    const modalParam: IBookingModalProp = {
      createParam,
      startBookingCallBack,
      mode: "CREATE_ASSIG"
    };

    bookingModal.openModal(modalParam);
  };

  // create블러들을 ghost로 변환
  const changeMarkToGhost: TChangeMarkToGhost = () => {
    const createBlock = guestValue.filter(
      guest => guest.type === GuestTypeAdd.MARK
    );
    createBlock.forEach(createBlock => {
      createBlock.loading = true;
      createBlock.type = GuestTypeAdd.GHOST;
    });
    setGuestValue([...guestValue]);
  };

  const createCreateItem: ICreateCreateItem = (
    canvasInfo: ICanvasMenuTooltipProps,
    gender?: Gender
  ) => {
    allTooltipsHide();
    const { end, start, groupIds } = canvasInfo;

    // 시간이 같고 타입이 Create인 것들을 하나의 부킹으로 묶음
    let linkedItems = guestValue.filter(
      item =>
        item.type === GuestTypeAdd.MARK &&
        item.start <= start &&
        item.end >= end
    );

    // 생성된 Create들의 시간을 하나로 통일하기 위한 함수
    const getTime = (flag: "start" | "end") => {
      if (!linkedItems[0]) return canvasInfo[flag];
      if (linkedItems[0].start <= start && linkedItems[0].end >= end)
        return linkedItems[0][flag];
      return canvasInfo[flag];
    };

    const tempItems: IAssigItem[] = [];

    // 그룹아이디를 토데로 새로운 아이템 목록 생성
    // groupIds.forEach(groupId => {
    //   const group = getGroupById(groupId);
    //   const newItem = {
    //     ...DEFAULT_ASSIG_ITEM,
    //     roomTypeId: group.roomTypeId,
    //     room: group.roomId,
    //     bookingId: "create",
    //     id: `create${groupId}${start}${s4()}`,
    //     gender:
    //       gender || roomGenderToGedner(group.roomGender, group.pricingType),
    //     type: GuestTypeAdd.MAKE,
    //     start: getTime("start"),
    //     end: getTime("end"),
    //     group: groupId
    //   };
    //   tempItems.push(newItem);
    // });

    linkedItems = [...linkedItems, ...tempItems];

    $("#canvasMenu").removeClass("canvasMenu--show");

    setGuestValue([
      ...guestValue.filter(item => item.type !== GuestTypeAdd.MARK),
      ...linkedItems
    ]);

    // setCreateMenuProps({item: newItem});
  };

  // canvas 용 메뉴오픈
  const openCanvasMenuTooltip: TOpenCanvasMenuTooltip = location => {
    $("#canvasMenu")
      .css("left", location.clientX + 10)
      .css("top", location.clientY + 5)
      .addClass("assig__tooltips--show");
  };

  const hilightHeader: THilightHeader = (date?: Date | null) => {
    // if (!date) return;
    // const time =
    // moment(date)
    // .local()
    // .valueOf() -
    // TimePerMs.H * 3;
    // const target = $(`.timelineHeaderCell__inner[data-start="${time}"]`);
    // targetBlink(target.parent());
  };

  const getItems = (type: GuestTypeAdd) =>
    guestValue.filter(guest => guest.type === GuestTypeAdd[type]);

  const getInfoesFromMarks: TGetInfoesFromMarks = () => {
    const marks = getItems(GuestTypeAdd.MARK);
    if (isEmpty(marks))
      return {
        start: 0,
        end: 0,
        groupIds: []
      };
    const groupIds = marks.map(mark => mark.group);
    const { start, end } = marks[0];
    return {
      start,
      end,
      groupIds
    };
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

      // 에러가 아니면 반영
      if (muResult(result, "DeleteBlock")) {
        setGuestValue([...guestValue.filter(guest => guest.id !== id)]);
      }
    } else {
      setGuestValue([...guestValue.filter(guest => guest.id !== id)]);
    }
  };

  // create 툴팁 오픈
  // const openCreateMenu: TOpenCreateMenu = (e, createMenuProp) => {
  // if (createMenuProp) setCreateMenuProps(createMenuProp);
  // $("#createMenu")
  // .css("left", e.clientX)
  // .css("top", e.clientY)
  // .addClass("assig__tooltips--show");
  // };

  // 배정달력에서 게스트들 정보를, GetBooking_Guest로 변환합니다.
  // 아래작업은 createBooking을 하기위한 초석입니다.
  const itemsToGuets = (
    items: IAssigItem[],
    groupDatas: IAssigGroup[]
  ): getBooking_GetBooking_booking_guests[] =>
    // @ts-ignore
    items.map(item => {
      const itemGroup = groupDatas.find(group => group.id === item.group);
      if (!itemGroup) throw Error("itemsToGuests ERR 존재하지 않는 그룹 ID");

      return {
        roomTypeName: "Booking",
        _id: item.id,
        room: itemGroup.room,
        bedIndex: item.bedIndex,
        gender:
          itemGroup.pricingType === PricingType.DOMITORY
            ? item.gender
            : undefined,
        pricingType: itemGroup.pricingType,
        checkIn: item.start,
        checkOut: item.end,
        roomType: {
          __typename: "RoomType",
          _id: item.roomTypeId,
          name: itemGroup.roomType.name
        }
      };
    });

  // 게스트들 정보를, GetBooking_Guest로 변환합니다.
  // 아래작업은 createBooking을 하기위한 초석입니다.
  const groupToRoomType = (
    createItemTempGroups: IAssigGroup[]
  ): getBooking_GetBooking_booking_roomTypes[] => {
    const uniquRoomTypes = _.uniqBy(
      createItemTempGroups,
      group => group.roomTypeId
    );

    return uniquRoomTypes.map(
      (group): getBooking_GetBooking_booking_roomTypes => ({
        ...DEFAULT_ROOMTYPE,
        ...group.roomType
      })
    );
  };

  // 👼 컴포넌트들 내부에 prop를 전달하기 힘드니까 이렇게 전달하자.
  const assigUtils: IAssigTimelineUtils = {
    changeMarkToGhost,
    getItemById,
    getGroupById,
    removeMark,
    getInfoesFromMarks,
    isTherePerson,
    filterTimeZone,
    itemsToGuets,
    groupToRoomType,
    allTooltipsHide,
    deleteItemById,
    // openCreateMenu,
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
    createMark,
    getAssigInfoFromItems,
    deleteBookingById,
    getGuestsInGroup,
    popUpItemMenuTooltip,
    getBookingIdByGuestId,
    startBookingModalWithMark,
    hilightGuestBlock,
    hilightHeader,
    deleteGhost,
    createCreateItem,
    getItems
  };

  return assigUtils;
}
