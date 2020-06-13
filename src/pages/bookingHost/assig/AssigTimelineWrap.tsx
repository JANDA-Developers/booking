/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useMemo } from "react";
import moment from "moment-timezone";
import _ from "lodash";
import assigDefaultProps from "./timelineConfig";
import {
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
  updateBlockOption,
  updateBlockOptionVariables,
  getAllRoomType,
  getAllRoomTypeVariables,
  getGuestsVariables,
  getGuests,
  createBlocks,
  createBlocksVariables,
  createBlock,
  createBlockVariables
} from "../../../types/api";
import { useDayPicker, LANG } from "../../../hooks/hook";
import {
  setMidNight,
  queryDataFormater,
  onCompletedMessage,
  s4
} from "../../../utils/utils";
import { BookingStatus } from "../../../types/enum";
import {
  ALLOCATE_GUEST_TO_ROOM,
  UPDATE_BOOKING,
  DELETE_GUEST,
  DELETE_BLOCK,
  CREATE_BLOCK,
  DELETE_BOOKING,
  UPDATE_BLOCK_OPTION,
  GET_ALL_GUEST_AND_BLOCK,
  GET_ALL_ROOMTYPES,
  CREATE_BLOCKS
} from "../../../apollo/queries";
import AssigTimeline from "./AssigTimeline";
import { to4YMMDD } from "../../../utils/setMidNight";
import { roomDataManufacturer } from "./helper/groupDataMenufacture";
import {
  IAssigDataControl,
  IAssigMutationLoading,
  IAssigGroup
} from "./components/assigIntrerface";
import { guestsDataManufacturer } from "./helper/guestsDataManufacturer";
import { blockDataManufacturer } from "./helper/blockDataManufacturer";
import { IContext } from "../BookingHostRouter";
import { useQuery, useMutation } from "@apollo/react-hooks";
import client from "../../../apollo/apolloClient";
import { IRoomType } from "../../../types/interface";
import { currentLang } from "../../../langs/JDlang";

moment.tz.setDefault("UTC");

interface IProps {
  context: IContext;
}

interface IWrapProp {
  roomTypesData: IRoomType[];
  formatedRoomData: IAssigGroup[];
  roomTypeLoading: boolean;
}

const AssigTimelineWrap: React.FC<IProps & IWrapProp> = ({
  context,
  roomTypesData,
  formatedRoomData,
  roomTypeLoading
}) => {
  const { houseConfig, house } = context;

  const dayPickerHook = useDayPicker(new Date(), new Date());
  const defaultStartDate =
    dayPickerHook.from ||
    moment()
      .local()
      .toDate();

  const defaultEndDate = moment(dayPickerHook.from || new Date())
    .local()
    .add(14, "days")
    .toDate();

  const [reloadKey, setReloadKey] = useState(s4());
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
  const reloadTime = () => {
    setReloadKey(s4());
  };

  const {
    data,
    loading: guestLoading,
    refetch,
    stopPolling,
    startPolling,
    networkStatus
  } = useQuery<getGuests, getGuestsVariables>(GET_ALL_GUEST_AND_BLOCK, {
    client,
    skip: roomTypeLoading,
    variables: {
      houseId: house._id,
      checkIn: to4YMMDD(moment(dataTime.start)),
      checkOut: to4YMMDD(moment(dataTime.end)),
      bookingStatuses: [BookingStatus.COMPLETED, BookingStatus.CANCELED]
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "no-cache",
    pollInterval: houseConfig.pollingPeriod?.period || 30000
  });

  const guestsData = queryDataFormater(data, "GetGuests", "guests", []) || [];
  const blockData = queryDataFormater(data, "GetBlocks", "blocks", []) || [];
  const formatedBlockData = blockDataManufacturer(blockData);
  const formatedGuestsData = guestsDataManufacturer(guestsData); // 타임라인을 위해 가공된 데이터
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

  // 생성 요청
  const [createBlocksMu, { loading: createBlocksLoading }] = useMutation<
    createBlocks,
    createBlocksVariables
  >(CREATE_BLOCKS, {
    client,
    ignoreResults: true,
    onCompleted: ({ CreateBlocks }) => {
      onCompletedMessage(
        CreateBlocks,
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
    createBlocksLoading ||
    deleteBlockLoading ||
    deleteGuestLoading ||
    deleteBookingLoading ||
    updateBookingLoading ||
    allocateMuLoading;

  const mutationLoadings: IAssigMutationLoading = {
    updateBlockLoading,
    createBlockLoading,
    createBlocksLoading,
    deleteBlockLoading,
    deleteGuestLoading,
    deleteBookingLoading,
    updateBookingLoading,
    allocateMuLoading
  };

  const assigDataControl: IAssigDataControl = {
    updateBookingMu,
    deleteBookingMu,
    deleteGuestsMu: deleteGuestMu,
    createBlocksMu,
    createBlockMu,
    deleteBlockMu,
    updateBlockOpMu,
    allocateMu,
    refetch,
    stopPolling,
    startPolling: startPolling.bind(
      startPolling,
      houseConfig.pollingPeriod.period || 30000
    ),
    totalMuLoading,
    mutationLoadings,
    networkStatus
  };

  const timelineKeyDate = `timeline${moment(
    dayPickerHook.from || new Date()
  ).format("YYMMDD")}`;

  return (
    <AssigTimeline
      context={context}
      loading={guestLoading || roomTypeLoading}
      groupData={formatedRoomData}
      deafultGuestsData={formatedItemData || []}
      dayPickerHook={dayPickerHook}
      defaultProps={assigDefaultProps}
      roomTypesData={roomTypesData || []}
      defaultTimeStart={defaultStartDate}
      defaultTimeEnd={defaultEndDate}
      assigDataControl={assigDataControl}
      setDataTime={setDataTime}
      reloadTime={reloadTime}
      dataTime={dataTime}
      key={`${timelineKeyDate}${formatedRoomData.length}${reloadKey}`}
    />
  );
};

//  퍼포먼스 이유로 존재하는 상위컴포넌트
const HiderAssigTimelineWrap: React.FC<IProps> = ({ context, ...prop }) => {
  const { house } = context;

  const { data: roomData, loading: roomTypeLoading } = useQuery<
    getAllRoomType,
    getAllRoomTypeVariables
  >(GET_ALL_ROOMTYPES, {
    client,
    variables: {
      houseId: house._id
    }
  });

  const roomTypesData =
    queryDataFormater(roomData, "GetAllRoomType", "roomTypes", []) || []; // 원본데이터
  const formatedRoomData = roomDataManufacturer(roomTypesData); // 타임라인을 위해 가공된 데이터

  moment.locale(currentLang);

  return (
    <AssigTimelineWrap
      roomTypesData={roomTypesData}
      formatedRoomData={formatedRoomData}
      roomTypeLoading={roomTypeLoading}
      context={context}
    />
  );
};

export default HiderAssigTimelineWrap;
