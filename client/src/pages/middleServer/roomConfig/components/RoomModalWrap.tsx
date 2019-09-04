import React, {useEffect} from "react";
import {ApolloError, PureQueryOptions} from "apollo-boost";
import {Mutation} from "react-apollo";
import {useInput, IUseModal} from "../../../../actions/hook";
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
  getAllRoomType_GetAllRoomType_roomTypes,
  getAllRoomType_GetAllRoomType_roomTypes_rooms
} from "../../../../types/api";
import {
  CREATE_ROOM,
  DELETE_ROOM,
  UPDATE_ROOM,
  GET_ALL_ROOMTYPES
} from "../../../../queries";
import {DEFAULT_ROOMTYPE_ROOM} from "../../../../types/defaults";
import {IContext} from "../../../MiddleServerRouter";

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

const ModifyTimelineWrap: React.SFC<IProps> = ({
  modalHook,
  roomTypeData,
  context,
  refetchQueries: outRefetchQueries
}) => {
  const {house} = context;
  const refetchQueries = [
    {query: GET_ALL_ROOMTYPES, variables: {houseId: house._id}},
    ...outRefetchQueries
  ];
  const {info} = modalHook;
  const isAddMode = info.isAddMode;
  const targetRoomType = roomTypeData.find(
    roomType => roomType._id === info.roomTypeId
  );
  if (!targetRoomType && !isAddMode) return <div />;
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
      onCompleted={({CreateRoom}: createRoom) => {
        onCompletedMessage(CreateRoom, "방 생성완료", "방 생성 실패");
      }}
    >
      {createRoomMutation => (
        <DeleteRoomMutation
          mutation={DELETE_ROOM}
          refetchQueries={refetchQueries}
          variables={{
            roomId: modalHook.info.roomId || ""
          }}
          onCompleted={({DeleteRoom}: deleteRoom) => {
            onCompletedMessage(DeleteRoom, "방 삭제완료", "방 삭제 실패");
          }}
        >
          {deleteRoomMutation => (
            <UpdateRoomMutation
              mutation={UPDATE_ROOM}
              refetchQueries={refetchQueries}
              variables={{
                roomId: modalHook.info.roomId || "",
                name: roomNameHook.value
              }}
              onCompleted={({UpdateRoom}: updateRoom) => {
                onCompletedMessage(
                  UpdateRoom,
                  "방 업데이트",
                  "방 업데이트 실패"
                );
              }}
            >
              {updateRoomMutation => (
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

export default ErrProtecter(ModifyTimelineWrap);
