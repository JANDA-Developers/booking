import { ReactPaginateProps } from 'react-paginate';
import React, { useEffect } from 'react';
import { Mutation } from 'react-apollo';
import SelectHouse from './SelectHouse';
import { useSelect, IUseSelect } from '../../actions/hook';
import { IHouse, ISelectHouse, ISelectHouseVariables } from '../../types/interface';
import { SELECT_HOUSE } from '../../clientQueries';
import { showError } from '../../utils/utils';
import { IselectedOption } from '../../atoms/forms/selectBox/SelectBox';

class SelectHouseMutation extends Mutation<ISelectHouse, ISelectHouseVariables> {}

interface IProps {
  houses: IHouse[];
  selectedHouse?: IHouse;
}

const SelectHouseWrap: React.SFC<IProps> = ({ houses = [], selectedHouse }) => {
  const houseOptions = houses.map(house => ({ value: house._id, label: house.name }));

  const selectedHouseOption = selectedHouse
    ? {
      value: selectedHouse._id,
      label: selectedHouse.name,
    }
    : null;

  return (
    <SelectHouseMutation onError={showError} mutation={SELECT_HOUSE}>
      {selectHouseMu => (
        <SelectHouse selectHouseMu={selectHouseMu} options={houseOptions} selectedHouseOption={selectedHouseOption} />
      )}
    </SelectHouseMutation>
  );
};
//
export default SelectHouseWrap;
