import React, {useState} from "react";
import GuestSearchInput from "./guestSearchInput_";
import {queryDataFormater, showError, isEmpty} from "../../utils/utils";
import {GET_BOOKING, GET_BOOKINGS} from "../../queries";
import {Query} from "react-apollo";
import {getBookings, getBookingsVariables} from "../../types/api";
import {
  isName,
  isPhone,
  isYYYYMMDD,
  isNumberMinMax
} from "../../utils/inputValidations";
import {IContext} from "../../pages/MiddleServerRouter";

class GetBookingsQuery extends Query<getBookings, getBookingsVariables> {}

interface IProps {
  context: IContext;
}

const GuestSearchInputWrap: React.FC<IProps> = ({context}) => {
  const {house} = context;
  let houseId = "";
  houseId = house ? house._id : "";

  const [onTypeValue, setType] = useState<string>("");

  const searchFilterMaker = (value: string) => {
    const isPhoneNumber = isNumberMinMax(value, 4, 11);

    return {
      phoneNumnber: isPhoneNumber && !isYYYYMMDD(value) ? value : undefined,
      name: !isPhoneNumber && !isYYYYMMDD(value) ? value : undefined,
      stayDate: isYYYYMMDD(value) ? value : undefined,
      createdAt: undefined
    };
  };

  const filter = searchFilterMaker(onTypeValue);

  return (
    <GetBookingsQuery
      skip={
        !houseId || (!filter.name && !filter.phoneNumnber && !filter.stayDate)
      }
      query={GET_BOOKINGS}
      variables={{
        houseId: houseId || "",
        count: 10,
        page: 1,
        filter: filter
      }}
    >
      {({data: bookingsData, loading, error}) => {
        const bookings = queryDataFormater(
          bookingsData,
          "GetBookings",
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
