import classNames from "classnames";
import React, {Fragment, useState, useEffect, useMemo} from "react";
import JDselect, {
  IselectedOption,
  SelectBoxSize
} from "../../../../../atoms/forms/selectBox/SelectBox";
import Button from "../../../../../atoms/button/Button";
import {IRoomType} from "../../../../../types/interface";
import Preloader from "../../../../../atoms/preloader/Preloader";
import {isEmpty, autoComma} from "../../../../../utils/utils";
import {useModal} from "../../../../../hooks/hook";
import {
  Gender,
  PricingType,
  RoomGender,
} from "../../../../../types/enum";
import {IGuestCount} from "./roomTypeCardsWrap";
import JDmodal from "../../../../../atoms/modal/Modal";
import moment from "moment";
import selectOpMaker from "../../../../../utils/selectOptionMaker";
import JDbadge from "../../../../../atoms/badge/Badge";
import {IReservationHooks} from "../../Reservation";
import {PortalPreloader} from "../../../../../utils/portalTo";

interface IProps {
  className?: string;
  roomTypeData: IRoomType;
  windowWidth: any;
  reservationHooks: IReservationHooks;
  setGuestCount: React.Dispatch<React.SetStateAction<IGuestCount>>;
  guestCountValue: IGuestCount;
  truePrice: number;
  countLoading: boolean;
  priceLoading: boolean;
  lastCard: boolean;
  availableCount: {
    maleCount: number;
    femaleCount: number;
    roomCount: number;
  };
}

const RoomTypeCard: React.SFC<IProps> = ({
  className,
  roomTypeData,
  priceLoading,
  windowWidth,
  setGuestCount,
  guestCountValue,
  reservationHooks,
  countLoading,
  truePrice,
  availableCount,
  lastCard
}) => {
  const {
    dayPickerHook,
    priceHook,
    roomSelectInfo,
    roomInfoHook,
    setRoomSelectInfo,
    toastModalHook
  } = reservationHooks;
  const roomImgModalHook = useModal(false);
  const [disabled, setDisabled] = useState({
    female: false,
    male: false,
    count: false
  });
  const classes = classNames("roomTypeCard", className, {
    "roomTypeCard--last": lastCard
  });

  // 👿 타입스크립트가 말을안듣네
  //  방 선택수 셀렉트옵션을 리턴합니다.

  const countSelectOpFn = useMemo(
    () => (
      key: "maleCount" | "femaleCount" | "roomCount"
    ): IselectedOption<number>[] => {
      // 남성 SelectOp 리턴

      if (key === "maleCount" && availableCount.maleCount) {
        return selectOpMaker({
          count: availableCount.maleCount + 1 + guestCountValue.male,
          labelAdd: " 남"
        });
      }
      // 여성 SelectOp 리턴
      if (key === "femaleCount" && availableCount.femaleCount) {
        return selectOpMaker({
          count: availableCount.femaleCount + 1 + guestCountValue.female,
          labelAdd: " 여"
        });
      }
      // 방타입 SelectOp 리턴
      if (key === "roomCount" && availableCount.roomCount) {
        return selectOpMaker({
          count: availableCount.roomCount + 1 + guestCountValue.room,
          labelAdd: " 개"
        });
      }
      return [];
    },
    [
      availableCount.maleCount,
      availableCount.roomCount,
      availableCount.femaleCount
    ]
  );

  const maleCan = availableCount.maleCount;
  const femaleCan = availableCount.femaleCount;
  const contRoom = availableCount.roomCount;

  const maleSeleteOption = countSelectOpFn("maleCount");
  const femaleSeleteOption = countSelectOpFn("femaleCount");
  const roomSeleteOption = countSelectOpFn("roomCount");

  const totalCan = (maleCan || 0) + (femaleCan || 0) + (contRoom || 0);

  // 이미 선택한 방인지 체크1
  const isSelectedRoom = ((): boolean => {
    const temp = roomSelectInfo.filter(
      resvRoom => resvRoom.roomTypeId === roomTypeData._id
    );
    if (isEmpty(temp)) return false;
    return true;
  })();

  // const maxSelectCount = ((): IselectedOption[] => {})();
  const roomTypeIndex = roomSelectInfo.findIndex(
    resvRoom => resvRoom.roomTypeId === roomTypeData._id
  );

  const totalRoomTypeCount =
    guestCountValue.female + guestCountValue.male + guestCountValue.room;

  // 방 인원 선택시 선택가능 인원을 다시가져오게함
  const guestCountSelect = (selectedValue: number, flag: Gender | "room") => {
    setGuestCount({
      male: flag === Gender.MALE ? selectedValue : guestCountValue.male,
      female: flag === Gender.FEMALE ? selectedValue : guestCountValue.female,
      room: flag === "room" ? selectedValue : guestCountValue.room,
      get: flag !== "room" ? flag : Gender.FEMALE
    });
  };

  // 방선택하기 클릭시
  const handleRoomSelectClick = () => {
    const roomSelectInfoCopy = roomSelectInfo.slice();

    const dayDiff =
      moment(dayPickerHook.to!).diff(dayPickerHook.from!, "days") || 1;
    const totalRoomTypePrice = totalRoomTypeCount * truePrice * dayDiff;

    // 이미 선택된방 제거
    if (isSelectedRoom) {
      roomSelectInfoCopy.splice(roomTypeIndex, 1);
      setRoomSelectInfo(roomSelectInfoCopy);
      setDisabled({female: false, male: false, count: false});

      priceHook[1](priceHook[0] - totalRoomTypePrice);
      return;
    }

    // 선택된인원이 없는경우에
    if (totalRoomTypeCount === 0) {
      toastModalHook.openModal("인원수를 선택해주세요.");
      return;
    }

    // 선택된방이 아닐경우에
    roomSelectInfoCopy.push({
      roomTypeId: roomTypeData._id,
      pricingType: roomTypeData.pricingType,
      price: truePrice,
      count: {
        female: guestCountValue.female,
        male: guestCountValue.male,
        roomCount: guestCountValue.room
      }
    });

    setRoomSelectInfo(roomSelectInfoCopy);
    setDisabled({female: true, male: true, count: true});
    priceHook[1](priceHook[0] + totalRoomTypePrice);

    roomInfoHook[1]([...roomInfoHook[0], roomTypeData]);
  };

  // 방배경사진
  const roomStyle = {
    // TODO :사진정보 여기에
    backgroundImage: `url(${roomTypeData.img})`
  };

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
            <h6 className="roomTypeCard__roomTypeTitle">
              {roomTypeData.name}{" "}
              {totalCan === 0 && !countLoading && (
                <JDbadge thema="error">만실</JDbadge>
              )}
            </h6>
          </div>
          <div className="roomTypeCard__middleBottomSection">
            {/* 여기서나온 값을 state 에 저장하는거임 */}

            {roomTypeData.pricingType === PricingType.DOMITORY ? (
              <Fragment>
                {roomTypeData.roomGender === RoomGender.FEMALE || (
                  <JDselect
                    borderColor="primary"
                    options={maleSeleteOption}
                    autoSize
                    onChange={selectedOp =>
                      guestCountSelect(selectedOp.value, Gender.MALE)
                    }
                    displayArrow={false}
                    disabled={disabled.male}
                    textOverflow="visible"
                    selectedOption={maleSeleteOption[guestCountValue.male]}
                  />
                )}
                {roomTypeData.roomGender === RoomGender.MALE || (
                  <JDselect
                    borderColor="primary"
                    options={femaleSeleteOption}
                    autoSize
                    textOverflow="visible"
                    displayArrow={false}
                    disabled={disabled.female}
                    onChange={selectedOp =>
                      guestCountSelect(selectedOp.value, Gender.FEMALE)
                    }
                    selectedOption={femaleSeleteOption[guestCountValue.female]}
                  />
                )}
                <PortalPreloader loading={countLoading} />
              </Fragment>
            ) : (
              <JDselect
                borderColor="primary"
                options={roomSeleteOption}
                autoSize
                displayArrow={false}
                disabled={disabled.count}
                textOverflow="visible"
                onChange={selectedOp =>
                  guestCountSelect(selectedOp.value, "room")
                }
                selectedOption={roomSeleteOption[guestCountValue.room]}
              />
            )}
          </div>
        </div>
        <div className="flex-grid__col col--grow-1 roomTypeCard__lastSection">
          <div className="roomTypeCard__lastTopSection">
            {priceLoading ? (
              <Preloader loading />
            ) : (
              <span className="roomTypeCard__price">
                {autoComma(truePrice)}
              </span>
            )}
          </div>
          <Button
            onClick={handleRoomSelectClick}
            className="roomTypeCard__selectButton"
            size={"small"}
            thema={isSelectedRoom ? "warn" : "primary"}
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
