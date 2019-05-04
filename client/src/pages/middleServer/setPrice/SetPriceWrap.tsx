/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useState } from 'react';
import { Mutation, Query } from 'react-apollo';
import { TimelineGroup } from 'react-calendar-timeline';
import {
  getMyProfile_GetMyProfile_user_houses as IHouse,
  getAllSeason,
  getAllSeasonVariables,
  getAllSeasonTable,
  getAllSeasonTableVariables,
  getAllSeasonTable_GetSeasonPrice_seasonPrices as ISeasonPrices,
  getAllSeasonTable_GetSeasonPrice_seasonPrices_dayOfWeekPrices as IDayOfWeek,
  createSeasonVariables,
  createSeason,
} from '../../../types/api';
import { GET_ALL_SEASON_TABLE, CREATE_SEASON } from '../../../queries';
import {
  ErrProtecter, toast, isEmpty, QueryDataFormater, showError,
} from '../../../utils/utils';
import SetPrice from './SetPrice';
import Preloader from '../../../atoms/preloader/Preloader';

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

export interface priceMapResult {
  default: number;
  dayOfWeek: IDayOfWeek[];
}

export interface IPriceMap extends Map<string, priceMapResult> {}

class GetAllSeasonTQuery extends Query<getAllSeasonTable, getAllSeasonTableVariables> {}
class CreateSeasonMu extends Mutation<createSeason, createSeasonVariables> {}

const priceMapMaker = (seasonPrices: ISeasonPrices[]) => {
  const priceMap: IPriceMap = new Map();
  seasonPrices.map((seasonPrice) => {
    priceMap.set(seasonPrice.roomType._id + seasonPrice.season._id, {
      default: seasonPrice.defaultPrice,
      dayOfWeek: seasonPrice.dayOfWeekPrices || [],
    });
  });
  return priceMap;
};

const SetPriceWrap: React.SFC<IProps> = ({ selectedHouse }) => {
  const addSeasonHook = useState<IAddSeason>({
    name: '',
    start: '',
    end: '',
    color: '',
  });

  // ❕ NOTE
  // 쿼리로부터 3가지 정보를 호출한다 가격, 시즌정보, 룸타입 정보,
  // 나머지 "뮤테이션"들은 테이블 안쪽에있다.
  return (
    // 모든 방 가져오기
    <GetAllSeasonTQuery
      fetchPolicy="network-only"
      query={GET_ALL_SEASON_TABLE}
      variables={{ houseId: selectedHouse._id }}
    >
      {({ data, loading: dataL, error: seasonE }) => {
        showError(seasonE);
        const seasones = QueryDataFormater(data, 'GetAllSeason', 'seasons', undefined);
        const roomTypes = QueryDataFormater(data, 'GetAllRoomType', 'roomTypes', undefined);
        const seasonPrices = QueryDataFormater(data, 'GetSeasonPrice', 'seasonPrices', undefined);
        const priceMap = seasonPrices && priceMapMaker(seasonPrices);

        return !dataL ? (
          <SetPrice
            houseId={selectedHouse._id}
            priceMap={priceMap || new Map()}
            roomTypes={roomTypes || []}
            seasonData={seasones || []}
          />
        ) : (
          <Preloader page />
        );
      }}
    </GetAllSeasonTQuery>
  );
};

export default ErrProtecter(SetPriceWrap);
