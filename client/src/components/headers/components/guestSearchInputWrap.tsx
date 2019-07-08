import React, {useState} from "react";
import GuestSearchInput from "./guestSearchInput";
import {queryDataFormater, showError, isEmpty} from "../../../utils/utils";
import {GET_BOOKING, GET_BOOKINGS} from "../../../queries";
import {Query} from "react-apollo";
import {getBookings, getBookingsVariables} from "../../../types/api";
import {
  isName,
  isPhone,
  isYYYYMMDD,
  isNumberMinMax
} from "../../../utils/inputValidations";

class GetBookingsQuery extends Query<getBookings, getBookingsVariables> {}

interface IProps {
  houseId: string;
}

const GuestSearchInputWrap: React.FC<IProps> = ({houseId}) => {
  const [onTypeValue, setType] = useState<string>("");

  const searchFilterMaker = (value: string) => {
    const isPhoneNumber = isNumberMinMax(value, 4, 11);
    return {
      phoneNumnber: isPhoneNumber ? value : undefined,
      name: !isPhoneNumber && !isYYYYMMDD(value) ? value : undefined,
      stayDate: isYYYYMMDD(value) ? value : undefined,
      createdAt: undefined
    };
  };

  const filter = searchFilterMaker(onTypeValue);

  return (
    <GetBookingsQuery
      query={GET_BOOKINGS}
      skip={!filter.name && !filter.phoneNumnber && !filter.stayDate}
      variables={{
        houseId,
        count: 10,
        page: 1,
        filter: filter
      }}
    >
      {({data: bookingsData, loading, error}) => {
        showError(error);

        const bookings = queryDataFormater(
          bookingsData,
          "GetBookings",
          "bookings",
          undefined
        );

        return (
          <GuestSearchInput
            houseId={houseId}
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
