import React, { Fragment, useMemo } from "react";
import { onCompletedMessage } from "../../utils/utils";
import {
  allocateGuestToRoom,
  allocateGuestToRoomVariables,
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
  updateBookingVariables,
  getGuests_GetBlocks_blocks,
  getGuests_GetGuests_guests,
  getGuests,
  getGuestsVariables
} from "../../types/api";
import client from "../../apollo/apolloClient";
import {
  ALLOCATE_GUEST_TO_ROOM,
  UPDATE_BLOCK_OPTION,
  DELETE_GUEST,
  CREATE_BLOCK,
  DELETE_BLOCK,
  DELETE_BOOKING,
  UPDATE_BOOKING,
  GET_ALL_GUEST_AND_BLOCK
} from "../../apollo/queries";
import { queryDataFormater } from "../../utils/utils";
import { useDayPicker, IUseDayPicker, LANG } from "../../hooks/hook";
import DailyAssig from "./DailyAssig";
import { NetworkStatus } from "apollo-client";
import { IDailyAssigDataControl } from "../../pages/bookingHost/assig/components/assigIntrerface";
import moment from "moment";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { BookingStatus } from "../../types/enum";
import { getOperationName } from "apollo-link";
import { TDailyGroup } from "./groupDataManufacter";
import { IDailyWrapWrapProp } from "./DailyAssigWrapWrap";

export interface IDailyAssigProp {
  networkStatus: NetworkStatus;
  calendarPosition?: "center" | "inside" | "topLeft";
  loading: boolean;
  roomTypeLoading: boolean;
  blocksData: getGuests_GetBlocks_blocks[];
  guestsData: getGuests_GetGuests_guests[];
  dayPickerHook: IUseDayPicker;
  roomTypesData: TDailyGroup[];
  itemDatas: (getGuests_GetGuests_guests | getGuests_GetBlocks_blocks)[];
}

export interface IChainProps {
  calendarPosition?: "center" | "inside" | "topLeft";
  onRederCallBack?: () => void;
}

interface WrapProp {
  roomTypesData: TDailyGroup[];
  roomTypeLoading: boolean;
}

const DailyAssigWrap: React.FC<IDailyWrapWrapProp & WrapProp> = ({
  date,
  context,
  roomTypesData,
  roomTypeLoading,
  calendarPosition = "topLeft",
  ...props
}) => {
  const { house } = context;
  const dayPickerHook = useDayPicker(date, date);
  const { houseConfig, _id: houseId } = house;

  const queryVariables = {
    houseId: houseId,
    checkIn: dayPickerHook.from || new Date(),
    checkOut: moment(dayPickerHook.from || new Date())
      .add(1, "day")
      .toDate()
  };

  const { data, loading, networkStatus } = useQuery<
    getGuests,
    getGuestsVariables
  >(GET_ALL_GUEST_AND_BLOCK, {
    client,
    notifyOnNetworkStatusChange: true,
    skip: roomTypeLoading,
    variables: {
      ...queryVariables,
      bookingStatuses: [BookingStatus.COMPLETED, BookingStatus.CANCELED]
    },
    fetchPolicy: "no-cache",
    pollInterval: houseConfig.pollingPeriod?.period || 300000
  });

  const refetch = [getOperationName(GET_ALL_GUEST_AND_BLOCK) || ""];

  const guestsData = queryDataFormater(data, "GetGuests", "guests", []) || [];
  const blocksData = queryDataFormater(data, "GetBlocks", "blocks", []) || [];

  const [allocateMu, { loading: allocateMuLoading }] = useMutation<
    allocateGuestToRoom,
    allocateGuestToRoomVariables
  >(ALLOCATE_GUEST_TO_ROOM, {
    client,
    refetchQueries: refetch,
    ignoreResults: true,
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
    refetchQueries: refetch,
    ignoreResults: true
  });

  // 삭제 요청
  const [deleteGuestsMu, { loading: deleteGuestLoading }] = useMutation<
    deleteGuests,
    deleteGuestsVariables
  >(DELETE_GUEST, {
    client,
    refetchQueries: refetch,
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
    refetchQueries: refetch,
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
    refetchQueries: refetch,
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
    refetchQueries: refetch,
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
    refetchQueries: refetch,
    onCompleted: ({ UpdateBlockOption }) => {
      onCompletedMessage(
        UpdateBlockOption,
        LANG("change_complited"),
        LANG("change_failed")
      );
    }
  });

  const totalMuLoading: boolean =
    allocateMuLoading ||
    createBlockLoading ||
    deleteBlockLoading ||
    deleteGuestLoading ||
    updateBookingLoading ||
    updateBlockLoading;

  const itemDatas = [...guestsData, ...blocksData];

  roomTypesData.forEach(rt => {
    rt.rooms.forEach(r => {
      const targets = itemDatas.filter(item => item.room?._id === r._id);
      r.places.forEach((p, i) => {
        // @ts-ignore
        const target = targets.find(item => item.bedIndex === i);
        p.item = target || null;
      });
    });
  });

  const dailyAssigContext: IDailyAssigProp = {
    blocksData,
    dayPickerHook,
    guestsData,
    itemDatas,
    loading,
    roomTypeLoading,
    networkStatus,
    roomTypesData,
    calendarPosition
  };

  const dailyAssigDataControl: IDailyAssigDataControl = {
    allocateMu,
    createBlockMu,
    deleteBlockMu,
    deleteBookingMu,
    deleteGuestsMu,
    updateCheckInMu: updateBookingMu,
    totalMuLoading,
    updateBlockOpMu
  };

  return (
    <Fragment>
      <DailyAssig
        context={context}
        outDailyAssigContext={dailyAssigContext}
        dailyAssigDataControl={dailyAssigDataControl}
        {...props}
      />
    </Fragment>
  );
};

export default DailyAssigWrap;
