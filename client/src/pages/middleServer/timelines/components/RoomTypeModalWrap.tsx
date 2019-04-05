import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { createRoomType, createRoomTypeVariables } from '../../../../types/api';
import RoomTypeModal from './RoomTypeModal';
import { CREATE_ROOMTYPE } from '../../../../queries';
import { useImageUploader } from '../../../../actions/hook';
import { ErrProtecter, toast } from '../../../../utils/utils';

enum PricingType {
  DOMITORY = 'DOMITORY',
  ROOM = 'ROOM',
}

class CreateRoomTypeMutation extends Mutation<createRoomType, createRoomTypeVariables> {}

interface IProps {
  selectedHouse: any;
  roomData: any;
  modalHook: any;
}

const ModifyTimelineWrap: React.SFC<IProps> = ({ selectedHouse, roomData, modalHook }) => {
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
      variables={{
        houseId: selectedHouse._id,
        name: roomTypeValue.name,
        pricingType: roomTypeValue.pricingType.value,
        peopleCount: roomTypeValue.peopleCount.value,
        peopleCountMax: roomTypeValue.peopleCountMax.value,
        description: roomTypeValue.description,
      }}
      onCompleted={({ CreateRoomType }: any) => {
        console.log({
          houseId: selectedHouse._id,
          name: roomTypeValue.name,
          pricingType: roomTypeValue.pricingType.value,
          peopleCount: roomTypeValue.peopleCount.value,
          peopleCountMax: roomTypeValue.peopleCountMax.value,
          description: roomTypeValue.description,
        });
        if (CreateRoomType.ok) {
          toast.success('방타입 생성완료');
        } else {
          console.error(CreateRoomType.error);
          toast.warn('방타입 생성에 문제가 생겼습니다. 별도문의 바랍니다.');
        }
      }}
      onError={({ CreateRoomType }: any) => {
        console.error(CreateRoomType && CreateRoomType.error);
        toast.warn('통신에러 발생 잠시후 다시 시도해주세요');
      }}
    >
      {createRoomTypeMutation => (
        <RoomTypeModal
          roomImageHook={roomImageHook}
          setValue={setRoomTypeModal}
          value={roomTypeValue}
          roomData={roomData}
          modalHook={modalHook}
          createRoomTypeMutation={createRoomTypeMutation}
        />
      )}
    </CreateRoomTypeMutation>
  );
};

export default ErrProtecter(ModifyTimelineWrap);
