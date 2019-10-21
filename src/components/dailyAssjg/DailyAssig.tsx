import React from "react";
import "./DailyAssig.scss";
import {
  getAllRoomTypeWithGuest_GetBlocks_blocks as IB,
  getAllRoomTypeWithGuest_GetGuests_guests as IG,
  getAllRoomTypeWithGuest_GetAllRoomType_roomTypes_rooms as IR
} from "../../types/api";
import {useModal, IUseModal, LANG} from "../../hooks/hook";
import JDdayPicker from "../../atoms/dayPicker/DayPicker";
import BookingModalWrap from "../bookingModal/BookingModalWrap";
import ArrowDayByDay from "../../atoms/dayPicker/component/inputComponent/ArrowDayByDay";
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
import {PricingType, FLOATING_PRElOADER_SIZE} from "../../types/enum";
import Tooltip from "../../atoms/tooltip/Tooltip";
import {isMobile} from "is-mobile";
import {IDailyAssigDataControl} from "../../pages/middleServer/assig/components/assigIntrerface";
import PlaceTooltip from "./components/PlaceTooltip";
import moment from "moment";
import BlockTooltip from "./components/BlockTooltip";
import {isEmpty, instanceOfA} from "../../utils/utils";
import ReadyItemTooltip from "../../pages/middleServer/assig/components/tooltips/ReadyItemTooltip";

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

const DailyAssig: React.FC<IProps> = ({
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
    networkStatus,
    calendarPosition
  } = outDailyAssigContext;
  const bookingModalHook = useModal(false);
  const confirmModalHook = useModal(false);
  const {createBlockMu, totalMuLoading, deleteBlockMu} = dailyAssigDataControl;

  const handleDrop = (
    item: IG & DragObjectWithType,
    room: IR,
    place: number
  ) => {
    allocateMu({
      variables: {
        guestId: item._id,
        allocateInfo: {
          bedIndex: place,
          roomId: room._id
        }
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

  const blockTooltipDeleteCallBack = (targetBlock: IB) => {
    ReactTooltip.hide();
    deleteBlockMu({
      variables: {
        blockId: targetBlock._id
      }
    });
  };

  const DailyAssigDayPicker = () => (
    <div className="dailyAssig__dayPicker">
      <JDdayPicker
        isRange={false}
        input
        canSelectBeforeDay={false}
        label={LANG("calender_date")}
        {...dayPickerHook}
        className="JDwaves-effect JDoverflow-visible"
        inputComponent={(prop: any) => (
          <ArrowDayByDay
            {...prop}
            format={`MM${LANG("month")} DD일`}
            dayPickerHook={dayPickerHook}
          />
        )}
      />
    </div>
  );

  const DailyAssigCalendar = () => (
    <span className="dailyAssig__dayPicker--leftTop">
      <DailyAssigDayPicker />
    </span>
  );

  return (
    <div className="dailyAssigWrap">
      <div className="dailyAssig__dayPicker--center">
        {calendarPosition === "center" && <DailyAssigDayPicker />}
      </div>
      <Preloader
        noAnimation
        floating
        size={FLOATING_PRElOADER_SIZE}
        loading={(loading && networkStatus > 1) || totalMuLoading}
      />
      <Preloader noAnimation size="medium" loading={networkStatus === 1} />
      <DndProvider backend={isMobile() ? TouchBackend : HTML5Backend}>
        <div className="dailyAssig">
          {roomTypesData.map((roomType, index) =>
            !isEmpty(roomType.rooms) ? (
              <div key={`roomType${roomType._id}`} className="dailyAssig__row">
                <div className="dailyAssig__roomTypeTittle">
                  {index === 0 &&
                    calendarPosition === "inside" &&
                    !isMobile() && <DailyAssigCalendar />}
                  <div className="dailyAssig__roomTypeName">
                    {roomType.name}
                  </div>
                </div>
                <div className="dailyAssig__roomsWrap">
                  {roomType.rooms.map(room => {
                    // 방안에있는 게스트들
                    const itemsInRoom = itemDatas.filter(
                      guest => guest.room && guest.room._id === room._id
                    );

                    // 방이 가득찼는지
                    const isFull =
                      roomType.pricingType === PricingType.DOMITORY
                        ? itemsInRoom.length === roomType.peopleCountMax
                        : itemsInRoom.length > 1;

                    // 아이템들이 들어갈 자리를 생성
                    const places = new Array(
                      roomType.pricingType === PricingType.DOMITORY
                        ? roomType.peopleCountMax
                        : 1
                    ).fill([null]);

                    // 아이템들을 자리에 채워줍니다. (이중배열)
                    const fillGuestInPlaces = (item: any, bedIndex: number) => {
                      let exisitPlace = places[bedIndex];
                      let tempPlace;
                      if (!exisitPlace) return;
                      tempPlace = [item, ...exisitPlace].filter(
                        item => item !== null
                      );
                      places[bedIndex] = tempPlace;
                    };

                    // fillGuests분기호출
                    itemsInRoom.forEach(item => {
                      // @ts-ignore
                      const bedIndex = item.bedIndex || 0;
                      fillGuestInPlaces(item, bedIndex);
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
            ) : (
              <span />
            )
          )}
        </div>
      </DndProvider>
      <PlaceTooltip
        blockRoomBtnCallBack={info => {
          const infoJson = JSON.parse(info);
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
      <BlockTooltip
        dailyAssigUtils={dailyAssigUtils}
        dailyAssigDataControl={dailyAssigDataControl}
        dailayAssigContext={dailayAssigContext}
        context={context}
        deleteBtnCallBack={blockTooltipDeleteCallBack}
      />
      <ReadyItemTooltip />
      <Tooltip id="guestCheckInOutToolTip" type="dark" effect="solid" />
      <JDtoastModal confirm {...confirmModalHook} />
      <BookingModalWrap context={context} modalHook={bookingModalHook} />
    </div>
  );
};

export default DailyAssig;
