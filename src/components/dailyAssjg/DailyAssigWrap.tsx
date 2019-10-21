import React, {useMemo, Fragment} from "react";
import {onCompletedMessage} from "../../utils/utils";
import {Query, Mutation, MutationFn} from "react-apollo";
import {
  getAllRoomTypeWithGuestVariables,
  getAllRoomTypeWithGuest,
  allocateGuestToRoom,
  allocateGuestToRoomVariables,
  getAllRoomTypeWithGuest_GetGuests_guests,
  getAllRoomTypeWithGuest_GetBlocks_blocks,
  getAllRoomTypeWithGuest_GetAllRoomType_roomTypes,
  createBlock,
  createBlockVariables,
  deleteBooking,
  deleteBookingVariables,
  updateBlockOption,
  updateBlockOptionVariables,
  deleteGuests,
  deleteGuestsVariables,
  deleteBlockVariables,
  deleteBlock,
  updateBooking,
  updateBookingVariables
} from "../../types/api";
import {
  GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM,
  ALLOCATE_GUEST_TO_ROOM,
  UPDATE_BLOCK_OPTION,
  DELETE_GUEST,
  CREATE_BLOCK,
  DELETE_BLOCK,
  DELETE_BOOKING,
  UPDATE_BOOKING
} from "../../queries";
import {BookingStatus} from "../../types/enum";
import {queryDataFormater} from "../../utils/utils";
import {useDayPicker, IUseDayPicker} from "../../hooks/hook";
import {IContext} from "../../pages/MiddleServerRouter";
import DailyAssig from "./DailyAssig";
import {getOperationName} from "apollo-link";
import {NetworkStatus} from "apollo-boost";
import {
  IDailyAssigDataControl,
  IAssigItem
} from "../../pages/middleServer/assig/components/assigIntrerface";
import moment from "moment";
import {guestsDataManufacturer} from "../../pages/middleServer/assig/components/guestsDataManufacturer";
import {blockDataManufacturer} from "../../pages/middleServer/assig/components/blockDataManufacturer";

class GetAllRoomTypeWithGuestQuery extends Query<
  getAllRoomTypeWithGuest,
  getAllRoomTypeWithGuestVariables
> {}
class AllocateGuestToRoomMu extends Mutation<
  allocateGuestToRoom,
  allocateGuestToRoomVariables
> {}
class CreateBlockMu extends Mutation<createBlock, createBlockVariables> {}
class DeleteBookingMu extends Mutation<deleteBooking, deleteBookingVariables> {}
class UpdateBlockOpMu extends Mutation<
  updateBlockOption,
  updateBlockOptionVariables
> {}
interface IProps {
  context: IContext;
}
class DeleteGuestMu extends Mutation<deleteGuests, deleteGuestsVariables> {}
class DeleteBlockMu extends Mutation<deleteBlock, deleteBlockVariables> {}
class UpdateCheckInMu extends Mutation<updateBooking, updateBookingVariables> {}

export interface IDailyAssigProp {
  networkStatus: NetworkStatus;
  formatedItemData: IAssigItem[];
  calendarPosition?: "center" | "inside" | "topLeft";
  allocateMu: MutationFn<allocateGuestToRoom, allocateGuestToRoomVariables>;
  loading: boolean;
  blocksData: getAllRoomTypeWithGuest_GetBlocks_blocks[];
  guestsData: getAllRoomTypeWithGuest_GetGuests_guests[];
  dayPickerHook: IUseDayPicker;
  roomTypesData: getAllRoomTypeWithGuest_GetAllRoomType_roomTypes[];
  itemDatas: (
    | getAllRoomTypeWithGuest_GetGuests_guests
    | getAllRoomTypeWithGuest_GetBlocks_blocks)[];
}

interface IProps {
  context: IContext;
  date: Date;
  isInModal?: boolean;
  calendarPosition?: "center" | "inside" | "topLeft";
}

const DailyAssigWrap: React.FC<IProps> = ({
  date,
  context,
  isInModal,
  calendarPosition = "topLeft"
}) => {
  const {house} = context;
  const dayPickerHook = useDayPicker(date, date);
  const {houseConfig, _id: houseId} = house;
  const updateVariables = {
    houseId: houseId,
    checkIn: dayPickerHook.from || new Date(),
    checkOut: moment(dayPickerHook.from || new Date())
      .add(1, "day")
      .toDate()
  };

  const Result = useMemo(() => {
    return (
      <GetAllRoomTypeWithGuestQuery
        skip={!date}
        pollInterval={houseConfig.pollingPeriod.period}
        query={GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM}
        variables={{
          ...updateVariables,
          bookingStatuses: [BookingStatus.COMPLETE, BookingStatus.PROGRESSING]
        }}
      >
        {({data, loading, networkStatus}) => {
          const roomTypesData =
            queryDataFormater(data, "GetAllRoomType", "roomTypes", undefined) ||
            []; // 원본데이터
          const guestsData =
            queryDataFormater(data, "GetGuests", "guests", undefined) || []; // 원본데이터
          const blocks =
            queryDataFormater(data, "GetBlocks", "blocks", undefined) || []; // 원본데이터

          const formatedGuestsData = guestsDataManufacturer(guestsData);
          const formatedBlockData = blockDataManufacturer(blocks);
          const formatedItemData = formatedGuestsData
            .concat(formatedBlockData)
            .map((block, index) => {
              block.itemIndex = index;
              return block;
            });

          return (
            <UpdateCheckInMu
              refetchQueries={[
                getOperationName(GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM) || ""
              ]}
              mutation={UPDATE_BOOKING}
            >
              {(updateCheckInMu, {loading: checkInBookingLoading}) => (
                <AllocateGuestToRoomMu
                  onCompleted={({AllocateGuestToRoom}) => {
                    onCompletedMessage(
                      AllocateGuestToRoom,
                      "배정완료",
                      "배정실패"
                    );
                  }}
                  refetchQueries={[
                    getOperationName(GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM)!
                  ]}
                  mutation={ALLOCATE_GUEST_TO_ROOM}
                >
                  {allocateMu => {
                    const dailyAssigContext: IDailyAssigProp = {
                      allocateMu,
                      loading,
                      blocksData: blocks,
                      guestsData: guestsData,
                      formatedItemData,
                      dayPickerHook: dayPickerHook,
                      roomTypesData: roomTypesData,
                      itemDatas: [...guestsData, ...blocks],
                      networkStatus,
                      calendarPosition
                    };
                    return (
                      <DeleteGuestMu
                        onCompleted={({DeleteGuests}) => {
                          onCompletedMessage(
                            DeleteGuests,
                            "삭제완료",
                            "삭제실패"
                          );
                        }}
                        mutation={DELETE_GUEST}
                      >
                        {(deleteGuestMu, {loading: deleteGuestLoading}) => (
                          <CreateBlockMu
                            onCompleted={({CreateBlock}) => {
                              onCompletedMessage(
                                CreateBlock,
                                "방막기 완료",
                                "방막기 실패"
                              );
                            }}
                            refetchQueries={[
                              getOperationName(
                                GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM
                              ) || ""
                            ]}
                            mutation={CREATE_BLOCK}
                          >
                            {(createBlockMu, {loading: createBlockLoading}) => (
                              <DeleteBlockMu
                                refetchQueries={[
                                  getOperationName(
                                    GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM
                                  )!
                                ]}
                                onCompleted={({DeleteBlock}) => {
                                  onCompletedMessage(
                                    DeleteBlock,
                                    "방막기 해제",
                                    "방막기 해제 실패"
                                  );
                                }}
                                mutation={DELETE_BLOCK}
                              >
                                {(
                                  deleteBlockMu,
                                  {loading: deleteBlockLoading}
                                ) => (
                                  <DeleteBookingMu
                                    mutation={DELETE_BOOKING}
                                    onCompleted={({DeleteBooking}) => {
                                      onCompletedMessage(
                                        DeleteBooking,
                                        "예약 삭제 완료",
                                        "예약 삭제 실패"
                                      );
                                    }}
                                  >
                                    {(
                                      deleteBookingMu,
                                      {loading: deleteBookingLoading}
                                    ) => (
                                      <UpdateBlockOpMu
                                        mutation={UPDATE_BLOCK_OPTION}
                                        onCompleted={({UpdateBlockOption}) => {
                                          onCompletedMessage(
                                            UpdateBlockOption,
                                            "변경완료",
                                            "적용실패"
                                          );
                                        }}
                                      >
                                        {(
                                          updateBlockOpMu,
                                          {loading: updateBlockLoading}
                                        ) => {
                                          const totalMuLoading =
                                            updateBlockLoading ||
                                            createBlockLoading ||
                                            deleteBlockLoading ||
                                            deleteGuestLoading ||
                                            checkInBookingLoading ||
                                            deleteBookingLoading;

                                          const dailyAssigDataControl: IDailyAssigDataControl = {
                                            deleteBookingMu,
                                            deleteGuestsMu: deleteGuestMu,
                                            createBlockMu,
                                            deleteBlockMu,
                                            updateBlockOpMu,
                                            updateCheckInMu,
                                            allocateMu,
                                            totalMuLoading
                                          };

                                          return (
                                            <Fragment>
                                              <DailyAssig
                                                context={context}
                                                outDailyAssigContext={
                                                  dailyAssigContext
                                                }
                                                dailyAssigDataControl={
                                                  dailyAssigDataControl
                                                }
                                              />
                                            </Fragment>
                                          );
                                        }}
                                      </UpdateBlockOpMu>
                                    )}
                                  </DeleteBookingMu>
                                )}
                              </DeleteBlockMu>
                            )}
                          </CreateBlockMu>
                        )}
                      </DeleteGuestMu>
                    );
                  }}
                </AllocateGuestToRoomMu>
              )}
            </UpdateCheckInMu>
          );
        }}
      </GetAllRoomTypeWithGuestQuery>
    );
  }, [dayPickerHook.from]);

  return Result;
};

export default DailyAssigWrap;