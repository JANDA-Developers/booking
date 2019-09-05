import React, {useMemo, Fragment} from "react";
import {showError, onCompletedMessage} from "../../utils/utils";
import DailyAssig from "./DailyAssig";
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
  deleteBlock
} from "../../types/api";
import {
  GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM,
  ALLOCATE_GUEST_TO_ROOM,
  UPDATE_BLOCK_OPTION
} from "../../queries";
import {IHouse} from "../../types/interface";
import {BookingStatus} from "../../types/enum";
import {queryDataFormater} from "../../utils/utils";
import moment from "moment";
import JDdayPicker from "../../atoms/dayPicker/DayPicker";
import {useDayPicker, IUseDayPicker} from "../../actions/hook";
import JDIcon from "../../atoms/icons/Icons";
import Preloader from "../../atoms/preloader/Preloader";
import {IContext} from "../../pages/MiddleServerRouter";
import DailyAssigNew from "./DailyAssigNew";
import {getOperationName} from "apollo-link";
// import DailyAssigNew from "./DailyAssigNew";

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

export interface IDailyAssigProp {
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

export interface IDailyAssigDataControl {
  deleteBookingMu: MutationFn<deleteBooking, deleteBookingVariables>;
  deleteGuestsMu: MutationFn<deleteGuests, deleteGuestsVariables>;
  createBlockMu: MutationFn<createBlock, createBlockVariables>;
  deleteBlockMu: MutationFn<deleteBlock, deleteBlockVariables>;
  updateBlockOpMu: MutationFn<updateBlockOption, updateBlockOptionVariables>;
  allocateMu: MutationFn<allocateGuestToRoom, allocateGuestToRoomVariables>;
  totalMuLoading: boolean;
}

interface IProps {
  context: IContext;
  date: Date;
  isInModal?: boolean;
}

const DailyAssigWrap: React.FC<IProps> = ({date, context, isInModal}) => {
  const {house} = context;
  const dayPickerHook = useDayPicker(date, date);
  const {houseConfig, _id: houseId} = house;
  const updateVariables = {
    houseId: houseId,
    start: dayPickerHook.from || new Date(),
    end: dayPickerHook.from || new Date()
  };

  const Result = useMemo(() => {
    return (
      <GetAllRoomTypeWithGuestQuery
        skip={!date}
        pollInterval={
          houseConfig.pollingPeriod
            ? houseConfig.pollingPeriod.period
            : undefined
        }
        query={GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM}
        variables={{
          ...updateVariables,
          bookingStatus: BookingStatus.COMPLETE
        }}
      >
        {({data, loading, error}) => {
          const roomTypesData =
            queryDataFormater(data, "GetAllRoomType", "roomTypes", undefined) ||
            []; // 원본데이터
          const guestsData =
            queryDataFormater(data, "GetGuests", "guests", undefined) || []; // 원본데이터
          const blocks =
            queryDataFormater(data, "GetBlocks", "blocks", undefined) || []; // 원본데이터

          return (
            <AllocateGuestToRoomMu
              onCompleted={({AllocateGuestToRoom}) => {
                onCompletedMessage(AllocateGuestToRoom, "배정완료", "배정실패");
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
                  dayPickerHook: dayPickerHook,
                  roomTypesData: roomTypesData,
                  itemDatas: [...guestsData, ...blocks]
                };
                return (
                  <DeleteGuestMu
                    onCompleted={({DeleteGuests}) => {
                      onCompletedMessage(DeleteGuests, "삭제완료", "삭제실패");
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
                        mutation={CREATE_BLOCK}
                      >
                        {(createBlockMu, {loading: createBlockLoading}) => (
                          <DeleteBlockMu
                            onCompleted={({DeleteBlock}) => {
                              onCompletedMessage(
                                DeleteBlock,
                                "방막기 해제",
                                "방막기 해제 실패"
                              );
                            }}
                            mutation={DELETE_BLOCK}
                          >
                            {(deleteBlockMu, {loading: deleteBlockLoading}) => (
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
                                        deleteBookingLoading;

                                      const dailyAssigDataControl: IDailyAssigDataControl = {
                                        deleteBookingMu,
                                        deleteGuestsMu: deleteGuestMu,
                                        createBlockMu,
                                        deleteBlockMu,
                                        updateBlockOpMu,
                                        allocateMu,
                                        totalMuLoading
                                      };

                                      return (
                                        <Fragment>
                                          <DailyAssig
                                            loading={loading}
                                            context={context}
                                            blocksData={blocks || []}
                                            guestsData={guestsData || []}
                                            dayPickerHook={dayPickerHook}
                                            roomTypesData={roomTypesData || []}
                                          />
                                          <DailyAssigNew
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
          );
        }}
      </GetAllRoomTypeWithGuestQuery>
    );
  }, [dayPickerHook.from]);

  return Result;
};

export default DailyAssigWrap;
