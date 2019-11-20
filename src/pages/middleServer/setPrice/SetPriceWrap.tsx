/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, Fragment} from "react";
import {Query, Mutation} from "react-apollo";
import {
  getMyProfile_GetMyProfile_user_houses as IHouse,
  getAllSeasonTable,
  getAllSeasonTableVariables,
  getAllSeasonTable_GetSeasonPrice_seasonPrices as ISeasonPrices,
  getAllSeasonTable_GetSeasonPrice_seasonPrices_dayOfWeekPriceList,
  changePriority,
  changePriorityVariables,
  updateSeason,
  updateSeasonVariables,
  deleteSeason,
  deleteSeasonVariables,
  createSeason,
  createSeasonVariables,
  updateSeasonPrices,
  updateSeasonPricesVariables
} from "../../../types/api";
import {
  GET_ALL_SEASON_TABLE,
  CREATE_SEASON,
  UPDATE_SEASON,
  DELETE_SEASON,
  CHANGE_PRIORITY,
  UPDATE_SEASON_PRICES
} from "../../../queries";
import {
  ErrProtecter,
  queryDataFormater,
  showError,
  onCompletedMessage,
  jsonString,
  s4
} from "../../../utils/utils";
import SetPrice from "./SetPrice";
import Preloader from "../../../atoms/preloader/Preloader";
import {targetBlinkFuture} from "../../../utils/targetBlink";
import {IContext} from "../../MiddleServerRouter";
import reactWindowSize, {WindowSizeProps} from "react-window-size";
import {LANG} from "../../../hooks/hook";

export interface IAddSeason {
  name: string;
  start: any;
  end: any;
  color: string | null;
}

export interface priceMapResult {
  _id: string;
  default: number;
  dayOfWeekPriceList: getAllSeasonTable_GetSeasonPrice_seasonPrices_dayOfWeekPriceList[];
}

export interface IPriceMap extends Map<string, priceMapResult> {}

class CreateSeasonMutation extends Mutation<
  createSeason,
  createSeasonVariables
> {}
class DeleteSeasonMutation extends Mutation<
  deleteSeason,
  deleteSeasonVariables
> {}
class UpdateSeasonPriceMutation extends Mutation<
  updateSeasonPrices,
  updateSeasonPricesVariables
> {}
class UpdateSeasonMutation extends Mutation<
  updateSeason,
  updateSeasonVariables
> {}
class ChangePriorityMutation extends Mutation<
  changePriority,
  changePriorityVariables
> {}
class GetAllSeasonTQuery extends Query<
  getAllSeasonTable,
  getAllSeasonTableVariables
> {}

// 룸타입 아이디 + 시즌아이디
const priceMapCreater = (seasonPrices: ISeasonPrices[]) => {
  const priceMap: IPriceMap = new Map();
  seasonPrices.map(seasonPrice => {
    if (seasonPrice.dayOfWeekPriceList) {
      seasonPrice.dayOfWeekPriceList.forEach(price => delete price.__typename);
    }
    priceMap.set(seasonPrice.roomType._id + seasonPrice.season._id, {
      _id: seasonPrice._id,
      default: seasonPrice.defaultPrice,
      dayOfWeekPriceList: seasonPrice.dayOfWeekPriceList || []
    });
  });
  return priceMap;
};

interface IProps {
  context: IContext;
}

const SetPriceWrap: React.SFC<IProps & WindowSizeProps> = ({
  context,
  ...prop
}) => {
  const {house} = context;
  return (
    // 모든 방 가져오기
    <GetAllSeasonTQuery
      query={GET_ALL_SEASON_TABLE}
      variables={{houseId: house._id}}
    >
      {({data, loading: dataL, error: seasonE}) => {
        const seasones = queryDataFormater(
          data,
          "GetAllSeason",
          "seasons",
          undefined
        );
        const roomTypes = queryDataFormater(
          data,
          "GetAllRoomType",
          "roomTypes",
          undefined
        );
        const seasonPrices = queryDataFormater(
          data,
          "GetSeasonPrice",
          "seasonPrices",
          undefined
        );
        // 룸타입 아이디 + 시즌아이디  = {기본가격, 요일별가격}
        const priceMap = seasonPrices && priceMapCreater(seasonPrices);
        const refetchQueries = [
          {query: GET_ALL_SEASON_TABLE, variables: {houseId: house._id}}
        ];

        return (
          <div>
            <UpdateSeasonMutation
              refetchQueries={refetchQueries}
              onCompleted={({UpdateSeason}) => {
                onCompletedMessage(
                  UpdateSeason,
                  LANG("update_complete"),
                  LANG("update_fail")
                );
              }}
              mutation={UPDATE_SEASON}
            >
              {(updateSeasonMu, {loading: updateSeasonLoading}) => (
                <CreateSeasonMutation
                  mutation={CREATE_SEASON}
                  onCompleted={({CreateSeason}) => {
                    onCompletedMessage(
                      CreateSeason,
                      LANG("create_season_complete"),
                      LANG("create_season_fail")
                    );
                    if (CreateSeason.season) {
                      targetBlinkFuture(
                        `#seasonHeader${CreateSeason.season._id}`
                      );
                    }
                  }}
                  refetchQueries={refetchQueries}
                >
                  {(createSeasonMu, {loading: createLoaindg}) => (
                    <UpdateSeasonPriceMutation
                      mutation={UPDATE_SEASON_PRICES}
                      onCompleted={({UpdateSeasonPrices}) => {
                        onCompletedMessage(
                          UpdateSeasonPrices,
                          LANG("update_complete"),
                          LANG("update_fail")
                        );
                      }}
                      refetchQueries={refetchQueries}
                    >
                      {(updateSeasonPriceMu, {loading: updatePriceLoading}) => (
                        <DeleteSeasonMutation
                          mutation={DELETE_SEASON}
                          onCompleted={({DeleteSeason}) => {
                            onCompletedMessage(
                              DeleteSeason,
                              LANG("delete_season_complete"),
                              LANG("delete_season_fail")
                            );
                          }}
                          refetchQueries={refetchQueries}
                        >
                          {(deleteSeasonMu, {loading: deleteLoading}) => (
                            <ChangePriorityMutation
                              mutation={CHANGE_PRIORITY}
                              onCompleted={({ChangePriority}) => {
                                onCompletedMessage(
                                  ChangePriority,
                                  LANG("priority_changed"),
                                  LANG("priority_change_fail")
                                );
                                if (ChangePriority.season) {
                                  targetBlinkFuture(
                                    `#seasonHeader${ChangePriority.season._id}`,
                                    true
                                  );
                                }
                              }}
                              refetchQueries={refetchQueries}
                            >
                              {(
                                changePriorityMu,
                                {loading: changePriorityLoading}
                              ) => (
                                <Fragment>
                                  <SetPrice
                                    {...prop}
                                    key={s4()}
                                    loading={dataL}
                                    context={context}
                                    priceMap={priceMap || new Map()}
                                    roomTypes={roomTypes || []}
                                    seasonData={seasones ? seasones : []}
                                    changePriorityMu={changePriorityMu}
                                    deleteSeasonMu={deleteSeasonMu}
                                    createSeasonMu={createSeasonMu}
                                    updateSeasonPriceMu={updateSeasonPriceMu}
                                    updateSeasonMu={updateSeasonMu}
                                    createLoaindg={createLoaindg}
                                  />
                                  <Preloader
                                    floating
                                    loading={
                                      createLoaindg ||
                                      deleteLoading ||
                                      changePriorityLoading ||
                                      updateSeasonLoading ||
                                      updatePriceLoading ||
                                      dataL
                                    }
                                    size="medium"
                                  />
                                </Fragment>
                              )}
                            </ChangePriorityMutation>
                          )}
                        </DeleteSeasonMutation>
                      )}
                    </UpdateSeasonPriceMutation>
                  )}
                </CreateSeasonMutation>
              )}
            </UpdateSeasonMutation>
          </div>
        );
      }}
    </GetAllSeasonTQuery>
  );
};

export default reactWindowSize(ErrProtecter(SetPriceWrap));
