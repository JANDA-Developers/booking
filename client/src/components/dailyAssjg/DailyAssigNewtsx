import React from "react";
import "./DailyAssig.scss";
import {
  getAllRoomTypeWithGuest_GetGuests_guests,
  getAllRoomTypeWithGuest_GetAllRoomType_roomTypes,
  getAllRoomTypeWithGuest_GetBlocks_blocks,
  getAllRoomTypeWithGuest_GetAllRoomType_roomTypes_rooms
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
import {DragBoxRoom} from "./components/DragBoxRoom";
import {DndProvider} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

interface IProps {
  context: IContext;
  date?: boolean;
  dayPickerHook: IUseDayPicker;
  guestsData: getAllRoomTypeWithGuest_GetGuests_guests[];
  roomTypesData: getAllRoomTypeWithGuest_GetAllRoomType_roomTypes[];
  blocksData: getAllRoomTypeWithGuest_GetBlocks_blocks[];
  loading?: boolean;
}

const DailyAssigNew: React.SFC<IProps> = ({
  date,
  context,
  dayPickerHook,
  guestsData,
  blocksData,
  roomTypesData,
  loading
}) => {
  const bookingModalHook = useModal(false);

  const handleDrop = (
    room: getAllRoomTypeWithGuest_GetAllRoomType_roomTypes_rooms,
    item: any
  ) => {
    console.log("item");
    console.log(item);
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
            <DndProvider backend={HTML5Backend}>
              <div className="dailyAssig__roomsWrap">
                {roomType.rooms.map(room => {
                  const itemsInRoom = guestsData.filter(
                    guest =>
                      guest.allocatedRoom &&
                      guest.allocatedRoom._id === room._id
                  );
                  return (
                    <DragBoxRoom
                      key={room._id}
                      itemsInRoom={itemsInRoom}
                      onDrop={item => handleDrop(room, item)}
                      roomType={roomType}
                      room={room}
                    />
                  );
                })}
              </div>
            </DndProvider>
          </div>
        ))}
      </div>
      <BookingModalWrap context={context} modalHook={bookingModalHook} />
    </div>
  );
};

export default DailyAssigNew;
