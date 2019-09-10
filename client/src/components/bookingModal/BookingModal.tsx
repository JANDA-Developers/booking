import React, {Fragment} from "react";
import moment from "moment";
import Modal, {JDtoastModal} from "../../atoms/modal/Modal";
import {
  useInput,
  useSelect,
  IUseModal,
  useDayPicker,
  useModal
} from "../../actions/hook";
import SelectBox from "../../atoms/forms/selectBox/SelectBox";
import InputText from "../../atoms/forms/inputText/InputText";
import Button from "../../atoms/button/Button";
import RoomSelectInfoTable from "./components/roomSelectInfoTable";
import JDdayPicker from "../../atoms/dayPicker/DayPicker";
import {
  BOOKING_STATUS_OP,
  PAYMENT_STATUS_OP,
  PricingType,
  PaymentStatusKr,
  PayMethodKr,
  BookingStatus,
  BookingStatusKr,
  BookingModalType,
  PaymentStatus,
  AutoSendWhen,
  PAYMETHOD_FOR_BOOKER_OP,
  PAYMETHOD_FOR_HOST_OP
} from "../../types/enum";
import "./BookingModal.scss";
import {GB_booking, IResvCount} from "../../types/interface";
import {getRoomTypePerGuests} from "../../utils/booking";
import {MutationFn} from "react-apollo";
import {
  updateBooking,
  updateBookingVariables,
  deleteBooking,
  deleteBookingVariables,
  createBooking,
  createBookingVariables,
  allocateGuestToRoom,
  allocateGuestToRoomVariables,
  createBooking_CreateBooking_booking,
  createBooking_CreateBooking
} from "../../types/api";
import {GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM} from "../../queries";
import SendSMSmodalWrap, {IModalSMSinfo} from "../smsModal/SendSmsModalWrap";
import {
  IAssigInfo,
  IAssigTimelineUtils
} from "../../pages/middleServer/assig/components/assigIntrerface";
import Preloader from "../../atoms/preloader/Preloader";
import {validate} from "graphql";
import {toast} from "react-toastify";
import {isPhone} from "../../utils/inputValidations";
import {autoComma, muResult} from "../../utils/utils";
import {async} from "q";
import {IContext} from "../../pages/MiddleServerRouter";
import {FetchResult} from "apollo-link";

export interface IRoomSelectInfoTable {
  roomTypeId: string;
  roomTypeName: string;
  count: IResvCount;
  pricingType: PricingType;
}

interface IProps {
  modalHook: IUseModal;
  // 👿 bookingData 이렇게 광범위하게 받지말고 필요한부분만 포함 [foo:string]:any 로서 받을수있도록
  bookingData: GB_booking;
  placeHolederPrice: number;
  createBookingMu: MutationFn<createBooking, createBookingVariables>;
  updateBookingMu: MutationFn<updateBooking, updateBookingVariables>;
  deleteBookingMu: MutationFn<deleteBooking, deleteBookingVariables>;
  createBookingLoading: boolean;
  allocateGuestToRoomMu: MutationFn<
    allocateGuestToRoom,
    allocateGuestToRoomVariables
  >;
  assigInfo: IAssigInfo[];
  context: IContext;
  loading: boolean;
  type?: BookingModalType;
}

const POPbookingInfo: React.FC<IProps> = ({
  modalHook,
  bookingData,
  updateBookingMu,
  createBookingMu,
  deleteBookingMu,
  createBookingLoading,
  allocateGuestToRoomMu,
  placeHolederPrice,
  loading,
  type = BookingModalType.LOOKUP,
  context
}) => {
  const {house} = context;
  const {_id: houseId} = house;
  const sendSmsModalHook = useModal<IModalSMSinfo>(false);
  const confirmModalHook = useModal(false);
  const bookingNameHook = useInput(bookingData.name);
  const bookingPhoneHook = useInput(bookingData.phoneNumber);
  const priceHook = useInput(bookingData.price);
  const memoHook = useInput(bookingData.memo || "");
  const payMethodHook = useSelect(
    bookingData._id !== "default"
      ? {
          value: bookingData.payMethod,
          // @ts-ignore
          label: PayMethodKr[bookingData.payMethod]
        }
      : null
  );
  const paymentStatusHook = useSelect<PaymentStatus>(
    bookingData._id !== "default"
      ? {
          value: bookingData.paymentStatus,
          // @ts-ignore
          label: PaymentStatusKr[bookingData.paymentStatus]
        }
      : null
  );
  const bookingStatueHook = useSelect(
    bookingData._id !== "default"
      ? {
          value: bookingData.bookingStatus,
          label: BookingStatusKr[bookingData.bookingStatus]
        }
      : null
  );

  const resvDateHook = useDayPicker(
    moment(bookingData.checkIn).toDate(),
    moment(bookingData.checkOut).toDate()
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

  const roomTypePerGuests: IRoomSelectInfoTable[] = getRoomTypePerGuests(
    bookingData
  );

  const smsModalInfoTemp: IModalSMSinfo = {
    receivers: [bookingPhoneHook.value],
    booking: {
      end: resvDateHook.to!,
      name: bookingNameHook.value,
      payMethod: payMethodHook.selectedOption
        ? payMethodHook.selectedOption.label
        : "",
      phoneNumber: bookingPhoneHook.value,
      start: resvDateHook.from!,
      paymentStatus: paymentStatusHook.selectedOption
        ? paymentStatusHook.selectedOption.label
        : "",
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

  const whenCreateBookingFail = () => {
    modalHook.closeModal();
  };

  const createBooking = async (sendSmsFlag: boolean = false) => {
    if (!validate()) return;

    try {
      await createBookingMu({
        variables: {
          bookingParams: {
            checkIn: resvDateHook.from,
            bookerParams: {
              house: houseId,
              price: priceHook.value || 0,
              name: bookingNameHook.value,
              password: "admin",
              phoneNumber: bookingPhoneHook.value,
              email: "demo@naver.com",
              agreePrivacyPolicy: true,
              memo: memoHook.value,
              paymentStatus:
                paymentStatusHook.selectedOption &&
                paymentStatusHook.selectedOption.value
            },
            checkOut: resvDateHook.to,
            guestInputs: roomTypePerGuests.map(data => ({
              roomTypeId: data.roomTypeId,
              pricingType: data.pricingType,
              countFemaleGuest: data.count.female,
              countMaleGuest: data.count.male,
              countRoom:
                data.pricingType === PricingType.ROOM ? data.count.roomCount : 0
            }))
          },
          sendSmsFlag
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
      createBooking(flag);
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
      <Preloader size={"large"} loading={loading || createBookingLoading} />
      {loading || createBookingLoading || (
        <Fragment>
          <div className="modal__section">
            <h6>예약자정보</h6>
            <div className="flex-grid">
              <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
                <InputText {...bookingNameHook} label="예약자" />
              </div>
              <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
                <InputText
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
                  {...priceHook}
                  placeholder={`정상가:${autoComma(placeHolederPrice)}`}
                  returnNumber
                  comma
                  label="총금액"
                />
              </div>
              <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
                <SelectBox
                  {...payMethodHook}
                  options={PAYMETHOD_FOR_HOST_OP}
                  label="결제수단"
                />
              </div>
              <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
                <SelectBox
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
                  selectBeforeDay={false}
                  {...resvDateHook}
                  input
                  readOnly
                  label="숙박일자"
                />
              </div>
              <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
                <InputText
                  readOnly
                  value={moment().format("YYYY-MM-DD")}
                  label="예약일시"
                />
              </div>
              <div className="flex-grid__col col--full-12 col--lg-12 col--md-12">
                <RoomSelectInfoTable resvInfo={roomTypePerGuests} />
              </div>
            </div>
          </div>
          <div className="JDz-index-1 modal__section">
            <div className="flex-grid">
              <div className="flex-grid__col col--full-12 col--lg-12 col--md-12">
                <InputText {...memoHook} halfHeight textarea label="예약메모" />
              </div>
            </div>
          </div>
          <div className="JDmodal__endSection">
            <Button
              size="small"
              label="생성하기"
              disabled={type === BookingModalType.LOOKUP}
              thema="primary"
              onClick={handleCreateBtnClick}
            />
            <Button
              size="small"
              disabled={type !== BookingModalType.LOOKUP}
              label="수정하기"
              thema="primary"
              onClick={handleUpdateBtnClick}
            />
            <Button
              size="small"
              label="예약삭제"
              disabled={type !== BookingModalType.LOOKUP}
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
export default POPbookingInfo;
