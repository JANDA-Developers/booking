import React, { Fragment, useState, useMemo } from "react";
import moment from "moment";
import Modal, { JDtoastModal } from "../../atoms/modal/Modal";
import {
  useInput,
  useSelect,
  IUseModal,
  useDayPicker,
  useModal,
  useDrawer,
  LANG
} from "../../hooks/hook";
import SelectBox from "../../atoms/forms/selectBox/SelectBox";
import InputText from "../../atoms/forms/inputText/InputText";
import Button from "../../atoms/button/Button";
import RoomSelectInfoTable from "./components/RoomSelectInfoTable";
import JDdayPicker from "../../atoms/dayPicker/DayPicker";
import {
  PaymentStatus,
  AutoSendWhen,
  DateFormat,
  WindowSize
} from "../../types/enum";
import {
  FUNNELS_OP,
  BOOKING_STATUS_OP,
  PAYMETHOD_FOR_HOST_OP,
  PAYMENT_STATUS_OP,
  CHECK_IN_OUT_OP
} from "../../types/const";
import "./BookingModal.scss";
import { GB_booking, BookingModalMode } from "../../types/interface";
import { MutationFn } from "react-apollo";
import {
  updateBooking,
  updateBookingVariables,
  deleteBooking,
  deleteBookingVariables,
  startBooking,
  startBookingVariables,
  Funnels,
  refundBookingVariables
} from "../../types/api";
import SendSMSmodalWrap from "../smsModal/SendSmsModalWrap";
import Preloader from "../../atoms/preloader/Preloader";
import { toast } from "react-toastify";
import { isPhone } from "../../utils/inputValidations";
import { autoComma, muResult, toNumber, isEmpty } from "../../utils/utils";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import _ from "lodash";
import C from "../../utils/C";
import RoomAssigedInfoTable from "./components/RoomAssigedInfoTable";
import {
  makeAssigInfo,
  makeSmsInfoParam,
  bookingModalValidate,
  bookingModalGetStartBookingVariables
} from "./helper";
import {
  getRoomSelectInfo,
  getGenderChangedGuest
} from "../../utils/typeChanger";
import { IBookingModalContext, IBookingModalProp } from "./declaration";
import JDLabel from "../../atoms/label/JDLabel";
import JDselect from "../../atoms/forms/selectBox/SelectBox";
import optionFineder from "../../utils/optionFinder";
import ModalEndSection from "../../atoms/modal/components/ModalEndSection";
import RefundModal from "../refundModal/RefundModal";
import CheckBox from "../../atoms/forms/checkBox/CheckBox";
import { IModalSMSinfo } from "../smsModal/SendSmsModal";

interface IProps {
  modalHook: IUseModal<IBookingModalProp>;
  bookingData: GB_booking;
  placeHolederPrice: number;
  startBookingMu: MutationFn<startBooking, startBookingVariables>;
  updateBookingMu: MutationFn<updateBooking, updateBookingVariables>;
  deleteBookingMu: MutationFn<deleteBooking, deleteBookingVariables>;
  startBookingLoading: boolean;
  refundFn: (variables: refundBookingVariables) => void;
  context: IContext;
  loading: boolean;
  mode?: BookingModalMode;
}

const BookingModal: React.FC<IProps> = ({
  modalHook,
  bookingData,
  updateBookingMu,
  startBookingMu,
  deleteBookingMu,
  startBookingLoading,
  placeHolederPrice,
  loading,
  context,
  refundFn,
  mode
}) => {
  const isCreateMode = mode === "CREATE" || mode === "CREATE_ASSIG";
  const {
    _id: bookingId,
    email,
    memo,
    createdAt,
    payment,
    phoneNumber,
    status: bookingStatus,
    checkIn,
    checkOut,
    checkInInfo,
    bookingNum,
    name,
    funnels,
    guests,
    breakfast: breakfastDefault
  } = bookingData;
  const refundModalHook = useModal(false);
  const { payMethod, status: paymentStatus, totalPrice, tid } = payment;
  const [refundAmt, setRefundAmt] = useState<number>(totalPrice);
  const { house } = context;
  const { _id: houseId } = house;
  const checkInOutHook = useSelect(
    optionFineder(CHECK_IN_OUT_OP, checkInInfo.isIn)
  );
  const [breakfast, setBreakfast] = useState(breakfastDefault);
  const sendSmsModalHook = useModal<IModalSMSinfo>(false);
  const confirmModalHook = useModal(false);
  const bookingNameHook = useInput(name);
  const bookingPhoneHook = useInput(phoneNumber, true);
  const priceHook = useInput(totalPrice || placeHolederPrice);
  const memoHook = useInput(memo || "");
  const emailHook = useInput(email);
  const isPhabletDown = window.innerWidth < WindowSize.TABLET;
  const [assigInfo, setAssigInfo] = useState(makeAssigInfo(guests));
  const modalStyle = {
    content: {
      maxWidth: "30rem"
    }
  };
  const payMethodHook = useSelect(
    isCreateMode ? null : { value: payMethod, label: LANG(payMethod) }
  );
  const deafultPayStatusOp = {
    value: paymentStatus,
    label: LANG("PaymentStatus", paymentStatus)
  };
  const createDefaultPayStatusOp = {
    value: PaymentStatus.COMPLETED,
    label: LANG("PaymentStatus", PaymentStatus.COMPLETED)
  };
  const paymentStatusHook = useSelect<PaymentStatus>(
    isCreateMode ? createDefaultPayStatusOp : deafultPayStatusOp
  );
  const funnelStatusHook = useSelect<Funnels | null>(
    funnels ? { value: funnels, label: LANG("Funnels", funnels) } : null
  );
  const bookingStatusHook = useSelect(
    isCreateMode
      ? BOOKING_STATUS_OP[0]
      : optionFineder(BOOKING_STATUS_OP, bookingStatus)
  );
  const resvDateHook = useDayPicker(
    moment(checkIn).toDate(),
    moment(checkOut).toDate()
  );
  const updateGuests = useMemo(() => {
    if (guests && mode === "CREATE_ASSIG")
      return getGenderChangedGuest(guests, assigInfo);
    return guests || [];
  }, [assigInfo, guests?.length]);
  const roomSelectInfo = useMemo(
    () => getRoomSelectInfo(updateGuests, bookingData.roomTypes || []),
    [bookingData.roomTypes?.length, assigInfo]
  );

  console.log(bookingData.roomTypes);
  console.log(roomSelectInfo);

  const bookingModalContext: IBookingModalContext = {
    bookingStatusHook,
    resvDateHook,
    paymentStatusHook,
    bookingNameHook,
    bookingPhoneHook,
    updateGuests,
    funnelStatusHook,
    priceHook,
    roomSelectInfo,
    payMethodHook,
    emailHook,
    guests,
    memoHook,
    assigInfo,
    houseId,
    mode
  };

  // SMS 발송 모달에 전달할 정보를 생성
  const smsModalInfoTemp = makeSmsInfoParam(
    bookingModalContext,
    modalHook.info.bookingId || bookingId,
    context
  );

  // 예약삭제 여부를 물어보는 버튼 컬백함수
  const deleteModalCallBackFn = (confirm: boolean) => {
    if (confirm) {
      deleteBookingMu({
        variables: {
          bookingId: modalHook.info.bookingId || ""
        }
      });
    }
  };

  // smsIcon 핸들
  const handleSmsIconClick = () => {
    if (!bookingPhoneHook.isValid) {
      toast.warn(LANG("not_a_valid_mobile_number"));
      return;
    }
    sendSmsModalHook.openModal({
      ...smsModalInfoTemp,
      mode: isCreateMode ? "CreateBooking" : undefined
    });
  };

  // 예약삭제 버튼 클릭
  const handleDeletBtnClick = () => {
    confirmModalHook.openModal({
      txt: LANG("are_you_sure_you_want_to_delete_the_reservation")
    });
  };

  // 부킹모달 예약 명령
  const startBooking = async (callBackStartBooking?: any) => {
    if (!bookingModalValidate(bookingModalContext)) return;

    try {
      const result = await startBookingMu({
        variables: bookingModalGetStartBookingVariables(bookingModalContext)
      });
      if (muResult(result, "StartBooking")) callBackStartBooking();
    } catch (error) {
      modalHook.closeModal();
    }
  };

  // 예약생성 버튼 핸들
  const handleCreateBtnClick = () => {
    if (modalHook.info.onStartBookingStart)
      modalHook.info.onStartBookingStart();
    if (!bookingData.roomTypes) return;

    const smsCallBackFn = async (sendFlag: boolean, sendSmsMu: any) => {
      if (sendFlag) startBooking(sendSmsMu);
      else startBooking();
    };

    sendSmsModalHook.openModal({
      ...smsModalInfoTemp,
      findSendCase: AutoSendWhen.WHEN_BOOKING_CREATED,
      callBackFn: smsCallBackFn,
      mode: "CreateBooking"
    });
  };

  // 예약수정 버튼 핸들
  const handleUpdateBtnClick = () => {
    if (!bookingModalValidate(bookingModalContext)) return;
    // SMS 인포를 꺼내서 발송할 SMS 문자가 있는지 확인해야할것 같다.
    updateBookingMu({
      variables: {
        bookingId: modalHook.info.bookingId!,
        params: {
          email: "demo@naver.com",
          memo: memoHook.value,
          checkInInfo: {
            isIn: checkInOutHook.selectedOption?.value || false
          },
          breakfast,
          name: bookingNameHook.value,
          payMethod: payMethodHook.selectedOption!.value,
          paymentStatus: paymentStatusHook.selectedOption!.value,
          bookingStatus: bookingStatusHook.selectedOption!.value,
          phoneNumber: bookingPhoneHook.value,
          price: toNumber(priceHook.value),
          funnels: funnelStatusHook.selectedOption?.value || null
        }
      }
    });
    modalHook.closeModal();
  };

  const handleRefundBtn = () => {
    if (!tid) return;
    refundFn({
      param: {
        bookingNum,
        refundInfo: {
          cancelAmt: refundAmt,
          cancelMsg: "HOST-CANCEL",
          isPartialCancel: refundAmt === totalPrice,
          tid
        }
      }
    });
  };

  return (
    <Modal
      style={modalStyle}
      paddingSize="large"
      {...modalHook}
      onAfterClose={() => {
        modalHook.info.onCloseModal && modalHook.info.onCloseModal();
      }}
      className={`Modal bookingModal`}
      overlayClassName="Overlay"
      loading={loading || startBookingLoading}
    >
      <Preloader size={"large"} loading={loading || startBookingLoading} />
      {loading || startBookingLoading || (
        <Fragment>
          <div className={`JDz-index-1 ${isPhabletDown || "flex-grid-grow"}`}>
            <div className="modal__section flex-grid__col ">
              <h5>{LANG("booker_info")}</h5>
              <div
                className={`JDflex JDflex--oneone ${isPhabletDown ||
                  "JDflex--column"}`}
              >
                <InputText
                  id="BookerNameInput"
                  mr={isPhabletDown ? undefined : "no"}
                  {...bookingNameHook}
                  label={LANG("booker")}
                  placeholder={LANG("booker")}
                />
                <InputText
                  id="BookerPhoneInput"
                  mr={isPhabletDown ? undefined : "no"}
                  {...bookingPhoneHook}
                  validation={isPhone}
                  hyphen
                  label={LANG("phoneNumber")}
                  placeholder={LANG("phoneNumber")}
                  icon={isCreateMode ? undefined : "sms"}
                  iconHover={!isCreateMode}
                  iconOnClick={handleSmsIconClick}
                />
                <SelectBox
                  id="FunnelSelect"
                  mr={isPhabletDown ? undefined : "no"}
                  {...funnelStatusHook}
                  options={FUNNELS_OP}
                  label={LANG("funnels")}
                />
              </div>
            </div>
            <div className="modal__section flex-grid__col  ">
              <h5>{LANG("payment_info")}</h5>
              <div
                className={`JDflex JDflex--oneone ${isPhabletDown ||
                  "JDflex--column"}`}
              >
                <InputText
                  id="PriceHook"
                  mr={isPhabletDown ? undefined : "no"}
                  placeholder={`${LANG("normal_price")}:${autoComma(
                    placeHolederPrice
                  )}`}
                  comma
                  label={LANG("total_price")}
                  {...priceHook}
                  value={toNumber(priceHook.value)}
                />
                <SelectBox
                  id="PayMethodSelect"
                  mr={isPhabletDown ? undefined : "no"}
                  {...payMethodHook}
                  options={PAYMETHOD_FOR_HOST_OP}
                  label={LANG("method_of_payment")}
                />
                <SelectBox
                  mr={isPhabletDown ? undefined : "no"}
                  {...paymentStatusHook}
                  options={PAYMENT_STATUS_OP}
                  label={LANG("payment_status")}
                />
              </div>
            </div>
            <div className="flex-grid__col modal__section">
              <h5>
                {LANG("reservation_information")}{" "}
                {/* <Drawer size={"small"} {...assigInfoDrawHook} /> */}
              </h5>
              <div
                className={`JDflex JDflex--oneone ${isPhabletDown ||
                  "JDflex--column"}`}
              >
                <SelectBox
                  mr={isPhabletDown ? undefined : "no"}
                  {...bookingStatusHook}
                  options={BOOKING_STATUS_OP}
                  label={LANG("booking_status")}
                />
                <JDdayPicker
                  mr={isPhabletDown ? undefined : "no"}
                  displayIcon={false}
                  canSelectBeforeDay={false}
                  {...resvDateHook}
                  mode="input"
                  className="JDstandard-space"
                  readOnly
                  label={LANG("date_of_stay")}
                />
                <InputText
                  mr={isPhabletDown ? undefined : "no"}
                  readOnly
                  value={moment(createdAt || undefined)
                    .local()
                    .format(DateFormat.WITH_TIME)}
                  label={LANG("reservation_date")}
                  placeholder={LANG("reservation_date")}
                />
              </div>
            </div>
            <div className="flex-grid__col modal__section">
              <h5>{LANG("room_assig_info")}</h5>
              <JDLabel txt={LANG("people_and_room_info")} />
              <RoomSelectInfoTable roomSelectInfo={roomSelectInfo} />
              {mode !== "CREATE" && (
                <Fragment>
                  <JDLabel txt={LANG("assig_info")} />
                  <RoomAssigedInfoTable
                    setAssigInfo={setAssigInfo}
                    assigInfo={assigInfo}
                    guestsData={guests || []}
                  />
                </Fragment>
              )}
            </div>
            <div className="JDz-index-1 modal__section flex-grid__col  ">
              <h5>{LANG("else")}</h5>
              <div>
                <InputText
                  {...memoHook}
                  halfHeight
                  textarea
                  label={LANG("memo")}
                />
              </div>
              <div>
                <JDselect
                  options={CHECK_IN_OUT_OP}
                  label={LANG("check_in_slash_check_out")}
                  {...checkInOutHook}
                />
              </div>
              <div>
                <InputText
                  value={bookingNum}
                  label={LANG("booking_number")}
                  readOnly
                />
              </div>
              <div>
                <CheckBox
                  label={LANG("breakfast")}
                  checked={breakfast}
                  onChange={v => {
                    setBreakfast(v);
                  }}
                />
              </div>
            </div>
          </div>
          <ModalEndSection>
            <Button
              id="BookingModalCreateBtn"
              size="small"
              label={LANG("do_create")}
              disabled={!isCreateMode}
              thema="primary"
              mode="flat"
              onClick={handleCreateBtnClick}
              tabIndex={0}
            />
            <Button
              id="BookingModalUpdateBtn"
              mode="flat"
              size="small"
              disabled={isCreateMode}
              label={LANG("do_modify")}
              thema="primary"
              onClick={handleUpdateBtnClick}
            />
            <Button
              id="BookingModalDeleteBtn"
              mode="flat"
              size="small"
              label={LANG("delete_booking")}
              disabled={isCreateMode}
              thema="error"
              onClick={handleDeletBtnClick}
            />
            {/* {paymentStatus === PaymentStatus.COMPLETED &&
              payMethod === PayMethod.CARD && (
                <Button
                  id="BookingModalRefundBtn"
                  mode="flat"
                  size="small"
                  label={LANG("refund")}
                  thema="error"
                  onClick={() => {
                    refundModalHook.openModal();
                  }}
                />
              )} */}
          </ModalEndSection>
          <RefundModal
            onRefundClick={handleRefundBtn}
            setRefundAmt={setRefundAmt}
            refundAmt={refundAmt}
            modalHook={refundModalHook}
          />
          <SendSMSmodalWrap
            isInBookingModal
            context={context}
            modalHook={sendSmsModalHook}
          />
          <JDtoastModal
            confirm
            confirmCallBackFn={deleteModalCallBackFn}
            {...confirmModalHook}
          />
        </Fragment>
      )}
    </Modal>
  );
};

export default BookingModal;

// ℹ️ 배정달력 예약생성 플로우
// 배정 달력 선택정보 -> 예약정보로 변환(Booking) -> 배정정보로 변환(Guest 하나당 배정정보) -> (예약정보 및 방배정) 정보로 변환
