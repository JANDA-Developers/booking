import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { DELETE_HOUSE, GET_USER_INFO, GET_HOUSE } from '../../../../queries';
import MyHouseModal from './myHouseModal';
import { IUseModal } from '../../../../actions/hook';
import {
  onCompletedMessage, onError, QueryDataFormater, showError, isEmpty,
} from '../../../../utils/utils';
import { IHouse } from '../../../../types/interface';
import { SELECT_HOUSE, SELECTED_HOUSE } from '../../../../clientQueries';
import {
  getHouse, getHouseVariables, deleteHouse, deleteHouseVariables,
} from '../../../../types/api';

interface IProps {
  MyHouseModalHook: IUseModal;
}
class GetHouseQuery extends Query<getHouse, getHouseVariables> {}
class DeleteHouseMutation extends Mutation<deleteHouse, deleteHouseVariables> {}

const MyHouseModalWrap: React.SFC<IProps> = ({ MyHouseModalHook: modalHook }) => (
  <DeleteHouseMutation
    onError={onError}
    mutation={DELETE_HOUSE}
    refetchQueries={[{ query: GET_USER_INFO }, { query: SELECTED_HOUSE }]}
    variables={{
      id: modalHook.info.houseId,
    }}
    onCompleted={({ DeleteHouse }) => {
      onCompletedMessage(DeleteHouse, '숙소삭제 완료', '숙소삭제 실패');
      return false;
    }}
  >
    {deleteMutation => (
      <Mutation
        onError={onError}
        mutation={SELECT_HOUSE}
        onCompleted={({ selectHouse }) => {
          onCompletedMessage(selectHouse, '현재숙소변경', '');
        }}
      >
        {houseChangeMutation => (
          <GetHouseQuery
            fetchPolicy="network-only"
            query={GET_HOUSE}
            skip={isEmpty(modalHook.info.houseId)}
            variables={{ houseId: modalHook.info.houseId }}
          >
            {({ data: houseData, loading, error }) => {
              showError(error);
              const house = QueryDataFormater(houseData, 'GetHouse', 'house', undefined);
              return (
                <MyHouseModal
                  loading={loading}
                  modalHook={modalHook}
                  deleteMu={deleteMutation}
                  houseChangeMu={houseChangeMutation}
                  house={house}
                />
              );
            }}
          </GetHouseQuery>
        )}
      </Mutation>
    )}
  </DeleteHouseMutation>
);

export default MyHouseModalWrap;
