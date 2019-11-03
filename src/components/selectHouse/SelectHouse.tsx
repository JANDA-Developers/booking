import React from "react";
import {MutationFn} from "react-apollo";
import JDselect, {IselectedOption} from "../../atoms/forms/selectBox/SelectBox";
import {IUseSelect, LANG} from "../../hooks/hook";
import {insideRedirect} from "../../utils/utils";

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
      window.location.href = insideRedirect("createHouse");
    }
    selectHouseMu({variables: {selectedHouse: value}});
  };

  options.push({value: "add", label: `${LANG("create_house")}+`});

  return (
    <JDselect
      background="white"
      className={className}
      placeholder={LANG("please_create_house")}
      options={options}
      selectedOption={selectedHouseOption}
      onChange={handleSelectHouse}
    />
  );
};
//
export default JDSeleteHouse;
