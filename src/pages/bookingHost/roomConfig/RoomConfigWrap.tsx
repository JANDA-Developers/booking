/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useMemo } from "react";
import {
  getAllRoomType,
  getAllRoomTypeVariables,
  saveRoomTypes,
  saveRoomTypesVariables,
  changeRoomTypeTags,
  changeRoomTypeTagsVariables,
  TagInput,
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
import { LANG } from "../../../hooks/hook";

interface IProps {
  context: IContext;
}

let LastKey = "";

export type TChangeTags = (roomTypeId: string, newTags: TagInput[], removeKeys: string[]) => void;

const RoomConfigWrap: React.FC<IProps> = ({ context }) => {
  const { house } = context;
  const { data: roomData, loading } = useQuery<
    getAllRoomType,
    getAllRoomTypeVariables
  >(GET_ALL_ROOMTYPES, {
    client,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    variables: { houseId: house._id }
  });


  const refetchQueries = [getOperationName(GET_ALL_ROOMTYPES) || ""];

  const [changeRoomTypeMu, { loading: addRoomTypeLoading }] = useMutation<
    changeRoomTypeTags,
    changeRoomTypeTagsVariables
  >(SAVE_ROOMTYPES, {
    client,
    notifyOnNetworkStatusChange: true,
    refetchQueries,
    awaitRefetchQueries: true
  });

  const [saveRoomsMu, { loading: saveRoomsLoading }] = useMutation<
    saveRoomTypes,
    saveRoomTypesVariables
  >(SAVE_ROOMTYPES, {
    client,
    notifyOnNetworkStatusChange: true,
    refetchQueries,
    awaitRefetchQueries: true,
    onCompleted: ({ SaveRoomTypes }) => {
      onCompletedMessage(
        SaveRoomTypes,
        LANG("save_room_done"),
        LANG("save_room_failed")
      );
    }
  });

  const roomTypesData =
    queryDataFormater(roomData, "GetAllRoomType", "roomTypes", []) || [];

  const handleChangTags: TChangeTags = (roomTypeId: string, newTags: TagInput[], removeKeys: string[]) => {
    changeRoomTypeMu({
      variables: {
        newTags,
        removeKeys,
        roomTypeId
      }
    })
  }

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

  const innerKey = useMemo(() => {
    const key = s4();
    LastKey = key;
    if (loading) return LastKey;
    return key;
  }, [loading]);

  return (
    <Fragment>
      <RoomConfig
        onSubmit={handleSubmit}
        context={context}
        loading={loading}
        handleChangTags={handleChangTags}
        saveRoomsLoading={saveRoomsLoading}
        defaultData={{
          defaultAddTemp: undefined,
          roomTypesData
        }}
        key={innerKey}
      />
      <Preloader floating loading={saveRoomsLoading} />
    </Fragment>
  );
};

export default ErrProtecter(RoomConfigWrap);
