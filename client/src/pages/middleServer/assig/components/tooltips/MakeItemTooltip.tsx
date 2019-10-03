import React from "react";
import Button from "../../../../../atoms/button/Button";
import {PricingType} from "../../../../../types/enum";
import {
  GuestTypeAdd,
  IAssigTimelineUtils,
  IAssigTimelineContext,
  IAssigTimelineHooks,
  IAssigItem,
  IAssigGroup
} from "../assigIntrerface";
import {
  DEFAULT_ASSIG_GROUP,
  DEFAULT_BOOKING,
  DEFAULT_ROOMTYPE
} from "../../../../../types/defaults";
import {isEmpty, s4} from "../../../../../utils/utils";
import {
  getBooking_GetBooking_booking_guests,
  getBooking_GetBooking_booking_roomTypes,
  startBooking_StartBooking,
  startBooking_StartBooking_bookingTransaction
} from "../../../../../types/api";
import _ from "lodash";
import {GB_booking} from "../../../../../types/interface";
import {IBookingModalProp} from "../../../../../components/bookingModal/BookingModalWrap";

interface IProps {
  assigHooks: IAssigTimelineHooks;
  assigUtils: IAssigTimelineUtils;
  assigContext: IAssigTimelineContext;
}

const MakeItemTooltip: React.FC<IProps> = ({
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

              // 배정달력에서 게스트들 정보를, GetBooking_Guest로 변환합니다.
              // 아래작업은 createBooking을 하기위한 초석입니다.
              const itemsToGuets = (
                items: IAssigItem[]
              ): getBooking_GetBooking_booking_guests[] =>
                items.map(
                  (item): getBooking_GetBooking_booking_guests => ({
                    __typename: item.gender ? "GuestRoom" : "GuestRoom",
                    _id: item.id,
                    pricingType: item.gender
                      ? PricingType.DOMITORY
                      : PricingType.ROOM,
                    checkIn: item.start,
                    checkOut: item.end,
                    roomType: {
                      __typename: "RoomType",
                      _id: item.roomTypeId
                    }
                  })
                );
              // 배정달력에서 게스트들 정보를, GetBooking_Guest로 변환합니다.
              // 아래작업은 createBooking을 하기위한 초석입니다.
              const groupToRoomType = (
                makeItemTempGroups: IAssigGroup[]
              ): getBooking_GetBooking_booking_roomTypes[] => {
                const uniquRoomTypes = _.uniqBy(
                  makeItemTempGroups,
                  group => group.roomTypeId
                );
                return uniquRoomTypes.map(
                  (group): getBooking_GetBooking_booking_roomTypes => ({
                    ...DEFAULT_ROOMTYPE,
                    ...group.roomType
                  })
                );
              };

              // 아이템들의 그룹들
              const makeItemTempGroups = makeItems.map(item =>
                getGroupById(item.group)
              );
              // 아이템들의 룸타입들
              const roomTypes = groupToRoomType(makeItemTempGroups);

              // 모달로 보낼 게스트들집합
              const makeTempGuests = itemsToGuets(makeItems);

              // 모달안에 넣어줄 새로만들 부킹정보
              const createParam: GB_booking = {
                __typename: "Booking",
                _id: s4(),
                ...DEFAULT_BOOKING,
                checkIn: makeItems[0].start,
                checkOut: makeItems[0].end,
                agreePrivacyPolicy: true,
                guests: makeTempGuests,
                roomTypes: roomTypes
              };

              // StartBooking후 배정할떄 필요한 정보
              // const assigInfo = getAssigInfoFromItems(makeItems);

              // TODO 호스트 배정작업 끝나면 작업
              // StartBooking컬백 함수에 쓰임 새로 생성된 것들에대해서 배정을 요청함
              const doAssig = (
                newGuests: startBooking_StartBooking_bookingTransaction[]
              ) => {
                // const alreadyAssigedInfo: any[] = [];
                // newGuests.forEach(guest => {
                //   assigInfo.forEach((info, index) => {
                //     if (
                //       info.gender === guest.gender &&
                //       !alreadyAssigedInfo.includes(index)
                //     ) {
                //       alreadyAssigedInfo.push(index);
                //       allocateGuest(guest._id, info.bedIndex);
                //     }
                //   });
                // });
              };

              // 모달에서 예약생성 하고나서 컬백함수
              const startBookingCallBack = async (
                result: startBooking_StartBooking | "error"
              ) => {
                await changeMakeBlock();

                const failDo = () => {};

                if (result === "error") {
                  failDo();
                  return;
                }

                // TODO 호스트 예약 작업이 완료되면 여기작업
                // @ts-ignore
                const newBooking = result.booking;

                if (!newBooking) {
                  failDo();
                  return;
                }

                if (!newBooking.guests) throw Error("startBookingCallBack");

                doAssig(newBooking.guests);
              };

              const modalParam: IBookingModalProp = {
                createParam,
                startBookingCallBack
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

export default MakeItemTooltip;
