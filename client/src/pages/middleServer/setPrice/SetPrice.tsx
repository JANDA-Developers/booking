import React from 'react';
import ErrProtecter, { EerrorProtect } from '../../../utils/ErrProtecter';
import './SetPrice.scss';
import SeasonTableWrap from './components/seasonTableWrap';

import { IUseModal } from '../../../actions/hook';
import {
  getAllSeasonTable_GetAllRoomType_roomTypes as IRoomType,
  getAllSeasonTable_GetAllSeason_seasons as ISeason,
} from '../../../types/api';

interface IProps {
  loading?: boolean;
  seasonData: ISeason[] | null | undefined;
  priceMap: Map<any, any> | null;
  roomTypes: IRoomType[] | null | undefined;
  houseId: string;
}

const SetPrice: React.SFC<IProps> = ({
  priceMap, roomTypes, seasonData, loading, houseId,
}) => (
  <div id="seasonTable" className="seasonT container">
    <div className="docs-section">
      <h3>가격설정</h3>
      {seasonData
        && seasonData.map(season => (
          <SeasonTableWrap roomTypes={roomTypes || []} seasonData={season} priceMap={priceMap} houseId={houseId} />
        ))}
      {/* <SeasonTableWrap add /> */}
      <SeasonTableWrap roomTypes={roomTypes || []} houseId={houseId} add />
    </div>
  </div>
);

export default EerrorProtect(SetPrice);
