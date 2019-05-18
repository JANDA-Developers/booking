import React from "react";
import {Query, Mutation} from "react-apollo";
import BookerModal from "./BookerModal";
import {IUseModal} from "../../actions/hook";
import {
  getBooker,
  getBookerVariables,
  getBooker_GetBooker_booker,
  updateBooker,
  updateBookerVariables,
  createBookingVariables,
  deleteBooker,
  createBooking,
  deleteBookerVariables
} from "../../types/api";
import {
  queryDataFormater,
  showError,
  onCompletedMessage
} from "../../utils/utils";
import {GB_booker} from "../../types/interface";
import Preloader from "../../atoms/preloader/Preloader";
import {
  GET_BOOKER,
  UPDATE_BOOKER,
  CREATE_BOOKING,
  DELETE_BOOKER,
  GET_BOOKERS
} from "../../queries";
import {PayMethod, PaymentStatus} from "../../types/enum";
import {getOperationName} from "apollo-utilities";

interface IProps {
  modalHook: IUseModal;
  houseId: string;
}

class UpdateBookerMu extends Mutation<updateBooker, updateBookerVariables> {}
class CreatBookingMu extends Mutation<createBooking, createBookingVariables> {}
class DeleteBookerMu extends Mutation<deleteBooker, deleteBookerVariables> {}

class GetBookerQuery extends Query<getBooker, getBookerVariables> {}

// 🆔 음 여기서 예약 변동 가능 범위를 받아야할것 같은뎅?
// 🆔 여기서 쿼리로 북커 인포를 받아야함
// 🆔 예약삭제 뮤테이션
// 🆔 예약변경 뮤테이션
// 🆔 예약생성 뮤테이션

const BookerModalWrap: React.FC<IProps> = ({modalHook, houseId}) => (
  <GetBookerQuery
    query={GET_BOOKER}
    skip={!modalHook.info.bookerId}
    variables={{
      bookerId: modalHook.info.bookerId
    }}
  >
    {({data: bookerData, loading, error}) => {
      showError(error);
      const booker = queryDataFormater(
        bookerData,
        "GetBooker",
        "booker",
        undefined
      );
      const defualtBooker: GB_booker = {
        __typename: "Booker",
        _id: "default",
        bookings: [],
        memo: "",
        createdAt: "",
        updatedAt: "",
        name: "",
        phoneNumber: "",
        isCheckIn: false,
        payMethod: PayMethod.CASH,
        paymentStatus: PaymentStatus.NOT_YET
      };

      // TODO  생성일경우 Timeline으로 부터 전달받는 예약자 배정정보들
      let makeInfo: getBooker_GetBooker_booker | undefined = undefined;
      if (modalHook.info.type && modalHook.info.type === "make") {
      }
      return loading ? (
        <Preloader size="large" />
      ) : (
        <UpdateBookerMu
          mutation={UPDATE_BOOKER}
          onError={showError}
          onCompleted={({UpdateBooker}) => {
            onCompletedMessage(
              UpdateBooker,
              "예약자 업데이트",
              "예약자 업데이트 실패"
            );
          }}
        >
          {updateBookerMu => (
            <CreatBookingMu
              mutation={CREATE_BOOKING}
              onError={showError}
              onCompleted={({CreateBooking}) => {
                onCompletedMessage(
                  CreateBooking,
                  "예약 생성 완료",
                  "예약자 생성 실패"
                );
              }}
            >
              {createBookingMu => (
                <DeleteBookerMu
                  mutation={DELETE_BOOKER}
                  onError={showError}
                  refetchQueries={[getOperationName(GET_BOOKERS) || ""]}
                  onCompleted={({DeleteBooker}) => {
                    onCompletedMessage(
                      DeleteBooker,
                      "예약 삭제 완료",
                      "예약 삭제 실패"
                    );
                    modalHook.closeModal();
                  }}
                >
                  {deleteBookingMu => (
                    <BookerModal
                      bookerData={booker || defualtBooker}
                      houseId={houseId}
                      modalHook={modalHook}
                      createBookingMu={createBookingMu}
                      updateBookerMu={updateBookerMu}
                      deleteBookerMu={deleteBookingMu}
                      key={`bookerModal${modalHook.info.bookerId}`}
                    />
                  )}
                </DeleteBookerMu>
              )}
            </CreatBookingMu>
          )}
        </UpdateBookerMu>
      );
    }}
  </GetBookerQuery>
);

export default BookerModalWrap;
