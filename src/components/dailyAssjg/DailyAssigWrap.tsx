import React, { Fragment } from "react";
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
  getAllRoomType,
  getAllRoomTypeVariables,
  getGuests_GetBlocks_blocks,
  getGuests_GetGuests_guests,
  getAllRoomType_GetAllRoomType_roomTypes,
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
  GET_ALL_GUEST_AND_BLOCK,
  GET_ALL_ROOMTYPES
} from "../../apollo/queries";
import { queryDataFormater } from "../../utils/utils";
import { useDayPicker, IUseDayPicker, LANG } from "../../hooks/hook";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import DailyAssig from "./DailyAssig";
import { NetworkStatus } from "apollo-client";
import {
  IDailyAssigDataControl
} from "../../pages/bookingHost/assig/components/assigIntrerface";
import moment from "moment";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { BookingStatus } from "../../types/enum";
import { getOperationName } from "apollo-link";

export interface IDailyAssigProp {
  networkStatus: NetworkStatus;
  calendarPosition?: "center" | "inside" | "topLeft";
  loading: boolean;
  roomTypeLoading: boolean;
  blocksData: getGuests_GetBlocks_blocks[];
  guestsData: getGuests_GetGuests_guests[];
  dayPickerHook: IUseDayPicker;
  roomTypesData: getAllRoomType_GetAllRoomType_roomTypes[];
  itemDatas: (getGuests_GetGuests_guests | getGuests_GetBlocks_blocks)[];
}

export interface IChainProps {
  calendarPosition?: "center" | "inside" | "topLeft";
  onRederCallBack?: () => void;
}

interface IProps extends IChainProps {
  context: IContext;
  date: Date;
}
interface WrapProp {
  roomTypesData: getAllRoomType_GetAllRoomType_roomTypes[];
  roomTypeLoading: boolean;
}

const DailyAssigWrap: React.FC<IProps & WrapProp> = ({
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

  const guestsData = queryDataFormater(data, "GetGuests", "guests", []) || [];
  const blocksData = queryDataFormater(data, "GetBlocks", "blocks", []) || [];

  const [allocateMu, { loading: allocateMuLoading }] = useMutation<
    allocateGuestToRoom,
    allocateGuestToRoomVariables
  >(ALLOCATE_GUEST_TO_ROOM, {
    client,
    ignoreResults: true,
    refetchQueries: [getOperationName(GET_ALL_GUEST_AND_BLOCK) || ""],
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
    refetchQueries: [getOperationName(GET_ALL_GUEST_AND_BLOCK) || ""],
    ignoreResults: true
  });

  // 삭제 요청
  const [deleteGuestsMu, { loading: deleteGuestLoading }] = useMutation<
    deleteGuests,
    deleteGuestsVariables
  >(DELETE_GUEST, {
    client,
    refetchQueries: [getOperationName(GET_ALL_GUEST_AND_BLOCK) || ""],
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
    refetchQueries: [getOperationName(GET_ALL_GUEST_AND_BLOCK) || ""],
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
    refetchQueries: [getOperationName(GET_ALL_GUEST_AND_BLOCK) || ""],

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
    refetchQueries: [getOperationName(GET_ALL_GUEST_AND_BLOCK) || ""],

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
    refetchQueries: [getOperationName(GET_ALL_GUEST_AND_BLOCK) || ""],

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

const DailyAssigHigher: React.FC<IProps> = ({ context, ...prop }) => {
  const { langHook, house } = context;
  const { data: roomData, loading: roomTypeLoading } = useQuery<
    getAllRoomType,
    getAllRoomTypeVariables
  >(GET_ALL_ROOMTYPES, {
    client,
    variables: {
      houseId: house._id
    }
  });

  moment.lang(langHook.currentLang);

  const roomTypesData =
    queryDataFormater(roomData, "GetAllRoomType", "roomTypes", []) || []; // 원본데이터

  return (
    <div>
      <DailyAssigWrap
        context={context}
        roomTypesData={roomTypesData}
        roomTypeLoading={roomTypeLoading}
        {...prop}
      />
    </div>
  );
};

export default DailyAssigHigher;
