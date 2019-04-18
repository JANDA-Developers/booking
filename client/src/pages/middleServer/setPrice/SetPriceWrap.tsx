/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useState } from 'react';
import { Mutation, Query } from 'react-apollo';
import { TimelineGroup } from 'react-calendar-timeline';
import {
  getAllRoomTypeSeason_GetAllRoomType_roomTypes as IRoomTypes,
  getMyProfile_GetMyProfile_user_houses as IHouse,
  getAllSeason,
  getAllSeasonVariables,
  getAllRoomTypeVariables as getAllRoomTypeV,
  getAllRoomTypeSeason as getAllRoomType,
} from '../../../types/api';
import { GET_ALL_SEASON } from '../../../queries';
import {
  ErrProtecter, toast, isEmpty, QueryDataFormater, showError,
} from '../../../utils/utils';
import SetPrice from './SetPrice';

export enum PRICE_TABLE {
  'DEFAULT_TABLE' = -2,
  'ADD_TABLE' = -1,
}

interface IProps {
  selectedHouse: IHouse;
}

export interface IAddSeason {
  name: string;
  start: any;
  end: any;
  color: string | null;
}

class GetAllSeasonQuery extends Query<getAllSeason, getAllSeasonVariables> {}
class GetAllRoomType extends Query<getAllRoomType, getAllRoomTypeV> {}

const SetPriceWrap: React.SFC<IProps> = ({ selectedHouse }) => {
  const addSeasonHook = useState<IAddSeason>({
    name: '',
    start: '',
    end: '',
    color: '',
  });

  return (
    // 모든 방 가져오기
    <GetAllSeasonQuery fetchPolicy="network-only" query={GET_ALL_SEASON} variables={{ houseId: selectedHouse._id }}>
      {({ data: seasonData, loading: seasonL, error: seasonE }) => {
        showError(seasonE);
        const seasones = QueryDataFormater(seasonData, 'GetAllSeason', 'seasons', []);
        return <SetPrice seasones={seasones}  />;
      }}
    </GetAllSeasonQuery>
  );
};

export default ErrProtecter(SetPriceWrap);
