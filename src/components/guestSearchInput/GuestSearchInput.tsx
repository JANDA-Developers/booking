import React, { Fragment, useState } from "react";
import _ from "lodash";
import {
  getBookings_GetBookings_result_bookings,
  getBookings,
  getBookingsVariables
} from "../../types/api";
import BookingModalWrap from "../bookingModal/BookingModalWrap";
import { useModal } from "../../hooks/hook";
import $ from "jquery";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import { JDsearchInput } from "@janda-com/front";
import { ISearchViewData } from "@janda-com/front/build/components/searchInput/DataModal";
import moment from "moment";
import "./GuestSearchInput.scss";
import { ApolloQueryResult } from "apollo-client";
import { searchFilterCreater } from "./helper";
interface IProps {
  loading: boolean;
  context: IContext;
  refetch: (
    variables?: getBookingsVariables | undefined
  ) => Promise<ApolloQueryResult<getBookings>>;
  bookings: getBookings_GetBookings_result_bookings[];
}

const GuestSearchInput: React.FC<IProps> = ({
  bookings,
  refetch,
  context,
  loading
}) => {
  const { house } = context;
  let houseId = "";
  houseId = house?._id || "";

  const [onTypeValue, setType] = useState<string>("");

  const bookingModalHook = useModal(false);

  const openBookingModal = (id: string) => {
    bookingModalHook.openModal({
      bookingId: id
    });
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

  const handleSelectData = (data: ISearchViewData) => {
    if (!data) return;
    setType(data.title);
    const target = $(`.assigItem--booking${data.id}`);
    const targetDom = $(target).get(0);
    if (targetDom) {
      hilightTarget(target);
    } else {
      openBookingModal(data.id);
    }
  };

  const BookingsDataManufacter = (
    bookings: getBookings_GetBookings_result_bookings[]
  ): ISearchViewData[] => {
    return bookings.map(booking => ({
      id: booking._id,
      title: booking.name,
      describe: booking.phoneNumber,
      tag: moment(booking.checkIn).format("YYYY-MM-DD")
    }));
  };

  const dataRefetcher = _.throttle(
    (value: string) => {
      const searchFilter = searchFilterCreater(value);
      refetch({
        param: {
          paging: {
            count: 10,
            selectedPage: 1
          },
          filter: {
            houseId,
            ...searchFilter
          }
        }
      });
    },
    500,
    {
      trailing: true
    }
  );

  const handleTypeChange = (value: string = "") => {
    if (!value) unHilightTarget();
    setType(value);
    dataRefetcher(value);
  };

  return (
    <div id="JDBookingSearcher">
      <JDsearchInput
        inputProp={{
          mb: "no",
          mr: "no"
        }}
        onSelectData={handleSelectData}
        id="JDBookingSearcher"
        onSearchChange={handleTypeChange}
        searchValue={onTypeValue}
        dataList={BookingsDataManufacter(bookings)}
      />
      <BookingModalWrap context={context} modalHook={bookingModalHook} />
    </div>
  );
};

export default GuestSearchInput;
