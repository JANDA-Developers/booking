import React from "react";
import { getAllRoomType, getAllRoomTypeVariables } from "../../types/api";
import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_ROOMTYPES } from "../../apollo/queries";
import client from "../../apollo/apolloClient";
import moment from "moment";
import { queryDataFormater } from "../../utils/utils";
import { groupDataManufacturer } from "./groupDataManufacter";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import DailyAssigWrap, { IChainProps } from "./DailyAssigWrap";
import { BookingLang } from "../../langs/JDlang";
const { currentLang } = BookingLang;

export interface IDailyWrapWrapProp extends IChainProps {
  context: IContext;
  date: Date;
}

const DailyAssigHigher: React.FC<IDailyWrapWrapProp> = ({
  context,
  ...prop
}) => {
  const { house } = context;
  const { data: roomData, loading: roomTypeLoading } = useQuery<
    getAllRoomType,
    getAllRoomTypeVariables
  >(GET_ALL_ROOMTYPES, {
    client,
    variables: {
      houseId: house._id
    }
  });

  moment.locale(currentLang);

  const roomTypesData =
    queryDataFormater(roomData, "GetAllRoomType", "roomTypes", []) || []; // 원본데이터

  const roomManufactedData = groupDataManufacturer(roomTypesData);
  return (
    <div>
      <DailyAssigWrap
        context={context}
        roomTypesData={roomManufactedData}
        roomTypeLoading={roomTypeLoading}
        {...prop}
      />
    </div>
  );
};

export default DailyAssigHigher;
