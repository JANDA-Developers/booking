import React from "react";
import {Query, Mutation} from "react-apollo";
import BookerModal from "./BookerModal";
import _ from "lodash";
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
  allocateGuestToRoomVariables,
  RoomGender
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
  DELETE_BOOKER,
  GET_BOOKERS,
  ALLOCATE_GUEST_TO_ROOM,
  GET_GUESTS,
  GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM,
  CREATE_BOOKER
} from "../../queries";
import {
  PayMethod,
  PaymentStatus,
  BookingStatus,
  BookerModalType
} from "../../types/enum";
import {getOperationName} from "apollo-utilities";
import {DEFAULT_BOOKER, DEFAULT_ROOMTYPE} from "../../types/defaults";
import {ICreateBookerInfo} from "../../pages/middleServer/assig/components/assigIntrerface";

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

      // ⭐️ 생성일경우
      // 생성일경우 만들어질 임시 booker
      let makeInfo: GB_booker | undefined = undefined;
      if (
        modalHook.info.type &&
        modalHook.info.type === BookerModalType.CREATE_WITH_ASSIG
      ) {
        // 👿 make 단어를 create로
        // 👿 __typename 없앨방법을 알아보자.
        const createModaInfoes: ICreateBookerInfo = modalHook.info;
        makeInfo = {
          ...DEFAULT_BOOKER,
          agreePrivacyPolicy: true,
          bookingStatus: BookingStatus.COMPLETE,
          start: createModaInfoes.start,
          end: createModaInfoes.end,
          roomTypes: _.uniqBy(
            createModaInfoes.resvInfoes.map(resvInfo => ({
              ...DEFAULT_ROOMTYPE,
              _id: resvInfo.roomTypeId,
              name: resvInfo.roomTypeName,
              pricingType: resvInfo.group.pricingType
            })),
            "_id"
          ),
          guests: createModaInfoes.resvInfoes.map(resv => ({
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

      return (
        <AllocateGuestToRoomMu
          refetchQueries={[
            getOperationName(GET_BOOKERS) || "",
            getOperationName(GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM) || ""
          ]}
          mutation={ALLOCATE_GUEST_TO_ROOM}
        >
          {allocateGuestToRoomMu => (
            <UpdateBookerMu
              refetchQueries={[
                getOperationName(GET_BOOKERS) || "",
                getOperationName(GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM) || ""
              ]}
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
                  mutation={CREATE_BOOKER}
                  onError={showError}
                  onCompleted={({CreateBooker}) => {
                    onCompletedMessage(
                      CreateBooker,
                      "예약 생성 완료",
                      "예약자 생성 실패"
                    );
                    if (CreateBooker.ok) {
                      modalHook.closeModal();
                    }
                    // TODO 여기에 컬백으로 배정
                    // allocateGuestToRoomMu({
                    //   variables: {
                    //     bedIndex:
                    //   }
                    // })
                  }}
                >
                  {createBookerMu => (
                    <DeleteBookerMu
                      mutation={DELETE_BOOKER}
                      onError={showError}
                      refetchQueries={[
                        getOperationName(GET_BOOKERS) || "",
                        getOperationName(
                          GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM
                        ) || ""
                      ]}
                      onCompleted={({DeleteBooker}) => {
                        onCompletedMessage(
                          DeleteBooker,
                          "예약 삭제 완료",
                          "예약 삭제 실패"
                        );
                        modalHook.closeModal();
                      }}
                    >
                      {deleteBookerMu => {
                        const bookerData = booker || makeInfo || DEFAULT_BOOKER;
                        return (
                          <BookerModal
                            bookerData={bookerData}
                            assigInfo={modalHook.info.assigInfo}
                            type={modalHook.info.type}
                            houseId={houseId}
                            loading={loading}
                            modalHook={modalHook}
                            createBookerMu={createBookerMu}
                            updateBookerMu={updateBookerMu}
                            deleteBookerMu={deleteBookerMu}
                            allocateGuestToRoomMu={allocateGuestToRoomMu}
                            key={`bookerModal${loading && "--loading"}${
                              modalHook.info.bookerId
                            }${modalHook.info.type}${bookerData.start}${
                              bookerData.end
                            }`}
                          />
                        );
                      }}
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
