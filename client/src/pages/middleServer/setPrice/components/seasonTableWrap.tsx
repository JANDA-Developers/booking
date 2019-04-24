import React, { useState, useEffect } from 'react';
import { Mutation } from 'react-apollo';
import { any } from 'prop-types';
import {
  createSeason,
  createSeasonVariables,
  deleteSeason,
  deleteSeasonVariables,
  updateSeason,
  updateSeasonVariables,
  getAllSeason_GetAllSeason_seasons as ISeason,
  getAllSeasonTable_GetSeasonPrice_seasonPrices_dayOfWeekPrices as IDayOfWeek,
  getAllSeasonTable_GetAllRoomType_roomTypes as IRoomType,
} from '../../../../types/api';
import SeasonTable from './seasonTable';
import { CREATE_SEASON, DELETE_SEASON, UPDATE_SEASON } from '../../../../queries';
import {
  ErrProtecter, onError, isEmpty, onCompletedMessage,
} from '../../../../utils/utils';
import {
  PricingType, PricingTypeKr, RoomGender, RoomGenderKr,
} from '../../../../types/apiEnum';
import { useColorPicker, IUseColor, useDayPicker } from '../../../../actions/hook';
import { IPriceMap } from '../SetPriceWrap';

class CreateSeasonMutation extends Mutation<createSeason, createSeasonVariables> {}
class DeleteSeasonMutation extends Mutation<deleteSeason, deleteSeasonVariables> {}
class UpdateSeasonMutation extends Mutation<updateSeason, updateSeasonVariables> {}

export interface ISeasonValue {
  name: string;
  start: any;
  end: any;
  color?: string | null;
  description?: string | null;
  seasonId: string;
}

export interface IDayWeek extends IDayOfWeek {
  id: string;
}
export interface ITableData {
  id: string;
  name: string;
  defaultValue: string;
  dayOfWeek: IDayWeek[];
}

interface IProps {
  houseId: string;
  seasonData?: ISeason;
  priceMap?: IPriceMap | null;
  roomTypes: IRoomType[];
  add?: boolean;
}

const SeasonTableWrap: React.SFC<IProps> = ({
  priceMap, houseId, roomTypes, seasonData, add,
}) => {
  const dayPickerHook = useDayPicker(null, null);
  const colorHook: IUseColor = useColorPicker(null);
  const defaultModalValue: ISeasonValue = {
    color: colorHook.color,
    name: '',
    start: '2019-01-01',
    end: '2019-12-31',
    description: '',
    seasonId: '',
  };

  // ❓ 지금 value 를 map으로 뽑아야되는데 이게 state 등록되면 어떻게해야하지
  // state에는 초기벨루빆에 못넣어 하지만 그것도 괺찮아 어차피!... 그건 나중에 문제야
  // default value로 쓰고 나중에 refetch를 해야할지 안해야할지 검증하면 되는거야
  // 나는지금 자원소모가 얼마나 될지 걱정하고있는거임 ❓

  const [seasonValue, setSeasonValue] = useState<ISeasonValue>(defaultModalValue);

  return (
    // 방타입 생성 뮤테이션
    <CreateSeasonMutation
      mutation={CREATE_SEASON}
      variables={{ houseId, ...seasonValue }}
      onCompleted={({ CreateRoomType }: any) => {
        onCompletedMessage(CreateRoomType, '방타입 생성완료', '방타입 생성실패');
      }}
      onError={onError}
    >
      {createSeasonMutation => (
        <DeleteSeasonMutation
          onError={onError}
          mutation={DELETE_SEASON}
          variables={{
            houseId,
            seasonId: seasonValue.seasonId,
          }}
          onCompleted={({ DeleteSeason }) => {
            onCompletedMessage(DeleteSeason, '시즌 삭제완료', '시즌 삭제실패');
          }}
        >
          {deleteSeasonMutation => (
            <UpdateSeasonMutation
              onError={onError}
              mutation={UPDATE_SEASON}
              variables={{
                houseId,
                seasonId: seasonValue.seasonId,
                ...seasonValue,
              }}
              onCompleted={({ UpdateRoomType }: any) => {
                onCompletedMessage(UpdateRoomType, '방타입 업데이트 완료', '방타입 업데이트 실패');
              }}
            >
              {(updateSeasonMutation) => {
                const defaultTableData: ITableData[] = roomTypes.map((roomType) => {
                  const priceMapGet = () => {
                    if (priceMap && seasonData) {
                      const priceMapResult = priceMap.get(roomType._id + seasonData._id);
                      if (priceMapResult) {
                        return {
                          defaultValue: priceMapResult.default.toString(),
                          dayOfWeek: priceMapResult.dayOfWeek.map(day => ({ ...day, id: `${day.applyDays}` })),
                        };
                      }
                    }
                    return { defaultValue: '0', dayOfWeek: [] };
                  };

                  const { defaultValue, dayOfWeek } = priceMapGet();

                  return {
                    id: roomType._id,
                    name: roomType.name,
                    defaultValue,
                    dayOfWeek,
                  };
                });

                return (
                  <SeasonTable
                    dayPickerHook={dayPickerHook}
                    colorHook={colorHook}
                    updateSeasonMutation={updateSeasonMutation}
                    deleteSeasonMutation={deleteSeasonMutation}
                    createSeasonMutation={createSeasonMutation}
                    defaultTableData={defaultTableData}
                    // roomTypes={roomTypes} 없어질듯
                    priceMap={priceMap}
                    seasonData={seasonData}
                    seasonValue={seasonValue}
                    setSeasonValue={setSeasonValue}
                    add={add}
                  />
                );
              }}
            </UpdateSeasonMutation>
          )}
        </DeleteSeasonMutation>
      )}
    </CreateSeasonMutation>
  );
};

export default SeasonTableWrap;
