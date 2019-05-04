import React from 'react';
import ErrProtecter, { EerrorProtect } from '../../../utils/ErrProtecter';
import './SetPrice.scss';
import SeasonTableWrap from './components/seasonTableWrap';

import { IUseModal } from '../../../actions/hook';
import {
  getAllSeasonTable_GetAllRoomType_roomTypes as IRoomType,
  getAllSeasonTable_GetAllSeason_seasons as ISeason,
} from '../../../types/api';
import DrragList from '../../../atoms/animation/DrragList';
import JDanimation, { Animation } from '../../../atoms/animation/Animations';

interface IProps {
  loading?: boolean;
  seasonData: ISeason[];
  priceMap: Map<any, any> | null;
  roomTypes: IRoomType[];
  houseId: string;
}

export interface IDefaultSeason {
  name: string;
  _id: string;
  color: string;
  end: null;
  start: null;
  priority: number;
  description: string;
}

const SetPrice: React.SFC<IProps> = ({
  priceMap, roomTypes, seasonData, loading, houseId,
}) => {
  const unSeason = {
    name: '',
    _id: '-1',
    color: '',
    end: null,
    start: null,
    description: '',
    priority: -1,
  };

  return (
    <div id="seasonTable" className="seasonT container container--sm">
      <div className="docs-section">
        <h3>가격설정</h3>
        <p>상위에 있을수록 우선 적용됩니다.</p>

        <JDanimation animation={[Animation.fadeInDown, Animation.fadeOutRight]}>
          {seasonData
            && seasonData.map(season => (
              <SeasonTableWrap roomTypes={roomTypes || []} seasonData={season} priceMap={priceMap} houseId={houseId} />
            ))}
        </JDanimation>
        {/* <SeasonTableWrap add /> */}
        <SeasonTableWrap
          key={`addTable${seasonData.length}`}
          roomTypes={roomTypes || []}
          seasonData={unSeason}
          houseId={houseId}
        />
      </div>
    </div>
  );
};
export default EerrorProtect(SetPrice);
