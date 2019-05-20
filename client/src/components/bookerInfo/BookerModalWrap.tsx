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
  deleteBooker,
  deleteBookerVariables,
  createBooker,
  createBookerVariables,
  allocateGuestToRoom,
  allocateGuestToRoomVariables
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
  GET_BOOKERS,
  ALLOCATE_GUEST_TO_ROOM
} from "../../queries";
import {PayMethod, PaymentStatus, BookingStatus} from "../../types/enum";
import {getOperationName} from "apollo-utilities";
import {ICreateBookerInfo} from "../../pages/middleServer/assig/components/makeItemMenu";

interface IProps {
  modalHook: IUseModal;
  houseId: string;
}

class AllocateGuestToRoomMu extends Mutation<
  allocateGuestToRoom,
  allocateGuestToRoomVariables
> {}
class UpdateBookerMu extends Mutation<updateBooker, updateBookerVariables> {}
class CreatBookingMu extends Mutation<createBooker, createBookerVariables> {}
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

      // 쿼리결과
      const booker = queryDataFormater(
        bookerData,
        "GetBooker",
        "booker",
        undefined
      );

      // 유틸성을 위해 만들어둔 기본 booker
      const defualtBooker: GB_booker = {
        __typename: "Booker",
        _id: "default",
        memo: "",
        createdAt: "",
        updatedAt: "",
        roomTypes: null,
        name: "",
        phoneNumber: "",
        isCheckIn: false,
        payMethod: PayMethod.CASH,
        paymentStatus: PaymentStatus.NOT_YET,
        email: "",
        end: null,
        start: null,
        agreePrivacyPolicy: true,
        price: 0,
        password: null,
        bookingStatus: BookingStatus.COMPLETE,
        guests: null
      };

      // ⭐️ 생성일경우
      // 생성일경우 만들어질 임시 booker
      let makeInfo: GB_booker | undefined = undefined;
      if (modalHook.info.type && modalHook.info.type === "makeAndAssig") {
        // 👿 make 단어를 create로
        // 👿 __typename 없앨방법을 알아보자.
        const createMpdalInfoes: ICreateBookerInfo = modalHook.info;
        makeInfo = {
          ...defualtBooker,
          agreePrivacyPolicy: true,
          bookingStatus: BookingStatus.COMPLETE,
          start: createMpdalInfoes.start,
          end: createMpdalInfoes.end,
          guests: createMpdalInfoes.resvInfoes.map(resv => ({
            __typename: "Guest",
            _id: "",
            gender: resv.gender,
            roomType: {
              __typename: "RoomType",
              _id: resv.roomTypeId
            }
          }))
        };
      }
      return loading ? (
        <Preloader size="large" />
      ) : (
        <AllocateGuestToRoomMu mutation={ALLOCATE_GUEST_TO_ROOM}>
          {allocateGuestToRoomMu => (
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
                  onCompleted={({CreateBooker}) => {
                    onCompletedMessage(
                      CreateBooker,
                      "예약 생성 완료",
                      "예약자 생성 실패"
                    );
                    // TODO 여기에 컬백으로 배정
                    // allocateGuestToRoomMu({
                    //   variables: {
                    //     bedIndex:
                    //   }
                    // })
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
                          bookerData={booker || makeInfo || defualtBooker}
                          assigInfo={
                            modalHook.info.makeInfo &&
                            modalHook.info.makeInfo.assigInfo
                          }
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
          )}
        </AllocateGuestToRoomMu>
      );
    }}
  </GetBookerQuery>
);

export default BookerModalWrap;
