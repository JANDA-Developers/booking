import React, {useState, Fragment} from "react";
import {CellInfo, RowInfo} from "react-table";
import selectTableHOC, {
  SelectInputComponentProps,
  SelectAllInputComponentProps
} from "react-table/lib/hoc/selectTable";
import JDtable, {ReactTableDefault} from "../../../atoms/table/Table";
import CheckBox from "../../../atoms/forms/checkBox/CheckBox";
import Button from "../../../atoms/button/Button";
import JDIcon, {IconSize} from "../../../atoms/icons/Icons";
import {useModal} from "../../../actions/hook";
import BookingModalWrap from "../../../components/bookingModal/BookingModalWrap";
import {IPageInfo, IBooking, IRoomType} from "../../../types/interface";
import JDbox from "../../../atoms/box/JDbox";
import {arraySum} from "../../../utils/elses";
import {setYYYYMMDD} from "../../../utils/setMidNight";
import {MutationFn} from "react-apollo";
import {
  deleteBooking,
  deleteBookingVariables,
  updateBookingVariables,
  updateBooking
} from "../../../types/api";
import autoHyphen from "../../../utils/autoFormat";
import {JDtoastModal} from "../../../atoms/modal/Modal";
import {
  PaymentStatus,
  PricingType,
  PricingTypeKr,
  PaymentStatusKr,
  BookingStatus
} from "../../../types/enum";
import {getCountsFromBooking} from "../../../utils/booking";
import moment from "moment";
import JDbadge from "../../../atoms/badge/Badge";
import "./ResvList.scss";
import JDPagination from "../../../atoms/pagination/Pagination";
import {autoComma} from "../../../utils/utils";
import SendSMSmodalWrap, {
  IModalSMSinfo
} from "../../../components/smsModal/SendSmsModalWrap";
import Preloader from "../../../atoms/preloader/Preloader";
import ConfirmBadgeWrap from "../../../components/confirmBadge/ConfirmBadgeWrap";
import textReader from "../../../utils/textReader";
import {NetworkStatus} from "apollo-boost";
import {IContext} from "../../MiddleServerRouter";

interface IProps {
  pageInfo: IPageInfo | undefined;
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
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [selectAll, setSelectAll]: any = useState(false);
  const bookingModalHook = useModal(false);
  const alertModalHook = useModal(false);
  const sendSmsModalHook = useModal<IModalSMSinfo>(false);

  //   여기에 key가 들어오면 id배열에서 찾아서 넣거나 제거해줌
  const onToogleRow = (key: string) => {
    if (checkedIds.includes(key)) {
      setCheckedIds([...checkedIds.filter(value => value !== key)]);
    } else {
      setCheckedIds([...checkedIds, key]);
    }
  };

  //    모든 라인들에대한 아이디를 투글함
  const onToogleAllRow = (flag: boolean) => {
    const bookingIds = bookingsData.map(booking => booking._id);
    const updateSelecetedes = bookingIds.map(id =>
      checkedIds.includes(id) ? "" : id
    );
    setCheckedIds(updateSelecetedes);
    setSelectAll(flag);
  };

  const handleDeleteBookingBtnClick = () => {
    alertModalHook.openModal({
      txt: `다음 예약 ${checkedIds.length}개를  삭제하시겠습니까?`
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

    sendSmsModalHook.openModal({
      receivers,
      createMode: true
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
    }
  };

  const TableColumns = [
    {
      Header: "예약일자",
      accessor: "createdAt",
      Cell: ({value, original}: CellInfo) => {
        const isCancled = original.bookingStatus === BookingStatus.CANCEL;
        const {isNew, isConfirm, _id} = original;

        return (
          <div className="resvList__createdAt">
            {moment(value)
              .local()
              .format("YY-MM-DD HH:mm")}
            {<ConfirmBadgeWrap show={isNew && !isConfirm} bookingId={_id} />}
            {isCancled && (
              <Fragment>
                <br />
                <JDbadge
                  className="resvList__bookingStatusBadge"
                  thema={"error"}
                >
                  cancle
                </JDbadge>
              </Fragment>
            )}
          </div>
        );
      }
    },
    {
      Header: "숙박정보",
      accessor: "roomTypes",
      Cell: ({value, original}: CellInfo) => {
        const roomTypes: IRoomType[] = value;
        return roomTypes.map(roomType => (
          <JDbox
            size="small"
            textAlign="center"
            key={`${original._id}${roomType._id}`}
          >
            {roomType.name}
            <br />
            <span>
              {(() => {
                const guestsCount = getCountsFromBooking(
                  original.guests,
                  roomType._id
                );
                return (
                  <span>
                    {roomType.pricingType === PricingType.DOMITORY ? (
                      <Fragment>
                        {guestsCount.female ? (
                          <span>{guestsCount.female}여 </span>
                        ) : null}
                        {guestsCount.male ? (
                          <span>{guestsCount.male}남</span>
                        ) : null}
                      </Fragment>
                    ) : (
                      <span>{guestsCount.roomCount}개</span>
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
      Header: "체크인",
      accessor: "booking",
      Cell: ({original}: CellInfo) => <div>{setYYYYMMDD(original.checkIn)}</div>
    },
    {
      Header: "체크아웃",
      accessor: "booking",
      Cell: ({original}: CellInfo) => (
        <div>{setYYYYMMDD(original.checkOut)}</div>
      )
    },
    {
      Header: () => (
        <div>
          {"예약자명"}
          <br />
          {"연락처"}
        </div>
      ),
      accessor: "name",
      Cell: ({original}: CellInfo) => {
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
          {"이용금액"}
          <br />
          {"결제상태"}
        </div>
      ),
      accessor: "price",
      Cell: ({value, original}: CellInfo) => (
        <div>
          <span>{autoComma(value)}원</span>
          <br />
          <span
            className={`resvList__paymentStatus ${original.paymentStatus ===
              PaymentStatus.NOT_YET && "resvList__paymentStatus--notYet"}`}
          >
            {PaymentStatusKr[original.paymentStatus]}
          </span>
        </div>
      )
    },
    {
      Header: "메모",
      accessor: "memo",
      minWidth: 200,
      Cell: ({value}: CellInfo) => (
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
      Header: "상세",
      accessor: "_id",
      minWidth: 40,
      Cell: ({value}: CellInfo) => (
        <JDIcon
          onClick={() => {
            bookingModalHook.openModal({
              bookingId: value
            });
          }}
          size={IconSize.MEDIUM}
          hover
          icon="person"
        />
      )
    }
  ];

  const selectInputCompoent = ({
    selectType,
    onClick,
    checked,
    id,
    row
  }: SelectInputComponentProps) => {
    const inId = id.replace("select-", "");
    const onChange = (flag: boolean) => {
      onToogleRow(inId);
    };

    return <CheckBox size="small" onChange={onChange} checked={checked} />;
  };

  const selectAllInputComponentProps = ({
    selectType,
    onClick,
    checked
  }: SelectAllInputComponentProps) => (
    <CheckBox onChange={onToogleAllRow} checked={checked} />
  );

  const SelectableJDtable = selectTableHOC(JDtable);
  return (
    <div id="resvList" className="resvList container container--lg">
      <div className="docs-section">
        <h3>예약목록</h3>
        <div>
          {/* <Button
            onClick={handleCompleteBookingBtnClick}
            size="small"
            thema="primary"
            label="예약확정"
          /> */}
          {/* ⛔️ 아래 두버튼은 하지마시요. 충분히 팝업에서 할수있는 일임 */}
          {/* <Button size="small" thema="primary" label="결제완료" /> */}
          {/* <Button size="small" thema="primary" label="미결제" /> */}
          <Button
            size="small"
            onClick={handleCancleBookingBtnClick}
            label="예약취소"
          />
          <Button
            onClick={handleSendSmsBtnClick}
            size="small"
            label="문자전송"
          />
          <Button
            onClick={handleDeleteBookingBtnClick}
            size="small"
            thema="error"
            label="예약삭제"
          />
        </div>
        {networkStatus === 1 && loading ? (
          <Preloader size="large" loading={true} />
        ) : (
          <SelectableJDtable
            {...ReactTableDefault}
            // 아래 숫자는 요청하는 쿼리와 같아야합니다.
            defaultPageSize={20}
            toggleAll={() => {}}
            toggleSelection={onToogleRow}
            SelectAllInputComponent={selectAllInputComponentProps}
            SelectInputComponent={selectInputCompoent}
            isCheckable
            align="center"
            data={bookingsData}
            selectAll={selectAll}
            isSelected={(key: string) => checkedIds.includes(key)}
            columns={TableColumns}
            keyField="_id"
          />
        )}
        <Preloader size="small" floating loading={loading} />
        <JDPagination
          onPageChange={({selected}: {selected: number}) => {
            setPage(selected + 1);
          }}
          pageCount={pageInfo ? pageInfo.totalPage : 1}
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
      </div>
    </div>
  );
};

export default ResvList;
