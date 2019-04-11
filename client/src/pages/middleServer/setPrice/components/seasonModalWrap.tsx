import React, { useState, useEffect } from 'react';
import randomColor from 'randomcolor';
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
import SeasonModal from './seasonModal';
import {
  CREATE_SEASON, DELETE_SEASON, UPDATE_SEASON, GET_ALL_SEASON,
} from '../../../../queries';
import {
  ErrProtecter, onError, isEmpty, onCompletedMessage,
} from '../../../../utils/utils';
import {
  PricingType, PricingTypeKr, RoomGender, RoomGenderKr,
} from '../../../../types/apiEnum';
import { IUseModal } from '../../../../actions/hook';

class CreateRoomTypeMutation extends Mutation<createSeason, createSeasonVariables> {}
class DeleteRoomTypeMutation extends Mutation<deleteSeason, deleteSeasonVariables> {}
class UpdateRoomTypeMutation extends Mutation<updateSeason, updateSeasonVariables> {}

interface IProps {
  selectedHouseId: string;
  seasonData: ISeason[];
  seasonModal: IUseModal;
  loading: boolean;
}

export interface ISeasonValue {
  name: string;
  start: any;
  end: any;
  color?: string | null;
  description?: string | null;
}

const SeasonModalWrap: React.SFC<IProps> = ({ loading, selectedHouseId, seasonData, seasonModal: modalHook }) => {
  const defaultModalValue = {
    color: randomColor(),
    name: '',
    start: '2019-01-01',
    end: '2019-12-31',
    description: '',
  };

  const [modalValue, setModalValue] = useState<ISeasonValue>(defaultModalValue);

  // 팝업에서 가져온 정보를 호출
  useEffect(() => {
    if (!isEmpty(modalHook.info)) {
      const season = seasonData.filter(inSeason => inSeason._id === modalHook.info.seasonId)[0];

      if (season) {
        const lastSeasonValue = {
          name: season.name,
          start: season.start,
          end: season.end,
          color: season.color,
          description: season.description,
        };
        setModalValue(lastSeasonValue);
      } else {
        setModalValue(defaultModalValue);
      }
    }
  }, [modalHook.info]);

  return (
    // 방타입 생성 뮤테이션
    <CreateRoomTypeMutation
      mutation={CREATE_SEASON}
      refetchQueries={GET_ALL_SEASON}
      variables={{ houseId: selectedHouseId, ...modalValue }}
      onCompleted={({ CreateRoomType }: any) => {
        onCompletedMessage(CreateRoomType, '방타입 생성완료', '방타입 생성실패');
      }}
      onError={onError}
    >
      {createSeasonMutation => (
        <DeleteRoomTypeMutation
          refetchQueries={GET_ALL_SEASON}
          variables={{
            houseId: selectedHouseId,
            seasonId: modalHook.info.seasonId,
          }}
          mutation={DELETE_SEASON}
          onCompleted={({ DeleteSeason }: any) => {
            onCompletedMessage(DeleteSeason, '시즌 삭제완료', '시즌 삭제실패');
          }}
          onError={onError}
        >
          {deleteSeasonMutation => (
            <UpdateRoomTypeMutation
              refetchQueries={GET_ALL_SEASON}
              variables={{
                houseId: selectedHouseId,
                seasonId: modalHook.info.seasonId,
                ...modalValue,
              }}
              onCompleted={({ UpdateRoomType }: any) => {
                onCompletedMessage(UpdateRoomType, '방타입 업데이트 완료', '방타입 업데이트 실패');
              }}
              onError={onError}
              mutation={UPDATE_SEASON}
            >
              {updateSeasonMutation => (
                <SeasonModal
                  updateSeasonMutation={updateSeasonMutation}
                  deleteSeasonMutation={deleteSeasonMutation}
                  createSeasonMutation={createSeasonMutation}
                  setModalValue={setModalValue}
                  modalHook={modalHook}
                  modalValue={modalValue}
                />
              )}
            </UpdateRoomTypeMutation>
          )}
        </DeleteRoomTypeMutation>
      )}
    </CreateRoomTypeMutation>
  );
};

export default ErrProtecter(SeasonModalWrap);
