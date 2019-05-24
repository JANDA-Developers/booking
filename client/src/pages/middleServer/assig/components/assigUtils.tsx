import {IAssigItem} from "../AssigTimelineWrap";
import {TToogleCheckIn} from "../AssigTimeline";
import {onCompletedMessage} from "../../../../utils/utils";
import {MutationFn} from "react-apollo";
import {updateBooker, updateBookerVariables} from "../../../../types/api";

// 같은 예약자가 예약한 게스트들을 한번에 이동
export const moveLinkedItems = (
  bookerId: string,
  newTime: number,
  guestValue: IAssigItem[],
  setGuestValue: React.Dispatch<React.SetStateAction<IAssigItem[]>>
) => {
  guestValue.forEach(guest => {
    const inGuest = guest;
    if (guest.bookerId === bookerId) {
      inGuest.end += newTime - guest.start;
      inGuest.start = newTime;
    }
  });
  setGuestValue([...guestValue]);
};

// 게스트를 화면에서 삭제
export const clearItem = (
  id: string,
  guestValue: IAssigItem[],
  setGuestValue: React.Dispatch<React.SetStateAction<IAssigItem[]>>
) => {
  setGuestValue([...guestValue.filter(guest => guest.id !== id)]);
};

// 체크인 투글함수
export const toogleCheckInOut: TToogleCheckIn = async (
  guestId?: string,
  guestIndex?: number,
  guestValue: IAssigItem[],
  setGuestValue: React.Dispatch<React.SetStateAction<IAssigItem[]>>,
  updateBookerMu: MutationFn<updateBooker, updateBookerVariables>
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
        isCheckIn: !guestValue[target.guestIndex].isCheckin
      }
    }
  });
  // 아폴로 통신 성공
  if (result && result.data) {
    onCompletedMessage(result.data.UpdateBooker, "체크인", "실패");
    if (result.data.UpdateBooker.ok) {
      // 뮤테이션 성공시
      guestValue[target.guestIndex].isCheckin = !guestValue[target.guestIndex]
        .isCheckin;
      setGuestValue([...guestValue]);
    } else {
      // 뮤테이션 실패시
    }
  }
};
