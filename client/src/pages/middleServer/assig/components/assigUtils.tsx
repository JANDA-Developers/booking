import {
  TRemoveMark,
  TFindItemById,
  TFindGroupById,
  TIsTherePerson,
  TFilterTimeZone,
  TAllTooltipsHide,
  ICrushTime,
  TGetCrushTimeByTwoGuest,
  TIsGenderSafe,
  TDeleteGuestById,
  TOneGuestValidation,
  IAssigItemCrush,
  TAddBlock,
  TGenderToggleById,
  TResizeValidater,
  TResizeLinkedItems,
  TMoveLinkedItems,
  TDeleteItemById,
  GuestTypeAdd,
  IAssigTimelineUtils,
  IAssigMutationes,
  IAssigTimelineContext,
  IAssigTimelineHooks,
  IAssigItem,
  TToogleCheckIn,
  TOpenCanvasMenu,
  TOpenBlockMenu,
  TOpenMakeMenu
} from "./assigIntrerface";
import {isEmpty, onCompletedMessage} from "../../../../utils/utils";
import {ReactTooltip} from "../../../../atoms/tooltipList/TooltipList";
import {RoomGender, TimePerMs, Gender} from "../../../../types/enum";
import moment from "moment";
import {DEFAULT_ASSIG_ITEM} from "../../../../types/defaults";
import $ from "jquery";

export function getAssigUtils(
  {
    setGuestValue,
    guestValue,
    confirmDelteGuestHook,
    setBlockMenuProps,
    setCanvasMenuProps,
    setMakeMenuProps
  }: IAssigTimelineHooks,
  {
    deleteGuestsMu,
    createBlockMu,
    deleteBlockMu,
    updateBookerMu
  }: IAssigMutationes,
  {houseId, groupData}: IAssigTimelineContext
): IAssigTimelineUtils {
  // 마크제거 MARK REMOVE 마커 제거
  const removeMark: TRemoveMark = () => {
    setGuestValue([
      ...guestValue.filter(item => item.type !== GuestTypeAdd.MARK)
    ]);
  };

  const findItemById: TFindItemById = guestId => {
    const targetGuest = guestValue.find(guest => guest.id === guestId);
    if (!targetGuest)
      throw new Error("해당하는 게스트를 찾을수 없습니다. <<findItemById>>");
    return targetGuest;
  };

  const findGroupById: TFindGroupById = groupId => {
    const targetGroup = groupData.find(group => group.id === groupId);
    if (!targetGroup)
      throw new Error("해당하는 그룹을 찾을수 없습니다. <<findGroupById>>");
    return targetGroup;
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
  const toogleCheckInOut: TToogleCheckIn = async (
    guestId?: string,
    guestIndex?: number
  ) => {
    let target: IAssigItem = DEFAULT_ASSIG_ITEM;
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
      const message = !guestValue[target.guestIndex].isCheckin
        ? "체크아웃"
        : "체크인";
      onCompletedMessage(result.data.UpdateBooker, message, "실패");
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

  // 모든 툴팁을 팝업에서 제거
  const allTooltipsHide: TAllTooltipsHide = () => {
    ReactTooltip.hide();
    $("#blockMenu").removeClass("blockMenu--show");
    $("#canvasMenu").removeClass("canvasMenu--show");
    $("#makeMenu").removeClass("makeMenu--show");
    $("#itemTooltip").removeClass("itemTooltip--show");
  };

  // 유틸 두게스트의 충돌시간 구해줌 없다면 false를 반환함
  const getCrushTimeByTwoGuest: TGetCrushTimeByTwoGuest = (guest, guest2) => {
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

  // 해당 게스트를 찾아서 제거함
  const deleteGuestById: TDeleteGuestById = guestId => {
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
        "해당 게스트를 삭제하시겠습니까? \n (해당 예약자가 예약한 다른 인원들은 지워지지 않습니다.)"
    });
  };

  // 게스트가 그 시간대에 그 그룹에 괺찮은지 검사함
  // 검사한 결과를 Validation에 기입.
  const oneGuestValidation: TOneGuestValidation = (
    guest,
    start,
    end,
    groupId
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

    const targetGroup = findGroupById(groupId);
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
  const addBlock: TAddBlock = async (time, groupId) => {
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
        ...DEFAULT_ASSIG_ITEM,
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
  const genderToggleById: TGenderToggleById = guestId => {
    const targetGuest = findItemById(guestId);
    if (targetGuest)
      targetGuest.gender =
        targetGuest.gender === Gender.FEMALE ? Gender.MALE : Gender.FEMALE;
    setGuestValue([...guestValue]);
  };

  // 유틸 리사이즈 되었을때 벨리데이션 해줍니다.
  const resizeValidater: TResizeValidater = (item, time) => {
    const linkedGuests = guestValue.filter(
      guest => guest.bookerId === item.bookerId
    );

    linkedGuests.forEach(guest => {
      if (guest.bookerId === item.bookerId)
        oneGuestValidation(guest, guest.start, time, guest.group);
    });
  };

  // 같은 예약자가 예약한 게스트들을 한번에 변경
  const resizeLinkedItems: TResizeLinkedItems = (bookerId, newTime) => {
    // TODO 여기서 State를통하여 조작할수 있도록하자
    guestValue.forEach(guest => {
      const inGuest = guest;
      if (guest.bookerId === bookerId) inGuest.end = newTime;
    });
    setGuestValue([...guestValue]);
  };

  // 같은 예약자가 예약한 게스트들을 한번에 이동
  const moveLinkedItems: TMoveLinkedItems = (bookerId, newTime) => {
    guestValue.forEach(guest => {
      const inGuest = guest;
      if (guest.bookerId === bookerId) {
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
      .addClass("blockMenu--show");
  };

  // canvas 용 메뉴오픈
  const openCanvasMenu: TOpenCanvasMenu = (location, canvasMenuProps) => {
    if (canvasMenuProps) {
      setCanvasMenuProps(canvasMenuProps);
    }
    $("#canvasMenu")
      .css("left", location.clientX)
      .css("top", location.clientY)
      .addClass("canvasMenu--show");
  };

  // 유틸 아이템을 화면에서 삭제
  const deleteItemById: TDeleteItemById = async id => {
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

  // make 툴팁 오픈
  const openMakeMenu: TOpenMakeMenu = (e, makeMenuProp) => {
    if (makeMenuProp) setMakeMenuProps(makeMenuProp);
    $("#makeMenu")
      .css("left", e.clientX)
      .css("top", e.clientY)
      .addClass("makeMenu--show");
  };

  // 👼 컴포넌트들 내부에 prop를 전달하기 힘드니까 이렇게 전달하자.
  const assigUtils = {
    findItemById,
    findGroupById,
    removeMark,
    isTherePerson,
    filterTimeZone,
    allTooltipsHide,
    getCrushTimeByTwoGuest,
    deleteGuestById,
    deleteItemById,
    openMakeMenu,
    isGenderSafe,
    oneGuestValidation,
    addBlock,
    genderToggleById,
    resizeValidater,
    resizeLinkedItems,
    moveLinkedItems,
    toogleCheckInOut,
    openBlockMenu,
    openCanvasMenu
  };

  return assigUtils;
}
