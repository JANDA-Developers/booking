import React, {Fragment} from "react";
import JDsearchInput from "../../../atoms/searchInput/SearchInput";
import {SELECT_DUMMY_OP} from "../../../types/enum";
import {getBookers_GetBookers_bookers} from "../../../types/api";
import BookerModalWrap from "../../bookerInfo/BookerModalWrap";
import UserModal from "../../../pages/middleServer/super/components/userModal";
import {useModal} from "../../../actions/hook";

interface IProps {
  houseId: string;
  onTypeValue: string;
  onTypeChange: any;
  bookers: getBookers_GetBookers_bookers[];
}

const GuestSearchInput: React.FC<IProps> = ({
  onTypeValue,
  onTypeChange,
  bookers,
  houseId
}) => {
  const bookerModalHook = useModal(false);
  const handleSearchList = (label?: string | null, id?: string) => {
    console.log("id");
    console.log(id);
    console.log(id);
    console.log(id);
    bookerModalHook.openModal({
      bookerId: id
    });
  };

  return (
    <Fragment>
      <JDsearchInput
        onTypeValue={onTypeValue}
        onTypeChange={onTypeChange}
        onSearch={handleSearchList}
        onListClick={handleSearchList}
        alwaysListShow
        staticList
        filter={false}
        asDetail="phoneNumber"
        asId="_id"
        asName="name"
        dataList={bookers}
      />
      <BookerModalWrap houseId={houseId} modalHook={bookerModalHook} />
    </Fragment>
  );
};

export default GuestSearchInput;
