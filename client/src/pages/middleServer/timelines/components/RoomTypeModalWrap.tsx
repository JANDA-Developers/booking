import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { ApolloError } from 'apollo-client';
import { createRoomType, createRoomTypeVariables } from '../../../../types/api';
import RoomTypeModal from './RoomTypeModal';
import { CREATE_ROOMTYPE, GET_ALL_ROOMTYPES } from '../../../../queries';
import { useImageUploader } from '../../../../actions/hook';
import { ErrProtecter, toast, onError } from '../../../../utils/utils';

enum PricingType {
  DOMITORY = 'DOMITORY',
  ROOM = 'ROOM',
}

class CreateRoomTypeMutation extends Mutation<createRoomType, createRoomTypeVariables> {}
class DeleteRoomTypeMutation extends Mutation<deleteRoomType, createRoomTypeVariables> {}
class UpdateRoomTypeMutation extends Mutation<createRoomType, createRoomTypeVariables> {}

interface IProps {
  selectedHouseId: string;
  roomData: any;
  modalHook: any;
}

const ModifyTimelineWrap: React.SFC<IProps> = ({ selectedHouseId, roomData, modalHook }) => {
  const roomImageHook = useImageUploader();
  const [roomTypeValue, setRoomTypeModal] = useState({
    name: '',
    description: '',
    pricingType: { label: '도미토리', value: PricingType.DOMITORY },
    peopleCount: { label: '선택바람', value: 0 },
    peopleCountMax: { label: '', value: 0 },
  });

  return (
    // 방타입 생성 뮤테이션
    <CreateRoomTypeMutation
      mutation={CREATE_ROOMTYPE}
      refetchQueries={[{ query: GET_ALL_ROOMTYPES, variables: { houseId: selectedHouseId } }]}
      variables={{
        houseId: selectedHouseId,
        name: roomTypeValue.name,
        pricingType: roomTypeValue.pricingType.value,
        peopleCount: roomTypeValue.peopleCount.value,
        peopleCountMax: roomTypeValue.peopleCountMax.value,
        description: roomTypeValue.description,
      }}
      onCompleted={({ CreateRoomType }: ApolloComplete) => {
        if (CreateRoomType.ok) {
          toast.success('방타입 생성완료');
        } else {
          console.error(CreateRoomType.error);
          toast.warn('방타입 생성에 문제가 생겼습니다. 별도문의 바랍니다.');
        }
      }}
      onError={onError}
    >
      {createRoomTypeMutation => (
        <DeleteRoomTypeMutation>
          {deleteRoomTypeMutation => (
            <UpdateRoomTypeMutation>
              {updateRoomTypeMutation => (
                <RoomTypeModal
                  roomImageHook={roomImageHook}
                  setValue={setRoomTypeModal}
                  value={roomTypeValue}
                  roomData={roomData}
                  modalHook={modalHook}
                  createRoomTypeMutation={createRoomTypeMutation}
                  deleteRoomTypeMutation={deleteRoomTypeMutation}
                  updateRoomTypeMutation={updateRoomTypeMutation}
                />
              )}
            </UpdateRoomTypeMutation>
          )}
        </DeleteRoomTypeMutation>
      )}
    </CreateRoomTypeMutation>
  );
};

export default ErrProtecter(ModifyTimelineWrap);
