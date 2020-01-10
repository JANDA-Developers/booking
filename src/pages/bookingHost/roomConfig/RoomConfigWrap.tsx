/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from "react";
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
  onCompletedMessage
} from "../../../utils/utils";
import { IContext } from "../../bookingHost/BookingHostRouter";
import client from "../../../apollo/apolloClient";
import RoomConfig from "./RoomConfig";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { RoomConfigSubmitData } from "../../../components/bookingModal/declaration";
import Preloader from "../../../atoms/preloader/Preloader";

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
    onCompleted: ({ SaveRoomTypes }) => {
      onCompletedMessage(SaveRoomTypes, "save rooms done", "save rooms fail");
    }
  });

  const roomTypesData =
    queryDataFormater(roomData, "GetAllRoomType", "roomTypes", []) || [];

  const handleSubmit = (data: RoomConfigSubmitData) => {
    const upsertDatas = [...data.createDatas, ...data.updateDatas];

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

  return (
    <Fragment>
      <RoomConfig
        onSubmit={handleSubmit}
        context={context}
        loading={loading}
        defaultData={{
          defaultCreateRoomType: [],
          roomTypesData
        }}
        key={loading ? "roomConfig--loading" : "roomConfig"}
      />
      <Preloader floating loading={saveRoomsLoading} />
    </Fragment>
  );
};

export default ErrProtecter(RoomConfigWrap);
