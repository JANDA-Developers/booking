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
} from '../../../../types/api';
import SeasonTable from './seasonTable';
import {
  CREATE_SEASON, DELETE_SEASON, UPDATE_SEASON, GET_ALL_SEASON,
} from '../../../../queries';
import {
  ErrProtecter, onError, isEmpty, onCompletedMessage,
} from '../../../../utils/utils';
import {
  PricingType, PricingTypeKr, RoomGender, RoomGenderKr,
} from '../../../../types/apiEnum';
import {
  IUseModal, useColorPicker, IUseColor, useDayPicker,
} from '../../../../actions/hook';

class CreateSeasonMutation extends Mutation<createSeason, createSeasonVariables> {}
class DeleteSeasonMutation extends Mutation<deleteSeason, deleteSeasonVariables> {}
class UpdateSeasonMutation extends Mutation<updateSeason, updateSeasonVariables> {}

interface IProps {
  selectedHouseId: string;
  seasonData: ISeason[];
  seasonModal: IUseModal;
  loading: boolean;
}

export interface ITableValue {
  name: string;
  start: any;
  end: any;
  color?: string | null;
  description?: string | null;
  seasonId: string;
}

const SeasonModalWrap: React.SFC<IProps> = ({
  loading, selectedHouseId, seasonData, seasonModal: modalHook,
}) => {
  const dayPickerHook = useDayPicker(null, null);
  const colorHook: IUseColor = useColorPicker(null);
  const defaultModalValue: ITableValue = {
    color: colorHook.color,
    name: '',
    start: '2019-01-01',
    end: '2019-12-31',
    description: '',
    seasonId: '',
  };

  const [tableValue, setTableValue] = useState<ITableValue>(defaultModalValue);

  return (
    // 방타입 생성 뮤테이션
    <CreateSeasonMutation
      mutation={CREATE_SEASON}
      refetchQueries={GET_ALL_SEASON}
      variables={{ houseId: selectedHouseId, ...tableValue }}
      onCompleted={({ CreateRoomType }: any) => {
        onCompletedMessage(CreateRoomType, '방타입 생성완료', '방타입 생성실패');
      }}
      onError={onError}
    >
      {createSeasonMutation => (
        <DeleteSeasonMutation
          onError={onError}
          mutation={DELETE_SEASON}
          refetchQueries={GET_ALL_SEASON}
          variables={{
            houseId: selectedHouseId,
            seasonId: tableValue.seasonId,
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
                houseId: selectedHouseId,
                seasonId: tableValue.seasonId,
                ...tableValue,
              }}
              onCompleted={({ UpdateRoomType }: any) => {
                onCompletedMessage(UpdateRoomType, '방타입 업데이트 완료', '방타입 업데이트 실패');
              }}
              refetchQueries={GET_ALL_SEASON}
            >
              {updateSeasonMutation => (
                <SeasonTable
                  dayPickerHook={dayPickerHook}
                  colorHook={colorHook}
                  tableValue={tableValue}
                  setTableValue={setTableValue}
                  updateSeasonMutation={updateSeasonMutation}
                  deleteSeasonMutation={deleteSeasonMutation}
                  createSeasonMutation={createSeasonMutation}
                />
              )}
            </UpdateSeasonMutation>
          )}
        </DeleteSeasonMutation>
      )}
    </CreateSeasonMutation>
  );
};

export default ErrProtecter(SeasonModalWrap);
