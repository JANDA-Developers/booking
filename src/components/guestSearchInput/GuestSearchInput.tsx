import React, { Fragment } from "react";
import JDsearchInput from "../../atoms/searchInput/SearchInput";
import { getBookings_GetBookings_result_bookings } from "../../types/api";
import BookingModalWrap from "../bookingModal/BookingModalWrap";
import { useModal } from "../../hooks/hook";
import $ from "jquery";
import { autoHypen } from "../../utils/utils";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";

interface IProps {
  loading: boolean;
  context: IContext;
  onTypeValue: string;
  setType: any;
  bookings: getBookings_GetBookings_result_bookings[];
}

const GuestSearchInput: React.FC<IProps> = ({
  onTypeValue,
  setType,
  bookings,
  context,
  loading
}) => {
  const bookingModalHook = useModal(false);

  const openBookingModal = (id: string) => {
    bookingModalHook.openModal({
      bookingId: id
    });
  };

  const handleClickList = (
    value: string | undefined,
    id: string | undefined
  ): void => {
    if (!id) return;
    openBookingModal(id);
  };

  const unHilightTarget = () => {
    $(".assigItem--searched").removeClass("assigItem--searched");
  };

  // 방배정에서 사용가능
  const hilightTarget = (target: JQuery<HTMLElement>) => {
    $(".assigItem--searched").removeClass("assigItem--searched");
    const scrollTarget = $(`.rct-scroll`).get(0);
    $(target).addClass("assigItem--searched");
    const targetDom = $(target).get(0);
    window.scrollTo({ top: targetDom.offsetTop });
    const targetWidth = $(scrollTarget).width() || 0;
    scrollTarget.scrollTo({ left: targetDom.offsetLeft - targetWidth / 2 });
  };

  const handleFindOne = (label?: string | null, id?: string) => {
    if (!id) return;
    setType(label);
    const target = $(`.assigItem--booking${id}`);
    const targetDom = $(target).get(0);
    if (targetDom) {
      hilightTarget(target);
    } else {
      openBookingModal(id);
    }
  };

  const BookingsDataManufacter = (
    bookings: getBookings_GetBookings_result_bookings[]
  ) => {
    const bookingData = bookings.map(booking => {
      booking.phoneNumber = autoHypen(booking.phoneNumber);
      return booking;
    });
    return bookingData;
  };

  const handleTypeChange = (value?: string) => {
    if (!value) unHilightTarget();
    setType(value);
  };

  return (
    <Fragment>
      <JDsearchInput
        mode="fill"
        id="JDBookingSearcher"
        isLoading={loading}
        onTypeValue={onTypeValue}
        onTypeChange={handleTypeChange}
        onFindOne={handleFindOne}
        onListClick={handleClickList}
        setTypeWhenFindOne={true}
        staticList
        filter={false}
        asDetail="phoneNumber"
        asId="_id"
        asName="name"
        dataList={BookingsDataManufacter(bookings)}
      />
      <BookingModalWrap context={context} modalHook={bookingModalHook} />
    </Fragment>
  );
};

export default GuestSearchInput;
