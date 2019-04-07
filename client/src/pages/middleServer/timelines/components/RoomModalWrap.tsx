import React from 'react';
import { ApolloError } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { useInput } from '../../../../actions/hook';
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
} from '../../../../types/api';
import {
  CREATE_ROOM, GET_ALL_ROOMTYPES, DELETE_ROOM, UPDATE_ROOM,
} from '../../../../queries';

class CreateRoomMutation extends Mutation<createRoom, createRoomVariables> {}
class DeleteRoomMutation extends Mutation<deleteRoom, deleteRoomVariables> {}
class UpdateRoomMutation extends Mutation<updateRoom, updateRoomVariables> {}

interface IProps {
  modalHook: any;
  refetchRoomData: any;
  selectedHouseId: string;
}

const ModifyTimelineWrap: React.SFC<IProps> = ({ modalHook, selectedHouseId, refetchRoomData }) => {
  const roomNameHook = useInput('');

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
