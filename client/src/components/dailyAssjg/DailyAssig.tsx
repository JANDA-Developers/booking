import React from "react";
import "./DailyAssig.scss";
import {
  getAllRoomTypeWithGuest_GetGuests_guests,
  getAllRoomTypeWithGuest_GetAllRoomType_roomTypes,
  getAllRoomTypeWithGuest_GetBlocks_blocks
} from "../../types/api";
import JDIcon, {IconSize} from "../../atoms/icons/Icons";
import {useModal, IUseDayPicker} from "../../actions/hook";
import {isEmpty} from "../../utils/utils";
import JDdayPicker from "../../atoms/dayPicker/DayPicker";
import BookingModalWrap from "../bookingModal/BookingModalWrap";
import {GuestType} from "../../types/enum";
import ArrowDayByDay from "../../atoms/dayPicker/component/inputComponent/arrowDayByDay";
import Preloader from "../../atoms/preloader/Preloader";
import {IContext} from "../../pages/MiddleServerRouter";

interface IProps {
  context: IContext;
  date?: boolean;
  dayPickerHook: IUseDayPicker;
  guestsData: getAllRoomTypeWithGuest_GetGuests_guests[];
  roomTypesData: getAllRoomTypeWithGuest_GetAllRoomType_roomTypes[];
  blocksData: getAllRoomTypeWithGuest_GetBlocks_blocks[];
  loading?: boolean;
}

const DailyAssig: React.SFC<IProps> = ({
  date,
  context,
  dayPickerHook,
  guestsData,
  blocksData,
  roomTypesData,
  loading
}) => {
  const bookingModalHook = useModal(false);

  const blockRender = (
    item:
      | getAllRoomTypeWithGuest_GetGuests_guests
      | getAllRoomTypeWithGuest_GetBlocks_blocks
  ) => {
    switch (item.guestType) {
      case GuestType.GUEST:
        return (
          <div className="dailyAssig__guest dailyAssig__itemBlock">
            <span className="dailyAssig__itemName">
              {
                // @ts-ignore
                item.name
              }
            </span>
            <JDIcon
              className="dailyAssig__guestConfigIcon"
              onClick={() => {
                if (item.guestType === GuestType.BLOCK) return;
                bookingModalHook.openModal({
                  // @ts-ignore
                  bookingId: item.booking._id
                });
              }}
              icon="dotMenuVertical"
              size={IconSize.MEDEIUM_SMALL}
            />
          </div>
        );

      case GuestType.BLOCK:
        return (
          <div className="dailyAssig__block dailyAssig__itemBlock">
            {"자리막음"}
          </div>
        );
    }
  };

  const getGuestInRoom = (roomId: string) => {
    const items = [...guestsData, ...blocksData];
    const itemsInRoom = items.filter(item => {
      if (!item.allocatedRoom) return false;
      return item.allocatedRoom._id === roomId;
    });

    if (isEmpty(itemsInRoom))
      return (
        <div className="dailyAssig__itemBlockWrap">
          <div className="dailyAssig__itemBlock dailyAssig__empty dailyAssig__guestBlock">
            빈방
          </div>
        </div>
      );

    return itemsInRoom.map(item => (
      <div className="dailyAssig__itemBlockWrap" key={`guestBlock${item._id}`}>
        {blockRender(item)}
      </div>
    ));
  };

  return (
    <div className="dailyAssigWrap">
      <div className="dailyAssig__dayPicker">
        <JDdayPicker
          isRange={false}
          input
          canSelectBeforeDays={false}
          label="달력날자"
          {...dayPickerHook}
          className="JDwaves-effect JDoverflow-visible"
          inputComponent={<ArrowDayByDay dayPickerHook={dayPickerHook} />}
        />
      </div>
      <Preloader noAnimation size="medium" loading={loading || false} />
      <div className="dailyAssig">
        {roomTypesData.map(roomType => (
          <div key={`roomType${roomType._id}`} className="dailyAssig__row">
            <div className="dailyAssig__roomTypeTittle">{roomType.name}</div>
            <div className="dailyAssig__roomsWrap">
              {roomType.rooms.map(room => (
                <div key={`room${room._id}`} className="dailyAssig__room">
                  <div className="dailyAssig__roomTitle">{room.name}</div>
                  {getGuestInRoom(room._id)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <BookingModalWrap context={context} modalHook={bookingModalHook} />
    </div>
  );
};

export default DailyAssig;
