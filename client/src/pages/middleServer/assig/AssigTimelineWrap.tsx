/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useCallback, useMemo} from "react";
import {Query, Mutation} from "react-apollo";
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
  updateBlockOptionVariables,
  getAllRoomTypeWithGuest_GetGuests_guests
} from "../../../types/api";
import {useToggle, useDayPicker} from "../../../hooks/hook";
import {
  IRoomType,
  IGuest,
  IBlock,
  IHouse,
  IGuestD
} from "../../../types/interface";
import {
  setMidNight,
  queryDataFormater,
  onCompletedMessage,
  instanceOfA
} from "../../../utils/utils";
import EerrorProtect from "../../../utils/errProtect";
import {Gender, BookingStatus, TimePerMs} from "../../../types/enum";
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
import {set4YMMDD} from "../../../utils/setMidNight";
import {roomDataManufacture} from "./components/groupDataMenufacture";
import reactWindowSize, {WindowSizeProps} from "react-window-size";
import {DEFAULT_ASSIG_ITEM, DEFAULT_BLOCK_OP} from "../../../types/defaults";
import {
  IAssigDataControl,
  IAssigItem,
  IAssigMutationLoading
} from "./components/assigIntrerface";
import {IContext} from "../../MiddleServerRouter";

moment.tz.setDefault("UTC");

class UpdateBookingMu extends Mutation<updateBooking, updateBookingVariables> {}
class CreateBlockMu extends Mutation<createBlock, createBlockVariables> {}
class DeleteBookingMu extends Mutation<deleteBooking, deleteBookingVariables> {}
class UpdateBlockOpMu extends Mutation<
  updateBlockOption,
  updateBlockOptionVariables
> {}

interface IProps {
  context: IContext;
}

class GetAllRoomTypeWithGuestQuery extends Query<
  getAllRoomTypeWithGuest,
  getAllRoomTypeWithGuestVariables
> {}
class AllocateGuestToRoomMu extends Mutation<
  allocateGuestToRoom,
  allocateGuestToRoomVariables
> {}
class DeleteGuestMu extends Mutation<deleteGuests, deleteGuestsVariables> {}
class DeleteBlockMu extends Mutation<deleteBlock, deleteBlockVariables> {}

export const blockDataManufacture = (blocksData: IBlock[]) => {
  const alloCateItems: IAssigItem[] = [];

  blocksData.forEach((blockData, index) => {
    if (blockData) {
      alloCateItems.push({
        ...DEFAULT_ASSIG_ITEM,
        id: blockData._id,
        temp: true,
        bookingId: blockData._id,
        roomId: blockData.room._id,
        group: blockData.room._id + blockData.bedIndex,
        start: moment(blockData.checkIn).valueOf(),
        end: moment(blockData.checkOut).valueOf(),
        canMove: false,
        // @ts-ignore
        type: blockData.guestType,
        bedIndex: blockData.bedIndex
      });
    }
  });

  return alloCateItems;
};

const AssigTimelineWrap: React.FC<IProps & WindowSizeProps> = ({
  context,
  windowHeight,
  windowWidth
}) => {
  const {houseConfig, house} = context;
  const dayPickerHook = useDayPicker(null, null);
  const defaultStartDate = dayPickerHook.from
    ? moment(dayPickerHook.from).valueOf()
    : moment().valueOf() - TimePerMs.H * 18;

  const defaultEndDate = setMidNight(
    dayPickerHook.from
      ? setMidNight(
          moment(dayPickerHook.from)
            .add(10, "days")
            .valueOf()
        )
      : setMidNight(
          moment()
            .add(10, "days")
            .valueOf()
        )
  );

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

  //  TODO: 메모를 사용해서 데이터를 아끼자
  // 게스트 데이터를 달력에서 쓸수있는 Item 데이터로 변경 절차
  const guestsDataManufacture = (allGuestsData: IGuest[]) => {
    const alloCateItems: IAssigItem[] = [];
    if (!allGuestsData) return alloCateItems;

    const guestsData = allGuestsData.filter(
      guest => guest.booking.status !== BookingStatus.CANCEL
    );

    guestsData.forEach((guestData, index) => {
      if (
        guestData &&
        guestData.booking &&
        guestData.roomType &&
        guestData.room
      ) {
        let gender: Gender | null = null;
        let bedIndex = 0;
        const {_id, roomType, booking, checkIn, room, checkOut} = guestData;
        const {_id: bookingId, isNew, isConfirm, status, name} = booking;

        if (instanceOfA<IGuestD>(guestData, "gender")) {
          gender = guestData.gender;
          bedIndex = guestData.bedIndex;
        }
        const pushItem: IAssigItem = {
          id: _id,
          itemIndex: index,
          name: name,
          loading: false,
          bookingId: bookingId,
          checkInInfo: checkIn.isIn,
          gender: gender,
          status: status,
          roomTypeId: roomType._id,
          showNewBadge: isNew && !isConfirm,
          roomId: room._id,
          temp: true,
          group: room._id + bedIndex,
          start: moment(checkIn).valueOf(),
          end: moment(checkOut).valueOf(),
          canMove: status !== BookingStatus.READY,
          // @ts-ignore
          type: guestData.guestType || "GUEST",
          bedIndex: bedIndex,
          blockOption: Object.assign(
            {},
            guestData.blockOption || DEFAULT_BLOCK_OP
          ),
          showEffect: false
        };
        alloCateItems.push(pushItem);
      }
    });

    return alloCateItems;
  };

  const updateVariables = {
    houseId: house._id,
    start: set4YMMDD(moment(dataTime.start)),
    end: set4YMMDD(moment(dataTime.end))
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
        bookingStatuses: [BookingStatus.COMPLETE, BookingStatus.READY]
      }}
    >
      {({data, loading, stopPolling, startPolling, networkStatus}) => {
        const roomTypesData = queryDataFormater(
          data,
          "GetAllRoomType",
          "roomTypes",
          undefined
        ); // 원본데이터

        const guestsData =
          queryDataFormater(data, "GetGuests", "guests", []) || [];

        const blocks = queryDataFormater(data, "GetBlocks", "blocks", []) || [];

        const formatedRoomData = roomDataManufacture(roomTypesData); // 타임라인을 위해 가공된 데이터
        const formatedGuestsData = guestsDataManufacture(guestsData); // 타임라인을 위해 가공된 데이터
        const formatedBlockData = blockDataManufacture(blocks); // 타임라인을 위해 가공된 데이터
        const formatedItemData = formatedGuestsData
          .concat(formatedBlockData)
          .map((block, index) => {
            block.itemIndex = index;
            return block;
          });

        return (
          <AllocateGuestToRoomMu
            onCompleted={({AllocateGuestToRoom}) => {
              onCompletedMessage(AllocateGuestToRoom, "배정완료", "배정실패");
            }}
            update={(cache, {data: inData}) => {
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
                {(updateBookingMu, {loading: updateBookingLoading}) => (
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
