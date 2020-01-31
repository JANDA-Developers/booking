import classNames from "classnames";
import React, { Fragment, useState, useMemo } from "react";
import JDselect, {
  IselectedOption
} from "../../../../../atoms/forms/selectBox/SelectBox";
import Button from "../../../../../atoms/button/Button";
import { IRoomType } from "../../../../../types/interface";
import { isEmpty, autoComma, toNumber } from "../../../../../utils/utils";
import { useModal, LANG } from "../../../../../hooks/hook";
import { Gender, PricingType, RoomGender } from "../../../../../types/enum";
import { IGuestCount } from "./roomTypeCardsWrap";
import JDmodal from "../../../../../atoms/modal/Modal";
import moment from "moment";
import selectOpCreater from "../../../../../utils/selectOptionCreater";
import JDbadge from "../../../../../atoms/badge/Badge";
import { PortalPreloader } from "../../../../../utils/portalElement";
import { IReservationHooks } from "../../declation";

interface IProps {
  className?: string;
  roomTypeData: IRoomType;
  windowWidth: any;
  reservationHooks: IReservationHooks;
  setGuestCount: React.Dispatch<React.SetStateAction<IGuestCount>>;
  guestCountValue: IGuestCount;
  truePrice: number;
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
  windowWidth,
  setGuestCount,
  guestCountValue,
  reservationHooks,
  truePrice,
  availableCount,
  lastCard
}) => {
  const {
    dayPickerHook,
    priceHook,
    roomInfoHook,
    roomSelectInfo,
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

  //  방 선택수 셀렉트옵션을 리턴합니다.
  //  count =  availableCount(FROM API) +  guestCountValue(이미 선택된)
  const countSelectOpFn = useMemo(
    () => (
      key: "maleCount" | "femaleCount" | "roomCount"
    ): IselectedOption<number>[] => {
      let genderKey = "";
      // 남성 SelectOp 리턴
      if (key === "maleCount") {
        genderKey = ` ${LANG("male")}`;
        if (availableCount.maleCount || guestCountValue.male) {
          return selectOpCreater({
            count: availableCount.maleCount + 1 + guestCountValue.male,
            labelAdd: genderKey
          });
        }
      }
      // 여성 SelectOp 리턴
      if (key === "femaleCount") {
        genderKey = ` ${LANG("female")}`;
        if (availableCount.femaleCount || guestCountValue.female) {
          return selectOpCreater({
            count: availableCount.femaleCount + 1 + guestCountValue.female,
            labelAdd: genderKey
          });
        }
      }
      // 방타입 SelectOp 리턴
      if (key === "roomCount") {
        genderKey = ` ${LANG("room_count")}`;
        if (availableCount.roomCount) {
          return selectOpCreater({
            count: availableCount.roomCount + 1 + guestCountValue.room,
            labelAdd: genderKey
          });
        }
      }
      return selectOpCreater({
        count: 1,
        labelAdd: genderKey
      });
    },
    [
      availableCount.maleCount,
      availableCount.roomCount,
      availableCount.femaleCount
    ]
  );

  const maleSeleteOption = countSelectOpFn("maleCount");
  const femaleSeleteOption = countSelectOpFn("femaleCount");
  const roomSeleteOption = countSelectOpFn("roomCount");

  const totalCan =
    maleSeleteOption.length +
    femaleSeleteOption.length +
    roomSeleteOption.length;

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

  const totalSelectCount =
    guestCountValue.female + guestCountValue.male + guestCountValue.room;

  // 방 인원 선택시 선택가능 인원을 다시가져오게함
  const guestCountSelect = (selectedValue: number, flag: Gender | "room") => {
    setGuestCount({
      male: flag === Gender.MALE ? selectedValue : guestCountValue.male,
      female: flag === Gender.FEMALE ? selectedValue : guestCountValue.female,
      room: flag === "room" ? selectedValue : guestCountValue.room,
      initGender: flag !== "room" ? flag : Gender.FEMALE
    });
  };

  // 방선택하기 클릭시
  const handleRoomSelectClick = () => {
    const roomSelectInfoCopy = roomSelectInfo.slice();

    const dayDiff =
      moment(dayPickerHook.to!).diff(dayPickerHook.from!, "days") || 1;
    const totalRoomTypePrice = totalSelectCount * truePrice * dayDiff;

    // 이미 선택된방 제거
    if (isSelectedRoom) {
      roomSelectInfoCopy.splice(roomTypeIndex, 1);
      setRoomSelectInfo(roomSelectInfoCopy);
      setDisabled({ female: false, male: false, count: false });

      priceHook.onChange(priceHook.value - totalRoomTypePrice);
      return;
    }

    // 선택된인원이 없는경우에
    if (totalSelectCount === 0) {
      toastModalHook.openModal(LANG("please_select_the_number_of_people"));
      return;
    }

    // 선택된방이 아닐경우에
    roomSelectInfoCopy.push({
      roomTypeId: roomTypeData._id,
      pricingType: roomTypeData.pricingType,
      roomTypeName: roomTypeData.name,
      count: {
        female: guestCountValue.female,
        male: guestCountValue.male,
        roomCount: guestCountValue.room
      }
    });

    setRoomSelectInfo(roomSelectInfoCopy);
    setDisabled({ female: true, male: true, count: true });
    priceHook.onChange(
      toNumber(priceHook.value) + toNumber(totalRoomTypePrice)
    );

    roomInfoHook[1]([...roomInfoHook[0], roomTypeData]);
  };

  // 방배경사진
  const roomStyle = {
    // TODO :사진정보 여기에
    backgroundImage: `url(${roomTypeData.img?.url ||
      "https://s3.ap-northeast-2.amazonaws.com/booking.stayjanda.files/infographic/noimg.png"})`
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
              {totalCan === 0 && (
                <JDbadge thema="error">{LANG("fullRoom")}</JDbadge>
              )}
            </h6>
          </div>
          <div className="roomTypeCard__middleBottomSection">
            {roomTypeData.pricingType === PricingType.DOMITORY ? (
              <Fragment>
                {roomTypeData.roomGender === RoomGender.FEMALE || (
                  <JDselect
                    menuItemCenterlize
                    bporderColor="primary"
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
                    menuItemCenterlize
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
              </Fragment>
            ) : (
              <JDselect
                menuItemCenterlize
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
            <span className="roomTypeCard__price">{autoComma(truePrice)}</span>
          </div>
          <Button
            onClick={handleRoomSelectClick}
            className="roomTypeCard__selectButton"
            size={"small"}
            thema={isSelectedRoom ? "warn" : "primary"}
            label={LANG(isSelectedRoom ? "cancel" : "select")}
          />
        </div>
      </div>
      <JDmodal className="roomImgPop" {...roomImgModalHook}>
        <img
          className="roomImgPop__img"
          src={roomTypeData.img?.url || ""}
          alt="방 이미지"
        />
        <div className="roomImgPop__description">
          {roomTypeData.description}
        </div>
      </JDmodal>
    </Fragment>
  );
};

export default RoomTypeCard;
