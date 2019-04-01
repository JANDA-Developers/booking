/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { useBookPOP, useToggle } from '../../../actions/hook';
import ModifyShowTimeline from './ModifyTimeline';
import { ModifydefaultProps, initItems } from './timelineConfig';
import { GET_ALL_ROOMTYPES, CREATE_ROOMTYPE, CREATE_ROOM } from '../../../queries';

interface IProps {
  houseId: String
}

const ModifyTimelineWrap: React.SFC<IProps> = ({houseId}) => {
  const [_, setConfigMode] = useToggle(false);
  console.log(_);
  const bookerModal = useBookPOP(false);

  return (
    // 모든 방 가져오기
    <Query query={GET_ALL_ROOMTYPES} variables={{ houseId: houseId }}>
      {roomsInfo => (
        // 방타입 생성 뮤테이션
        <Mutation mutation={CREATE_ROOMTYPE}
        >
          {createRoomTypeMutation => (
            // 방생성 뮤테이션
            <Mutation mutation={CREATE_ROOM}>
              {createRoomMutation => (
                <ModifyShowTimeline
                  bookerModal={bookerModal}
                  setConfigMode={setConfigMode}
                  defaultProps={ModifydefaultProps}
                  items={initItems}
                  createRoomMutation={createRoomMutation}
                  createRoomTypeMutation={createRoomTypeMutation}
                />
              )}
            </Mutation>
          )}
        </Mutation>
      )}
    </Query>
  );
};

export default ModifyTimelineWrap;
