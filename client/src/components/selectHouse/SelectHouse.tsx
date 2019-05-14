import React from 'react';
import { MutationFn } from 'react-apollo';
import JDselect, { IselectedOption } from '../../atoms/forms/selectBox/SelectBox';
import { IUseSelect } from '../../actions/hook';

interface IProps {
  options: IselectedOption[];
  selectedHouseOption: IselectedOption | null;
  selectHouseMu: MutationFn<any, any>;
}

const JDPagination: React.SFC<IProps> = ({ selectHouseMu, selectedHouseOption, options }) => {
  const handleSelectHouse = (value: IselectedOption) => {
    selectHouseMu({ variables: { selectedHouse: value } });
  };

  return (
    <JDselect
      placeholder="숙소를 생성해주세요."
      options={options}
      defaultValue={selectedHouseOption}
      onChange={handleSelectHouse}
    />
  );
};
//
export default JDPagination;
