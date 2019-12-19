import React, { useEffect } from "react";
import { ApolloError, PureQueryOptions } from "apollo-client";
import { Mutation } from "react-apollo";
import { useInput, IUseModal, LANG } from "../../../../hooks/hook";
import {
  ErrProtecter,
  onCompletedMessage,
  showError
} from "../../../../utils/utils";
import RoomModal from "./RoomModal";
import {
  createRoom,
  createRoomVariables,
  deleteRoom,
  deleteRoomVariables,
  updateRoom,
  updateRoomVariables,
  getAllRoomType_GetAllRoomType_roomTypes
} from "../../../../types/api";
import {
  CREATE_ROOM,
  DELETE_ROOM,
  UPDATE_ROOM,
  GET_ALL_ROOMTYPES
} from "../../../../apollo/queries";
import { DEFAULT_ROOMTYPE_ROOM } from "../../../../types/defaults";
import { IContext } from "../../../bookingHost/BookingHostRouter";

class CreateRoomMutation extends Mutation<createRoom, createRoomVariables> {}
class DeleteRoomMutation extends Mutation<deleteRoom, deleteRoomVariables> {}
class UpdateRoomMutation extends Mutation<updateRoom, updateRoomVariables> {}

export interface IRoomModalInfo {
  roomId?: string;
  isAddMode?: boolean;
  roomTypeId: string;
}

interface IProps {
  modalHook: IUseModal<IRoomModalInfo>;
  roomTypeData: getAllRoomType_GetAllRoomType_roomTypes[];
  context: IContext;
  refetchQueries: (PureQueryOptions | string)[];
}

const UpdateTimelineWrap: React.SFC<IProps> = ({
  modalHook,
  roomTypeData,
  context,
  refetchQueries: outRefetchQueries
}) => {
  const { house } = context;
  const refetchQueries = [
    { query: GET_ALL_ROOMTYPES, variables: { houseId: house._id } },
    ...outRefetchQueries
  ];
  const { info } = modalHook;
  const isAddMode = info.isAddMode;
  // 오픈한 방의 방타입을 찾음
  const targetRoomType = roomTypeData.find(
    roomType => roomType._id === info.roomTypeId
  );
  if (!targetRoomType && !isAddMode) return <div />;

  // 오픈한 방을 찾음
  const targetRoom = targetRoomType
    ? targetRoomType.rooms.find(room => room._id === info.roomId)
    : DEFAULT_ROOMTYPE_ROOM;

  if (!targetRoom && !isAddMode) return <div />;
  const roomNameHook = useInput(targetRoom ? targetRoom.name : "", true);

  return (
    // 방타입 생성 뮤테이션
    <CreateRoomMutation
      mutation={CREATE_ROOM}
      refetchQueries={refetchQueries}
      variables={{
        name: roomNameHook.value,
        roomType: modalHook.info.roomTypeId
      }}
      onCompleted={({ CreateRoom }: createRoom) => {
        onCompletedMessage(
          CreateRoom,
          LANG("room_create_completed"),
          LANG("room_create_fail"),
          "CreateRoom"
        );
      }}
    >
      {createRoomMutation => (
        <DeleteRoomMutation
          mutation={DELETE_ROOM}
          refetchQueries={refetchQueries}
          variables={{
            roomId: modalHook.info.roomId || ""
          }}
          onCompleted={({ DeleteRoom }: deleteRoom) => {
            onCompletedMessage(
              DeleteRoom,
              LANG("room_delete_completed"),
              LANG("room_delete_fail"),
              "DeleteRoom"
            );
          }}
        >
          {(deleteRoomMutation, { loading: deleteRoomLoading }) => (
            <UpdateRoomMutation
              mutation={UPDATE_ROOM}
              refetchQueries={refetchQueries}
              variables={{
                roomId: modalHook.info.roomId || "",
                name: roomNameHook.value
              }}
              onCompleted={({ UpdateRoom }: updateRoom) => {
                onCompletedMessage(
                  UpdateRoom,
                  LANG("room_update"),
                  LANG("room_update_fail")
                );
              }}
            >
              {(updateRoomMutation, { loading }) => (
                <RoomModal
                  modalHook={modalHook}
                  roomNameHook={roomNameHook}
                  deleteRoomMutation={deleteRoomMutation}
                  createRoomMutation={createRoomMutation}
                  updateRoomMutation={updateRoomMutation}
                  isAddMode={isAddMode}
                />
              )}
            </UpdateRoomMutation>
          )}
        </DeleteRoomMutation>
      )}
    </CreateRoomMutation>
  );
};

export default ErrProtecter(UpdateTimelineWrap);
