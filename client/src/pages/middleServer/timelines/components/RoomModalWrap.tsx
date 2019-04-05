import React from 'react';
import { Mutation } from 'react-apollo';
import { ApolloError } from 'apollo-client';
import { createRoom, createRoomVariables } from '../../../../types/api';
import { CREATE_ROOM, GET_ALL_ROOMTYPES } from '../../../../queries';
import { useInput } from '../../../../actions/hook';
import { ErrProtecter, toast } from '../../../../utils/utils';
import RoomModal from './RoomModal';

class CreateRoomMutation extends Mutation<createRoom, createRoomVariables> {}

interface IProps {
  modalHook: any;
  selectedHouseId: string;
}

const ModifyTimelineWrap: React.SFC<IProps> = ({ modalHook, selectedHouseId }) => {
  const roomNameHook = useInput('');

  return (
    // 방타입 생성 뮤테이션
    <CreateRoomMutation
      mutation={CREATE_ROOM}
      refetchQueries={[{ query: GET_ALL_ROOMTYPES, variables: { houseId: selectedHouseId } }]}
      variables={{
        name: roomNameHook.value,
        roomType: modalHook.info.roomTypeId,
      }}
      onCompleted={({ CreateRoom }: createRoom) => {
        if (CreateRoom.ok) {
          toast.success('방 생성완료');
        } else {
          console.error(CreateRoom.error);
          toast.warn('방 생성에 문제가 생겼습니다. 별도문의 바랍니다.');
        }
      }}
      onError={({ message }: ApolloError) => {
        console.error(message);
        toast.warn('통신에러 발생 잠시후 다시 시도해주세요');
      }}
    >
      {(createRoomMutation) => {
        const onCreateRoom = () => {
          if (!roomNameHook.isValid) {
            toast.warn('방이름은 10자 이하여야합니다.');
            return false;
          }
          modalHook.closeModal();
          createRoomMutation();
          return false;
        };
        return <RoomModal modalHook={modalHook} roomNameHook={roomNameHook} onCreateRoom={onCreateRoom} />;
      }}
    </CreateRoomMutation>
  );
};

export default ErrProtecter(ModifyTimelineWrap);
