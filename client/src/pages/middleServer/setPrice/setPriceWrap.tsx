/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from 'react';
import { Mutation, Query } from 'react-apollo';
import { TimelineGroup } from 'react-calendar-timeline';
import {
  getAllRoomType,
  getAllRoomType_GetAllRoomType_roomTypes as roomTypes,
  getMyProfile_GetMyProfile_user_houses as IHouse,
} from '../../../types/api';
import { useToggle, useModal2 } from '../../../actions/hook';
import { GET_ALL_ROOMTYPES } from '../../../queries';
import {
  ErrProtecter, toast, isEmpty, QueryDataFormater, showError,
} from '../../../utils/utils';
import SetPrice from './setPrice';
import SetPriceModal from './components/setPriceModalWrap';

export enum PRICE_TABLE {
  'DEFAULT_TABLE' = -2,
  'ADD_TABLE' = -1,
}

interface IProps {
  selectedHouse: IHouse;
}

class GetAllRoomTypeQuery extends Query<getAllRoomType> {}

const SetPriceWrap: React.SFC<IProps> = ({ selectedHouse }) => {
  const priceModalHook = useModal2(false);

  return (
    // 모든 방 가져오기
    <GetAllRoomTypeQuery
      fetchPolicy="network-only"
      query={GET_ALL_ROOMTYPES}
      variables={{ houseId: selectedHouse._id }}
    >
      {({ data: roomData, loading, error }) => {
        showError(error);
        return (
          // 방생성 뮤테이션
          <Fragment>
            <SetPrice />
            <SetPriceModal />
          </Fragment>
        );
      }}
    </GetAllRoomTypeQuery>
  );
};

export default ErrProtecter(SetPriceWrap);
