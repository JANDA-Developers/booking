import React, {useState, Fragment, useEffect} from "react";
import windowSize, {WindowSizeProps} from "react-window-size";
import {MutationFn, Query} from "react-apollo";
import ErrProtecter from "../../../utils/errProtect";
import JDdayPicker from "../../../atoms/dayPicker/DayPicker";
import {useDayPicker, useModal} from "../../../actions/hook";
import "./Reservation.scss";
import Button from "../../../atoms/button/Button";
import Card from "../../../atoms/cards/Card";
import {
  GuestPartInput,
  CreateBookerParams,
  getAllRoomType,
  getAllRoomTypeVariables,
  createBooker,
  BookerInput,
  createBookerVariables
} from "../../../types/api";
import ResvRoomSelectInfo from "../components/resvRoomSelectInfo";
import PayMentModal from "../components/paymentModal";
import RoomTypeCardsWrap from "../components/roomTypeCards/roomTypeCardsWrap";
import {isEmpty, showError, queryDataFormater} from "../../../utils/utils";
import {isName, isPhone} from "../../../utils/inputValidations";
import {JDtoastModal} from "../../../atoms/modal/Modal";
import {IRoomType} from "../../../types/interface";
import {WindowSize} from "../../../types/enum";
import {setYYYYMMDD} from "../../../utils/setMidNight";
import {GET_ALL_ROOMTYPES} from "../../../queries";
import Preloader from "../../../atoms/preloader/Preloader";

class GetAllAvailRoomQu extends Query<
  getAllRoomType,
  getAllRoomTypeVariables
> {}
export interface ISetBookerInfo
  extends React.Dispatch<React.SetStateAction<BookerInput>> {}

interface IProps {
  createBookingMu: MutationFn<createBooker, createBookerVariables>;
  houseId: string;
}

const SetPrice: React.SFC<IProps & WindowSizeProps> = ({
  windowWidth,
  windowHeight,
  createBookingMu,
  houseId
}) => {
  const defaultBookerInfo = {
    house: houseId,
    name: "",
    password: "",
    memo: "",
    email: "colton950901@naver.com",
    phoneNumber: "",
    agreePrivacyPolicy: false
  };
  const dayPickerHook = useDayPicker(null, null);
  const [resvRooms, setResvRooms] = useState<GuestPartInput[]>([]);
  const [bookerInfo, setBookerInfo] = useState<BookerInput>(defaultBookerInfo);
  const rsevModalHook = useModal(false);
  const toastModalHook = useModal(false);
  // 👿 이건 오직 resvRooms에 룸 네임이 없어서다.
  const roomInfoHook = useState<IRoomType[]>([]);

  // 날자를 선택하면 예약선택 상태 초기화
  useEffect(() => {
    setResvRooms([]);
  }, [dayPickerHook.to, dayPickerHook.from]);

  const resvInfoValidation = () => {
    if (isEmpty(resvRooms)) {
      toastModalHook.openModal("선택된방이 없습니다.");
      return false;
    }
    return true;
  };

  const bookerInfoValidation = (): boolean => {
    if (isName(bookerInfo.name) !== true) {
      toastModalHook.openModal("올바른 이름이 아닙니다.");
      return false;
    }
    if (isPhone(bookerInfo.phoneNumber) !== true) {
      toastModalHook.openModal("올바른 핸드폰번호가 아닙니다.");
      return false;
    }
    if (bookerInfo.password === "") {
      toastModalHook.openModal("비밀번호를 입력해주세요.");
      return false;
    }
    if (bookerInfo.agreePrivacyPolicy === false) {
      toastModalHook.openModal("개인정보 수집에 동의해주세요.");
      return false;
    }
    return true;
  };

  const roomCardMessage = (() => {
    if (!dayPickerHook.from) return "달력에서 날자를 선택해주세요.";
    if (dayPickerHook.from && !dayPickerHook.to)
      return "체크아웃 날자를 선택해주세요.";
    if (dayPickerHook.from && dayPickerHook.to)
      return "해당날자에 예약가능한 방이 없습니다.";
    return "";
  })();

  const bookingParams: CreateBookerParams = {
    bookerParams: bookerInfo,
    start: setYYYYMMDD(dayPickerHook.from),
    end: setYYYYMMDD(dayPickerHook.to),
    guestInputs: resvRooms
  };

  const bookingCompleteFn = () => {
    if (bookerInfoValidation()) {
      createBookingMu({
        variables: {bookingParams}
      });
    }
  };

  const handleResvBtnClick = () => {
    if (resvInfoValidation()) {
      rsevModalHook.openModal();
    }
  };

  return (
    <div id="JDreservation" className="JDreservation">
      <div className="flex-grid">
        <div className="flex-grid__col col--full-4 col--lg-5 col--wmd-12">
          <Card className="JDreservation__card JDreservation__dayPickerCard">
            <h6 className="JDreservation__sectionTitle">① 예약날자 선택</h6>
            {/* TODO: change 될때마다 resvRooms를 초기화 해주어야함 */}
            <JDdayPicker
              {...dayPickerHook}
              horizen={windowWidth < WindowSize.PHABLET}
            />
          </Card>
        </div>
        <div className="flex-grid__col col--full-8 col--lg-7 col--wmd-12">
          <Card className="JDz-index-1 JDreservation__card">
            <h6 className="JDreservation__sectionTitle">② 방 선택</h6>
            {/* TODO: roomTypes들의 반복문을 통해서 만들고 해당 정보는 resvRooms 에서 filter를 통해서 가져와야함 */}

            <GetAllAvailRoomQu
              skip={!dayPickerHook.from || !dayPickerHook.to}
              variables={{houseId}}
              query={GET_ALL_ROOMTYPES}
            >
              {({data: roomTypeData, loading: roomLoading, error}) => {
                showError(error);
                const roomTypes = queryDataFormater(
                  roomTypeData,
                  "GetAllRoomType",
                  "roomTypes",
                  undefined
                );
                return !isEmpty(roomTypes) ? (
                  roomTypes.map(roomType => (
                    <RoomTypeCardsWrap
                      roomInfoHook={roomInfoHook}
                      houseId={houseId}
                      setResvRooms={setResvRooms}
                      resvRooms={resvRooms}
                      windowWidth={windowWidth}
                      toastModalHook={toastModalHook}
                      dayPickerHook={dayPickerHook}
                      roomTypeData={roomType}
                      key={`roomCard${roomType._id}`}
                    />
                  ))
                ) : (
                  <Fragment>
                    {roomLoading && <Preloader />}
                    {roomLoading || (
                      <h6 className="JDtext-align-center">{roomCardMessage}</h6>
                    )}
                  </Fragment>
                );
              }}
            </GetAllAvailRoomQu>
          </Card>
          <Card className="JDreservation__card">
            <h6 className="JDreservation__sectionTitle"> 선택 확인</h6>
            <ResvRoomSelectInfo
              roomTypeInfo={roomInfoHook[0]}
              from={dayPickerHook.from}
              to={dayPickerHook.to}
              resvRooms={resvRooms}
            />
          </Card>
          <Button onClick={handleResvBtnClick} label="예약하기" mode="long" />
        </div>
        {/* <PaymentModal /> */}
      </div>
      <PayMentModal
        bookingCompleteFn={bookingCompleteFn}
        bookerInfo={bookerInfo}
        setBookerInfo={setBookerInfo}
        modalHook={rsevModalHook}
      />
      <JDtoastModal {...toastModalHook} isAlert />
    </div>
  );
};

export default windowSize<IProps>(ErrProtecter(SetPrice));
