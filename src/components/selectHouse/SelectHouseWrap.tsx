import {ReactPaginateProps} from "react-paginate";
import React, {useEffect} from "react";
import {Mutation} from "react-apollo";
import SelectHouse from "./SelectHouse";
import {useSelect, IUseSelect, LANG} from "../../hooks/hook";
import {
  IHouse,
  ISelectHouse,
  ISelectHouseVariables
} from "../../types/interface";
import {SELECT_HOUSE, SELECTED_HOUSE} from "../../clientQueries";
import {showError, onCompletedMessage} from "../../utils/utils";
import {IselectedOption} from "../../atoms/forms/selectBox/SelectBox";
import {GET_USER_INFO} from "../../queries";
import {getOperationName} from "apollo-utilities";
import {IContext} from "../../pages/MiddleServerRouter";

class SelectHouseMutation extends Mutation<
  ISelectHouse,
  ISelectHouseVariables
> {}

interface IProps {
  context: IContext;
  className?: string;
}

const SelectHouseWrap: React.SFC<IProps> = ({className, context}) => {
  const {houses, house} = context;
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
      onCompleted={({selectHouse}: any) =>
        onCompletedMessage(
          selectHouse,
          LANG("change_house"),
          LANG("change_house_fail")
        )
      }
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
