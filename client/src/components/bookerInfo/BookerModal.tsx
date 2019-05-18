import React, {useState} from "react";
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
  PAYMETHOD_OP,
  PricingType,
  PaymentStatusKr,
  PayMethodKr
} from "../../types/enum";
import "./BookerModal.scss";
import {GB_booker, IResvCount} from "../../types/interface";
import {
  bookingStatuMerge,
  bookingGuestsMerge,
  bookingPriceMerge
} from "../../utils/booking";
import {MutationFn} from "react-apollo";
import {
  createBooking,
  createBookingVariables,
  updateBooker,
  updateBookerVariables,
  deleteBooker,
  deleteBookerVariables,
  PayMethod
} from "../../types/api";

export interface IroomSelectInfoTable {
  roomTypeId: string;
  roomTypeName: string;
  count: IResvCount;
  pricingType: PricingType;
}

interface IProps {
  modalHook: IUseModal;
  bookerData: GB_booker;
  createBookingMu: MutationFn<createBooking, createBookingVariables>;
  updateBookerMu: MutationFn<updateBooker, updateBookerVariables>;
  deleteBookerMu: MutationFn<deleteBooker, deleteBookerVariables>;
  houseId: string;
}

const POPbookerInfo: React.FC<IProps> = ({
  modalHook,
  bookerData,
  updateBookerMu,
  createBookingMu,
  deleteBookerMu,
  houseId
}) => {
  // ❓ State들을 합치는게 좋을까?
  const confirmModalHook = useModal(false);
  const bookerNameHook = useInput(bookerData.name);
  const bookerPhoneHook = useInput(bookerData.phoneNumber);
  const priceHook = useInput(0);
  const memoHook = useInput(bookerData.memo || "");
  const payMethodHook = useSelect({
    value: bookerData.payMethod,
    // @ts-ignore
    label: PayMethodKr[bookerData.payMethod]
  });
  const paymentStatusHook = useSelect({
    value: bookerData.paymentStatus,
    // @ts-ignore
    label: PaymentStatusKr[bookerData.paymentuseStatus]
  });
  const bookerStatueHook = useSelect(
    BOOKING_STATUS_OP.find(
      op => op.value === bookingStatuMerge(bookerData.bookings)
    ) || null
  );
  const defaultBookings = bookerData.bookings || [];
  const resvDateHook = useDayPicker(
    defaultBookings[0] ? moment(defaultBookings[0].start).toDate() : null,
    defaultBookings[0] ? moment(defaultBookings[0].end).toDate() : null
  );

  const defaultFormat: IroomSelectInfoTable[] = defaultBookings.map(
    booking => ({
      roomTypeId: booking._id,
      roomTypeName: booking.roomType.name,
      count: {
        male: bookingGuestsMerge(booking.guests).male,
        female: bookingGuestsMerge(booking.guests).female,
        roomCount: booking.guestCount
      },
      pricingType: booking.roomType.pricingType
    })
  );

  // 예약삭제
  const handleDeletBtnClick = () => {
    confirmModalHook.openModal("정말 예약을 삭제하시겠습니까?");
  };

  const deleteModalCallBackFn = (confirm: boolean) => {
    if (confirm) {
      deleteBookerMu({
        variables: {
          bookerId: modalHook.info.bookerId
        }
      });
    }
  };
  // 예약생성
  const handleCreateBtnClick = () => {
    createBookingMu({
      variables: {
        booker: {
          name: bookerNameHook.value,
          password: "admin",
          phoneNumber: bookerPhoneHook.value,
          email: "demo@naver.com",
          agreePrivacyPolicy: true,
          memo: memoHook.value
        },
        start: resvDateHook.from,
        end: resvDateHook.to,
        guestInputs: []
      }
    });
  };

  // 예약수정
  // 👿 modify 를 전부 update로 변경하자.
  const handleUpdateBtnClick = () => {
    updateBookerMu({
      variables: {
        bookerId: modalHook.info.bookerId,
        params: {
          email: "demo@naver.com",
          memo: memoHook.value,
          isCheckIn: bookerData.isCheckIn,
          name: bookerNameHook.value,
          payMethod:
            payMethodHook.selectedOption && payMethodHook.selectedOption.value,
          paymentStatus:
            paymentStatusHook.selectedOption &&
            paymentStatusHook.selectedOption.value,
          phoneNumber: bookerPhoneHook.value,
          price: priceHook.value
        }
      }
    });
  };

  return (
    <Modal
      style={{
        content: {
          maxWidth: "30rem"
        }
      }}
      {...modalHook}
      className="Modal bookerModal"
      overlayClassName="Overlay"
    >
      <div className="modal__section">
        <h6>예약자정보</h6>
        <div className="flex-grid">
          <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
            <InputText {...bookerNameHook} label="예약자" />
          </div>
          <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
            <InputText
              {...bookerPhoneHook}
              hyphen
              label="전화번호"
              icon="sms"
            />
          </div>
          <div className="JD-z-index-1 flex-grid__col col--full-4 col--lg-4 col--md-4">
            <SelectBox
              {...bookerStatueHook}
              options={BOOKING_STATUS_OP}
              label="예약상태"
            />
          </div>
          <div className="flex-grid__col col--full-12 col--lg-12 col--md-12">
            <InputText {...memoHook} halfHeight textarea label="예약메모" />
          </div>
        </div>
      </div>
      <div className="modal__section">
        <h6>예약정보</h6>
        <div className="flex-grid">
          <div className="flex-grid__col col--full-8 col--lg-8 col--md-8">
            <JDdayPicker
              canSelectBeforeDays={false}
              {...resvDateHook}
              input
              label="숙박일자"
            />
          </div>
          <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
            <InputText readOnly value="2018-03-24" label="예약일시" />
          </div>
          <div className="flex-grid__col col--full-12 col--lg-12 col--md-12">
            <RoomSelectInfoTable resvInfo={defaultFormat} />
          </div>
        </div>
      </div>
      <div className="JDz-index-1 modal__section">
        <h6>결제정보</h6>
        <div className="flex-grid">
          <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
            <InputText {...priceHook} comma label="총금액" />
          </div>
          <div className="flex-grid__col col--full-4 col--lg-4 col--md-4">
            <SelectBox
              {...payMethodHook}
              options={PAYMETHOD_OP}
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
      <div className="JDmodal__endSection">
        <Button
          size="small"
          label="생성하기"
          thema="primary"
          mode="flat"
          onClick={handleCreateBtnClick}
        />
        <Button
          size="small"
          label="수정하기"
          thema="primary"
          mode="flat"
          onClick={handleUpdateBtnClick}
        />
        <Button
          size="small"
          label="예약삭제"
          thema="warn"
          mode="flat"
          onClick={handleDeletBtnClick}
        />
        <Button
          size="small"
          label="닫기"
          mode="flat"
          thema="grey"
          onClick={modalHook.closeModal}
        />
      </div>
      <JDtoastModal
        confirm
        confirmCallBackFn={deleteModalCallBackFn}
        {...confirmModalHook}
      />
    </Modal>
  );
};
export default POPbookerInfo;
