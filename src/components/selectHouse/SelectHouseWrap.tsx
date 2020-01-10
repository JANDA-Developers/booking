import React from "react";
import { Mutation } from "react-apollo";
import SelectHouse from "./SelectHouse";
import { ISelectHouse, ISelectHouseVariables } from "../../types/interface";
import { SELECT_HOUSE } from "../../apollo/clientQueries";
import { onCompletedMessage } from "../../utils/utils";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import { LANG } from "../../hooks/hook";
import { GET_USER_INFO } from "../../apollo/queries";
import { getOperationName } from "apollo-utilities";

class SelectHouseMutation extends Mutation<
  ISelectHouse,
  ISelectHouseVariables
> {}

interface IProps {
  context: IContext;
  className?: string;
}

const SelectHouseWrap: React.SFC<IProps> = ({ className, context }) => {
  const { houses, house } = context;
  const houseOptions = houses.map(house => ({
    value: house._id,
    label: house.name
  }));

  const selectedHouseOption = house
    ? {
        value: house._id,
        label: house.name
      }
    : null;

  return (
    <SelectHouseMutation
      awaitRefetchQueries
      refetchQueries={[{ query: GET_USER_INFO }]}
      onCompleted={({ selectHouse }: any) => {
        onCompletedMessage(
          selectHouse,
          LANG("change_house"),
          LANG("change_house_fail")
        );
        location.reload();
      }}
      mutation={SELECT_HOUSE}
    >
      {selectHouseMu => (
        <SelectHouse
          className={className}
          selectHouseMu={selectHouseMu}
          options={houseOptions}
          selectedHouseOption={selectedHouseOption}
        />
      )}
    </SelectHouseMutation>
  );
};
//
export default SelectHouseWrap;
