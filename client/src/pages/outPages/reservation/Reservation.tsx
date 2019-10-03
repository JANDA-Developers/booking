import React, {useState, Fragment, useEffect} from "react";
import windowSize, {WindowSizeProps} from "react-window-size";
import {MutationFn, Query} from "react-apollo";
import ErrProtecter from "../../../utils/errProtect";
import JDdayPicker from "../../../atoms/dayPicker/DayPicker";
import {
  useDayPicker,
  useModal,
  IUseModal,
  useCheckBox,
  useSelect,
  IUseDayPicker,
  IUseSelect
} from "../../../hooks/hook";
import "./Reservation.scss";
import Button from "../../../atoms/button/Button";
import Card from "../../../atoms/cards/Card";
import {
  startBooking,
  startBookingVariables,
  getAllRoomTypeForBooker
} from "../../../types/api";
import $ from "jquery";
import BookingInfoBox from "./components/bookingInfoBox";
import PayMentModal from "./components/paymentModal";
import RoomTypeCardWrap from "./components/roomTypeCards/roomTypeCardsWrap";
import {
  isEmpty,
  queryDataFormater,
  insideRedirect,
  muResult
} from "../../../utils/utils";
import {isName, isPhone} from "../../../utils/inputValidations";
import {JDtoastModal} from "../../../atoms/modal/Modal";
import {IRoomType} from "../../../types/interface";
import {
  WindowSize,
  PricingType,
  PAYMETHOD_FOR_BOOKER_OP,
  PAYMETHOD_FOR_HOST_OP,
  PayMethod,
  PaymentStatus
} from "../../../types/enum";
import {set4YMMDD} from "../../../utils/setMidNight";
import {GET_ALL_ROOM_TYPE_FOR_BOOKING} from "../../../queries";
import Preloader from "../../../atoms/preloader/Preloader";
import moment from "moment";
import {Helmet} from "react-helmet";
import {openNiceModal} from "./components/doPay";
import {reservationDevelop, developEvent} from "../../../utils/developMaster";
import RoomSearcher from "../../../components/roomSearcher.tsx/RoomSearcher";
import BookingInfoModal from "./components/roomTypeCards/bookingInfoModal";
import isLast from "../../../utils/isLast";
import {IRoomSelectInfo} from "../../../components/bookingModal/BookingModal";

export interface IBookerInfo {
  name: string;
  password: string;
  memo: string;
  email: string;
  phoneNumber: string;
  agreePrivacyPolicy: boolean;
}

export interface IReservationHooks {
  priceHook: [number, React.Dispatch<React.SetStateAction<number>>];
  roomInfoHook: [
    IRoomType[],
    React.Dispatch<React.SetStateAction<IRoomType[]>>
  ];
  toastModalHook: IUseModal<any>;
  bookerInfo: IBookerInfo;
  setBookerInfo: React.Dispatch<React.SetStateAction<IBookerInfo>>;
  dayPickerHook: IUseDayPicker;
  roomSelectInfo: IRoomSelectInfo[];
  setRoomSelectInfo: React.Dispatch<React.SetStateAction<IRoomSelectInfo[]>>;
  payMethodHook: IUseSelect<PayMethod>;
  sendSmsHook: {
    checked: boolean;
    onChange: (value: boolean) => void;
  };
}

class GetAllAvailRoomQu extends Query<getAllRoomTypeForBooker> {}
export interface ISetBookingInfo
  extends React.Dispatch<React.SetStateAction<IBookerInfo>> {}

interface IProps {
  startBookingMu?: MutationFn<startBooking, startBookingVariables>;
  isHost: boolean;
  confirmModalHook: IUseModal<any>;
  createLoading: boolean;
  houseId?: string;
}

const Reservation: React.SFC<IProps & WindowSizeProps> = ({
  windowWidth,
  windowHeight,
  startBookingMu,
  isHost,
  houseId,
  confirmModalHook,
  createLoading
}) => {
  const defaultBookingInfo: IBookerInfo = {
    name: "",
    password: "",
    memo: "",
    email: "colton950901@naver.com",
    phoneNumber: "",
    agreePrivacyPolicy: isHost ? true : false
  };

  const isMobile = windowWidth < WindowSize.PHABLET;
  const dayPickerHook = useDayPicker(null, null);
  // 모바일에서만 사용
  const [step, setStep] = useState<"search" | "select">("search");
  const [roomSelectInfo, setRoomSelectInfo] = useState<IRoomSelectInfo[]>([]);
  const [bookerInfo, setBookerInfo] = useState<IBookerInfo>(defaultBookingInfo);
  const rsevModalHook = useModal(false);
  const toastModalHook = useModal(false);
  const bookingInfoModal = useModal(false);
  const roomInfoHook = useState<IRoomType[]>([]);
  const sendSmsHook = useCheckBox(isHost ? false : true);
  const priceHook = useState(0);
  const payMethodHook = useSelect(
    isHost ? PAYMETHOD_FOR_BOOKER_OP[0] : PAYMETHOD_FOR_HOST_OP[0]
  );

  const reservationHooks: IReservationHooks = {
    priceHook,
    roomInfoHook,
    toastModalHook,
    dayPickerHook,
    bookerInfo,
    setBookerInfo,
    roomSelectInfo,
    setRoomSelectInfo,
    sendSmsHook,
    payMethodHook
  };

  const resvConfirmCallBackFunc = (flag: boolean) => {
    if (flag) {
      const publicKey = sessionStorage.getItem("hpk");
      const {name, password, phoneNumber} = bookerInfo;
      location.href = insideRedirect(
        `outpage/checkReservation/${publicKey}/${name}/${phoneNumber}/${password}`
      );
    } else {
      location.reload();
    }
  };

  developEvent(() => {
    reservationDevelop(reservationHooks);
  });

  // 날자를 선택하면 예약선택 상태 초기화
  useEffect(() => {
    setRoomSelectInfo([]);
    setBookerInfo(defaultBookingInfo);
  }, [dayPickerHook.to, dayPickerHook.from]);

  // Iframe 높이조절
  useEffect(() => {
    const theHeight = $("#JDreservation").height() || 1000;
    window.parent.postMessage({height: theHeight}, "*");
  });

  const resvInfoValidation = () => {
    if (isEmpty(roomSelectInfo)) {
      toastModalHook.openModal({txt: "선택된방이 없습니다."});
      return false;
    }
    return true;
  };

  const bookerInfoValidation = (): boolean => {
    if (isName(bookerInfo.name) !== true) {
      toastModalHook.openModal({txt: "올바른 이름이 아닙니다."});
      return false;
    }
    if (isPhone(bookerInfo.phoneNumber) !== true) {
      toastModalHook.openModal({txt: "올바른 휴대폰번호가 아닙니다."});
      return false;
    }
    if (bookerInfo.password === "") {
      toastModalHook.openModal({txt: "비밀번호를 입력해주세요."});
      return false;
    }
    if (bookerInfo.agreePrivacyPolicy === false) {
      toastModalHook.openModal({txt: "개인정보 수집에 동의해주세요."});
      return false;
    }
    return true;
  };

  const roomCardMessage = () => {
    if (!dayPickerHook.from) return "달력에서 날자를 선택해주세요.";
    if (dayPickerHook.from && !dayPickerHook.to)
      return "체크아웃 날자를 선택해주세요.";
    if (dayPickerHook.from && dayPickerHook.to)
      return "해당날자에 예약가능한 방이 없습니다.";
    return "";
  };

  const getEndDate = () => {
    if (dayPickerHook.to === null) return new Date();
    if (dayPickerHook.from == dayPickerHook.to) {
      return set4YMMDD(moment(dayPickerHook.to).add(1, "day"));
    }
    return set4YMMDD(dayPickerHook.to);
  };

  const bookingCompleteFn = async () => {
    if (bookerInfoValidation()) {
      const {
        agreePrivacyPolicy,
        email,
        memo,
        name,
        password,
        phoneNumber
      } = bookerInfo;
      if (!startBookingMu) throw Error("startBookingMu 가 없음");

      const startBookingVariables: startBookingVariables = {
        houseId: "",
        bookerParams: {
          agreePrivacyPolicy,
          email,
          memo,
          name,
          password,
          phoneNumber
        },
        checkInOut: {
          checkIn: dayPickerHook.from,
          checkOut: dayPickerHook.to
        },
        guestDomitoryParams: roomSelectInfo
          .filter(room => room.pricingType === PricingType.DOMITORY)
          .map(room => ({
            roomTypeId: room.roomTypeId,
            countFemale: room.count.female,
            countMale: room.count.male
          })),
        guestRoomParams: roomSelectInfo
          .filter(room => room.pricingType === PricingType.ROOM)
          .map(room => ({
            roomTypeId: room.roomTypeId,
            countRoom: room.count.roomCount
          })),
        paymentParams: {
          payMethod: payMethodHook.selectedOption!.value,
          price: priceHook[0],
          status: PaymentStatus.READY
        }
      };
      const result = await startBookingMu({
        variables: startBookingVariables
      });
      if (result) {
        rsevModalHook.closeModal();
      }
      const {transactionId}: any = muResult(
        result,
        "StartBookingForPublic",
        "bookingTransaction"
      );

      if (transactionId) {
        openNiceModal({resvInfo: startBookingVariables, transactionId});
      }
    }
  };

  const handleResvBtnClick = () => {
    if (resvInfoValidation()) {
      if (isMobile) {
        bookingInfoModal.openModal();
      } else {
        rsevModalHook.openModal();
      }
    }
  };

  if (step === "search" && isMobile) {
    return (
      <div id="JDreservation" className="JDreservation">
        <div className="JDreservation__mobileRoomSearcherWrap">
          <RoomSearcher
            callBackOnSearch={result => {
              dayPickerHook.setFrom(result.checkIn);
              dayPickerHook.setTo(result.checkOut);
              dayPickerHook.setEntered(result.checkOut);
              setStep("select");
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div id="JDreservation" className="JDreservation">
      <Helmet>
        <script src="https://web.nicepay.co.kr/v3/webstd/js/nicepay-2.0.js" />
      </Helmet>
      <div className="flex-grid">
        <div className="flex-grid__col JDreservation__card-grid col--full-4 col--lg-5 col--wmd-12">
          <Card className="JDmargin-bottom0 JDreservation__card JDreservation__dayPickerCard">
            <h6 className="JDreservation__sectionTitle">① 예약날자 선택</h6>
            {/* TODO: change 될때마다 roomSelectInfo를 초기화 해주어야함 */}
            <JDdayPicker
              {...dayPickerHook}
              displayHeader={!isMobile}
              displayCaption={!isMobile}
              displayInfo={!isMobile}
              canSelectBeforeDay={false}
              horizen={isMobile}
              mode="reservation"
              className="JDreservation__topDayPicker JDmargin-bottom0"
            />
          </Card>
        </div>
        <div className="flex-grid__col JDreservation__roomSelect-grid col--full-8 col--lg-7 col--wmd-12">
          <Card
            fullWidth={isMobile}
            className="JDz-index-1 JDstandard-space0 JDreservation__card"
          >
            <h6 className="JDreservation__sectionTitle">② 방 선택</h6>
            {/* TODO: roomTypes들의 반복문을 통해서 만들고 해당 정보는 roomSelectInfo 에서 filter를 통해서 가져와야함 */}

            <GetAllAvailRoomQu
              skip={!dayPickerHook.from || !dayPickerHook.to}
              query={GET_ALL_ROOM_TYPE_FOR_BOOKING}
            >
              {({
                data: roomTypeData,
                loading: roomAvailCountLoading,
                error
              }) => {
                const roomTypes = queryDataFormater(
                  roomTypeData,
                  "GetAllRoomTypeForBooker",
                  "roomTypes",
                  undefined
                );

                return !isEmpty(roomTypes) ? (
                  roomTypes.map((roomType, index) => (
                    <RoomTypeCardWrap
                      reservationHooks={reservationHooks}
                      windowWidth={windowWidth}
                      roomTypeData={roomType}
                      isHost={isHost}
                      houseId={houseId}
                      key={`roomCard${roomType._id}`}
                      lastCard={isLast(index, roomTypes)}
                    />
                  ))
                ) : (
                  <Fragment>
                    <h4 className="JDreservation__cardMessage JDtextcolor--placeHolder JDtext-align-center">
                      <Preloader
                        className="JDstandard-margin0"
                        size="large"
                        loading={roomAvailCountLoading}
                      />
                      {roomAvailCountLoading || roomCardMessage()}
                    </h4>
                  </Fragment>
                );
              }}
            </GetAllAvailRoomQu>
          </Card>
          {!isMobile && (
            <Card
              fullWidth={isMobile}
              className={`JDmargin-bottom0 JDreservation__confirmCard JDreservation__card`}
            >
              <h6 className="JDreservation__sectionTitle"> 선택 확인</h6>
              <BookingInfoBox
                roomTypeInfo={roomInfoHook[0]}
                from={dayPickerHook.from}
                to={dayPickerHook.to}
                roomSelectInfo={roomSelectInfo}
                totalPrice={priceHook[0]}
              />
            </Card>
          )}
          {isEmpty(roomSelectInfo) && isMobile && (
            <Button
              id="ResvBtn"
              thema="primary"
              icon="return"
              onClick={() => {
                setStep("search");
              }}
              label="돌아가기"
              size="longLarge"
              className="JDmarginTop JDmargin-bottom0"
            />
          )}
          {!isEmpty(roomSelectInfo) && (
            <Button
              id="ResvBtn"
              thema="primary"
              onClick={handleResvBtnClick}
              label="예약하기"
              size="longLarge"
              className="JDmarginTop JDmargin-bottom0"
            />
          )}
        </div>
      </div>
      <PayMentModal
        bookingCompleteFn={bookingCompleteFn}
        createLoading={createLoading}
        reservationHooks={reservationHooks}
        modalHook={rsevModalHook}
        isHost={isHost}
      />
      {isMobile && (
        <BookingInfoModal
          paymentModalHook={rsevModalHook}
          modalHook={bookingInfoModal}
          roomTypeInfo={roomInfoHook[0]}
          from={dayPickerHook.from}
          to={dayPickerHook.to}
          roomSelectInfo={roomSelectInfo}
          totalPrice={priceHook[0]}
        />
      )}
      <JDtoastModal
        confirm
        center
        falseMessage="닫기"
        confirmCallBackFn={resvConfirmCallBackFunc}
        {...confirmModalHook}
      />
      <JDtoastModal {...toastModalHook} isAlert />
    </div>
  );
};

export default windowSize<IProps>(ErrProtecter(Reservation));
