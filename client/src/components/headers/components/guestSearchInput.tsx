import React from "react";
import JDsearchInput from "../../../atoms/searchInput/SearchInput";
import {SELECT_DUMMY_OP} from "../../../types/enum";

interface IProps {
  onTypeValue: string;
  onTypeChange: any;
}

const GuestSearchInput: React.FC<IProps> = ({onTypeValue, onTypeChange}) => (
  <JDsearchInput
    onTypeValue={onTypeValue}
    onTypeChange={onTypeChange}
    onSearch={onTypeChange}
    feedBackMessage="feedBackMessage"
    staticList
    dataList={SELECT_DUMMY_OP}
    filter
    label="normal"
  />
);

export default GuestSearchInput;
