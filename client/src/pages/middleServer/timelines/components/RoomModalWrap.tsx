import React, { useEffect } from 'react';
import { ApolloError } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { useInput, TUseModal } from '../../../../actions/hook';
import {
  ErrProtecter, toast, onError, onCompletedMessage,
} from '../../../../utils/utils';
import RoomModal from './RoomModal';
import {
  createRoom,
  createRoomVariables,
  deleteRoom,
  deleteRoomVariables,
  updateRoom,
  updateRoomVariables,
  getAllRoomType_GetAllRoomType_roomTypes,
  getAllRoomType_GetAllRoomType_roomTypes_rooms,
} from '../../../../types/api';
import {
  CREATE_ROOM, GET_ALL_ROOMTYPES, DELETE_ROOM, UPDATE_ROOM,
} from '../../../../queries';

class CreateRoomMutation extends Mutation<createRoom, createRoomVariables> {}
class DeleteRoomMutation extends Mutation<deleteRoom, deleteRoomVariables> {}
class UpdateRoomMutation extends Mutation<updateRoom, updateRoomVariables> {}

interface IProps {
  modalHook: TUseModal;
  refetchRoomData: any;
  selectedHouseId: string;
  roomData: getAllRoomType_GetAllRoomType_roomTypes[] | null | undefined;
}

const ModifyTimelineWrap: React.SFC<IProps> = ({
  modalHook, selectedHouseId, refetchRoomData, roomData,
}) => {
  const roomNameHook = useInput('');

  // 팝업시 올바른 데이터를 전달
  useEffect(() => {
    if (roomData) {
      const roomTypeInfo = roomData[modalHook.info.roomTypeIndex];
      if (roomTypeInfo) {
        const roomInfo: getAllRoomType_GetAllRoomType_roomTypes_rooms | undefined = roomTypeInfo.rooms[modalHook.info.roomIndex];
        if (roomInfo) roomNameHook.onChange(roomInfo.name);
        else {
          roomNameHook.onChange('');
        }
      }
    }
  }, [modalHook.info]);

  return (
    // 방타입 생성 뮤테이션
    <CreateRoomMutation
      mutation={CREATE_ROOM}
      refetchQueries={refetchRoomData}
      variables={{
        name: roomNameHook.value,
        roomType: modalHook.info.roomTypeId,
      }}
      onCompleted={({ CreateRoom }: createRoom) => {
        onCompletedMessage(CreateRoom, '방 생성완료', '방 생성 실패');
      }}
      onError={onError}
    >
      {createRoomMutation => (
        <DeleteRoomMutation
          mutation={DELETE_ROOM}
          refetchQueries={refetchRoomData}
          variables={{
            roomId: modalHook.info.roomId,
          }}
          onCompleted={({ DeleteRoom }: deleteRoom) => {
            onCompletedMessage(DeleteRoom, '방 삭제완료', '방 삭제 실패');
          }}
          onError={onError}
        >
          {deleteRoomMutation => (
            <UpdateRoomMutation
              mutation={UPDATE_ROOM}
              refetchQueries={refetchRoomData}
              variables={{
                roomId: modalHook.info.roomId,
                name: roomNameHook.value,
              }}
              onCompleted={({ UpdateRoom }: updateRoom) => {
                onCompletedMessage(UpdateRoom, '방 업데이트', '방 업데이트 실패');
              }}
              onError={onError}
            >
              {updateRoomMutation => (
                <RoomModal
                  modalHook={modalHook}
                  roomNameHook={roomNameHook}
                  deleteRoomMutation={deleteRoomMutation}
                  createRoomMutation={createRoomMutation}
                  updateRoomMutation={updateRoomMutation}
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
