/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import {Query, Mutation, RefetchQueriesProviderFn} from "react-apollo";
import {
  getAllRoomType,
  changeIndexForRoomType,
  changeIndexForRoomTypeVariables
} from "../../../types/api";
import {useToggle, useModal, useDayPicker} from "../../../actions/hook";
import roomTimelineDefaultProps from "./timelineConfig";
import {GET_ALL_ROOMTYPES, CHANGE_INDEX_FOR_ROOMTYPE} from "../../../queries";
import {
  ErrProtecter,
  isEmpty,
  queryDataFormater,
  showError,
  onCompletedMessage
} from "../../../utils/utils";
import RoomTypeModal from "./components/RoomTypeModalWrap";
import RoomModal from "./components/RoomModalWrap";
import {IRoomType} from "../../../types/interface";
import {roomDataManufacture} from "../assig/components/groupDataMenufacture";
import Preloader from "../../../atoms/preloader/Preloader";
import {RouteComponentProps} from "react-router";
import {IContext} from "../../MiddleServerRouter";
import RoomConfig from "./RoomConfig";
import $ from "jquery";
import {PureQueryOptions} from "apollo-boost";

export enum ADD_ROOM {
  "ADDROOM" = -1,
  "ADDROOM_TYPE" = -1
}

interface IRoomConfigParam {
  withGuide?: string;
}

interface IProps {
  context: IContext;
  refetchQueries?: (PureQueryOptions | string)[];
}

class GetAllRoomTypeQuery extends Query<getAllRoomType> {}
class ChangeIndexForRoomTypeMu extends Mutation<
  changeIndexForRoomType,
  changeIndexForRoomTypeVariables
> {}

const RoomConfigWrap: React.FC<IProps> = ({
  context,
  refetchQueries = [],
  ...prop
}) => {
  const {house} = context;
  const [_, setConfigMode] = useToggle(false);

  return (
    // 모든 방 가져오기
    <GetAllRoomTypeQuery
      fetchPolicy="network-only"
      query={GET_ALL_ROOMTYPES}
      variables={{houseId: house._id}}
    >
      {({data: roomData, loading, error}) => {
        const roomTypesData = queryDataFormater(
          roomData,
          "GetAllRoomType",
          "roomTypes",
          []
        ); // 원본데이터

        return (
          <ChangeIndexForRoomTypeMu
            refetchQueries={[{query: GET_ALL_ROOMTYPES}]}
            onCompleted={({ChangeIndexForRoomType}) => {
              onCompletedMessage(
                ChangeIndexForRoomType,
                "순위 변경 성공",
                "순위 변경 실패"
              );
            }}
            mutation={CHANGE_INDEX_FOR_ROOMTYPE}
          >
            {(changeIndexForRoomTypeMu, {loading: chnageIndexMuLoading}) => (
              <Fragment>
                <RoomConfig
                  context={context}
                  loading={loading}
                  refetchQueries={refetchQueries}
                  setConfigMode={setConfigMode}
                  changeIndexForRoomTypeMu={changeIndexForRoomTypeMu}
                  defaultProps={roomTimelineDefaultProps}
                  roomTypesData={roomTypesData || []}
                />
              </Fragment>
            )}
          </ChangeIndexForRoomTypeMu>
        );
      }}
    </GetAllRoomTypeQuery>
  );
};

export default ErrProtecter(RoomConfigWrap);
