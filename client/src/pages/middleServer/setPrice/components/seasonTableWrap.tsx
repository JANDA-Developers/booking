import React from 'react';
import { Mutation } from 'react-apollo';
import {
  createSeason,
  createSeasonVariables,
  deleteSeason,
  deleteSeasonVariables,
  updateSeason,
  updateSeasonVariables,
  SeasonPriceInput,
  changePriority,
  changePriorityVariables,
} from '../../../../types/api';
import SeasonTable from './seasonTable';
import {
  CREATE_SEASON,
  DELETE_SEASON,
  UPDATE_SEASON,
  GET_ALL_SEASON_TABLE,
  CHANGE_PRIORITY,
} from '../../../../queries';
import { onCompletedMessage, showError } from '../../../../utils/utils';
import { IPriceMap } from '../SetPriceWrap';
import { IDefaultSeason } from '../SetPrice';
import { ISeason, GAST_RoomType } from '../../../../types/interface';

class CreateSeasonMutation extends Mutation<createSeason, createSeasonVariables> {}
class DeleteSeasonMutation extends Mutation<deleteSeason, deleteSeasonVariables> {}
class UpdateSeasonMutation extends Mutation<updateSeason, updateSeasonVariables> {}
class ChangePriorityMutation extends Mutation<changePriority, changePriorityVariables> {}

export interface ISeasonPriceInput extends SeasonPriceInput {
  name: string;
}

export interface ITableValue {
  name: string;
  start: string | null;
  end: string | null;
  color?: string | null;
  description?: string | null;
  houseId: string;
  seasonId: string;
  seasonPrices: ISeasonPriceInput[];
}

interface IProps {
  houseId: string;
  seasonData: ISeason | IDefaultSeason;
  priceMap?: IPriceMap | null;
  roomTypes: GAST_RoomType[];
  seasonCount: number;
  seasonIndex: number;
  add?: boolean;
}

const SeasonTableWrap: React.SFC<IProps> = ({
  priceMap, houseId, roomTypes, seasonData, seasonCount, seasonIndex,
}) => {
  // 테이블 디펄트 밸류를 생산
  const defaultPriceInputs: ISeasonPriceInput[] = roomTypes.map((roomType) => {
    // 테이블 가격부분
    const priceMapGet = () => {
      if (priceMap && seasonData) {
        const priceMapResult = priceMap.get(roomType._id + seasonData._id);
        if (priceMapResult) {
          return {
            defaultValue: priceMapResult.default.toString(),
            dayOfWeek: priceMapResult.dayOfWeek,
          };
        }
      }
      return { defaultValue: '0', dayOfWeek: [] };
    };

    const { defaultValue, dayOfWeek } = priceMapGet();

    return {
      roomTypeId: roomType._id,
      name: roomType.name,
      defaultPrice: parseInt(defaultValue, 10),
      dayOfWeekPrices: dayOfWeek,
    };
  });

  const defaultTableValue = {
    name: seasonData.name,
    start: seasonData.start,
    end: seasonData.end,
    color: seasonData.color,
    description: seasonData.description,
    houseId,
    seasonId: seasonData._id,
    seasonPrices: defaultPriceInputs,
  };

  const refetchQueries = [{ query: GET_ALL_SEASON_TABLE, variables: { houseId } }];

  return (
    // 방타입 생성 뮤테이션
    <CreateSeasonMutation
      mutation={CREATE_SEASON}
      onCompleted={({ CreateSeason }: any) => {
        onCompletedMessage(CreateSeason, '시즌 생성완료', '시즌 생성실패');
      }}
      refetchQueries={refetchQueries}
      onError={showError}
    >
      {createSeasonMutation => (
        <DeleteSeasonMutation
          onError={showError}
          mutation={DELETE_SEASON}
          refetchQueries={refetchQueries}
          variables={{
            houseId,
            seasonId: defaultTableValue.seasonId,
          }}
          onCompleted={({ DeleteSeason }) => {
            onCompletedMessage(DeleteSeason, '가격설정 삭제완료', '시즌 삭제실패');
          }}
        >
          {deleteSeasonMutation => (
            <UpdateSeasonMutation
              onError={showError}
              mutation={UPDATE_SEASON}
              refetchQueries={refetchQueries}
              onCompleted={({ UpdateSeason }) => {
                onCompletedMessage(UpdateSeason, '가격수정 완료', '가격수정 실패');
              }}
            >
              {updateSeasonMutation => (
                <ChangePriorityMutation
                  onError={showError}
                  mutation={CHANGE_PRIORITY}
                  refetchQueries={refetchQueries}
                  onCompleted={({ ChangePriority }) => {
                    onCompletedMessage(ChangePriority, '순위 변경성공', '순위변경 실패');
                  }}
                >
                  {changePriorityMutation => (
                    <SeasonTable
                      seasonCount={seasonCount}
                      defaultTableValue={defaultTableValue}
                      seasonData={seasonData}
                      updateSeasonMutation={updateSeasonMutation}
                      deleteSeasonMutation={deleteSeasonMutation}
                      createSeasonMutation={createSeasonMutation}
                      changePriorityMutation={changePriorityMutation}
                      houseId={houseId}
                      seasonIndex={seasonIndex}
                    />
                  )}
                </ChangePriorityMutation>
              )}
            </UpdateSeasonMutation>
          )}
        </DeleteSeasonMutation>
      )}
    </CreateSeasonMutation>
  );
};

export default SeasonTableWrap;
