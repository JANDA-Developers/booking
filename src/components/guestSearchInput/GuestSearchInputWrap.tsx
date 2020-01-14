import React, { useState, useMemo } from "react";
import GuestSearchInput from "./GuestSearchInput";
import { queryDataFormater, getFromResult } from "../../utils/utils";
import { GET_BOOKINGS } from "../../apollo/queries";
import { Query } from "react-apollo";
import { getBookings, getBookingsVariables } from "../../types/api";
import _ from "lodash";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import { debouncedFilterCreater } from "./helper";

class GetBookingsQuery extends Query<getBookings, getBookingsVariables> {}

interface IProps {
  context: IContext;
}

const GuestSearchInputWrap: React.FC<IProps> = ({ context }) => {
  const { house } = context;
  let houseId = "";
  houseId = house?._id || "";

  const [onTypeValue, setType] = useState<string>("");

  const filter = debouncedFilterCreater(onTypeValue) || {};

  // for GetBookingsQuery
  const skipValidate = useMemo(() => {
    if (!houseId) return true;
    if (!filter.name && !filter.phoneNumnber && !filter.stayDate) return true;
    return false;
  }, [
    (filter.name || "") +
      filter.bookingNum +
      filter.name +
      filter.phoneNumnber +
      filter.stayDate
  ]);

  return (
    <GetBookingsQuery
      skip={skipValidate}
      query={GET_BOOKINGS}
      variables={{
        param: {
          paging: {
            count: 10,
            selectedPage: 1
          },
          filter: {
            ...filter,
            houseId
          }
        }
      }}
    >
      {({ data: bookingsData, loading, error }) => {
        const result = queryDataFormater(
          bookingsData,
          "GetBookings",
          "result",
          undefined
        );

        const { data: bookings, pageInfo } = getFromResult(
          result,
          "bookings",
          undefined
        );

        return (
          <GuestSearchInput
            context={context}
            bookings={bookings || []}
            onTypeValue={onTypeValue}
            setType={setType}
            loading={loading}
          />
        );
      }}
    </GetBookingsQuery>
  );
};

export default GuestSearchInputWrap;
