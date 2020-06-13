import React from "react";
import GuestSearchInput from "./GuestSearchInput";
import { queryDataFormater, getFromResult } from "../../utils/utils";
import { GET_BOOKINGS, FIND_BOOKINGS } from "../../apollo/queries";
import { findBookings, findBookingsVariables } from "../../types/api";
import _ from "lodash";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import { useQuery } from "@apollo/react-hooks";
import client from "../../apollo/apolloClient";

interface IProps {
  context: IContext;
}

const GuestSearchInputWrap: React.FC<IProps> = ({ context }) => {
  const { house } = context;
  let houseId = "";
  houseId = house?._id || "";

  const { data, loading, refetch } = useQuery<
    findBookings,
    findBookingsVariables
  >(FIND_BOOKINGS, {
    client,
    variables: {
      param: {
        houseId,
        payload: ""
      }
    }
  });

  const bookingData = queryDataFormater(data, "FindBookings", "data", []) || [];

  return (
    <GuestSearchInput
      context={context}
      bookings={bookingData}
      refetch={refetch}
      loading={loading}
    />
  );
};

export default GuestSearchInputWrap;
