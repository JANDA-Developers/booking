import React, { Fragment, useState, useMemo } from "react";
import { ReactTableDefault, JDcolumn } from "../../../atoms/table/Table";
import Button from "../../../atoms/button/Button";
import JDIcon from "../../../atoms/icons/Icons";
import {
  useModal,
  LANG,
  useCheckBoxTable,
  useSelect
} from "../../../hooks/hook";
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
  GetBookingsFilterInput,
  cancelBookingsVariables,
  cancelBookings
} from "../../../types/api";
import autoHyphen from "../../../utils/autoFormat";
import { JDtoastModal } from "../../../atoms/modal/Modal";
import {
  PaymentStatus,
  PricingType,
  BookingStatus,
  DateFormat,
  PayMethod
} from "../../../types/enum";
import { FLOATING_PRELOADER_SIZE, IS_MOBILE } from "../../../types/const";
import moment from "moment";
import JDbadge from "../../../atoms/badge/Badge";
import "./ResvList.scss";
import JDPagination from "../../../atoms/pagination/Pagination";
import { autoComma, queryDataFormater } from "../../../utils/utils";
import SendSMSmodalWrap from "../../../components/smsModal/SendSmsModalWrap";
import Preloader from "../../../atoms/preloader/Preloader";
import ConfirmBadgeWrap from "../../../components/confirmBadge/ConfirmBadgeWrap";
import textReader from "../../../utils/textReader";
import { NetworkStatus } from "apollo-client";
import { IContext } from "../../bookingHost/BookingHostRouter";
import { getRoomSelectInfo } from "../../../utils/typeChanger";
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
import { IModalSMSinfo } from "../../../components/smsModal/SendSmsModal";
import JDtypho from "../../../atoms/typho/Typho";
import RefundModal from "../../../components/refundModal/RefundModal";
import { IMu, IselectedOption } from "@janda-com/front/build/types/interface";
import { isEmpty } from "lodash";
import {
  JDselect,
  IUseSelect,
  JDalign,
  IUseDayPicker,
  JDdayPickerModal,
  JDbutton
} from "@janda-com/front";
import DoubleInputRange from "../../../atoms/dayPicker/component/inputComponent/DoubleInputRange";

interface IProps {
  pageInfo: IPageInfo;
  bookingsData: IBooking[];
  loading: boolean;
  updateBookingLoading: boolean;
  deleteBookingLoading: boolean;
  mutationLoading: boolean;
  context: IContext;
  networkStatus: NetworkStatus;
  setPage(page: number): void;
  dayPickerHook: IUseDayPicker;
  deleteBookingMu: MutationFn<deleteBooking, deleteBookingVariables>;
  updateBookingMu: MutationFn<updateBooking, updateBookingVariables>;
  cancelBookingMu: IMu<cancelBookings, cancelBookingsVariables>;
  selectCountHook: IUseSelect<any>;
  checkInOutHook: IUseSelect<any>;
  paymentStatusHook: IUseSelect<any>;
  filterRoomTypeOps: IselectedOption<any>[];
  setFilterRoomTypeOps: React.Dispatch<
    React.SetStateAction<IselectedOption<any>[]>
  >;
}

const ResvList: React.SFC<IProps> = ({
  pageInfo,
  bookingsData,
  loading,
  cancelBookingMu,
  updateBookingMu,
  deleteBookingMu,
  setPage,
  dayPickerHook,
  selectCountHook,
  checkInOutHook,
  networkStatus,
  mutationLoading,
  paymentStatusHook,
  filterRoomTypeOps,
  setFilterRoomTypeOps,
  context
}) => {
  const {
    house: { _id: houseId, roomTypes },
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
  const dayPickerModalHook = useModal();
  const { checkedIds, setCheckedIds } = checkBoxTableHook;
  const bookingModalHook = useModal(false);
  const alertModalHook = useModal(false);
  const refundModalHook = useModal(false);
  const sendSmsModalHook = useModal<IModalSMSinfo>(false);
  const excelModal = useModal<IExcelModalInfo>(false);
  const roomTypeOptions = useMemo((): IselectedOption[] => {
    return (
      roomTypes?.map(rt => ({
        value: rt._id,
        label: rt.name
      })) || []
    );
  }, []);

  const handleDeleteBookingBtnClick = () => {
    alertModalHook.openModal({
      txt: `${LANG("nextResv")}${checkedIds.length}${LANG("checkDelete")}`
    });
  };

  const handleCancelBookingBtnClick = () => {};

  const handleCancleBookingBtnClick = () => {
    checkedIds.forEach(id => {
      updateBookingMu({
        variables: {
          bookingId: id,
          params: {
            bookingStatus: BookingStatus.CANCELED
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
            bookingStatus: BookingStatus.COMPLETED
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
      Header: () => (
        <div>
          <JDtypho mb="superTiny" weight={600}>
            {LANG("booker_name")}
          </JDtypho>
          <JDtypho size="small">{LANG("contact")}</JDtypho>
        </div>
      ),
      accessor: "name",
      Cell: ({ original }) => {
        const Booking: IBooking = original;
        return (
          <div>
            <JDtypho mb="superTiny" weight={600}>
              {Booking.name}
            </JDtypho>
            <JDtypho size="small">{autoHyphen(Booking.phoneNumber)}</JDtypho>
          </div>
        );
      }
    },
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
      className: "resvList__roomSelectWraps",
      Cell: ({ value, original }) => {
        const roomTypes: IRoomType[] = value;
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
          {LANG("usage_amount")}
          <br />
          {LANG("payment_status")}
        </div>
      ),
      accessor: "payment",
      Cell: ({ original }) => {
        const { totalPrice, refundedPrice, status } = original.payment;
        const isUnPaid = status === PaymentStatus.NOT_YET;
        return (
          <div>
            <span>
              {autoComma(totalPrice)}
              {LANG("money_unit")}
              {refundedPrice ? (
                <JDtypho mb="no" size="small" color="error">
                  {"(-" + autoComma(refundedPrice) + ")"}
                </JDtypho>
              ) : (
                undefined
              )}
            </span>
            <div
              className={`resvList__paymentStatus ${isUnPaid &&
                "resvList__paymentStatus--notYet"}`}
            >
              {LANG("PaymentStatus", status)}
            </div>
          </div>
        );
      }
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
          checkInInfo,
          breakfast,
          paidByNice
        } = original;
        const isJDpay = payment.payMethod === PayMethod.BILL;
        const isCancled = status === BookingStatus.CANCELED;
        const { status: paymentStatus } = payment;
        const isPaied = paymentStatus === PaymentStatus.COMPLETED;
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
            {breakfast && (
              <JDbadge thema={"positive"}>{LANG("breakfast")}</JDbadge>
            )}
            {paidByNice && (
              <JDbadge thema={"primary"}>{LANG("paidByNice")}</JDbadge>
            )}
            {isCheckIn && <JDbadge thema={"new"}>{LANG("new")}</JDbadge>}
            {isCancled && <JDbadge thema={"error"}>{LANG("cancel")}</JDbadge>}
            {/* {isComplete &1& (
              <JDbadge thema={"positive"}>{LANG("good_status")}</JDbadge>
            )} */}
            {isPaied || <JDbadge thema={"warn"}>{LANG("unPaid")}</JDbadge>}
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
    <Fragment>
      <Preloader
        size={FLOATING_PRELOADER_SIZE}
        floating
        loading={networkStatus !== 1 && loading}
      />
      <div id="resvList" className="resvList">
        <PageHeader
          desc={LANG("bookingList__desc")}
          title={LANG("bookingList")}
        />
        <PageBody>
          <JDalign
            flex={{
              wrap: true
            }}
          >
            <Button
              mode={IS_MOBILE ? "iconButton" : undefined}
              icon={IS_MOBILE ? "download" : undefined}
              size="small"
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
                  const filter: GetBookingsFilterInput | undefined = date
                    ? {
                        houseId,
                        stayDate: {
                          checkIn: to4YMMDD(date.from),
                          checkOut: to4YMMDD(date.to)
                        }
                      }
                    : {
                        houseId
                      };

                  const { data, loading } = await client.query<
                    getBookings,
                    getBookingsVariables
                  >({
                    query: GET_BOOKINGS,
                    variables: {
                      param: {
                        filter,
                        paging: {
                          count: count || 99999,
                          selectedPage: 1
                        }
                      }
                    }
                  });

                  const result = queryDataFormater(
                    data,
                    "GetBookings",
                    "result",
                    undefined
                  );
                  const bookings = result?.bookings || [];

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
              mode={IS_MOBILE ? "iconButton" : undefined}
              icon={IS_MOBILE ? "negative" : undefined}
              onClick={handleCancleBookingBtnClick}
              label={LANG("cancelBooking")}
            />
            <Button
              mode={IS_MOBILE ? "iconButton" : undefined}
              icon={IS_MOBILE ? "sms" : undefined}
              onClick={handleSendSmsBtnClick}
              size="small"
              label={LANG("sendSMS")}
            />
            <Button
              mode={IS_MOBILE ? "iconButton" : undefined}
              icon={IS_MOBILE ? "icon" : undefined}
              onClick={handleDeleteBookingBtnClick}
              size="small"
              thema="error"
              label={LANG("delete_booking")}
            />
            <JDselect autoSize z={3} {...paymentStatusHook} />
            <JDselect autoSize z={3} {...selectCountHook} />
            <JDselect
              autoSize
              z={3}
              isMulti
              onChanges={ops => {
                setFilterRoomTypeOps(ops);
              }}
              selectedOptions={filterRoomTypeOps}
              options={roomTypeOptions}
            />
            <div
              style={{
                width: "10rem"
              }}
            >
              <JDselect mr="normal" z={3} {...checkInOutHook} />
            </div>
            <JDalign
              mb="normal"
              onClick={() => {
                dayPickerModalHook.openModal();
              }}
              flex={{
                vCenter: true
              }}
            >
              <JDbutton mode="border">
                {dayPickerHook.from ? to4YMMDD(dayPickerHook.from) : "날짜선택"}
              </JDbutton>
              <JDtypho mb="normal" mr="normal">
                ~
              </JDtypho>
              <JDbutton mode="border">
                {" "}
                {dayPickerHook.to ? to4YMMDD(dayPickerHook.to) : "날짜선택"}
              </JDbutton>
            </JDalign>
          </JDalign>

          {networkStatus === 1 && loading ? (
            <div className="resvList__table--skeleton" />
          ) : (
            <JDSelectableJDtable
              {...ReactTableDefault}
              {...checkBoxTableHook}
              // 아래 숫자는 요청하는 쿼리와 같아야합니다.
              defaultPageSize={pageInfo.rowCount}
              pageSize={pageInfo.rowCount}
              isCheckable
              align="center"
              data={bookingsData}
              columns={TableColumns}
              keyField="_id"
            />
          )}
          <JDPagination
            setPage={prop => {
              if (!isEmpty(checkedIds))
                if (!confirm("페이지를 바꾸시면 선택 정보가 사라집니다."))
                  return;
              setCheckedIds([]);
              setPage(prop);
            }}
            pageInfo={pageInfo}
            pageRangeDisplayed={1}
            marginPagesDisplayed={4}
          />
          <BookingModalWrap
            key={`${bookingModalHook.info.bookingId ||
              "BookingModaldefaultId"}`}
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
        <RefundModal
          isMulti
          loading={mutationLoading}
          modalHook={refundModalHook}
          onRefunds={refundInfos => {
            cancelBookingMu({
              variables: {
                cancelParams: refundInfos.map(infop => ({
                  bookingNum: infop.id,
                  cancelMessage: "",
                  refundAmount: infop.amt
                }))
              }
            });
          }}
          refundTargets={checkedIds.map(id => {
            const targetBooking = bookingsData.find(b => b._id === id);
            if (!targetBooking) throw Error("Refund ID Invalid");
            const {
              _id,
              payment: { totalPrice },
              name,
              bookingNum
            } = targetBooking;
            return {
              id: bookingNum,
              max: totalPrice,
              name
            };
          })}
        />
        <ExcelModal modalHook={excelModal} />
      </div>
      <JDdayPickerModal
        canSelectBeforeDay
        {...dayPickerHook}
        modalHook={dayPickerModalHook}
      />
    </Fragment>
  );
};

export default ResvList;
