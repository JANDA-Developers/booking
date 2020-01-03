/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from "react";
import { getAllRoomType, getAllRoomTypeVariables } from "../../../types/api";
import { GET_ALL_ROOMTYPES } from "../../../apollo/queries";
import { ErrProtecter, queryDataFormater } from "../../../utils/utils";
import { IContext } from "../../bookingHost/BookingHostRouter";
import client from "../../../apollo/apolloClient";
import RoomConfig from "./RoomConfig";
import { PureQueryOptions } from "apollo-client";
import { useQuery } from "@apollo/react-hooks";

interface IProps {
  context: IContext;
  refetchQueries?: (PureQueryOptions | string)[];
}

const RoomConfigWrap: React.FC<IProps> = ({ context, refetchQueries = [] }) => {
  const { house } = context;
  const { data: roomData, loading } = useQuery<
    getAllRoomType,
    getAllRoomTypeVariables
  >(GET_ALL_ROOMTYPES, {
    client,
    fetchPolicy: "network-only",
    variables: { houseId: house._id }
  });
  const roomTypesData =
    queryDataFormater(roomData, "GetAllRoomType", "roomTypes", []) || [];

  return (
    <RoomConfig
      context={context}
      loading={loading}
      roomTypesData={roomTypesData}
      key={loading ? "roomConfig--loading" : "roomConfig"}
    />
  );
};

export default ErrProtecter(RoomConfigWrap);
