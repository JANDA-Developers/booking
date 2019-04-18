import { ReactPaginateProps } from 'react-paginate';
import React, { useEffect } from 'react';
import { Mutation } from 'react-apollo';
import SelectHouse from './SelectHouse';
import { useSelect, IUseSelect } from '../../actions/hook';
import IHouses, { ISelectHouse, ISelectHouseVariables, IHouse } from '../../types/interface';
import { SELECT_HOUSE } from '../../clientQueries';
import { onError } from '../../utils/utils';
import { IselectedOption } from '../../atoms/forms/SelectBox';

class SelectHouseMutation extends Mutation<ISelectHouse, ISelectHouseVariables> {}

interface IProps {
  houses: IHouses[];
  selectedHouse: IHouses;
}

const SelectHouseWrap: React.SFC<IProps> = ({ houses = [], selectedHouse }) => {
  const houseOptions = houses.map(house => ({ value: house._id, label: house.name }));

  const selectedHouseOption = {
    value: selectedHouse._id,
    label: selectedHouse.name,
  };
  const selectedHouseHook = useSelect(selectedHouseOption);

  useEffect(() => {
    selectedHouseHook.onChange(selectedHouseOption);
  }, [selectedHouse._id]);

  return (
    <SelectHouseMutation
      onError={onError}
      mutation={SELECT_HOUSE}
      variables={{ selectedHouse: selectedHouseHook.selectedOption }}
    >
      {selectHouseMu => (
        <SelectHouse selectHouseMu={selectHouseMu} options={houseOptions} selectedHouseHook={selectedHouseHook} />
      )}
    </SelectHouseMutation>
  );
};
//
export default SelectHouseWrap;
