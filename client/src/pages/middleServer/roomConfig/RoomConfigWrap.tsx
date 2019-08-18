/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {Fragment} from "react";
import {Query, Mutation} from "react-apollo";
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
import RoomConfigNew from "./RoomConfigNew";
import Preloader from "../../../atoms/preloader/Preloader";
import {RouteComponentProps} from "react-router";

export enum ADD_ROOM {
  "ADDROOM" = -1,
  "ADDROOM_TYPE" = -1
}

interface IRoomConfigParam {
  withGuide?: string;
}

interface IProps extends RouteComponentProps<IRoomConfigParam> {
  houseId: string;
}

class GetAllRoomTypeQuery extends Query<getAllRoomType> {}
class ChangeIndexForRoomTypeMu extends Mutation<
  changeIndexForRoomType,
  changeIndexForRoomTypeVariables
> {}

const RoomConfigTimelineWrap: React.FC<IProps> = ({houseId, ...prop}) => {
  const [_, setConfigMode] = useToggle(false);

  return (
    // 모든 방 가져오기
    <GetAllRoomTypeQuery
      fetchPolicy="network-only"
      query={GET_ALL_ROOMTYPES}
      variables={{houseId}}
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
                {!loading ? (
                  <RoomConfigNew
                    loading={loading}
                    setConfigMode={setConfigMode}
                    changeIndexForRoomTypeMu={changeIndexForRoomTypeMu}
                    defaultProps={roomTimelineDefaultProps}
                    roomTypesData={roomTypesData || []}
                    houseId={houseId}
                  />
                ) : (
                  <Preloader page loading={loading} />
                )}
              </Fragment>
            )}
          </ChangeIndexForRoomTypeMu>
        );
      }}
    </GetAllRoomTypeQuery>
  );
};

export default ErrProtecter(RoomConfigTimelineWrap);
