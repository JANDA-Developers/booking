/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from "react";
import { Query, Mutation } from "react-apollo";
import {
  getAllRoomType,
  changeIndexForRoomType,
  changeIndexForRoomTypeVariables
} from "../../../types/api";
import { useToggle, LANG } from "../../../hooks/hook";
import {
  GET_ALL_ROOMTYPES,
  CHANGE_INDEX_FOR_ROOMTYPE
} from "../../../apollo/queries";
import {
  ErrProtecter,
  queryDataFormater,
  onCompletedMessage
} from "../../../utils/utils";
import { IContext } from "../../bookingHost/BookingHostRouter";
import RoomConfig from "./RoomConfig";
import { PureQueryOptions } from "apollo-client";
import Preloader from "../../../atoms/preloader/Preloader";
import { FLOATING_PRELOADER_SIZE } from "../../../types/const";

export enum ADD_ROOM {
  "ADDROOM" = -1,
  "ADDROOM_TYPE" = -1
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
  const { house } = context;
  const [_, setConfigMode] = useToggle(false);

  return (
    // 모든 방 가져오기
    <GetAllRoomTypeQuery
      fetchPolicy="network-only"
      query={GET_ALL_ROOMTYPES}
      variables={{ houseId: house._id }}
    >
      {({ data: roomData, loading, error, networkStatus }) => {
        const roomTypesData =
          queryDataFormater(roomData, "GetAllRoomType", "roomTypes", []) || []; // 원본데이터

        return (
          <ChangeIndexForRoomTypeMu
            refetchQueries={[{ query: GET_ALL_ROOMTYPES }]}
            onCompleted={({ ChangeIndexForRoomType }) => {
              onCompletedMessage(
                ChangeIndexForRoomType,
                LANG("priority_changed"),
                LANG("priority_change_fail")
              );
            }}
            mutation={CHANGE_INDEX_FOR_ROOMTYPE}
          >
            {(changeIndexForRoomTypeMu, { loading: chnageIndexMuLoading }) => (
              <Fragment>
                <Preloader
                  floating
                  size={FLOATING_PRELOADER_SIZE}
                  loading={
                    chnageIndexMuLoading || (networkStatus > 1 && loading)
                  }
                />
                <RoomConfig
                  context={context}
                  loading={loading}
                  refetchQueries={refetchQueries}
                  setConfigMode={setConfigMode}
                  changeIndexForRoomTypeMu={changeIndexForRoomTypeMu}
                  roomTypesData={roomTypesData}
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
