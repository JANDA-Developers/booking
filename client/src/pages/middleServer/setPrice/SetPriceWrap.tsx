/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from 'react';
import { Mutation, Query } from 'react-apollo';
import { TimelineGroup } from 'react-calendar-timeline';
import {
  getAllRoomType,
  getAllRoomType_GetAllRoomType_roomTypes as roomTypes,
  getMyProfile_GetMyProfile_user_houses as IHouse,
  getAllSeason,
  getAllSeasonVariables,
} from '../../../types/api';
import { useToggle, useModal2 } from '../../../actions/hook';
import { GET_ALL_ROOMTYPES, GET_ALL_SEASON } from '../../../queries';
import {
  ErrProtecter, toast, isEmpty, QueryDataFormater, showError,
} from '../../../utils/utils';
import SetPrice from './SetPrice';
import SeasonModal from './components/seasonModalWrap';

export enum PRICE_TABLE {
  'DEFAULT_TABLE' = -2,
  'ADD_TABLE' = -1,
}

interface IProps {
  selectedHouse: IHouse;
}

class GetAllSeasonQuery extends Query<getAllSeason, getAllSeasonVariables> {}

const SetPriceWrap: React.SFC<IProps> = ({ selectedHouse }) => {
  const priceModalHook = useModal2(false);

  return (
    // 모든 방 가져오기
    <GetAllSeasonQuery fetchPolicy="network-only" query={GET_ALL_SEASON} variables={{ houseId: selectedHouse._id }}>
      {({ data: seasonData, loading, error }) => {
        showError(error);
        const seasones = QueryDataFormater(seasonData, 'GetAllSeason', 'seasons', []);
        return (
          // 방생성 뮤테이션
          <Fragment>
            <SetPrice />
            <SeasonModal
              loading={loading}
              seasonData={seasones}
              seasonModal={priceModalHook}
              selectedHouseId={selectedHouse._id}
            />
          </Fragment>
        );
      }}
    </GetAllSeasonQuery>
  );
};

export default ErrProtecter(SetPriceWrap);
