import React, { useState, useEffect } from 'react';
import { Mutation, Query } from 'react-apollo';
import { any } from 'prop-types';
import {
  createRoomType,
  createRoomTypeVariables,
  deleteRoomType,
  deleteRoomTypeVariables,
  updateMyProfileVariables,
  updateRoomType,
  updateRoomTypeVariables,
  getRoomTypeById,
  getRoomTypeByIdVariables,
} from '../../../../types/api';
import RoomTypeModal from './RoomTypeModal';
import {
  CREATE_ROOMTYPE,
  DELETE_ROOMTYPE,
  UPDATE_ROOM,
  UPDATE_ROOMTYPE,
  GET_ROOMTYPE_BY_ID,
} from '../../../../queries';
import { IUseModal } from '../../../../actions/hook';
import {
  ErrProtecter, showError, isEmpty, onCompletedMessage, queryDataFormater,
} from '../../../../utils/utils';
import { PricingType, RoomGender } from '../../../../types/enum';

class GetRoomTypeById extends Query<getRoomTypeById, getRoomTypeByIdVariables> {}
class CreateRoomTypeMutation extends Mutation<createRoomType, createRoomTypeVariables> {}
class DeleteRoomTypeMutation extends Mutation<deleteRoomType, deleteRoomTypeVariables> {}
class UpdateRoomTypeMutation extends Mutation<updateRoomType, updateRoomTypeVariables> {}

export interface IDefaultRoomType {
  name: string;
  pricingType: PricingType;
  peopleCount: number;
  peopleCountMax: number;
  roomGender: RoomGender;
  img?: string;
  description: string;
  defaultPrice: number;
}

interface IProps {
  houseId: string;
  modalHook: IUseModal;
  refetchRoomData: any;
}

const ModifyTimelineWrap: React.SFC<IProps> = ({ refetchRoomData, houseId, modalHook }) => {
  const { roomTypeId } = modalHook.info;
  return (
    <GetRoomTypeById
      fetchPolicy="network-only"
      query={GET_ROOMTYPE_BY_ID}
      skip={isEmpty(roomTypeId)}
      variables={{ roomTypeId }}
    >
      {({ data: queryRoomTypeData, loading, error }) => {
        const roomType = queryDataFormater(queryRoomTypeData, 'GetRoomTypeById', 'roomType', undefined);
        const defaultRoomType: IDefaultRoomType = {
          name: '',
          pricingType: PricingType.DOMITORY,
          peopleCount: 0,
          peopleCountMax: 0,
          roomGender: RoomGender.ANY,
          img: undefined,
          description: '',
          defaultPrice: 0,
        };
        return (
          <CreateRoomTypeMutation
            mutation={CREATE_ROOMTYPE}
            refetchQueries={refetchRoomData}
            onCompleted={({ CreateRoomType }: any) => {
              onCompletedMessage(CreateRoomType, '방타입 생성완료', '방타입 생성실패');
            }}
            onError={showError}
          >
            {createRoomTypeMutation => (
              <DeleteRoomTypeMutation
                refetchQueries={refetchRoomData}
                variables={{
                  houseId,
                  roomTypeId: modalHook.info.roomTypeId,
                }}
                mutation={DELETE_ROOMTYPE}
                onCompleted={({ DeleteRoomType }: any) => {
                  onCompletedMessage(DeleteRoomType, '방타입 제거완료', '방타입 제거실패');
                }}
                onError={showError}
              >
                {deleteRoomTypeMutation => (
                  <UpdateRoomTypeMutation
                    refetchQueries={refetchRoomData}
                    onCompleted={({ UpdateRoomType }: any) => {
                      onCompletedMessage(UpdateRoomType, '방타입 업데이트 완료', '방타입 업데이트 실패');
                    }}
                    onError={showError}
                    mutation={UPDATE_ROOMTYPE}
                  >
                    {updateRoomTypeMutation => (
                      <RoomTypeModal
                        houseId={houseId}
                        roomTypeData={roomType || defaultRoomType}
                        modalHook={modalHook}
                        loading={loading}
                        createRoomTypeMutation={createRoomTypeMutation}
                        deleteRoomTypeMutation={deleteRoomTypeMutation}
                        updateRoomTypeMutation={updateRoomTypeMutation}
                        key={`roomTypeModal__modal${roomType ? roomType._id : ''}`}
                      />
                    )}
                  </UpdateRoomTypeMutation>
                )}
              </DeleteRoomTypeMutation>
            )}
          </CreateRoomTypeMutation>
        );
      }}
    </GetRoomTypeById>
  );
};

export default ErrProtecter(ModifyTimelineWrap);
