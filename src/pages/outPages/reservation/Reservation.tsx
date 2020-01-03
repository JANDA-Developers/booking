import React, { useState, Fragment, useEffect } from "react";
import windowSize, { WindowSizeProps } from "react-window-size";
import { Query } from "react-apollo";
import ErrProtecter from "../../../utils/errProtect";
import JDdayPicker from "../../../atoms/dayPicker/DayPicker";
import {
  useDayPicker,
  useModal,
  IUseModal,
  useCheckBox,
  useSelect,
  IUseDayPicker,
  IUseSelect,
  useInput,
  TUseInput,
  LANG
} from "../../../hooks/hook";
import "./Reservation.scss";
import Button from "../../../atoms/button/Button";
import Card from "../../../atoms/cards/Card";
import {
  getAllRoomTypeForBooker,
  startBookingForPublic,
  startBookingForPublicVariables,
  getPaymentAuth,
  getPaymentAuthVariables
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
import { isName, isPhone } from "../../../utils/inputValidations";
import { JDtoastModal } from "../../../atoms/modal/Modal";
import { IRoomType, IMu } from "../../../types/interface";
import {
  WindowSize,
  PricingType,
  PayMethod,
  Funnels
} from "../../../types/enum";
import { PAYMETHOD_FOR_BOOKER_OP } from "../../../types/const";
import { GET_ALL_ROOM_TYPE_FOR_BOOKING } from "../../../apollo/queries";
import Preloader from "../../../atoms/preloader/Preloader";
import { Helmet } from "react-helmet";
import { openNiceModal } from "./components/doPay";
import { reservationDevelop, developEvent } from "../../../utils/developMaster";
import RoomSearcher from "../../../components/roomSearcher.tsx/RoomSearcher";
import BookingInfoModal from "./components/roomTypeCards/bookingInfoModal";
import isLast from "../../../utils/isLast";
import { IContext } from "../../bookingHost/BookingHostRouter";
import { ApolloQueryResult } from "apollo-client";
import BookingModalWrap from "../../../components/bookingModal/BookingModalWrap";
import { DEFAULT_BOOKING } from "../../../types/defaults";
import { divisionRoomSelectInfo } from "../../../utils/typeChanger";
import { to4YMMDD } from "../../../utils/setMidNight";
import {
  IBookingModalProp,
  IRoomSelectInfo
} from "../../../components/bookingModal/declaration";
import JDbox from "../../../atoms/box/JDbox";

export interface IBookerInfo {
  name: string;
  password: string;
  memo: string;
  email: string;
  phoneNumber: string;
  agreePrivacyPolicy: boolean;
}

export interface IReservationHooks {
  priceHook: TUseInput<number>;
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
  startBookingForPublicMu?: IMu<
    startBookingForPublic,
    startBookingForPublicVariables
  >;
  payAuthQu: (
    variables?: getPaymentAuthVariables | undefined
  ) => Promise<ApolloQueryResult<getPaymentAuth>>;
  createLoading: boolean;
  context?: IContext;
  reservationModalHook?: IUseModal;
}

const Reservation: React.SFC<IProps & WindowSizeProps> = ({
  windowWidth,
  startBookingForPublicMu,
  context,
  payAuthQu,
  createLoading,
  reservationModalHook
}) => {
  const isHost = context ? true : false;
  const houseId = context ? context.house._id : undefined;
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
  const confirmModalHook = useModal(false);
  // 모바일에서만 사용
  const [step, setStep] = useState<"search" | "select">("search");
  const [roomSelectInfo, setRoomSelectInfo] = useState<IRoomSelectInfo[]>([]);
  const [bookerInfo, setBookerInfo] = useState<IBookerInfo>(defaultBookingInfo);
  const rsevModalHook = useModal(false);
  const toastModalHook = useModal(false);
  const bookingInfoModal = useModal(false);
  const roomInfoHook = useState<IRoomType[]>([]);
  const bookingModalHook = useModal<IBookingModalProp>();
  const sendSmsHook = useCheckBox(isHost ? false : true);
  const priceHook = useInput(0);
  const payMethodHook = useSelect(PAYMETHOD_FOR_BOOKER_OP[0]);

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
      const { name, password, phoneNumber } = bookerInfo;
      location.href = insideRedirect(
        `outpage/checkReservation/${publicKey}/${name}/${phoneNumber}/${password}`
      );
    } else {
      location.reload();
    }
  };

  // Deprecated
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
    window.parent.postMessage({ height: theHeight }, "*");
  });

  //방선택 을 했는지 확인
  const roomSelectValidation = () => {
    if (isEmpty(roomSelectInfo)) {
      toastModalHook.openModal({ txt: LANG("no_room_selected") });
      return false;
    }
    return true;
  };

  // 예약전 벨리데이션
  const bookerInfoValidation = (): boolean => {
    if (isName(bookerInfo.name) !== true) {
      toastModalHook.openModal({ txt: LANG("name_is_not_valid") });
      return false;
    }
    if (isPhone(bookerInfo.phoneNumber) !== true) {
      toastModalHook.openModal({ txt: LANG("phoneNum_is_not_valid") });
      return false;
    }
    if (bookerInfo.password === "") {
      toastModalHook.openModal({ txt: LANG("input_your_password_please") });
      return false;
    }
    if (bookerInfo.agreePrivacyPolicy === false) {
      toastModalHook.openModal({
        txt: LANG("please_agree_collect_personal_info")
      });
      return false;
    }
    return true;
  };

  // 날자와 방현황에 따른  메세지 리턴
  const roomCardMessage = () => {
    if (!dayPickerHook.from) return LANG("please_slect_date_at_calender");
    if (dayPickerHook.from && !dayPickerHook.to)
      return LANG("please_select_checkOut_date");
    if (dayPickerHook.from && dayPickerHook.to)
      return LANG("there_is_no_room_in_selected_date");
    return "";
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

      if (!startBookingForPublicMu)
        throw Error("startBookingForPublicMu 가 없음");

      const startBookingVariables: startBookingForPublicVariables = {
        bookerParams: {
          agreePrivacyPolicy,
          email,
          memo,
          name,
          password,
          phoneNumber,
          funnels: Funnels.HOMEPAGE
        },
        checkInOut: {
          checkIn: to4YMMDD(dayPickerHook.from),
          checkOut: to4YMMDD(dayPickerHook.to)
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
          price: priceHook.value
        }
      };

      const tempResult = await startBookingForPublicMu({
        variables: startBookingVariables
      });

      if (tempResult) rsevModalHook.closeModal();

      const validResult = muResult(
        tempResult,
        "StartBookingForPublic",
        "bookingTransaction"
      );

      if (validResult && validResult.transactionId) {
        const { transactionId } = validResult;
        // 나이스 모듈 오픈전 인증을 받음.
        const authResult = await payAuthQu({ price: priceHook.value });
        if (authResult && authResult.data.GetPaymentAuth.auth) {
          const { GetPaymentAuth } = authResult.data;
          const { houseName } = GetPaymentAuth;
          openNiceModal({
            resvInfo: startBookingVariables,
            transactionId,
            authInfo: authResult.data.GetPaymentAuth,
            houseName: houseName || ""
          });
        }
      }
    }
  };

  // 예약하기 버튼 클릭1시
  const handleResvBtnClick = () => {
    if (roomSelectValidation()) {
      // 호스트가 하는 예약일경우 다른창으로
      if (isHost) {
        bookingModalHook.openModal({
          mode: "CREATE",
          createParam: {
            ...DEFAULT_BOOKING,
            checkOut: dayPickerHook.to,
            checkIn: dayPickerHook.from,
            ...divisionRoomSelectInfo(roomSelectInfo)
          }
        });
      } else {
        if (isMobile) {
          bookingInfoModal.openModal();
        } else {
          rsevModalHook.openModal();
        }
      }
    }
  };

  /* 모바일 날자 검색 UI */
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
            <h6 className="JDreservation__sectionTitle">
              ① {LANG("select_date")}
            </h6>
            {/* TODO: change 될때마다 roomSelectInfo를 초기화 해주어야함 */}
            <JDbox align="flexVcenter" size="small">
              {dayPickerHook.from?.toLocaleDateString() + " " + LANG("checkIn")}
            </JDbox>
            <JDbox align="flexVcenter" size="small">
              {dayPickerHook.to?.toLocaleDateString() + " " + LANG("checkOut")}
            </JDbox>
          </Card>
        </div>
        <div className="flex-grid__col JDreservation__roomSelect-grid col--full-8 col--lg-7 col--wmd-12">
          <Card
            fullWidth={isMobile}
            className="JDz-index-1 JDstandard-space0 JDreservation__card"
          >
            <h6 className="JDreservation__sectionTitle">
              ② {LANG("room_select")}
            </h6>
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
              className={`JDstandard-space0 JDmargin-bottom0 JDreservation__confirmCard JDreservation__card`}
            >
              <h6 className="JDreservation__sectionTitle">
                {LANG("check_selection")}
              </h6>
              <BookingInfoBox
                roomTypeInfo={roomInfoHook[0]}
                from={dayPickerHook.from}
                to={dayPickerHook.to}
                roomSelectInfo={roomSelectInfo}
                totalPrice={priceHook.value}
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
              label={LANG("go_back")}
              size="longLarge"
              className="JDmarginTop JDmargin-bottom0"
            />
          )}
          {!isEmpty(roomSelectInfo) && (
            <Button
              id="ResvBtn"
              thema="primary"
              onClick={handleResvBtnClick}
              label={LANG("make_reservation")}
              size="longLarge"
              className="JDmarginTop JDmargin-bottom0"
            />
          )}
        </div>
      </div>
      {/* 호스트예약일떄 */}
      {context && (
        <BookingModalWrap
          startBookingCallBack={result => {
            console.log("startBookingCallBackACTIVE");
            if (result !== "error") {
              reservationModalHook && reservationModalHook.closeModal();
            }
          }}
          context={context}
          modalHook={bookingModalHook}
        />
      )}
      {/* 게스트예약일떄 */}
      <PayMentModal
        bookingCompleteFn={bookingCompleteFn}
        createLoading={createLoading}
        reservationHooks={reservationHooks}
        modalHook={rsevModalHook}
      />
      {/* 모바일 + 게스트일떄 */}
      {isMobile && (
        <BookingInfoModal
          paymentModalHook={rsevModalHook}
          modalHook={bookingInfoModal}
          roomTypeInfo={roomInfoHook[0]}
          from={dayPickerHook.from}
          to={dayPickerHook.to}
          roomSelectInfo={roomSelectInfo}
          totalPrice={priceHook.value}
        />
      )}
      <JDtoastModal
        confirm
        center
        falseMessage={LANG("close")}
        confirmCallBackFn={resvConfirmCallBackFunc}
        {...confirmModalHook}
      />
      <JDtoastModal {...toastModalHook} isAlert />
    </div>
  );
};

export default windowSize<IProps>(ErrProtecter(Reservation));
