import React from "react";
import TooltipList from "../../../../atoms/tooltipList/TooltipList";
import Button from "../../../../atoms/button/Button";
import {IUseModal} from "../../../../actions/hook";
import {Gender, BookingModalType, PricingType} from "../../../../types/enum";
import {
  GuestTypeAdd,
  IAssigTimelineUtils,
  IAssigTimelineContext,
  IAssigTimelineHooks,
  ICreateBookingInfo
} from "./assigIntrerface";
import {DEFAULT_ASSIG_GROUP} from "../../../../types/defaults";
import {isEmpty, s4, muResult} from "../../../../utils/utils";
import {FetchResult} from "apollo-link";
import {
  createBooking,
  createBooking_CreateBooking_booking,
  createBooking_CreateBooking_booking_guests,
  createBooking_CreateBooking
} from "../../../../types/api";
import {IBookingModalProp} from "../../../../components/bookingModal/BookingModalWrap";

interface IProps {
  assigHooks: IAssigTimelineHooks;
  assigUtils: IAssigTimelineUtils;
  assigContext: IAssigTimelineContext;
}

const MakeItemMenu: React.FC<IProps> = ({
  assigUtils: {
    genderToggleById,
    getGroupById,
    deleteItemById,
    allocateGuest,
    getAssigInfoFromItems,
    changeMakeBlock
  },
  assigHooks: {guestValue, bookingModal, makeMenuProps},
  assigContext: {groupData, isMobile}
}) => {
  const target = makeMenuProps.item;
  let targetGroup = DEFAULT_ASSIG_GROUP;
  if (!isEmpty(target.group)) {
    targetGroup = getGroupById(target.group);
  }

  return (
    <div className="assig__tooltips makeMenu tooltipList" id="makeMenu">
      <ul>
        <li>
          <Button
            label="생성"
            onClick={e => {
              e.stopPropagation();

              const makeItems = guestValue.filter(
                guest => guest.type === GuestTypeAdd.MAKE
              );

              // 예약에 필요한
              const resvInfoes = makeItems.map(item => {
                const targetGroup = groupData.find(
                  group => group.id === item.group
                );

                if (!targetGroup)
                  throw new Error("makeItemMenu__resvInfoes__noneGroupError");

                return {
                  group: targetGroup,
                  roomTypeName: targetGroup.roomType.name,
                  roomTypeId: targetGroup.roomTypeId,
                  gender: item.gender
                };
              });

              const assigInfo = getAssigInfoFromItems(makeItems);

              const doAssig = (
                newGuests: createBooking_CreateBooking_booking_guests[]
              ) => {
                const alreadyAssigedInfo: any[] = [];

                newGuests.forEach(guest => {
                  assigInfo.forEach((info, index) => {
                    if (
                      info.gender === guest.gender &&
                      !alreadyAssigedInfo.includes(index)
                    ) {
                      alreadyAssigedInfo.push(index);
                      allocateGuest(guest._id, info.bedIndex);
                    }
                  });
                });
              };

              const createBookingCallBack = async (
                result: createBooking_CreateBooking | "error"
              ) => {
                await changeMakeBlock();

                const failDo = () => {};

                if (result === "error") {
                  failDo();
                  return;
                }

                const newBooking = result.booking;

                if (!newBooking) {
                  failDo();
                  return;
                }

                if (!newBooking.guests) throw Error("createBookingCallBack");

                doAssig(newBooking.guests);
              };

              const modalParam: ICreateBookingInfo & IBookingModalProp = {
                bookingId: s4(),
                createMode: true,
                createBookingCallBack,
                type: BookingModalType.CREATE_WITH_ASSIG,
                checkIn: makeItems[0].start,
                checkOut: makeItems[0].end,
                resvInfoes,
                assigInfo
              };

              bookingModal.openModal(modalParam);
            }}
          />
        </li>
        {targetGroup.pricingType === PricingType.DOMITORY && (
          <li>
            <Button
              onClick={() => genderToggleById(target.id)}
              label="성별 반전"
            />
          </li>
        )}
        <li>
          <Button label="삭제" onClick={() => deleteItemById(target.id)} />
        </li>
      </ul>
    </div>
  );
};

export default MakeItemMenu;
