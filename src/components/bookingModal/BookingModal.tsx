import React, {Fragment, useState} from "react";
import moment from "moment";
import Modal, {JDtoastModal} from "../../atoms/modal/Modal";
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
  BOOKING_STATUS_OP,
  PAYMENT_STATUS_OP,
  PricingType,
  BookingModalModes,
  PaymentStatus,
  AutoSendWhen,
  PAYMETHOD_FOR_HOST_OP,
  DateFormat,
  BookingStatus,
  Gender
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
  allocateGuestToRoomVariables,
  getBooking_GetBooking_booking_guests,
  getBooking_GetBooking_booking_guests_GuestDomitory
} from "../../types/api";
import SendSMSmodalWrap, {IModalSMSinfo} from "../smsModal/SendSmsModalWrap";
import Preloader from "../../atoms/preloader/Preloader";
import {toast} from "react-toastify";
import {isPhone} from "../../utils/inputValidations";
import {autoComma, instanceOfA} from "../../utils/utils";
import {IContext} from "../../pages/MiddleServerRouter";
import Drawer from "../../atoms/drawer/Drawer";
import _ from "lodash";
import C, {inOr} from "../../utils/C";
import guestsToInput, {
  getRoomSelectInfo
} from "../../utils/guestCountByRoomType";
import RoomAssigedInfoTable from "./components/RoomAssigedInfoTable";

// (예약/게스트) 정보
export interface IBookingModal_AssigInfo {
  _id: string;
  roomId: string;
  gender: Gender | null;
  bedIndex: number;
  pricingType: PricingType;
}

//  (예약/방타입) 정보
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
  mode?: BookingModalModes;
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
  mode
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
    name,
    guests
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
  const assigInfoDrawHook = useDrawer(mode === BookingModalModes.CREATE);
  const roomSelectInfo = getRoomSelectInfo(
    bookingData.guests,
    bookingData.roomTypes || []
  );

  const defaultAssigInfo: IBookingModal_AssigInfo[] = guests
    ? guests.map(guest => {
        if (
          instanceOfA<getBooking_GetBooking_booking_guests_GuestDomitory>(
            guest,
            "gender"
          )
        ) {
          return {
            _id: guest._id,
            roomId: inOr(guest.room, "_id", ""),
            gender: guest.gender || Gender.MALE,
            bedIndex: guest.bedIndex,
            pricingType: guest.pricingType
          };
        } else {
          return {
            _id: guest._id,
            roomId: inOr(guest.room, "_id", ""),
            gender: null,
            bedIndex: 0,
            pricingType: guest.pricingType
          };
        }
      })
    : [];

  const [assigInfo, setAssigInfo] = useState(defaultAssigInfo);
  const [drawers, setDrawers] = useState({
    bookerInfo: false
  });
  const payMethodHook = useSelect(
    C(
      bookingId !== "default",
      // @ts-ignore
      {value: payMethod, label: LANG(payMethod)},
      null
    )
  );
  const paymentStatusHook = useSelect<PaymentStatus>(
    C(
      bookingId !== "default",
      // @ts-ignore
      {value: paymentStatus, label: LANG("PaymentStatus", paymentStatus)},
      null
    )
  );
  const bookingStatueHook = useSelect(
    C(
      bookingId !== "default",
      {
        value: bookingStatus,
        // @ts-ignore
        label: LANG(bookingStatus)
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
    // TODO 젠더 셀렉트 벨리데이션

    if (!paymentStatusHook.selectedOption) {
      toast.warn(LANG("please_select_a_payment_method"));
      return false;
    }

    if (!paymentStatusHook.selectedOption) {
      toast.warn(LANG("please_select_a_payment_status"));
      return false;
    }

    if (!bookingStatueHook.selectedOption) {
      toast.warn(LANG("please_select_reservation_status"));
      return false;
    }

    if (!bookingNameHook.value) {
      toast.warn(LANG("please_enter_booker_name"));
      return false;
    }

    if (!bookingPhoneHook.value) {
      toast.warn(LANG("please_enter_phone_number"));
      return false;
    }
    return true;
  };

  const handleSmsIconClick = () => {
    if (!bookingPhoneHook.isValid) {
      toast.warn(LANG("not_a_valid_mobile_number"));
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
    confirmModalHook.openModal({
      txt: LANG("are_you_sure_you_want_to_delete_the_reservation")
    });
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

    // 예약자가 변경한 성별사항 적용한 임시 게스트정보 생성
    const getGenderChangedGuest = (): getBooking_GetBooking_booking_guests[] => {
      if (guests) {
        return guests.map(guest => {
          const copyGuest = guest;
          assigInfo.forEach(info => {
            if (
              instanceOfA<getBooking_GetBooking_booking_guests_GuestDomitory>(
                copyGuest,
                "gender"
              )
            ) {
              if (copyGuest._id === info._id) {
                copyGuest.gender = info.gender;
              }
            }
          });
          return copyGuest;
        });
      } else {
        return [];
      }
    };

    const guestsToInputs = guestsToInput(guests ? getGenderChangedGuest() : []);

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
          houseId,
          allocationParams: assigInfo.map(info => ({
            bedIndex: info.bedIndex,
            gender: info.gender,
            roomId: info.roomId
          })),
          forceToAllocate: true
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
              {LANG("booker_info")}{" "}
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
                  label={LANG("booker")}
                />
              </div>
              <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
                <InputText
                  disabled={allReadOnly}
                  {...bookingPhoneHook}
                  validation={isPhone}
                  hyphen
                  label={LANG("phoneNumber")}
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
                  label={LANG("booking_status")}
                />
              </div>
            </div>
          </div>
          <div className="modal__section">
            <h6>{LANG("payment_info")}</h6>
            <div className="flex-grid">
              <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
                <InputText
                  disabled={allReadOnly}
                  {...priceHook}
                  placeholder={`${LANG("normal_price")}}:${autoComma(
                    placeHolederPrice
                  )}`}
                  returnNumber
                  comma
                  label={LANG("total_price")}
                />
              </div>
              <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
                <SelectBox
                  disabled={allReadOnly}
                  {...payMethodHook}
                  options={PAYMETHOD_FOR_HOST_OP}
                  label={LANG("method_of_payment")}
                />
              </div>
              <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
                <SelectBox
                  disabled={allReadOnly}
                  {...paymentStatusHook}
                  options={PAYMENT_STATUS_OP}
                  label={LANG("payment_status")}
                />
              </div>
            </div>
          </div>
          <div className="modal__section">
            <h6>
              {LANG("reservation_information")}{" "}
              <Drawer {...assigInfoDrawHook} />
            </h6>
            <div className="flex-grid">
              <div className="flex-grid__col col--full-8 col--lg-8 col--md-8">
                <JDdayPicker
                  inputDisabled={allReadOnly}
                  canSelectBeforeDay={false}
                  {...resvDateHook}
                  input
                  readOnly
                  label={LANG("date_of_stay")}
                />
              </div>
              <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
                <InputText
                  disabled={allReadOnly}
                  readOnly
                  value={moment()
                    .local()
                    .format(DateFormat.WITH_TIME)}
                  label={LANG("reservation_date")}
                />
              </div>
              <div className="flex-grid__col col--full-12 col--lg-12 col--md-12">
                <RoomSelectInfoTable roomSelectInfo={roomSelectInfo} />
              </div>
              {assigInfoDrawHook.open && (
                <div className="flex-grid__col col--full-12 col--lg-12 col--md-12">
                  <RoomAssigedInfoTable
                    setAssigInfo={setAssigInfo}
                    assigInfo={assigInfo}
                    guestsData={guests || []}
                  />
                </div>
              )}
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
                  label={LANG("memo")}
                />
              </div>
            </div>
          </div>
          <div className="JDmodal__endSection">
            <Button
              size="small"
              label={LANG("do_create")}
              disabled={allReadOnly}
              thema="primary"
              onClick={handleCreateBtnClick}
            />
            <Button
              size="small"
              disabled={mode === BookingModalModes.CREATE}
              label={LANG("do_modify")}
              thema="primary"
              onClick={handleUpdateBtnClick}
            />
            <Button
              size="small"
              label={LANG("delete_booking")}
              disabled={mode === BookingModalModes.CREATE}
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

// 달력선택정보 -> 예약정보 -> 배정정보(게스트 바이 게스트) -> (예약자/방배정) 정보
