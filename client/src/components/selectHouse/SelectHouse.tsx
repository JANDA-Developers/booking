import React from 'react';
import { MutationFn } from 'react-apollo';
import JDselect, { IselectedOption } from '../../atoms/forms/selectBox/SelectBox';
import { IUseSelect } from '../../actions/hook';

interface IProps {
  options: IselectedOption[];
  selectedHouseHook: IUseSelect;
  selectHouseMu: MutationFn<any, any>;
}

const JDPagination: React.SFC<IProps> = ({ selectHouseMu, selectedHouseHook, options }) => {
  const handleSelectHouse = (value: IselectedOption) => {
    selectedHouseHook.onChange(value);
    selectHouseMu({ variables: { selectedHouse: value } });
  };

  return (
    <JDselect
      placeholder="숙소를 생성해주세요."
      options={options}
      {...selectedHouseHook}
      onChange={handleSelectHouse}
    />
  );
};
//
export default JDPagination;
