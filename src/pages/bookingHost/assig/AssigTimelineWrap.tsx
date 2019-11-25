/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
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
  onCompletedMessage,
  s4
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
} from "../../../apollo/queries";
import AssigTimeline from "./AssigTimeline";
import { to4YMMDD } from "../../../utils/setMidNight";
import { roomDataManufacturer } from "./helper/groupDataMenufacture";
import reactWindowSize, { WindowSizeProps } from "react-window-size";
import {
  IAssigDataControl,
  IAssigMutationLoading
} from "./components/assigIntrerface";
import { guestsDataManufacturer } from "./helper/guestsDataManufacturer";
import { blockDataManufacturer } from "./helper/blockDataManufacturer";
import { IContext } from "../BookingHostRouter";
import { useQuery, useMutation } from "@apollo/react-hooks";
import client from "../../../apollo/apolloClient";

moment.tz.setDefault("UTC");

interface IProps {
  context: IContext;
}

const AssigTimelineWrap: React.FC<IProps & WindowSizeProps> = ({
  context,
  windowHeight,
  windowWidth
}) => {
  const { houseConfig, house } = context;
  const dayPickerHook = useDayPicker(new Date(), new Date());
  const [reloadKey, setReloadKey] = useState(s4());
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

  const reloadTimeline = () => {
    setReloadKey(s4());
  };

  const updateVariables = {
    houseId: house._id,
    checkIn: to4YMMDD(moment(dataTime.start)),
    checkOut: to4YMMDD(moment(dataTime.end))
  };

  moment.tz.setDefault("UTC");

  const {
    data,
    loading,
    refetch,
    stopPolling,
    startPolling,
    networkStatus
  } = useQuery<getAllRoomTypeWithGuest, getAllRoomTypeWithGuestVariables>(
    GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM,
    {
      client,
      variables: {
        ...updateVariables,
        bookingStatuses: [BookingStatus.COMPLETE, BookingStatus.PROGRESSING]
      },
      partialRefetch: true,
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only",
      pollInterval: houseConfig.pollingPeriod
        ? houseConfig.pollingPeriod.period
        : undefined
    }
  );

  const roomTypesData = queryDataFormater(
    data,
    "GetAllRoomType",
    "roomTypes",
    undefined
  ); // 원본데이터

  const guestsData = queryDataFormater(data, "GetGuests", "guests", []) || [];
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

  // 배정 요청
  const [allocateMu, { loading: allocateMuLoading }] = useMutation<
    allocateGuestToRoom,
    allocateGuestToRoomVariables
  >(ALLOCATE_GUEST_TO_ROOM, {
    client,
    ignoreResults: true,
    update: (cache, { data: inData }) => {
      const cacheData: getAllRoomTypeWithGuest | null = cache.readQuery({
        query: GET_ALL_ROOMTYPES_WITH_GUESTS_WITH_ITEM,
        variables: updateVariables
      });
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
    },
    onCompleted: ({ AllocateGuestToRoom }) => {
      onCompletedMessage(
        AllocateGuestToRoom,
        LANG("assig_completed"),
        LANG("assig_failed")
      );
    }
  });

  // 업데이트 예약 요청
  const [updateBookingMu, { loading: updateBookingLoading }] = useMutation<
    updateBooking,
    updateBookingVariables
  >(UPDATE_BOOKING, {
    client,
    ignoreResults: true
  });

  // 삭제 요청
  const [deleteGuestMu, { loading: deleteGuestLoading }] = useMutation<
    deleteGuests,
    deleteGuestsVariables
  >(DELETE_GUEST, {
    client,
    ignoreResults: true,
    onCompleted: ({ DeleteGuests }) => {
      onCompletedMessage(
        DeleteGuests,
        LANG("delete_completed"),
        LANG("delete_failed")
      );
    }
  });

  // 생성 요청
  const [createBlockMu, { loading: createBlockLoading }] = useMutation<
    createBlock,
    createBlockVariables
  >(CREATE_BLOCK, {
    client,
    ignoreResults: true,
    onCompleted: ({ CreateBlock }) => {
      onCompletedMessage(
        CreateBlock,
        LANG("block_room_completed"),
        LANG("block_room_failed")
      );
    }
  });

  // 방막기 삭제 요청
  const [deleteBlockMu, { loading: deleteBlockLoading }] = useMutation<
    deleteBlock,
    deleteBlockVariables
  >(DELETE_BLOCK, {
    client,
    ignoreResults: true,
    onCompleted: ({ DeleteBlock }) => {
      onCompletedMessage(
        DeleteBlock,
        LANG("room_block_release"),
        LANG("room_block_release_fail")
      );
    }
  });

  // 예약 삭제 요청
  const [deleteBookingMu, { loading: deleteBookingLoading }] = useMutation<
    deleteBooking,
    deleteBookingVariables
  >(DELETE_BOOKING, {
    client,
    ignoreResults: true,
    onCompleted: ({ DeleteBooking }) => {
      onCompletedMessage(
        DeleteBooking,
        LANG("reservation_delete_complete"),
        LANG("reservation_delete_fail")
      );
    }
  });

  // 방막기 업데이트 요청
  const [updateBlockOpMu, { loading: updateBlockLoading }] = useMutation<
    updateBlockOption,
    updateBlockOptionVariables
  >(UPDATE_BLOCK_OPTION, {
    client,
    ignoreResults: true,
    onCompleted: ({ UpdateBlockOption }) => {
      onCompletedMessage(
        UpdateBlockOption,
        LANG("change_complited"),
        LANG("change_failed")
      );
    }
  });

  // 이로딩은 ignoreResults와 함께 사실상 의미가 없어진것이룻도 있다
  const totalMuLoading =
    updateBlockLoading ||
    createBlockLoading ||
    deleteBlockLoading ||
    deleteGuestLoading ||
    deleteBookingLoading ||
    updateBookingLoading ||
    allocateMuLoading;

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
      deafultGuestsData={formatedItemData || []}
      dayPickerHook={dayPickerHook}
      defaultProps={assigDefaultProps}
      roomTypesData={roomTypesData || []}
      defaultTimeStart={defaultStartDate}
      defaultTimeEnd={defaultEndDate}
      assigDataControl={assigDataControl}
      setDataTime={setDataTime}
      windowHeight={windowHeight}
      windowWidth={windowWidth}
      reloadTimeline={reloadTimeline}
      dataTime={dataTime}
      key={`timeline${moment(dayPickerHook.from || new Date()).format(
        "YYMMDD"
      )}${networkStatus !== 1}${reloadKey}`}
    />
  );
};

export default reactWindowSize<IProps>(EerrorProtect(AssigTimelineWrap));
