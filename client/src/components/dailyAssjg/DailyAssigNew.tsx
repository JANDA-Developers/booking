import React from "react";
import "./DailyAssig.scss";
import {
  getAllRoomTypeWithGuest_GetGuests_guests as IG,
  getAllRoomTypeWithGuest_GetAllRoomType_roomTypes_rooms as IR
} from "../../types/api";
import {useModal, IUseModal} from "../../actions/hook";
import JDdayPicker from "../../atoms/dayPicker/DayPicker";
import BookingModalWrap from "../bookingModal/BookingModalWrap";
import ArrowDayByDay from "../../atoms/dayPicker/component/inputComponent/arrowDayByDay";
import Preloader from "../../atoms/preloader/Preloader";
import {IContext} from "../../pages/MiddleServerRouter";
import {DragBoxPlace} from "./components/DragBoxPlace";
import {DndProvider, DragObjectWithType} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import TouchBackend from "react-dnd-touch-backend";
import GuestTooltip from "./components/GuestTooltip";
import {IDailyAssigProp} from "./DailyAssigWrap";
import getDailyAssigUtils from "../../pages/middleServer/assig/components/dailyAssigUtils";
import {JDtoastModal} from "../../atoms/modal/Modal";
import {ReactTooltip} from "../../atoms/tooltipList/TooltipList";
import {PricingType} from "../../types/enum";
import Tooltip from "../../atoms/tooltip/Tooltip";
import {isMobile} from "is-mobile";
import {IDailyAssigDataControl} from "../../pages/middleServer/assig/components/assigIntrerface";
import PlaceTooltip from "./components/PlaceTooltip";
import moment from "moment";

export interface IDailyAssigContext extends IDailyAssigProp {
  confirmModalHook: IUseModal<any>;
  bookingModalHook: IUseModal<any>;
  handleDrop: (item: IG & DragObjectWithType, room: IR, place: number) => void;
}

interface IProps {
  context: IContext;
  dailyAssigDataControl: IDailyAssigDataControl;
  outDailyAssigContext: IDailyAssigProp;
}

const DailyAssigNew: React.FC<IProps> = ({
  context,
  outDailyAssigContext,
  dailyAssigDataControl
}) => {
  const {house} = context;
  const {
    allocateMu,
    loading,
    dayPickerHook,
    roomTypesData,
    itemDatas,
    calendarPosition
  } = outDailyAssigContext;
  const bookingModalHook = useModal(false);
  const confirmModalHook = useModal(false);
  const {createBlockMu} = dailyAssigDataControl;

  const handleDrop = (
    item: IG & DragObjectWithType,
    room: IR,
    place: number
  ) => {
    allocateMu({
      variables: {
        roomId: room._id,
        guestId: item._id,
        bedIndex: place
      }
    });
  };

  // 2차 Context
  const dailayAssigContext: IDailyAssigContext = Object.assign(
    outDailyAssigContext,
    {
      confirmModalHook,
      bookingModalHook,
      handleDrop
    }
  );

  const dailyAssigUtils = getDailyAssigUtils(
    dailyAssigDataControl,
    dailayAssigContext
  );

  const {toogleCheckInOut} = dailyAssigUtils;

  const guestTooltipInfoBtnCallBack = (targetGuest: IG) => {
    ReactTooltip.hide();
    bookingModalHook.openModal({
      bookingId: targetGuest.booking._id
    });
  };

  const guestTooltipCheckInCallBack = (targetGuest: IG) => {
    ReactTooltip.hide();
    toogleCheckInOut(targetGuest);
  };

  const guestTooltipDeleteCallBack = (targetGuest: IG) => {
    ReactTooltip.hide();
    bookingModalHook.openModal({
      bookingId: targetGuest.booking._id
    });
  };

  const DailyAssigDayPicker = () => (
    <JDdayPicker
      isRange={false}
      input
      canSelectBeforeDay={false}
      label="달력날자"
      {...dayPickerHook}
      className="JDwaves-effect JDoverflow-visible"
      inputComponent={
        <ArrowDayByDay format={"MM월 DD일"} dayPickerHook={dayPickerHook} />
      }
    />
  );

  return (
    <div className="dailyAssigWrap">
      <div className="dailyAssig__dayPicker--center">
        {calendarPosition === "center" && <DailyAssigDayPicker />}
      </div>
      <Preloader noAnimation size="medium" loading={loading || false} />
      <DndProvider backend={isMobile() ? TouchBackend : HTML5Backend}>
        <div className="dailyAssig">
          {roomTypesData.map((roomType, index) => (
            <div key={`roomType${roomType._id}`} className="dailyAssig__row">
              <div className="dailyAssig__roomTypeTittle">
                {index === 0 && calendarPosition === "inside" && !isMobile() && (
                  <span className="dailyAssig__dayPicker--inside">
                    <DailyAssigDayPicker />
                  </span>
                )}
                {roomType.name}
              </div>
              <div className="dailyAssig__roomsWrap">
                {roomType.rooms.map(room => {
                  // 방안에있는 게스트들
                  const itemsInRoom = itemDatas.filter(
                    guest =>
                      guest.allocatedRoom &&
                      guest.allocatedRoom._id === room._id
                  );

                  // 방이 가득찼는지
                  const isFull =
                    roomType.pricingType === PricingType.DOMITORY
                      ? itemsInRoom.length === roomType.peopleCountMax
                      : itemsInRoom.length > 1;

                  // 아이템들이 들어갈 자리
                  const places = new Array(roomType.peopleCountMax).fill([
                    null
                  ]);

                  // 아이템들을 배열자리에 채워줌
                  itemsInRoom.forEach(item => {
                    let place = places[item.bedIndex];
                    if (!place) return;
                    if (place === [null]) {
                      place = [item];
                    } else {
                      place = [item, ...place].filter(item => item !== null);
                    }
                    places[item.bedIndex] = place;
                  });

                  return (
                    <div key={`room${room._id}`} className="dailyAssig__room">
                      <div className="dailyAssig__roomTitle">{room.name}</div>
                      {places.map((place, index) => (
                        <DragBoxPlace
                          isFull={isFull}
                          key={room._id + index}
                          itemsInPlace={place}
                          onDrop={handleDrop}
                          roomType={roomType}
                          room={room}
                          place={index}
                        />
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </DndProvider>
      <PlaceTooltip
        blockRoomBtnCallBack={info => {
          const infoJson = JSON.parse(info);
          console.log("infoJson 💃");
          console.log(infoJson);
          createBlockMu({
            variables: {
              bedIndex: infoJson.place,
              checkIn: dayPickerHook.from,
              checkOut: moment(dayPickerHook.to!)
                .add(1, "day")
                .toDate(),
              houseId: house._id,
              roomId: infoJson.roomId
            }
          });
        }}
      />
      <GuestTooltip
        dailyAssigUtils={dailyAssigUtils}
        dailyAssigDataControl={dailyAssigDataControl}
        dailayAssigContext={dailayAssigContext}
        context={context}
        checkInBtnCallBack={guestTooltipCheckInCallBack}
        deleteBtnCallBack={guestTooltipDeleteCallBack}
        infoBtnCallBack={guestTooltipInfoBtnCallBack}
      />
      <Tooltip id="guestCheckInOutToolTip" type="dark" effect="solid" />
      <JDtoastModal confirm {...confirmModalHook} />
      <BookingModalWrap context={context} modalHook={bookingModalHook} />
    </div>
  );
};

export default DailyAssigNew;
