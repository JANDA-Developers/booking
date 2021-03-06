import { IAssigItem, GuestTypeAdd } from "../components/assigIntrerface";
import { BookingStatus, Gender, PaymentStatus } from "../../../../types/enum";
import { instanceOfA } from "../../../../utils/utils";
import { IGuestD, IGuest } from "../../../../types/interface";
import moment from "moment";
import { DEFAULT_BLOCK_OP } from "../../../../types/defaults";

//  TODO: 메모를 사용해서 데이터를 아끼자
// 게스트 데이터를 달력에서 쓸수있는 Item 데이터로 변경 절차
export const guestsDataManufacturer = (allGuestsData: IGuest[] = []) => {
  let guestsData: any[] = [];
  const alloCateItems: IAssigItem[] = [];
  if (!allGuestsData) return alloCateItems;

  try {
    guestsData = allGuestsData?.filter(
      guest => guest.booking.status !== BookingStatus.CANCELED
    ) || [];
  } catch {
  }

  guestsData.forEach((guestData, index) => {
    if (
      guestData &&
      guestData.booking &&
      guestData.roomType &&
      guestData.room
    ) {
      let gender: Gender | null = null;
      let bedIndex = 0;
      const { _id, roomType, booking, room } = guestData;
      const {
        _id: bookingId,
        checkInInfo,
        isNew,
        isConfirm,
        status,
        name,
        checkIn,
        checkOut,
        memo,
        payment,
        breakfast
      } = booking;

      const { status: paymentStatus } = payment;
      const isUnpaid = paymentStatus !== PaymentStatus.COMPLETED;

      if (instanceOfA<IGuestD>(guestData, "gender", true)) {
        gender = guestData.gender;
        bedIndex = guestData.bedIndex;
      }
      const pushItem: IAssigItem = {
        id: _id,
        itemIndex: index,
        name: name,
        breakfast: breakfast || false,
        loading: false,
        bookingId: bookingId,
        checkInInfo: checkInInfo.isIn,
        gender: gender,
        status: status,
        roomTypeId: roomType._id,
        showNewBadge: isNew && !isConfirm,
        roomId: room._id,
        temp: true,
        group: room._id + bedIndex,
        start: moment(checkIn).valueOf(),
        end: moment(checkOut).valueOf(),
        canSelect: true,
        canMove: status === BookingStatus.CANCELED ? false : undefined,
        type: GuestTypeAdd.GUEST,
        bedIndex: bedIndex,
        memo: memo || undefined,
        isUnpaid,
        blockOption: Object.assign(
          {},
          guestData.blockOption || DEFAULT_BLOCK_OP
        ),
        showEffect: false
      };
      alloCateItems.push(pushItem);
    }
  });

  return alloCateItems;
};
