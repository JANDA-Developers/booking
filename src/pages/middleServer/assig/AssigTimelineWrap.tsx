/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useCallback, useMemo } from "react";
import { Query, Mutation } from "react-apollo";
import moment from "moment-timezone";
import _ from "lodash";
import assigDefaultProps from "./timelineConfig";
import {
  getAllRoomTypeWithGuest,
  getAllRoomTypeWithGuestVariables,
  allocateGuestToRoom,
  allocateGuestToRoomVariables,
  updateBooking,
  updateBookingVariables,
  deleteBooking,
  deleteBookingVariables,
  deleteGuests,
  deleteGuestsVariables,
  deleteBlock,
  deleteBlockVariables,
  createBlock,
  createBlockVariables,
  updateBlockOption,
  updateBlockOptionVariables
} from "../../../types/api";
import { useDayPicker, LANG } from "../../../hooks/hook";
import {
  setMidNight,
  queryDataFormater,
  onCompletedMessage
} from "../../../utils/utils";
import EerrorProtect from "../../../utils/errProtect";
import { BookingStatus } from "../../../types/enum";
import {
  ALLOCATE_GUEST_TO_ROOM,
  UPDATE_BOOKING,
  DELETE_GUEST,
  DELETE_BLOCK,
  GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM,
  CREATE_BLOCK,
  DELETE_BOOKING,
  UPDATE_BLOCK_OPTION
} from "../../../queries";
import AssigTimeline from "./AssigTimeline";
import { to4YMMDD } from "../../../utils/setMidNight";
import { roomDataManufacturer } from "./components/groupDataMenufacture";
import reactWindowSize, { WindowSizeProps } from "react-window-size";
import {
  IAssigDataControl,
  IAssigMutationLoading
} from "./components/assigIntrerface";
import { IContext } from "../../MiddleServerRouter";
import { guestsDataManufacturer } from "./components/guestsDataManufacturer";
import { blockDataManufacturer } from "./components/blockDataManufacturer";

moment.tz.setDefault("UTC");

class UpdateBookingMu extends Mutation<updateBooking, updateBookingVariables> { }
class CreateBlockMu extends Mutation<createBlock, createBlockVariables> { }
class DeleteBookingMu extends Mutation<deleteBooking, deleteBookingVariables> { }
class UpdateBlockOpMu extends Mutation<
  updateBlockOption,
  updateBlockOptionVariables
  > { }

interface IProps {
  context: IContext;
}

class GetAllRoomTypeWithGuestQuery extends Query<
  getAllRoomTypeWithGuest,
  getAllRoomTypeWithGuestVariables
  > { }
class AllocateGuestToRoomMu extends Mutation<
  allocateGuestToRoom,
  allocateGuestToRoomVariables
  > { }
class DeleteGuestMu extends Mutation<deleteGuests, deleteGuestsVariables> { }
class DeleteBlockMu extends Mutation<deleteBlock, deleteBlockVariables> { }

const AssigTimelineWrap: React.FC<IProps & WindowSizeProps> = ({
  context,
  windowHeight,
  windowWidth
}) => {
  const { houseConfig, house } = context;
  const dayPickerHook = useDayPicker(null, null);
  const defaultStartDate = dayPickerHook.from
    ? dayPickerHook.from
    : moment()
      .local()
      .toDate();

  const defaultEndDate = dayPickerHook.from
    ? moment(dayPickerHook.from)
      .local()
      .add(10, "days")
      .toDate()
    : moment()
      .local()
      .add(10, "days")
      .toDate();

  const [dataTime, setDataTime] = useState({
    start: setMidNight(
      moment()
        .subtract(5, "days")
        .valueOf()
    ),
    end: setMidNight(
      moment()
        .add(14, "days")
        .valueOf()
    )
  });

  const updateVariables = {
    houseId: house._id,
    checkIn: to4YMMDD(moment(dataTime.start)),
    checkOut: to4YMMDD(moment(dataTime.end))
  };

  moment.tz.setDefault("UTC");

  return (
    <GetAllRoomTypeWithGuestQuery
      fetchPolicy="network-only"
      notifyOnNetworkStatusChange={true}
      pollInterval={
        houseConfig.pollingPeriod ? houseConfig.pollingPeriod.period : undefined
      }
      query={GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM}
      variables={{
        ...updateVariables,
        bookingStatuses: [BookingStatus.COMPLETE, BookingStatus.PROGRESSING]
      }}
    >
      {({ data, loading, refetch, stopPolling, startPolling, networkStatus }) => {
        const roomTypesData = queryDataFormater(
          data,
          "GetAllRoomType",
          "roomTypes",
          undefined
        ); // 원본데이터

        const guestsData =
          queryDataFormater(data, "GetGuests", "guests", []) || [];
        const blocks = queryDataFormater(data, "GetBlocks", "blocks", []) || [];
        const formatedRoomData = roomDataManufacturer(roomTypesData); // 타임라인을 위해 가공된 데이터
        const formatedGuestsData = guestsDataManufacturer(guestsData); // 타임라인을 위해 가공된 데이터
        const formatedBlockData = blockDataManufacturer(blocks); // 타임라인을 위해 가공된 데이터
        const formatedItemData = formatedGuestsData
          .concat(formatedBlockData)
          .map((block, index) => {
            block.itemIndex = index;
            return block;
          });

        return (
          <AllocateGuestToRoomMu
            onCompleted={({ AllocateGuestToRoom }) => {
              onCompletedMessage(AllocateGuestToRoom, LANG("assig_completed"), LANG("assig_failed"));
            }}
            update={(cache, { data: inData }) => {
              const cacheData: getAllRoomTypeWithGuest | null = cache.readQuery(
                {
                  query: GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM,
                  variables: updateVariables
                }
              );
              if (cacheData && inData) {
                const result = _.unionBy(
                  [inData.AllocateGuestToRoom.guest],
                  cacheData.GetGuests.guests,
                  "_id"
                );

                cache.writeQuery({
                  query: GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM,
                  data: {
                    GetAllRoomType: cacheData.GetAllRoomType,
                    GetGuests: {
                      ...cacheData.GetGuests,
                      guests: result
                    }
                  }
                });
              }
            }}
            mutation={ALLOCATE_GUEST_TO_ROOM}
          >
            {allocateMu => (
              <UpdateBookingMu mutation={UPDATE_BOOKING}>
                {(updateBookingMu, { loading: updateBookingLoading }) => (
                  <DeleteGuestMu
                    onCompleted={({ DeleteGuests }) => {
                      onCompletedMessage(DeleteGuests, LANG("delete_completed"), LANG("delete_failed"));
                    }}
                    mutation={DELETE_GUEST}
                  >
                    {(deleteGuestMu, { loading: deleteGuestLoading }) => (
                      <CreateBlockMu
                        onCompleted={({ CreateBlock }) => {
                          onCompletedMessage(
                            CreateBlock,
                            LANG("block_room_completed"),
                            LANG("block_room_failed")
                          );
                        }}
                        mutation={CREATE_BLOCK}
                      >
                        {(createBlockMu, { loading: createBlockLoading }) => (
                          <DeleteBlockMu
                            onCompleted={({ DeleteBlock }) => {
                              onCompletedMessage(
                                DeleteBlock,
                                LANG("room_block_release"),
                                LANG("room_block_release_fail")
                              );
                            }}
                            mutation={DELETE_BLOCK}
                          >
                            {(deleteBlockMu, { loading: deleteBlockLoading }) => (
                              <DeleteBookingMu
                                mutation={DELETE_BOOKING}
                                onCompleted={({ DeleteBooking }) => {
                                  onCompletedMessage(
                                    DeleteBooking,
                                    LANG("reservation_delete_complete"),
                                    LANG("reservation_delete_fail")
                                  );
                                }}
                              >
                                {(
                                  deleteBookingMu,
                                  { loading: deleteBookingLoading }
                                ) => (
                                    <UpdateBlockOpMu
                                      mutation={UPDATE_BLOCK_OPTION}
                                      onCompleted={({ UpdateBlockOption }) => {
                                        onCompletedMessage(
                                          UpdateBlockOption,
                                          LANG("change_complited"),
                                          LANG("change_failed")
                                        );
                                      }}
                                    >
                                      {(
                                        updateBlockOpMu,
                                        { loading: updateBlockLoading }
                                      ) => {
                                        const totalMuLoading =
                                          updateBlockLoading ||
                                          createBlockLoading ||
                                          deleteBlockLoading ||
                                          deleteGuestLoading ||
                                          deleteBookingLoading ||
                                          updateBookingLoading;

                                        const mutationLoadings: IAssigMutationLoading = {
                                          updateBlockLoading,
                                          createBlockLoading,
                                          deleteBlockLoading,
                                          deleteGuestLoading,
                                          deleteBookingLoading,
                                          updateBookingLoading
                                        };

                                        const assigDataControl: IAssigDataControl = {
                                          updateBookingMu,
                                          deleteBookingMu,
                                          deleteGuestsMu: deleteGuestMu,
                                          createBlockMu,
                                          deleteBlockMu,
                                          updateBlockOpMu,
                                          allocateMu,
                                          refetch,
                                          stopPolling,
                                          startPolling: startPolling.bind(
                                            startPolling,
                                            houseConfig.pollingPeriod.period
                                          ),
                                          totalMuLoading,
                                          mutationLoadings,
                                          networkStatus
                                        };

                                        return (
                                          <AssigTimeline
                                            context={context}
                                            loading={loading}
                                            groupData={formatedRoomData}
                                            deafultGuestsData={
                                              formatedItemData || []
                                            }
                                            dayPickerHook={dayPickerHook}
                                            defaultProps={assigDefaultProps}
                                            roomTypesData={roomTypesData || []}
                                            defaultTimeStart={defaultStartDate}
                                            defaultTimeEnd={defaultEndDate}
                                            assigDataControl={assigDataControl}
                                            setDataTime={setDataTime}
                                            windowHeight={windowHeight}
                                            windowWidth={windowWidth}
                                            dataTime={dataTime}
                                            key={`timeline${
                                              dayPickerHook.from
                                              }${networkStatus !== 1}`}
                                          />
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
                )}
              </UpdateBookingMu>
            )}
          </AllocateGuestToRoomMu>
        );
      }}
    </GetAllRoomTypeWithGuestQuery>
  );
};

export default reactWindowSize<IProps>(EerrorProtect(AssigTimelineWrap));
