/* eslint-disable react-hooks/rules-of-hooks */

import React, { Fragment, useState } from 'react';
import { Mutation, Query } from 'react-apollo';
import { useToggle, useModal2, useImageUploader } from '../../../actions/hook';
import ModifyTimeline from './ModifyTimeline';
import { ModifydefaultProps, initItems } from './timelineConfig';
import { GET_ALL_ROOMTYPES, CREATE_ROOMTYPE, CREATE_ROOM } from '../../../queries';
import { ErrProtecter, toast, isEmpty } from '../../../utils/utils';
import modifyItemRender from './components/modifyItemRender';
import modifyGroupRender from './components/modifyGroupRender';
import RoomTypeModal from '../timelines/components/RoomTypeModal';

interface IProps {
  houseId: String;
}

const ModifyTimelineWrap: React.SFC<IProps> = ({ houseId }) => {
  const roomTypeModalHook = useModal2(false);
  const [_, setConfigMode] = useToggle(false);
  const roomImageHook = useImageUploader();
  const [roomTypeModalValue, setRoomTypeModal] = useState({
    name: '',
    peopleCountMax: '',
    houseId: '',
    description: '',
  });
  console.log(_);
  return (
    // 모든 방 가져오기
    <Query query={GET_ALL_ROOMTYPES} variables={{ houseId }}>
      {({ data: roomData, loading, error }) => {
        if (error) {
          toast.error(error);
          console.error(error);
        }
        return (
          // 방타입 생성 뮤테이션
          <Mutation 
            mutation={CREATE_ROOMTYPE}
            variables={{
              houseId: houseId,
              name: roomTypeModalValue.name,
              peopleCountMax: roomTypeModalValue.peopleCountMax,
              description: roomTypeModalValue.description,
              image: roomImageHook.fileUrl,
            }}
          >
            {createRoomTypeMutation => (
              // 방생성 뮤테이션
              <Mutation mutation={CREATE_ROOM}>
                {createRoomMutation => (
                  <Fragment>
                    <ModifyTimeline
                      setConfigMode={setConfigMode}
                      defaultProps={ModifydefaultProps}
                      items={initItems}
                      createRoomMutation={createRoomMutation}
                      createRoomTypeMutation={createRoomTypeMutation}
                      itemRenderer={modifyItemRender}
                      groupRenderer={modifyGroupRender}
                      loading={loading}
                      roomData={roomData}
                      roomTypeModal={roomTypeModalHook}
                      value={roomTypeModalValue}
                      setValue={setRoomTypeModal}
                    />
                    <RoomTypeModal roomImageHook={roomImageHook} setValue={setRoomTypeModal} value={roomTypeModalValue} roomData={roomData} modalHook={roomTypeModalHook} createRoomTypeMutation={createRoomTypeMutation} />
                  </Fragment>
                )}
              </Mutation>
            )}
          </Mutation>
        );
      }}
    </Query>
  );
};

ModifyTimelineWrap.defaultProps = {
  houseId: '',
};

export default ErrProtecter(ModifyTimelineWrap);
