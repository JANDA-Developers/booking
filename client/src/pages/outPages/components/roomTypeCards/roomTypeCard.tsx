import classNames from "classnames";
import React, {Fragment, useState, useEffect} from "react";
import JDselect, {
  IselectedOption,
  SelectBoxSize
} from "../../../../atoms/forms/selectBox/SelectBox";
import {
  GuestPartInput,
  getAvailableGuestCount_GetMale_roomCapacity,
  getAvailableGuestCount_GetFemale_roomCapacity,
  BookerInput
} from "../../../../types/api";
import Button from "../../../../atoms/button/Button";
import {IRoomType} from "../../../../types/interface";
import Preloader from "../../../../atoms/preloader/Preloader";
import {isEmpty, autoComma} from "../../../../utils/utils";
import {
  useSelect,
  IUseModal,
  IUseSelect,
  useModal,
  IUseDayPicker
} from "../../../../actions/hook";
import {
  SELECT_COUNT_DUMMY_OP,
  WindowSize,
  Gender,
  PricingType,
  RoomGender
} from "../../../../types/enum";
import {IGuestCount} from "./roomTypeCardsWrap";
import JDmodal from "../../../../atoms/modal/Modal";
import {arraySum} from "../../../../utils/elses";
import moment from "moment";

interface IProps {
  className?: string;
  roomTypeData: IRoomType;
  resvRooms: GuestPartInput[];
  setResvRooms: React.Dispatch<React.SetStateAction<GuestPartInput[]>>;
  roomInfoHook: any;
  windowWidth: any;
  toastModalHook: IUseModal;
  setGuestCount: React.Dispatch<React.SetStateAction<IGuestCount>>;
  guestCountValue: IGuestCount;
  setBookingInfo: React.Dispatch<React.SetStateAction<BookerInput>>;
  bookingInfo: BookerInput;
  dayPickerHook: IUseDayPicker;
  truePrice: number;
  countLoading: boolean;
  availableCount: {
    maleCount: getAvailableGuestCount_GetMale_roomCapacity | null | undefined;
    femaleCount:
      | getAvailableGuestCount_GetFemale_roomCapacity
      | null
      | undefined;
  };
}

const RoomTypeCard: React.SFC<IProps> = ({
  className,
  roomTypeData,
  setResvRooms,
  resvRooms,
  roomInfoHook,
  windowWidth,
  toastModalHook,
  setGuestCount,
  guestCountValue,
  countLoading,
  dayPickerHook,
  truePrice,
  availableCount,
  bookingInfo,
  setBookingInfo
}) => {
  const roomImgModalHook = useModal(false);
  const [disabled, setDisabled] = useState({
    female: false,
    male: false,
    count: false
  });
  const classes = classNames("roomTypeCard", className, {});

  // 👿 타입스크립트가 말을안듣네
  //  방 선택수 셀렉트옵션을 리턴합니다.
  const countSelectOpFn = (
    key: "maleCount" | "femaleCount" | "roomCount"
  ): IselectedOption<number>[] => {
    // 남성 SelectOp 리턴

    const opFn = (count: number): IselectedOption<number>[] => {
      return Array(count + 1)
        .fill(0)
        .map((value, index) => ({
          label: `${index}`,
          value: index
        }));
    };

    if (key === "maleCount" && availableCount.maleCount) {
      return opFn(availableCount.maleCount.availablePeopleCount.countMale);
    }
    // 여성 SelectOp 리턴
    if (key === "femaleCount" && availableCount.femaleCount) {
      return opFn(availableCount.femaleCount.availablePeopleCount.countFemale);
    }
    // 방타입 SelectOp 리턴
    if (key === "roomCount" && availableCount.maleCount) {
      return opFn(availableCount.maleCount.availablePeopleCount.countAny);
    }
    return [];
  };

  const maleSeleteOption = countSelectOpFn("maleCount");
  const femaleSeleteOption = countSelectOpFn("femaleCount");
  const roomSeleteOption = countSelectOpFn("roomCount");

  // 이미 선택한 방인지 체크1
  const isSelectedRoom = ((): boolean => {
    const temp = resvRooms.filter(
      resvRoom => resvRoom.roomTypeId === roomTypeData._id
    );
    if (isEmpty(temp)) return false;
    return true;
  })();

  // const maxSelectCount = ((): IselectedOption[] => {})();
  const roomTypeIndex = resvRooms.findIndex(
    resvRoom => resvRoom.roomTypeId === roomTypeData._id
  );

  // 방 인원 선택시 선택가능 인원을 다시가져오게함
  const guestCountSelect = (selectedValue: number, flag: Gender | "room") => {
    setGuestCount({
      male: flag === Gender.MALE ? selectedValue : guestCountValue.male,
      female: flag === Gender.FEMALE ? selectedValue : guestCountValue.female,
      room: flag === "room" ? selectedValue : guestCountValue.room
    });
  };

  // 방배경사진
  const roomStyle = {
    // TODO :사진정보 여기에
    backgroundImage: `url(${roomTypeData.img})`
  };

  // 방선택하기 클릭시
  const handleRoomSelectClick = () => {
    const resvRoomsCopy = resvRooms.slice();

    const totalRoomTypeCount =
      guestCountValue.female + guestCountValue.male + guestCountValue.room;
    const dayDiff = moment(dayPickerHook.to!).diff(dayPickerHook.from!, "days");
    const totalRoomTypePrice = totalRoomTypeCount * truePrice * dayDiff;
    // 이미 선택된방 제거
    if (isSelectedRoom) {
      resvRoomsCopy.splice(roomTypeIndex, 1);
      setResvRooms(resvRoomsCopy);
      setDisabled({female: false, male: false, count: false});
      setBookingInfo({
        ...bookingInfo,
        price: bookingInfo.price - totalRoomTypePrice
      });
      return;
    }

    // 선택된인원이 없는경우에
    if (totalRoomTypeCount === 0) {
      toastModalHook.openModal("인원수를 선택해주세요.");
      return;
    }

    // 선택된방이 아닐경우에
    resvRoomsCopy.push({
      roomTypeId: roomTypeData._id,
      pricingType: roomTypeData.pricingType,
      discountedPrice: truePrice,
      countFemaleGuest: guestCountValue.female,
      countMaleGuest: guestCountValue.male,
      countRoom: guestCountValue.room
    });

    setResvRooms(resvRoomsCopy);
    setDisabled({female: true, male: true, count: true});
    setBookingInfo({
      ...bookingInfo,
      price: bookingInfo.price + totalRoomTypePrice
    });

    roomInfoHook[1]([...roomInfoHook[0], roomTypeData]);
  };


  console.log('countLoading');
  console.log(countLoading);

  return (
    <Fragment>
      <div className={`flex-grid-grow flex-grid-grow--margin0 ${classes}`}>
        <div className="flex-grid__col col--grow-2 roomTypeCard__imgSection">
          <div
            onClick={roomImgModalHook.openModal}
            style={roomStyle}
            className="roomTypeCard__img"
          />
        </div>
        <div className="flex-grid__col col--grow-2 roomTypeCard__middleSection">
          <div className="roomTypeCard__middleTopSection">
            <div className="JDlarge-text">{roomTypeData.name}</div>
          </div>
          <div className="roomTypeCard__middleBottomSection">
            {/* 여기서나온 값을 state 에 저장하는거임 */}

            {roomTypeData.pricingType === PricingType.DOMITORY ? (
              <Fragment>
                {roomTypeData.roomGender === RoomGender.FEMALE ||
                  (
                    <JDselect
                      options={maleSeleteOption}
                      size={SelectBoxSize.TWO}
                      rightLabel="남"
                      mode="small"
                      onChange={selectedOp =>
                        guestCountSelect(selectedOp.value, Gender.MALE)
                      }
                      disabled={disabled.male}
                      textOverflow="visible"
                      isOpen
                      selectedOption={maleSeleteOption[guestCountValue.male]}
                    />
                  )}
                {roomTypeData.roomGender === RoomGender.MALE || (
                  <JDselect
                    options={femaleSeleteOption}
                    size={SelectBoxSize.TWO}
                    rightLabel="여"
                    textOverflow="visible"
                    disabled={disabled.female}
                    onChange={selectedOp =>
                      guestCountSelect(selectedOp.value, Gender.FEMALE)
                    }
                    mode="small"
                    selectedOption={femaleSeleteOption[guestCountValue.female]}
                  />
                )}
                <Preloader loading={countLoading}/>
              </Fragment>
            ) : (
              <JDselect
                options={roomSeleteOption}
                size={SelectBoxSize.TWO}
                disabled={disabled.count}
                rightLabel="개"
                textOverflow="visible"
                onChange={selectedOp =>
                  guestCountSelect(selectedOp.value, "room")
                }
                mode="small"
                selectedOption={roomSeleteOption[guestCountValue.room]}
              />
            )}
          </div>
        </div>
        <div className="flex-grid__col col--grow-1 roomTypeCard__lastSection">
          <div className="roomTypeCard__lastTopSection">
            {" "}
            <span className="roomTypeCard__price">{autoComma(truePrice)}</span>
          </div>
          <Button
            toggle={isSelectedRoom}
            onClick={handleRoomSelectClick}
            className="roomTypeCard__selectButton"
            mode="flat"
            size={windowWidth < WindowSize.MOBILE ? "small" : undefined}
            thema="grey"
            label={isSelectedRoom ? "선택취소" : "선택하기"}
          />
        </div>
      </div>
      <JDmodal className="roomImgPop" {...roomImgModalHook}>
        <img
          className="roomImgPop__img"
          src={roomTypeData.img}
          alt="방이미지"
        />
        <div className="roomImgPop__description">
          {roomTypeData.description}
        </div>
      </JDmodal>
    </Fragment>
  );
};

export default RoomTypeCard;
