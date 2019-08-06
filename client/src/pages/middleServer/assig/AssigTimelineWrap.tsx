/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from "react";
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
  updateBlockOptionVariables
} from "../../../types/api";
import {useToggle, useDayPicker} from "../../../actions/hook";
import {IRoomType, IGuests, IBlock, IHouse} from "../../../types/interface";
import {
  isEmpty,
  setMidNight,
  showError,
  queryDataFormater,
  onCompletedMessage
} from "../../../utils/utils";
import EerrorProtect from "../../../utils/errProtect";
import {
  Gender,
  BookingStatus,
  GuestType,
  RoomGender,
  PricingType,
  TimePerMs
} from "../../../types/enum";
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
import {setYYYYMMDD, parallax} from "../../../utils/setMidNight";
import {roomDataManufacture} from "./components/groupDataMenufacture";
import reactWindowSize, {WindowSizeProps} from "react-window-size";
import {DEFAULT_ASSIG_ITEM, DEFAULT_BLOCK_OP} from "../../../types/defaults";
import {
  IAssigDataControl,
  IAssigItem,
  IAssigItemCrush,
  IAssigMutationLoading
} from "./components/assigIntrerface";

moment.tz.setDefault("UTC");

class UpdateBookingMu extends Mutation<updateBooking, updateBookingVariables> {}
class CreateBlockMu extends Mutation<createBlock, createBlockVariables> {}
class DeleteBookingMu extends Mutation<deleteBooking, deleteBookingVariables> {}
class UpdateBlockOpMu extends Mutation<
  updateBlockOption,
  updateBlockOptionVariables
> {}

interface IProps {
  houseId: string;
  house: IHouse;
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

const AssigTimelineWrap: React.FC<IProps & WindowSizeProps> = ({
  houseId,
  house,
  windowHeight,
  windowWidth
}) => {
  const {houseConfig} = house;
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

  const crushTimeMake = (
    guestData: IGuests,
    index: number
  ): IAssigItemCrush[] => {
    if (guestData.isSettleable && guestData.isSettleable.duplicateDates) {
      return guestData.isSettleable.duplicateDates.map(date => ({
        start: moment(date.start).valueOf(),
        end: moment(date.end).valueOf(),
        itemIndex: index,
        reason: ""
      }));
    }
    return [];
  };

  const blockDataManufacture = (blocksData: IBlock[] | null | undefined) => {
    const alloCateItems: IAssigItem[] = [];

    if (!blocksData) return alloCateItems;
    blocksData.forEach((blockData, index) => {
      if (blockData) {
        alloCateItems.push({
          ...DEFAULT_ASSIG_ITEM,
          id: blockData._id,
          bookingId: blockData._id,
          roomId: blockData.allocatedRoom._id,
          group: blockData.allocatedRoom._id + blockData.bedIndex,
          start: moment(blockData.start).valueOf(),
          end: moment(blockData.end).valueOf(),
          canMove: false,
          // @ts-ignore
          type: blockData.guestType,
          bedIndex: blockData.bedIndex
        });
      }
    });

    return alloCateItems;
  };

  //  TODO: 메모를 사용해서 데이터를 아끼자
  // 게스트 데이터를 달력에서 쓸수있는 Item 데이터로 변경 절차
  const guestsDataManufacture = (
    allGuestsData: IGuests[] | null | undefined = []
  ) => {
    const alloCateItems: IAssigItem[] = [];
    if (!allGuestsData) return alloCateItems;

    const guestsData = allGuestsData.filter(
      guest => guest.booking.bookingStatus !== BookingStatus.CANCEL
    );

    guestsData.forEach((guestData, index) => {
      const isDomitory = guestData.pricingType === "DOMITORY";

      if (
        guestData &&
        guestData.booking &&
        guestData.roomType &&
        guestData.allocatedRoom
      ) {
        const {
          _id,
          name,
          roomType,
          booking,
          gender,
          isUnsettled,
          bedIndex,
          start,
          allocatedRoom,
          end
        } = guestData;
        const {checkIn, _id: bookingId, isNew, isConfirm} = booking;
        alloCateItems.push({
          id: _id,
          itemIndex: index,
          name: name,
          loading: false,
          bookingId: bookingId,
          isCheckin: checkIn.isIn,
          gender: gender,
          roomTypeId: roomType._id,
          showNewBadge: isNew && !isConfirm,
          roomId: allocatedRoom._id,
          isUnsettled: isUnsettled,
          group: allocatedRoom._id + bedIndex,
          start: moment(start).valueOf(),
          end: moment(end).valueOf(),
          validate: crushTimeMake(guestData, index),
          canResize: false,
          canMove: true,
          // @ts-ignore
          type: guestData.guestType || "GUEST",
          bedIndex: guestData.bedIndex,
          blockOption: Object.assign(
            {},
            guestData.blockOption || DEFAULT_BLOCK_OP
          ),
          showEffect: false
        });
      }
    });

    return alloCateItems;
  };

  const updateVariables = {
    houseId,
    start: setYYYYMMDD(moment(dataTime.start)),
    end: setYYYYMMDD(moment(dataTime.end))
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
        bookingStatus: BookingStatus.COMPLETE
      }}
    >
      {({data, loading, error, stopPolling, startPolling, networkStatus}) => {
        const roomTypesData = queryDataFormater(
          data,
          "GetAllRoomType",
          "roomTypes",
          undefined
        ); // 원본데이터

        const guestsData = queryDataFormater(
          data,
          "GetGuests",
          "guests",
          undefined
        ); // 원본데이터

        const blocks = queryDataFormater(
          data,
          "GetBlocks",
          "blocks",
          undefined
        );

        const formatedRoomData = roomDataManufacture(roomTypesData); // 타임라인을 위해 가공된 데이터
        const formatedGuestsData = guestsDataManufacture(guestsData); // 타임라인을 위해 가공된 데이터
        const formatedBlockData = blockDataManufacture(blocks); // 타임라인을 위해 가공된 데이터

        const formatedItemData = formatedGuestsData.concat(formatedBlockData);

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
                                          houseConfig.pollingPeriod
                                            ? houseConfig.pollingPeriod.period
                                            : 100000
                                        ),
                                        totalMuLoading,
                                        mutationLoadings,
                                        networkStatus
                                      };

                                      return (
                                        <AssigTimeline
                                          house={house}
                                          houseId={houseId}
                                          houseConfig={houseConfig}
                                          loading={loading}
                                          groupData={formatedRoomData}
                                          deafultGuestsData={
                                            formatedItemData || []
                                          }
                                          dayPickerHook={dayPickerHook}
                                          defaultProps={assigDefaultProps}
                                          roomTypesData={roomTypesData || []}
                                          defaultTimeStart={defaultStartDate}
                                          assigDataControl={assigDataControl}
                                          defaultTimeEnd={defaultEndDate}
                                          setDataTime={setDataTime}
                                          windowHeight={windowHeight}
                                          windowWidth={windowWidth}
                                          dataTime={dataTime}
                                          key={`timeline${dayPickerHook.from}${
                                            dayPickerHook.to
                                          }${roomTypesData &&
                                            roomTypesData.length}`}
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
