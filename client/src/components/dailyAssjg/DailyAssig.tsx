import React, {Fragment} from "react";
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
import moment from "moment";
import BookingModalWrap from "../bookingModal/BookingModalWrap";
import HouseCard from "../../pages/middleServer/super/components/houseCard";
import {IHouse} from "../../types/interface";
import {GuestType} from "../../types/enum";

interface IProps {
  house: IHouse;
  date?: boolean;
  dayPickerHook: IUseDayPicker;
  guestsData: getAllRoomTypeWithGuest_GetGuests_guests[];
  roomTypesData: getAllRoomTypeWithGuest_GetAllRoomType_roomTypes[];
  blocksData: getAllRoomTypeWithGuest_GetBlocks_blocks[];
}

const DailyAssig: React.SFC<IProps> = ({
  date,
  house,
  dayPickerHook,
  guestsData,
  blocksData,
  roomTypesData
}) => {
  const bookingModalHook = useModal(false);

  const handleDayPickerArrow = (direction: "prev" | "next") => {
    const directionNum = direction === "prev" ? -1 : 1;
    dayPickerHook.setDate(
      moment(dayPickerHook.from || undefined)
        .add(directionNum, "days")
        .toDate()
    );
  };

  const blockRender = (
    item:
      | getAllRoomTypeWithGuest_GetGuests_guests
      | getAllRoomTypeWithGuest_GetBlocks_blocks
  ) => {
    switch (item.guestType) {
      case GuestType.GUEST:
        return (
          <div className="dailyAssig__guest dailyAssig__itemBlock">
            {
              // @ts-ignore
              item.name
            }
            <JDIcon
              className="dailyAssig__guestConfigIcon"
              onClick={() => {

                if ((item.guestType === GuestType.BLOCK)) return;
                bookingModalHook.openModal({
                  // @ts-ignore
                  bookingId: item.booking._id
                });
              }}
              icon="config"
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
          inputComponent={
            <Fragment>
              <JDIcon
                hover
                className="DayPicker-box--inputComponent__arrow DayPicker-box--inputComponent__arrow--left"
                onClick={e => {
                  e.preventDefault();
                  handleDayPickerArrow("prev");
                }}
                icon="arrowLeft"
              />
              <span>
                {moment(dayPickerHook.from || new Date()).format("YYYY-MM-DD")}
              </span>
              <JDIcon
                hover
                className="DayPicker-box--inputComponent__arrow DayPicker-box--inputComponent__arrow--right"
                onClick={e => {
                  e.stopPropagation();
                  handleDayPickerArrow("next");
                }}
                icon="arrowRight"
              />
            </Fragment>
          }
        />
      </div>
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
      <BookingModalWrap houseId={house._id} modalHook={bookingModalHook} />
    </div>
  );
};

export default DailyAssig;
