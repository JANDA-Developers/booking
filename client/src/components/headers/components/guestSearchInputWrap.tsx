import React, {useState} from "react";
import GuestSearchInput from "./guestSearchInput";
interface IProps {}

const GuestSearchInputWrap: React.FC<IProps> = ({}) => {
  const [onTypeValue, onTypeChange] = useState<string>("");
  return (
    <GuestSearchInput onTypeValue={onTypeValue} onTypeChange={onTypeChange} />
  );
};

export default GuestSearchInputWrap;
