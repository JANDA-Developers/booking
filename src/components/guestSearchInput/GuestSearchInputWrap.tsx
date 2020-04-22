import React, { useState, useMemo } from "react";
import GuestSearchInput from "./GuestSearchInput";
import { queryDataFormater, getFromResult } from "../../utils/utils";
import { GET_BOOKINGS } from "../../apollo/queries";
import { Query } from "react-apollo";
import { getBookings, getBookingsVariables } from "../../types/api";
import _ from "lodash";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import { useQuery } from "@apollo/react-hooks";
import client from "../../apollo/apolloClient";

class GetBookingsQuery extends Query<getBookings, getBookingsVariables> {}

interface IProps {
  context: IContext;
}

const GuestSearchInputWrap: React.FC<IProps> = ({ context }) => {
  const { house } = context;
  let houseId = "";
  houseId = house?._id || "";

  const { data, loading, refetch } = useQuery<
    getBookings,
    getBookingsVariables
  >(GET_BOOKINGS, {
    client,
    variables: {
      param: {
        paging: {
          count: 10,
          selectedPage: 1
        },
        filter: {
          houseId
        }
      }
    }
  });

  const bookingData =
    queryDataFormater(data, "GetBookings", "result", undefined) || undefined;

  const { data: bookings } = getFromResult(bookingData, "bookings", undefined);

  return (
    <GuestSearchInput
      context={context}
      bookings={bookings || []}
      refetch={refetch}
      loading={loading}
    />
  );
};

export default GuestSearchInputWrap;
