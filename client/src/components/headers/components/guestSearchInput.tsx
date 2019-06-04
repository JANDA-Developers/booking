import React, {Fragment} from "react";
import JDsearchInput from "../../../atoms/searchInput/SearchInput";
import {SELECT_DUMMY_OP} from "../../../types/enum";
import {getBookings_GetBookings_bookings} from "../../../types/api";
import BookingModalWrap from "../../bookingModal/BookingModalWrap";
import UserModal from "../../../pages/middleServer/super/components/userModal";
import {useModal} from "../../../actions/hook";

interface IProps {
  houseId: string;
  onTypeValue: string;
  onTypeChange: any;
  bookings: getBookings_GetBookings_bookings[];
}

const GuestSearchInput: React.FC<IProps> = ({
  onTypeValue,
  onTypeChange,
  bookings,
  houseId
}) => {
  const bookingModalHook = useModal(false);
  const handleSearchList = (label?: string | null, id?: string) => {
    console.log("id");
    console.log(id);
    console.log(id);
    console.log(id);
    bookingModalHook.openModal({
      bookingId: id
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
        dataList={bookings}
      />
      <BookingModalWrap houseId={houseId} modalHook={bookingModalHook} />
    </Fragment>
  );
};

export default GuestSearchInput;
