import React, {
  Fragment,
  useState,
  useCallback,
  useMemo,
  useEffect
} from "react";
import _ from "lodash";
import {
  findBookings_FindBookings_data,
  findBookings,
  findBookingsVariables
} from "../../types/api";
import BookingModalWrap from "../bookingModal/BookingModalWrap";
import { useModal, LANG } from "../../hooks/hook";
import $ from "jquery";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import { JDsearchInput } from "@janda-com/front";
import { ISearchViewData } from "@janda-com/front/build/components/searchInput/DataModal";
import moment from "moment";
import "./GuestSearchInput.scss";
import { ApolloQueryResult } from "apollo-client";
import { autoHypen } from "../../utils/utils";
import JDIcon from "../../atoms/icons/Icons";
import JDtypho from "../../atoms/typho/Typho";
import Align from "../../atoms/align/Align";
import isMobile from "is-mobile";

interface IProps {
  loading: boolean;
  context: IContext;
  refetch: (
    variables?: findBookingsVariables | undefined
  ) => Promise<ApolloQueryResult<findBookings>>;
  bookings: findBookings_FindBookings_data[];
}

const GuestSearchInput: React.FC<IProps> = ({
  bookings,
  refetch,
  context,
  loading
}) => {
  const [data, setData] = useState<ISearchViewData[]>([]);

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

  const scrollMoveToTargetGuest = (
    target: HTMLElement,
    scrollEl: HTMLElement
  ) => {
    const { offsetTop, offsetLeft } = target;
    window.scrollTo({ top: offsetTop });
    const targetWidth = $(scrollEl).width() || 0;
    scrollEl.scrollTo({ left: offsetLeft - targetWidth / 2 });
  };

  // 방배정에서 사용가능
  const hilightTarget = (target: JQuery<HTMLElement>) => {
    $(".assigItem--searched").removeClass("assigItem--searched");
    $(target).addClass("assigItem--searched");

    const scrollTarget = $(`.rct-scroll`).get(0);
    const targetDom = $(target).get(0);

    scrollMoveToTargetGuest(targetDom, scrollTarget);
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
    bookings: findBookings_FindBookings_data[]
  ): ISearchViewData[] => {
    return bookings.map(booking => ({
      id: booking._id,
      title: booking.name,
      describe: autoHypen(booking.phoneNumber),
      tag: moment(booking.checkIn).format("YYYY-MM-DD")
    }));
  };

  const dataRefetcher =  (value: string) => {
    refetch({
      param: {
        houseId,
        payload: value
      }
    });
  }

  const handleTypeChange = (value: string = "") => {
    if (!value) unHilightTarget();
    setType(value);
    dataRefetcher(value);
  };

  const classToggler = () => {
    if (isMobile()) {
      const iconClass = "header--iconHide";
      const className = "header__center--grow";
      const target = $(".header .header__center");
      const header = $(".header");
      target.toggleClass(className);
      header.toggleClass(iconClass);
    }
  };

  useEffect(() => {
    if (!loading) {
      const dataList = BookingsDataManufacter(bookings);
      setData(dataList);
    }
  }, [loading]);

  return (
    <div id="JDBookingSearcher">
      <JDsearchInput
        loading={loading}
        head={<JDtypho weight={600}>{LANG("resv_search")}</JDtypho>}
        inputProp={{
          mb: "no",
          mr: "small",
          placeholder: LANG("resv_search"),
          onBlurCapture: () => {
            classToggler();
          },
          onFocusCapture: () => {
            classToggler();
          }
        }}
        onSelectData={handleSelectData}
        id="JDBookingSearcher"
        onSearchChange={handleTypeChange}
        searchValue={onTypeValue}
        dataList={data}
        foot={
          <Align
            flex={{
              vCenter: true
            }}
          >
            <JDtypho size="small" mr="small">
              {LANG("how_search")}{" "}
            </JDtypho>
            <JDIcon size="small" tooltip={LANG("search_helper")} icon="help" />
          </Align>
        }
      />
      <BookingModalWrap context={context} modalHook={bookingModalHook} />
    </div>
  );
};

export default GuestSearchInput;
