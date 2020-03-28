/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useMemo } from "react";
import {
  getAllRoomType,
  getAllRoomTypeVariables,
  saveRoomTypes,
  saveRoomTypesVariables
} from "../../../types/api";
import { GET_ALL_ROOMTYPES, SAVE_ROOMTYPES } from "../../../apollo/queries";
import {
  ErrProtecter,
  queryDataFormater,
  onCompletedMessage,
  s4
} from "../../../utils/utils";
import { IContext } from "../../bookingHost/BookingHostRouter";
import client from "../../../apollo/apolloClient";
import RoomConfig from "./RoomConfig";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { RoomConfigSubmitData } from "../../../components/bookingModal/declaration";
import Preloader from "../../../atoms/preloader/Preloader";
import { getOperationName } from "apollo-utilities";
import { arraySum } from "../../../utils/elses";

interface IProps {
  context: IContext;
}

const RoomConfigWrap: React.FC<IProps> = ({ context }) => {
  const { house } = context;
  const { data: roomData, loading } = useQuery<
    getAllRoomType,
    getAllRoomTypeVariables
  >(GET_ALL_ROOMTYPES, {
    client,
    fetchPolicy: "network-only",
    variables: { houseId: house._id }
  });

  const [saveRoomsMu, { loading: saveRoomsLoading }] = useMutation<
    saveRoomTypes,
    saveRoomTypesVariables
  >(SAVE_ROOMTYPES, {
    client,
    refetchQueries: [getOperationName(GET_ALL_ROOMTYPES) || ""],
    awaitRefetchQueries: true,
    onCompleted: ({ SaveRoomTypes }) => {
      onCompletedMessage(SaveRoomTypes, "save rooms done", "save rooms fail");
    }
  });

  const roomTypesData =
    queryDataFormater(roomData, "GetAllRoomType", "roomTypes", []) || [];

  const handleSubmit = (data: RoomConfigSubmitData) => {
    const upsertDatas = [...data.updateCreateDatas];

    saveRoomsMu({
      variables: {
        param: {
          houseId: house._id,
          deletes: data.deleteIds,
          upserts: upsertDatas
        }
      }
    });
  };

  const key = useMemo(() => s4(), [
    roomTypesData.length,
    arraySum(roomTypesData.map(rt => rt.rooms.length))
  ]);
  return (
    <Fragment>
      <RoomConfig
        onSubmit={handleSubmit}
        context={context}
        loading={loading}
        defaultData={{
          defaultAddTemp: undefined,
          roomTypesData
        }}
        key={key}
      />
      <Preloader floating loading={saveRoomsLoading} />
    </Fragment>
  );
};

export default ErrProtecter(RoomConfigWrap);
