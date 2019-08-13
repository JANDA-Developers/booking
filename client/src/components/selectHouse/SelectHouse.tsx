import React from "react";
import {MutationFn} from "react-apollo";
import JDselect, {IselectedOption} from "../../atoms/forms/selectBox/SelectBox";
import {IUseSelect} from "../../actions/hook";

interface IProps {
  options: IselectedOption[];
  selectedHouseOption: IselectedOption | null;
  selectHouseMu: MutationFn<any, any>;
  className?: string;
}

const JDSeleteHouse: React.SFC<IProps> = ({
  selectHouseMu,
  selectedHouseOption,
  options,
  className
}) => {
  const handleSelectHouse = (value: IselectedOption) => {
    if (value.value === "add") {
      window.location.href = "http://localhost:3000/#/makeHouse";
    }
    selectHouseMu({variables: {selectedHouse: value}});
  };

  options.push({value: "add", label: "숙소생성+"});

  return (
    <JDselect
      background="white"
      className={className}
      placeholder="숙소를 생성해주세요."
      options={options}
      selectedOption={selectedHouseOption}
      onChange={handleSelectHouse}
    />
  );
};
//
export default JDSeleteHouse;
