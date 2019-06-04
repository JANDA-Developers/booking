import React from "react";
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
  PayMethodKr,
  BookingStatus,
  BookingStatusKr,
  BookerModalType,
  PaymentStatus,
  AutoSendWhen
} from "../../types/enum";
import "./BookerModal.scss";
import {GB_booker, IResvCount} from "../../types/interface";
import {getRoomTypePerGuests} from "../../utils/booking";
import {MutationFn} from "react-apollo";
import {
  updateBooker,
  updateBookerVariables,
  deleteBooker,
  deleteBookerVariables,
  createBooker,
  createBookerVariables,
  allocateGuestToRoom,
  allocateGuestToRoomVariables
} from "../../types/api";
import {GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM} from "../../queries";
import SendSMSmodalWrap, {
  IModalSMSinfo
} from "../sendSMSmodal/sendSmsModalWrap";
import {IAssigInfo} from "../../pages/middleServer/assig/components/assigIntrerface";
import Preloader from "../../atoms/preloader/Preloader";

export interface IroomSelectInfoTable {
  roomTypeId: string;
  roomTypeName: string;
  count: IResvCount;
  pricingType: PricingType;
}

interface IProps {
  modalHook: IUseModal;
  // 👿 bookerData 이렇게 광범위하게 받지말고 필요한부분만 포함 [foo:string]:any 로서 받을수있도록
  bookerData: GB_booker;
  createBookerMu: MutationFn<createBooker, createBookerVariables>;
  updateBookerMu: MutationFn<updateBooker, updateBookerVariables>;
  deleteBookerMu: MutationFn<deleteBooker, deleteBookerVariables>;
  allocateGuestToRoomMu: MutationFn<
    allocateGuestToRoom,
    allocateGuestToRoomVariables
  >;
  assigInfo: IAssigInfo[];
  houseId: string;
  loading: boolean;
  type?: BookerModalType;
}

const POPbookerInfo: React.FC<IProps> = ({
  modalHook,
  bookerData,
  updateBookerMu,
  createBookerMu,
  deleteBookerMu,
  allocateGuestToRoomMu,
  assigInfo,
  loading,
  type = BookerModalType.LOOKUP,
  houseId
}) => {
  const sendSMSmodalHook = useModal<IModalSMSinfo>(false);
  const confirmModalHook = useModal(false);
  const bookerNameHook = useInput(bookerData.name);
  const bookerPhoneHook = useInput(bookerData.phoneNumber);
  const priceHook = useInput(bookerData.price);
  const memoHook = useInput(bookerData.memo || "");
  const payMethodHook = useSelect({
    value: bookerData.payMethod,
    // @ts-ignore
    label: PayMethodKr[bookerData.payMethod]
  });
  const paymentStatusHook = useSelect<PaymentStatus>({
    value: bookerData.paymentStatus,
    // @ts-ignore
    label: PaymentStatusKr[bookerData.paymentStatus]
  });
  const bookerStatueHook = useSelect({
    value: bookerData.bookingStatus,
    label: BookingStatusKr[bookerData.bookingStatus]
  });
  const resvDateHook = useDayPicker(
    moment(bookerData.start).toDate(),
    moment(bookerData.end).toDate()
  );
  const defaultFormat: IroomSelectInfoTable[] = getRoomTypePerGuests(
    bookerData
  );

  const smsModalInfoTemp: IModalSMSinfo = {
    receivers: [bookerPhoneHook.value],
    booker: {
      end: resvDateHook.to!,
      name: bookerNameHook.value,
      payMethod: payMethodHook.selectedOption!.value,
      phoneNumber: bookerPhoneHook.value,
      start: resvDateHook.from!,
      paymentStatus: paymentStatusHook.selectedOption!.value,
      price: priceHook.value || 0
    }
  };

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
  const handleCreateBtnClick = async () => {
    if (!bookerData.roomTypes) return;

    const smsCallBackFn = async (flag: boolean) => {
      const result = await createBookerMu({
        variables: {
          bookingParams: {
            start: resvDateHook.from,
            bookerParams: {
              house: houseId,
              price: priceHook.value || 0,
              name: bookerNameHook.value,
              password: "admin",
              phoneNumber: bookerPhoneHook.value,
              email: "demo@naver.com",
              agreePrivacyPolicy: true,
              memo: memoHook.value
            },
            end: resvDateHook.to,
            guestInputs: defaultFormat.map(data => ({
              roomTypeId: data.roomTypeId,
              pricingType: data.pricingType,
              countFemaleGuest: data.count.female,
              countMaleGuest: data.count.male,
              countRoom:
                data.pricingType === PricingType.ROOM ? data.count.roomCount : 0
            }))
          },
          sendSmsFlag: flag
        }
      });

      if (result && result.data && result.data.CreateBooker.ok) {
        const newGuests = result.data.CreateBooker.booker;
        if (newGuests && newGuests.guests) {
          newGuests.guests.forEach((guest, index) => {
            const assigIndex = assigInfo.findIndex(
              assig => assig.gender === guest.gender
            );

            allocateGuestToRoomMu({
              variables: {
                bedIndex: assigInfo[assigIndex].bedIndex,
                guestId: guest._id,
                roomId: assigInfo[assigIndex].roomId
              }
            });

            assigInfo.splice(assigIndex, 1);
          });
        }
      }
    };

    sendSMSmodalHook.openModal({
      ...smsModalInfoTemp,
      autoSendWhen: AutoSendWhen.WHEN_BOOKING_COMPLETE,
      createMode: false,
      callBackFn: smsCallBackFn
    });
  };
  // 예약수정
  // 👿 modify 를 전부 update로 변경하자.
  const handleUpdateBtnClick = () => {
    // SMS 인포를 꺼내서 발송할 SMS 문자가 있는지 확인해야할것 같다.
    updateBookerMu({
      variables: {
        bookerId: modalHook.info.bookerId,
        params: {
          email: "demo@naver.com",
          memo: memoHook.value,
          isCheckIn: {
            isIn: bookerData.checkIn.isIn
          },
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
      className="Modal bookerModal"
      overlayClassName="Overlay"
    >
      {loading && <Preloader />}
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
              iconHover
              iconOnClick={() => {
                sendSMSmodalHook.openModal({
                  ...smsModalInfoTemp,
                  createMode: true
                });
              }}
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
          disabled={type === BookerModalType.LOOKUP}
          thema="primary"
          mode="flat"
          onClick={handleCreateBtnClick}
        />
        <Button
          size="small"
          disabled={type !== BookerModalType.LOOKUP}
          label="수정하기"
          thema="primary"
          mode="flat"
          onClick={handleUpdateBtnClick}
        />
        <Button
          size="small"
          label="예약삭제"
          disabled={type !== BookerModalType.LOOKUP}
          thema="warn"
          mode="flat"
          onClick={handleDeletBtnClick}
        />
        {/* <Button
          size="small"
          label="닫기"
          mode="flat"
          thema="grey"
          onClick={modalHook.closeModal}
        /> */}
      </div>
      <SendSMSmodalWrap houseId={houseId} modalHook={sendSMSmodalHook} />
      <JDtoastModal
        confirm
        confirmCallBackFn={deleteModalCallBackFn}
        {...confirmModalHook}
      />
    </Modal>
  );
};
export default POPbookerInfo;
