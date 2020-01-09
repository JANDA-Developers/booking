import React, { useState } from "react";
import GuestSearchInput from "./GuestSearchInput";
import { queryDataFormater, getFromResult } from "../../utils/utils";
import { GET_BOOKINGS } from "../../apollo/queries";
import { Query } from "react-apollo";
import {
  getBookings,
  getBookingsVariables,
  GetBookingsFilterInput
} from "../../types/api";
import { isYYYYMMDD, isNumberMinMax } from "../../utils/inputValidations";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";

class GetBookingsQuery extends Query<getBookings, getBookingsVariables> {}

interface IProps {
  context: IContext;
}

const GuestSearchInputWrap: React.FC<IProps> = ({ context }) => {
  const { house } = context;
  let houseId = "";
  houseId = house?._id || "";

  const [onTypeValue, setType] = useState<string>("");

  // check value type for filter
  const findSearchType = (
    value: string
  ): "phoneNumnber" | "name" | "stayDate" => {
    const isPhoneNumber = isNumberMinMax(value, 4, 11);
    if (isYYYYMMDD(value)) return "stayDate";
    else if (isPhoneNumber) return "phoneNumnber";
    else return "name";
  };

  // search filter object create
  const searchFilterCreater = (value: string): GetBookingsFilterInput => {
    const target = findSearchType(value);

    if (target === "name") {
      return {
        name: value
      };
    } else if (target === "phoneNumnber") {
      return {
        phoneNumnber: value
      };
    } else if (target === "stayDate") {
      return {
        stayDate: {
          checkIn: value,
          checkOut: value
        }
      };
    } else {
      return {};
    }
  };

  const filter = searchFilterCreater(onTypeValue);

  // for GetBookingsQuery
  const skipValidate = () => {
    if (!houseId) return true;
    if (!filter.name && !filter.phoneNumnber && !filter.stayDate) return true;
    return false;
  };
  console.log(skipValidate());

  return (
    <GetBookingsQuery
      skip={skipValidate()}
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
