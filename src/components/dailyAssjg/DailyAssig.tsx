import React, { useEffect } from "react";
import "./DailyAssig.scss";
import {
  getGuests_GetBlocks_blocks as IB,
  getGuests_GetGuests_guests as IG,
  getAllRoomType_GetAllRoomType_roomTypes_rooms as IR
} from "../../types/api";
import { useModal, IUseModal, LANG } from "../../hooks/hook";
import JDdayPicker from "../../atoms/dayPicker/DayPicker";
import BookingModalWrap from "../bookingModal/BookingModalWrap";
import ArrowDayByDay from "../../atoms/dayPicker/component/inputComponent/ArrowDayByDay";
import Preloader from "../../atoms/preloader/Preloader";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import { DragBoxPlace } from "./components/DragBoxPlace";
import { DndProvider, DragObjectWithType } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import TouchBackend from "react-dnd-touch-backend";
import GuestTooltip from "./components/GuestTooltip";
import { IDailyAssigProp, IChainProps } from "./DailyAssigWrap";
import getDailyAssigUtils from "../../pages/bookingHost/assig/helper/dailyAssigUtils";
import { JDtoastModal } from "../../atoms/modal/Modal";
import { ReactTooltip } from "../../atoms/tooltipList/TooltipList";
import { PricingType } from "../../types/enum";
import {
  FLOATING_PRELOADER_SIZE,
  MODAL_PRELOADER_SIZE
} from "../../types/const";
import Tooltip from "../../atoms/tooltip/Tooltip";
import { isMobile } from "is-mobile";
import { IDailyAssigDataControl } from "../../pages/bookingHost/assig/components/assigIntrerface";
import PlaceTooltip from "./components/PlaceTooltip";
import moment from "moment";
import BlockTooltip from "./components/BlockTooltip";
import { isEmpty, s4 } from "../../utils/utils";
import ReadyItemTooltip from "../../pages/bookingHost/assig/components/tooltips/ReadyItemTooltip";
import DayPickerModal from "../dayPickerModal/DayPickerModal";
import { PortalPreloader } from "../../utils/portalElement";
import { to4YMMDD } from "../../utils/setMidNight";

export interface IDailyAssigContext extends IDailyAssigProp {
  confirmModalHook: IUseModal<any>;
  bookingModalHook: IUseModal<any>;
  handleDrop: (item: IG & DragObjectWithType, room: IR, place: number) => void;
}

interface IProps extends IChainProps {
  context: IContext;
  dailyAssigDataControl: IDailyAssigDataControl;
  outDailyAssigContext: IDailyAssigProp;
}

const DailyAssig: React.FC<IProps> = ({
  context,
  outDailyAssigContext,
  dailyAssigDataControl,
  onRederCallBack
}) => {
  const { house } = context;
  const {
    loading,
    dayPickerHook,
    roomTypesData,
    itemDatas,
    networkStatus,
    calendarPosition,
    roomTypeLoading
  } = outDailyAssigContext;
  const bookingModalHook = useModal(false);
  const confirmModalHook = useModal(false);
  const dayPickerModalHook = useModal(false);
  const {
    allocateMu,
    createBlockMu,
    totalMuLoading,
    deleteBlockMu
  } = dailyAssigDataControl;

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

  const { toogleCheckInOut, deleteBookingById } = dailyAssigUtils;

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
    deleteBookingById(targetGuest.booking._id, true);
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
        mode="input"
        label={LANG("calender_date")}
        {...dayPickerHook}
        className="JDwaves-effect JDoverflow-visible"
        inputComponent={(prop: any) => (
          <ArrowDayByDay
            {...prop}
            onClick={() => {
              dayPickerModalHook.openModal();
            }}
            format={`MM/DD`}
            dayPickerHook={dayPickerHook}
          />
        )}
      />
      <DayPickerModal
        isRange={false}
        modalHook={dayPickerModalHook}
        {...dayPickerHook}
      />
    </div>
  );

  const DailyAssigCalendar = () => (
    <span className="dailyAssig__dayPicker--leftTop">
      <DailyAssigDayPicker />
    </span>
  );

  useEffect(() => {
    if (loading === false && !isEmpty(dailayAssigContext.formatedItemData)) {
      onRederCallBack && onRederCallBack();
    }
  }, [loading]);

  return (
    <div
      onClick={() => {
        console.log("eee");
      }}
      onClickCapture={() => {
        console.log("----");
      }}
      className={`dailyAssigWrap ${(networkStatus === 1 || roomTypeLoading) &&
        "dailyAssigWrap--loading"}`}
    >
      <div className="dailyAssig__dayPicker--center">
        {calendarPosition === "center" && <DailyAssigDayPicker />}
      </div>
      <PortalPreloader
        noAnimation
        floating
        size={FLOATING_PRELOADER_SIZE}
        loading={networkStatus < 7 || totalMuLoading}
      />
      <DndProvider backend={isMobile() ? TouchBackend : HTML5Backend}>
        <div
          style={{
            display: networkStatus === 1 ? "none" : undefined
          }}
          className="dailyAssig"
        >
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
              <span key={s4()} />
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
              checkIn: to4YMMDD(dayPickerHook.from),
              checkOut: to4YMMDD(
                moment(dayPickerHook.to!)
                  .add(1, "day")
                  .toDate()
              ),
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
