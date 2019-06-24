import React, {useState, Fragment, useEffect} from "react";
import windowSize, {WindowSizeProps} from "react-window-size";
import {MutationFn, Query} from "react-apollo";
import ErrProtecter from "../../../utils/errProtect";
import JDdayPicker from "../../../atoms/dayPicker/DayPicker";
import {
  useDayPicker,
  useModal,
  IUseModal,
  useRedirect
} from "../../../actions/hook";
import "./Reservation.scss";
import Button from "../../../atoms/button/Button";
import Card from "../../../atoms/cards/Card";
import {
  GuestPartInput,
  CreateBookingParams,
  getAllRoomType,
  getAllRoomTypeVariables,
  createBooking,
  BookerInput,
  createBookingVariables,
  createBookingForBooker,
  createBookingForBookerVariables,
  getAllRoomTypeForBooker
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
import {
  GET_ALL_ROOMTYPES,
  GET_ALL_ROOM_TYPE_FOR_BOOKING
} from "../../../queries";
import Preloader from "../../../atoms/preloader/Preloader";
import {Redirect, withRouter, RouteComponentProps} from "react-router";

class GetAllAvailRoomQu extends Query<getAllRoomTypeForBooker> {}
export interface ISetBookingInfo
  extends React.Dispatch<React.SetStateAction<BookerInput>> {}

interface IProps {
  createBookingMu: MutationFn<
    createBookingForBooker,
    createBookingForBookerVariables
  >;
  confirmModalHook: IUseModal<any>;
}

const SetPrice: React.SFC<IProps & WindowSizeProps> = ({
  windowWidth,
  windowHeight,
  createBookingMu,
  confirmModalHook
}) => {
  const defaultBookingInfo = {
    name: "",
    password: "",
    price: 0,
    memo: "",
    email: "colton950901@naver.com",
    phoneNumber: "",
    agreePrivacyPolicy: false
  };
  const dayPickerHook = useDayPicker(null, null);
  const [resvRooms, setResvRooms] = useState<GuestPartInput[]>([]);
  const [bookingInfo, setBookingInfo] = useState<any>(defaultBookingInfo);
  const rsevModalHook = useModal(false);
  const toastModalHook = useModal(false);
  const [redirect, redirectUrl, setRedirect] = useRedirect(false, "");
  // 👿 이건 오직 resvRooms에 룸 네임이 없어서다.
  const roomInfoHook = useState<IRoomType[]>([]);

  const resvConfirmCallBackFunc = (flag: boolean) => {
    if (flag) {
      const publicKey = localStorage.getItem("hpk");
      const {name, password, phoneNumber} = bookingInfo;
      location.href = `http://${
        process.env.NODE_ENV === "development"
          ? process.env.REACT_APP_API_HOST
          : process.env.REACT_APP_API_HOST_PRODUCT
      }/#/outpage/checkReservation/${publicKey}/${name}/${phoneNumber}/${password}`;
    } else {
      location.reload();
    }
  };

  // 날자를 선택하면 예약선택 상태 초기화
  useEffect(() => {
    setResvRooms([]);
  }, [dayPickerHook.to, dayPickerHook.from]);

  const resvInfoValidation = () => {
    if (isEmpty(resvRooms)) {
      toastModalHook.openModal({txt: "선택된방이 없습니다."});
      return false;
    }
    return true;
  };

  const bookingInfoValidation = (): boolean => {
    if (isName(bookingInfo.name) !== true) {
      toastModalHook.openModal({txt: "올바른 이름이 아닙니다."});
      return false;
    }
    if (isPhone(bookingInfo.phoneNumber) !== true) {
      toastModalHook.openModal({txt: "올바른 핸드폰번호가 아닙니다."});
      return false;
    }
    if (bookingInfo.password === "") {
      toastModalHook.openModal({txt: "비밀번호를 입력해주세요."});
      return false;
    }
    if (bookingInfo.agreePrivacyPolicy === false) {
      toastModalHook.openModal({txt: "개인정보 수집에 동의해주세요."});
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

  const bookingParams: CreateBookingParams = {
    bookerParams: bookingInfo,
    start: setYYYYMMDD(dayPickerHook.from),
    end: setYYYYMMDD(dayPickerHook.to),
    guestInputs: resvRooms
  };

  const bookingCompleteFn = () => {
    if (bookingInfoValidation()) {
      createBookingMu({
        variables: {
          bookingParams,
          sendSmsFlag: true
        }
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
      {/* {redirect ? houseId() */}
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
              query={GET_ALL_ROOM_TYPE_FOR_BOOKING}
            >
              {({data: roomTypeData, loading: roomLoading, error}) => {
                showError(error);
                const roomTypes = queryDataFormater(
                  roomTypeData,
                  "GetAllRoomTypeForBooker",
                  "roomTypes",
                  undefined
                );
                return !isEmpty(roomTypes) ? (
                  roomTypes.map(roomType => (
                    <RoomTypeCardsWrap
                      roomInfoHook={roomInfoHook}
                      setResvRooms={setResvRooms}
                      resvRooms={resvRooms}
                      windowWidth={windowWidth}
                      toastModalHook={toastModalHook}
                      dayPickerHook={dayPickerHook}
                      roomTypeData={roomType}
                      bookingInfo={bookingInfo}
                      setBookingInfo={setBookingInfo}
                      key={`roomCard${roomType._id}`}
                    />
                  ))
                ) : (
                  <Fragment>
                    {roomLoading && <Preloader />}
                    {roomLoading || (
                      <div className="JDtextcolor--placeHolder JDtext-align-center">
                        {roomCardMessage}
                      </div>
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
              totalPrice={bookingInfo.price}
            />
          </Card>
          <Button onClick={handleResvBtnClick} label="예약하기" mode="long" />
        </div>
        {/* <PaymentModal /> */}
      </div>
      <PayMentModal
        bookingCompleteFn={bookingCompleteFn}
        bookingInfo={bookingInfo}
        setBookingInfo={setBookingInfo}
        modalHook={rsevModalHook}
      />
      <JDtoastModal
        confirm
        confirmCallBackFn={resvConfirmCallBackFunc}
        {...confirmModalHook}
      />
      <JDtoastModal {...toastModalHook} isAlert />
    </div>
  );
};

export default windowSize<IProps>(ErrProtecter(SetPrice));

// ifram for ~~
{
  /* <iframe
    style="border:none; overflow:hidden;"
    width="100%"
    height="800px"
    title="JDresv"
    src="http://localhost:3000/#/outpage/reservation/🙀HP-KEY"
/> */
}
