import React, {Fragment, useState} from "react";
import moment from "moment";
import Modal, {JDtoastModal} from "../../atoms/modal/Modal";
import {
  useInput,
  useSelect,
  IUseModal,
  useDayPicker,
  useModal
} from "../../hooks/hook";
import SelectBox from "../../atoms/forms/selectBox/SelectBox";
import InputText from "../../atoms/forms/inputText/InputText";
import Button from "../../atoms/button/Button";
import RoomSelectInfoTable from "./components/RoomSelectInfoTable";
import JDdayPicker from "../../atoms/dayPicker/DayPicker";
import {
  BOOKING_STATUS_OP,
  PAYMENT_STATUS_OP,
  PricingType,
  PaymentStatusKr,
  PayMethodKr,
  BookingStatusKr,
  BookingModalType,
  PaymentStatus,
  AutoSendWhen,
  PAYMETHOD_FOR_HOST_OP,
  DateFormat,
  BookingStatus
} from "../../types/enum";
import "./BookingModal.scss";
import {GB_booking, IGuestCount} from "../../types/interface";
import {MutationFn} from "react-apollo";
import {
  updateBooking,
  updateBookingVariables,
  deleteBooking,
  deleteBookingVariables,
  startBooking,
  startBookingVariables,
  allocateGuestToRoom,
  allocateGuestToRoomVariables
} from "../../types/api";
import SendSMSmodalWrap, {IModalSMSinfo} from "../smsModal/SendSmsModalWrap";
import Preloader from "../../atoms/preloader/Preloader";
import {toast} from "react-toastify";
import {isPhone} from "../../utils/inputValidations";
import {autoComma} from "../../utils/utils";
import {IContext} from "../../pages/MiddleServerRouter";
import Drawer from "../../atoms/drawer/Drawer";
import _ from "lodash";
import C, {inOr} from "../../utils/C";
import guestsToInput, {
  getRoomSelectInfo
} from "../../utils/guestCountByRoomType";

export interface IRoomSelectInfo {
  roomTypeId: string;
  roomTypeName?: string;
  count: IGuestCount;
  pricingType: PricingType;
  roomNames?: string[];
}

interface IProps {
  modalHook: IUseModal;
  // 👿 bookingData 이렇게 광범위하게 받지말고 필요한부분만 포함 [foo:string]:any 로서 받을수있도록
  bookingData: GB_booking;
  placeHolederPrice: number;
  startBookingMu: MutationFn<startBooking, startBookingVariables>;
  updateBookingMu: MutationFn<updateBooking, updateBookingVariables>;
  deleteBookingMu: MutationFn<deleteBooking, deleteBookingVariables>;
  startBookingLoading: boolean;
  allocateGuestToRoomMu: MutationFn<
    allocateGuestToRoom,
    allocateGuestToRoomVariables
  >;
  context: IContext;
  loading: boolean;
  type?: BookingModalType;
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
  context
}) => {
  const {
    _id: bookingId,
    email,
    memo,
    payment,
    phoneNumber,
    status: bookingStatus,
    checkIn,
    checkOut,
    name
  } = bookingData;
  const {payMethod, status: paymentStatus, totalPrice} = payment;
  const {house} = context;
  const {_id: houseId} = house;
  const sendSmsModalHook = useModal<IModalSMSinfo>(false);
  const confirmModalHook = useModal(false);
  const bookingNameHook = useInput(name);
  const bookingPhoneHook = useInput(phoneNumber);
  const priceHook = useInput(totalPrice);
  const memoHook = useInput(memo || "");
  const emailHook = useInput(email);
  const guestsToInputs = guestsToInput(bookingData.guests || []);
  const roomSelectInfo = getRoomSelectInfo(
    bookingData.guests,
    bookingData.roomTypes || []
  );
  const [drawers, setDrawers] = useState({
    bookerInfo: false
  });
  const payMethodHook = useSelect(
    C(
      bookingId !== "default",
      {value: payMethod, label: PayMethodKr[payMethod]},
      null
    )
  );
  const paymentStatusHook = useSelect<PaymentStatus>(
    C(
      bookingId !== "default",
      {value: paymentStatus, label: PaymentStatusKr[paymentStatus]},
      null
    )
  );
  const bookingStatueHook = useSelect(
    C(
      bookingId !== "default",
      {
        value: bookingStatus,
        label: BookingStatusKr[bookingStatus]
      },
      null
    )
  );
  const isProgressing = bookingStatus === BookingStatus.PROGRESSING;
  const allReadOnly = isProgressing;

  const resvDateHook = useDayPicker(
    moment(checkIn).toDate(),
    moment(checkOut).toDate()
  );

  const validate = () => {
    if (!paymentStatusHook.selectedOption) {
      toast.warn("결제방법을 선택해주세요.");
      return false;
    }

    if (!paymentStatusHook.selectedOption) {
      toast.warn("결제상태를 선택해주세요.");
      return false;
    }

    if (!bookingStatueHook.selectedOption) {
      toast.warn("예약상태를 선택해주세요.");
      return false;
    }

    if (!bookingNameHook.value) {
      toast.warn("부킹이름을 입력해주세요.");
      return false;
    }

    if (!bookingPhoneHook.value) {
      toast.warn("예약자번호를 입력해주세요.");
      return false;
    }
    return true;
  };

  const handleSmsIconClick = () => {
    if (!bookingPhoneHook.isValid) {
      toast.warn("올바른 휴대폰 번호가 아닙니다.");
      return;
    }
    sendSmsModalHook.openModal({
      ...smsModalInfoTemp,
      createMode: true
    });
  };

  // SMS 오토 완성을 위한 정보
  const smsModalInfoTemp: IModalSMSinfo = {
    receivers: [bookingPhoneHook.value],
    booking: {
      name: bookingNameHook.value,
      payMethod: inOr(payMethodHook.selectedOption, "label", ""),
      email: emailHook.value,
      phoneNumber: bookingPhoneHook.value,
      end: resvDateHook.to!,
      start: resvDateHook.from!,
      paymentStatus: inOr(paymentStatusHook.selectedOption, "label", ""),
      price: priceHook.value || 0
    }
  };

  // 예약삭제 버튼 클릭
  const handleDeletBtnClick = () => {
    confirmModalHook.openModal({txt: "정말 예약을 삭제하시겠습니까?"});
  };

  const deleteModalCallBackFn = (confirm: boolean) => {
    if (confirm) {
      deleteBookingMu({
        variables: {
          bookingId: modalHook.info.bookingId
        }
      });
    }
  };

  // 예약 실패시
  const whenCreateBookingFail = () => {
    modalHook.closeModal();
  };

  // 현재 정보들로 예약 진행
  const startBooking = async (sendSmsFlag: boolean = false) => {
    if (!validate()) return;

    try {
      await startBookingMu({
        variables: {
          bookerParams: {
            agreePrivacyPolicy: true,
            email: "demo@naver.com",
            memo: memoHook.value,
            name: bookingNameHook.value,
            password: "admin",
            phoneNumber: bookingPhoneHook.value
          },
          checkInOut: {
            checkIn: resvDateHook.from,
            checkOut: resvDateHook.to
          },
          guestDomitoryParams: guestsToInputs.countInDomitorys,
          guestRoomParams: guestsToInputs.countInRooms,
          paymentParams: {
            payMethod: payMethodHook.selectedOption!.value,
            price: priceHook.value,
            status: paymentStatusHook.selectedOption!.value
          },
          houseId
          // sendSmsFlag
        }
      });
    } catch (error) {
      whenCreateBookingFail();
    }
  };

  // 예약생성
  const handleCreateBtnClick = () => {
    if (!bookingData.roomTypes) return;

    const smsCallBackFn = async (flag: boolean) => {
      startBooking(flag);
    };

    sendSmsModalHook.openModal({
      ...smsModalInfoTemp,
      autoSendWhen: AutoSendWhen.WHEN_BOOKING_CREATED,
      createMode: false,
      callBackFn: smsCallBackFn
    });
  };

  // 예약수정
  const handleUpdateBtnClick = () => {
    if (!validate()) return;
    // SMS 인포를 꺼내서 발송할 SMS 문자가 있는지 확인해야할것 같다.
    updateBookingMu({
      variables: {
        bookingId: modalHook.info.bookingId,
        params: {
          email: "demo@naver.com",
          memo: memoHook.value,
          checkInInfo: {
            isIn: bookingData.checkIn.isIn || false
          },
          name: bookingNameHook.value,
          payMethod: payMethodHook.selectedOption!.value,
          paymentStatus: paymentStatusHook.selectedOption!.value,
          bookingStatus: bookingStatueHook.selectedOption!.value,
          phoneNumber: bookingPhoneHook.value,
          price: priceHook.value
        }
      }
    });
    modalHook.closeModal();
  };

  return (
    <Modal
      style={{
        content: {
          maxWidth: "30rem"
        }
      }}
      {...modalHook}
      className="Modal bookingModal"
      overlayClassName="Overlay"
    >
      <Preloader size={"large"} loading={loading || startBookingLoading} />
      {loading || startBookingLoading || (
        <Fragment>
          <div className="modal__section">
            <h6>
              예약자정보{" "}
              <Drawer
                onClick={e => {
                  setDrawers({bookerInfo: !drawers.bookerInfo});
                }}
                open={drawers.bookerInfo}
              />
            </h6>
            <div className="flex-grid">
              <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
                <InputText
                  disabled={allReadOnly}
                  {...bookingNameHook}
                  label="예약자"
                />
              </div>
              <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
                <InputText
                  disabled={allReadOnly}
                  {...bookingPhoneHook}
                  validation={isPhone}
                  hyphen
                  label="전화번호"
                  icon="sms"
                  iconHover
                  iconOnClick={handleSmsIconClick}
                />
              </div>
              <div className="JD-z-index-1 flex-grid__col col--full-4 col--lg-4 col--md-4">
                <SelectBox
                  // disabled={allReadOnly}
                  {...bookingStatueHook}
                  options={BOOKING_STATUS_OP}
                  label="예약상태"
                />
              </div>
            </div>
          </div>
          <div className="modal__section">
            <h6>결제정보</h6>
            <div className="flex-grid">
              <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
                <InputText
                  disabled={allReadOnly}
                  {...priceHook}
                  placeholder={`정상가:${autoComma(placeHolederPrice)}`}
                  returnNumber
                  comma
                  label="총금액"
                />
              </div>
              <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
                <SelectBox
                  disabled={allReadOnly}
                  {...payMethodHook}
                  options={PAYMETHOD_FOR_HOST_OP}
                  label="결제수단"
                />
              </div>
              <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
                <SelectBox
                  disabled={allReadOnly}
                  {...paymentStatusHook}
                  options={PAYMENT_STATUS_OP}
                  label="결제상태"
                />
              </div>
            </div>
          </div>
          <div className="modal__section">
            <h6>예약정보</h6>
            <div className="flex-grid">
              <div className="flex-grid__col col--full-8 col--lg-8 col--md-8">
                <JDdayPicker
                  inputDisabled={allReadOnly}
                  canSelectBeforeDay={false}
                  {...resvDateHook}
                  input
                  readOnly
                  label="숙박일자"
                />
              </div>
              <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
                <InputText
                  disabled={allReadOnly}
                  readOnly
                  value={moment()
                    .local()
                    .format(DateFormat.WITH_TIME)}
                  label="예약일시"
                />
              </div>
              <div className="flex-grid__col col--full-12 col--lg-12 col--md-12">
                <RoomSelectInfoTable roomSelectInfo={roomSelectInfo} />
              </div>
            </div>
          </div>
          <div className="JDz-index-1 modal__section">
            <div className="flex-grid">
              <div className="flex-grid__col col--full-12 col--lg-12 col--md-12">
                <InputText
                  disabled={allReadOnly}
                  {...memoHook}
                  halfHeight
                  textarea
                  label="예약메모"
                />
              </div>
            </div>
          </div>
          <div className="JDmodal__endSection">
            <Button
              size="small"
              label="생성하기"
              disabled={allReadOnly}
              thema="primary"
              onClick={handleCreateBtnClick}
            />
            <Button
              size="small"
              // disabled={allReadOnly}
              label="수정하기"
              thema="primary"
              onClick={handleUpdateBtnClick}
            />
            <Button
              size="small"
              label="예약삭제"
              disabled={allReadOnly}
              thema="error"
              onClick={handleDeletBtnClick}
            />
          </div>
        </Fragment>
      )}
      <SendSMSmodalWrap context={context} modalHook={sendSmsModalHook} />
      <JDtoastModal
        confirm
        confirmCallBackFn={deleteModalCallBackFn}
        {...confirmModalHook}
      />
    </Modal>
  );
};
export default BookingModal;
