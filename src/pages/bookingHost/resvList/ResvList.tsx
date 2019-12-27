import React, { useState, Fragment } from "react";
import { ReactTableDefault, JDcolumn } from "../../../atoms/table/Table";
import Button from "../../../atoms/button/Button";
import JDIcon from "../../../atoms/icons/Icons";
import { useModal, LANG, useCheckBoxTable } from "../../../hooks/hook";
import BookingModalWrap from "../../../components/bookingModal/BookingModalWrap";
import { IPageInfo, IBooking, IRoomType } from "../../../types/interface";
import JDbox from "../../../atoms/box/JDbox";
import { to4YMMDD } from "../../../utils/setMidNight";
import { MutationFn } from "react-apollo";
import {
  deleteBooking,
  deleteBookingVariables,
  updateBookingVariables,
  updateBooking,
  getBookings,
  getBookingsVariables,
  GetBookingsFilter
} from "../../../types/api";
import autoHyphen from "../../../utils/autoFormat";
import { JDtoastModal } from "../../../atoms/modal/Modal";
import {
  PaymentStatus,
  PricingType,
  BookingStatus,
  DateFormat
} from "../../../types/enum";
import { FLOATING_PRELOADER_SIZE } from "../../../types/const";
import moment from "moment";
import JDbadge from "../../../atoms/badge/Badge";
import "./ResvList.scss";
import JDPagination from "../../../atoms/pagination/Pagination";
import { autoComma, queryDataFormater } from "../../../utils/utils";
import SendSMSmodalWrap, {
  IModalSMSinfo
} from "../../../components/smsModal/SendSmsModalWrap";
import Preloader from "../../../atoms/preloader/Preloader";
import ConfirmBadgeWrap from "../../../components/confirmBadge/ConfirmBadgeWrap";
import textReader from "../../../utils/textReader";
import { NetworkStatus } from "apollo-client";
import { IContext } from "../../bookingHost/BookingHostRouter";
import { getRoomSelectInfo } from "../../../utils/typeChanger";
import { inOr } from "../../../utils/C";
import { toast } from "react-toastify";
import PageHeader from "../../../components/pageHeader/PageHeader";
import PageBody from "../../../components/pageBody/PageBody";
import ExcelModal, {
  IExcelModalInfo,
  TExcelGetDataProp
} from "../../../components/excel/ExcelModal";
import { resvDatasToExcel } from "./helper";
import client from "../../../apollo/apolloClient";
import { GET_BOOKINGS } from "../../../apollo/queries";
import { JDSelectableJDtable } from "../../../atoms/table/SelectTable";

interface IProps {
  pageInfo: IPageInfo;
  bookingsData: IBooking[];
  loading: boolean;
  updateBookingLoading: boolean;
  deleteBookingLoading: boolean;
  context: IContext;
  networkStatus: NetworkStatus;
  setPage(page: number): void;
  deleteBookingMu: MutationFn<deleteBooking, deleteBookingVariables>;
  updateBookingMu: MutationFn<updateBooking, updateBookingVariables>;
}

const ResvList: React.SFC<IProps> = ({
  pageInfo,
  bookingsData,
  loading,
  updateBookingMu,
  deleteBookingMu,
  setPage,
  networkStatus,
  context
}) => {
  const {
    house: { _id: houseId },
    houseConfig: {
      bookingConfig: {
        newBookingMark: { enable: newBookingMarkEnable }
      }
    },
    JDlang
  } = context;
  const checkBoxTableHook = useCheckBoxTable(
    [],
    bookingsData.map(data => data._id)
  );
  const { checkedIds, setCheckedIds } = checkBoxTableHook;
  const bookingModalHook = useModal(false);
  const alertModalHook = useModal(false);
  const sendSmsModalHook = useModal<IModalSMSinfo>(false);
  const excelModal = useModal<IExcelModalInfo>(false);

  const handleDeleteBookingBtnClick = () => {
    alertModalHook.openModal({
      txt: `${LANG("nextResv")}${checkedIds.length}${LANG("checkDelete")}`
    });
  };

  const handleCancleBookingBtnClick = () => {
    checkedIds.forEach(id => {
      updateBookingMu({
        variables: {
          bookingId: id,
          params: {
            bookingStatus: BookingStatus.CANCEL
          }
        }
      });
    });
  };

  const handleSendSmsBtnClick = () => {
    const receivers = checkedIds.map(id => {
      const target = bookingsData.find(booking => booking._id === id);
      if (target) {
        return target.phoneNumber;
      } else {
        return 0;
      }
    });

    if (checkedIds.length !== receivers.length) {
      toast.warn("JD1114 ERR");
    }

    sendSmsModalHook.openModal({
      receivers: receivers.filter(receiver => receiver),
      bookingIds: checkedIds
    });
  };

  const handleCompleteBookingBtnClick = () => {
    checkedIds.forEach(id => {
      updateBookingMu({
        variables: {
          bookingId: id,
          params: {
            bookingStatus: BookingStatus.COMPLETE
          }
        }
      });
    });
  };

  const deleteModalCallBackFn = (flag: boolean) => {
    if (flag) {
      checkedIds.forEach(bookingId => {
        deleteBookingMu({
          variables: {
            bookingId: bookingId
          }
        });
      });
      setCheckedIds([]);
    }
  };

  const TableColumns: JDcolumn<IBooking>[] = [
    {
      Header: LANG("reservation_did_date"),
      accessor: "createdAt",
      Cell: ({ value }) => {
        return (
          <div className="resvList__createdAt">
            {moment(value)
              .local()
              .format(DateFormat.WITH_TIME)}
          </div>
        );
      }
    },
    {
      Header: LANG("accommodation_info"),
      accessor: "roomTypes",
      Cell: ({ value, original }) => {
        const roomTypes: IRoomType[] = value;
        console.log("roomTypes");
        console.log(roomTypes);
        const selectInfoes = getRoomSelectInfo(original.guests, roomTypes);

        return selectInfoes.map(selectInfo => (
          <JDbox
            size="small"
            textAlign="center"
            key={`${original._id}${selectInfo.roomTypeId}`}
          >
            {selectInfo.roomTypeName}
            <br />
            <span>
              {(() => {
                const { female, male, roomCount } = selectInfo.count;
                return (
                  <span>
                    {selectInfo.pricingType === PricingType.DOMITORY ? (
                      <Fragment>
                        {female !== 0 && (
                          <span>
                            {female}
                            {LANG("female")}{" "}
                          </span>
                        )}
                        {male !== 0 && (
                          <span>
                            {male}
                            {LANG("male")}
                          </span>
                        )}
                      </Fragment>
                    ) : (
                      <span>{roomCount}</span>
                    )}
                  </span>
                );
              })()}
            </span>
          </JDbox>
        ));
      }
    },
    {
      Header: LANG("checkIn"),
      accessor: "_id",
      Cell: ({ original }) => <div>{to4YMMDD(original.checkIn)}</div>
    },
    {
      Header: LANG("checkOut"),
      accessor: "_id",
      Cell: ({ original }) => <div>{to4YMMDD(original.checkOut)}</div>
    },
    {
      Header: () => (
        <div>
          {LANG("booker_name")}
          <br />
          {LANG("contact")}
        </div>
      ),
      accessor: "name",
      Cell: ({ original }) => {
        const Booking: IBooking = original;
        return (
          <div>
            {Booking.name}
            <br />
            {autoHyphen(Booking.phoneNumber)}
          </div>
        );
      }
    },
    {
      Header: () => (
        <div>
          {LANG("usage_amount")}
          <br />
          {LANG("payment_status")}
        </div>
      ),
      accessor: "payment",
      Cell: ({ original }) => (
        <div>
          <span>
            {autoComma(original.payment.totalPrice)}
            {LANG("money_unit")}
          </span>
          <br />
          <span
            className={`resvList__paymentStatus ${original.payment.status ===
              PaymentStatus.PROGRESSING && "resvList__paymentStatus--notYet"}`}
          >
            {LANG("PaymentStatus", original.payment.status)}
          </span>
        </div>
      )
    },
    {
      Header: LANG("memo"),
      accessor: "memo",
      minWidth: 200,
      Cell: ({ value }) => (
        <div
          className={`JDscrool resvList__memo ${value &&
            value.length > 20 &&
            "resvList__memo--full"}`}
        >
          {textReader(value)}
        </div>
      )
    },
    {
      Header: LANG("status"),
      accessor: "_id",
      Cell: ({ original }) => {
        const {
          isNew,
          isConfirm,
          _id,
          status,
          payment,
          checkInInfo
        } = original;
        const isCancled = status === BookingStatus.CANCEL;
        const isProgressing = status === BookingStatus.PROGRESSING;
        const isComplete = status === BookingStatus.COMPLETE;
        const { status: paymentStatus } = payment;
        const isPaied = paymentStatus === PaymentStatus.COMPLETE;
        const isCheckIn = checkInInfo.isIn;

        return (
          <div className="resvList__statusBadgesWrap">
            {newBookingMarkEnable && (
              <ConfirmBadgeWrap
                className="JDstandard-space0"
                show={isNew && !isConfirm}
                bookingId={_id}
              />
            )}
            {isCheckIn && <JDbadge thema={"new"}>{LANG("new")}</JDbadge>}
            {isCancled && <JDbadge thema={"error"}>{LANG("cancel")}</JDbadge>}
            {isProgressing && (
              <JDbadge thema={"grey"}>{LANG("proceeding")}</JDbadge>
            )}
            {/* {isComplete && (
              <JDbadge thema={"positive"}>{LANG("good_status")}</JDbadge>
            )} */}
            {isProgressing || isPaied || (
              <JDbadge thema={"warn"}>{LANG("unPaid")}</JDbadge>
            )}
          </div>
        );
      }
    },
    {
      Header: LANG("detail"),
      accessor: "_id",
      width: 60,
      Cell: ({ value }) => (
        <JDIcon
          onClick={() => {
            bookingModalHook.openModal({
              bookingId: value
            });
          }}
          size={"normal"}
          hover
          icon="person"
        />
      )
    }
  ];

  return (
    <div id="resvList" className="resvList">
      <PageHeader
        desc={LANG("bookingList__desc")}
        title={LANG("bookingList")}
      />
      <PageBody>
        <div>
          <Button
            size="small"
            icon={"download"}
            label={LANG("excel_express")}
            onClick={() => {
              const selectData = bookingsData.filter(booking =>
                checkedIds.includes(booking._id)
              );

              const getData = async ({
                mode,
                count,
                date
              }: TExcelGetDataProp) => {
                const filter: GetBookingsFilter | undefined = date
                  ? {
                      // 나중에 크리에이트로 변경
                      stayDate: {
                        checkIn: to4YMMDD(date.from),
                        checkOut: to4YMMDD(date.to)
                      }
                    }
                  : undefined;

                const { data, loading } = await client.query<
                  getBookings,
                  getBookingsVariables
                >({
                  query: GET_BOOKINGS,
                  variables: {
                    filter,
                    count: count || 99999,
                    houseId,
                    page: 0
                  }
                });

                const bookings =
                  queryDataFormater(data, "GetBookings", "bookings", []) || [];

                const excelData = resvDatasToExcel(bookings);
                const excelSelectData = resvDatasToExcel(selectData);
                excelModal.openModal({
                  data: excelData,
                  loading,
                  getData,
                  selectData: excelSelectData
                });
              };

              const excelSelectData = resvDatasToExcel(selectData);
              excelModal.openModal({
                data: [],
                selectData: excelSelectData,
                getData
              });
            }}
          ></Button>
          <Button
            size="small"
            onClick={handleCancleBookingBtnClick}
            label={LANG("cancelBooking")}
          />
          <Button
            onClick={handleSendSmsBtnClick}
            size="small"
            label={LANG("sendSMS")}
          />
          <Button
            onClick={handleDeleteBookingBtnClick}
            size="small"
            thema="error"
            label={LANG("delete_booking")}
          />
        </div>
        {networkStatus === 1 && loading ? (
          <Preloader size="large" loading={true} />
        ) : (
          <JDSelectableJDtable
            {...ReactTableDefault}
            {...checkBoxTableHook}
            // 아래 숫자는 요청하는 쿼리와 같아야합니다.
            defaultPageSize={20}
            isCheckable
            align="center"
            data={bookingsData}
            columns={TableColumns}
            keyField="_id"
          />
        )}
        <Preloader
          size={FLOATING_PRELOADER_SIZE}
          floating
          loading={networkStatus !== 1 && loading}
        />
        <JDPagination
          setPage={setPage}
          pageInfo={pageInfo}
          pageRangeDisplayed={1}
          marginPagesDisplayed={4}
        />
        <BookingModalWrap
          key={`${bookingModalHook.info.bookingId || "BookingModaldefaultId"}`}
          modalHook={bookingModalHook}
          context={context}
        />
        <JDtoastModal
          confirm
          confirmCallBackFn={deleteModalCallBackFn}
          {...alertModalHook}
        />
        <SendSMSmodalWrap modalHook={sendSmsModalHook} context={context} />
      </PageBody>
      <ExcelModal modalHook={excelModal} />
    </div>
  );
};

export default ResvList;
