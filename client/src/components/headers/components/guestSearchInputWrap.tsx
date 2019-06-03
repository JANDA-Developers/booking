import React, {useState} from "react";
import GuestSearchInput from "./guestSearchInput";
import {queryDataFormater, showError, isEmpty} from "../../../utils/utils";
import {GET_BOOKER, GET_BOOKERS} from "../../../queries";
import {Query} from "react-apollo";
import {getBookers, getBookersVariables} from "../../../types/api";
import {isName, isPhone, isYYYYMMDD} from "../../../utils/inputValidations";

class GetBookersQuery extends Query<getBookers, getBookersVariables> {}

interface IProps {
  houseId: string;
}

const GuestSearchInputWrap: React.FC<IProps> = ({houseId}) => {
  const [onTypeValue, onTypeChange] = useState<string>("");

  const searchFilterMaker = (value: string) => {
    return {
      phoneNumnber: isPhone(value) ? value : undefined,
      name: !isPhone(value) && !isYYYYMMDD(value) ? value : undefined,
      stayDate: isYYYYMMDD(value) ? value : undefined,
      createdAt: undefined
    };
  };

  const filter = searchFilterMaker(onTypeValue);

  return (
    <GetBookersQuery
      query={GET_BOOKERS}
      skip={!filter.name && !filter.phoneNumnber && !filter.stayDate}
      variables={{
        houseId,
        count: 10,
        page: 1,
        filter: filter
      }}
    >
      {({data: bookersData, loading, error}) => {
        showError(error);

        const bookers = queryDataFormater(
          bookersData,
          "GetBookers",
          "bookers",
          undefined
        );
        console.log({
          houseId,
          count: 10,
          page: 1,
          filter: filter
        });
        console.log(bookers);

        return (
          <GuestSearchInput
            houseId={houseId}
            bookers={bookers || []}
            onTypeValue={onTypeValue}
            onTypeChange={onTypeChange}
          />
        );
      }}
    </GetBookersQuery>
  );
};

export default GuestSearchInputWrap;
