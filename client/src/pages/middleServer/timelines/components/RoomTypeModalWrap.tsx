import React, { useState, useEffect } from 'react';
import { Mutation } from 'react-apollo';
import { any } from 'prop-types';
import {
  createRoomType,
  createRoomTypeVariables,
  deleteRoomType,
  deleteRoomTypeVariables,
  updateMyProfileVariables,
  updateRoomType,
  updateRoomTypeVariables,
} from '../../../../types/api';
import RoomTypeModal from './RoomTypeModal';
import {
  CREATE_ROOMTYPE, GET_ALL_ROOMTYPES, DELETE_ROOMTYPE, UPDATE_ROOM, UPDATE_ROOMTYPE,
} from '../../../../queries';
import { useImageUploader } from '../../../../actions/hook';
import {
  ErrProtecter, toast, onError, isEmpty, onCompletedMessage,
} from '../../../../utils/utils';
import {
  PricingType, PricingTypeKr, RoomGender, RoomGenderKr,
} from '../../../../types/enum';

class CreateRoomTypeMutation extends Mutation<createRoomType, createRoomTypeVariables> {}
class DeleteRoomTypeMutation extends Mutation<deleteRoomType, deleteRoomTypeVariables> {}
class UpdateRoomTypeMutation extends Mutation<updateRoomType, updateRoomTypeVariables> {}

interface IProps {
  selectedHouseId: string;
  roomData: any;
  modalHook: any;
  refetchRoomData: any;
}

const ModifyTimelineWrap: React.SFC<IProps> = ({
  refetchRoomData, selectedHouseId, roomData, modalHook,
}) => {
  const defaultRoomTypeValue = {
    name: '',
    description: '',
    pricingType: { label: PricingTypeKr[PricingType.DOMITORY], value: PricingType.DOMITORY },
    peopleCount: { label: '', value: 0 },
    roomGender: { label: RoomGenderKr[RoomGender.MIXED], value: RoomGender.MIXED },
    peopleCountMax: { label: '', value: 0 },
  };

  const roomImageHook = useImageUploader();
  const [roomTypeValue, setRoomTypeValue]: any = useState(defaultRoomTypeValue);

  const updateRoomTypeValue = {
    houseId: selectedHouseId,
    name: roomTypeValue.name,
    img: roomImageHook.fileUrl || '',
    pricingType: roomTypeValue.pricingType.value,
    roomGender: roomTypeValue.roomGender.value,
    peopleCount: roomTypeValue.peopleCountMax.value,
    peopleCountMax: roomTypeValue.peopleCountMax.value,
    description: roomTypeValue.description,
  };

  // ⛔️️️️️ 👿 이건 안티패턴이다 더 좋은방법이있다.
  // key가 바뀌면 모든걸 다시만든다 즉
  // default로 값들을주고 key만 바꿔주면되는것
  // 이건 개선되어야한다.
  useEffect(() => {
    if (!isEmpty(modalHook.info)) {
      const roomType = roomData[modalHook.info.roomTypeIndex];

      if (roomType) {
        const lastRoomTypeValue = {
          name: roomType.name,
          description: roomType.description,
          pricingType: { label: PricingTypeKr[roomType.pricingType], value: PricingType[roomType.pricingType] },
          peopleCount: { label: `${roomType.peopleCount}명`, value: roomType.peopleCount },
          roomGender: { label: RoomGenderKr[roomType.roomGender], value: RoomGender[roomType.roomGender] },
          peopleCountMax: { label: `${roomType.peopleCount}명`, value: roomType.peopleCountMax },
        };
        setRoomTypeValue(lastRoomTypeValue);
        roomImageHook.setFileUrl(roomType.img);
      } else {
        setRoomTypeValue(defaultRoomTypeValue);
        roomImageHook.setFileUrl('');
      }
    }
  }, [modalHook.info]);

  return (
    // 방타입 생성 뮤테이션
    <CreateRoomTypeMutation
      mutation={CREATE_ROOMTYPE}
      refetchQueries={refetchRoomData}
      variables={updateRoomTypeValue}
      onCompleted={({ CreateRoomType }: any) => {
        onCompletedMessage(CreateRoomType, '방타입 생성완료', '방타입 생성실패');
      }}
      onError={onError}
    >
      {createRoomTypeMutation => (
        <DeleteRoomTypeMutation
          refetchQueries={refetchRoomData}
          variables={{
            houseId: selectedHouseId,
            roomTypeId: modalHook.info.roomTypeId,
          }}
          mutation={DELETE_ROOMTYPE}
          onCompleted={({ DeleteRoomType }: any) => {
            onCompletedMessage(DeleteRoomType, '방타입 제거완료', '방타입 제거실패');
          }}
          onError={onError}
        >
          {deleteRoomTypeMutation => (
            <UpdateRoomTypeMutation
              refetchQueries={refetchRoomData}
              variables={{
                houseId: selectedHouseId,
                roomTypeId: modalHook.info.roomTypeId,
                ...updateRoomTypeValue,
              }}
              onCompleted={({ UpdateRoomType }: any) => {
                onCompletedMessage(UpdateRoomType, '방타입 업데이트 완료', '방타입 업데이트 실패');
              }}
              onError={onError}
              mutation={UPDATE_ROOMTYPE}
            >
              {updateRoomTypeMutation => (
                <RoomTypeModal
                  roomImageHook={roomImageHook}
                  setValue={setRoomTypeValue}
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
