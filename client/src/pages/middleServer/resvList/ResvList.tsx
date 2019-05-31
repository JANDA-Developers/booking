import React, {useState, Fragment} from "react";
import {Cellnfo, RowInfo} from "react-table";
import selectTableHOC, {
  SelectInputComponentProps,
  SelectAllInputComponentProps
} from "react-table/lib/hoc/selectTable";
import JDtable, {ReactTableDefault} from "../../../atoms/table/Table";
import CheckBox from "../../../atoms/forms/checkBox/CheckBox";
import Button from "../../../atoms/button/Button";
import JDIcon, {IconSize} from "../../../atoms/icons/Icons";
import {useModal} from "../../../actions/hook";
import BookerModalWrap from "../../../components/bookerInfo/BookerModalWrap";
import {IPageInfo, IBooker, IRoomType} from "../../../types/interface";
import JDbox from "../../../atoms/box/JDbox";
import {arraySum} from "../../../utils/elses";
import {setYYYYMMDD} from "../../../utils/setMidNight";
import {MutationFn} from "react-apollo";
import {
  deleteBooker,
  deleteBookerVariables,
  updateBookerVariables,
  updateBooker
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
import {bookingGuestsMerge} from "../../../utils/booking";
import moment from "moment";
import JDbadge, {BADGE_THEMA} from "../../../atoms/badge/Badge";
import "./ResvList.scss";
import JDPagination from "../../../atoms/pagination/Pagination";
import {autoComma} from "../../../utils/utils";

interface IProps {
  pageInfo: IPageInfo | undefined;
  bookersData: IBooker[];
  loading: boolean;
  houseId: string;
  setPage(page: number): void;
  deleteBookerMu: MutationFn<deleteBooker, deleteBookerVariables>;
  updateBookerMu: MutationFn<updateBooker, updateBookerVariables>;
}

const ResvList: React.SFC<IProps> = ({
  pageInfo,
  bookersData,
  loading,
  updateBookerMu,
  deleteBookerMu,
  setPage,
  houseId
}) => {
  //   ❔ 두개 합치는게 좋을까?
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [selectAll, setSelectAll]: any = useState(false);
  const bookerModalHook = useModal(false);
  const alertModalHook = useModal(false);

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
    const bookerIds = bookersData.map(booker => booker._id);
    const updateSelecetedes = bookerIds.map(id =>
      checkedIds.includes(id) ? "" : id
    );
    setCheckedIds(updateSelecetedes);
    setSelectAll(flag);
  };

  const handleDeleteBookerBtnClick = () => {
    alertModalHook.openModal(
      `다음 예약 ${checkedIds.length}개를  삭제하시겠습니까?`
    );
  };

  const handleCancleBookerBtnClick = () => {
    checkedIds.forEach(id => {
      updateBookerMu({
        variables: {
          bookerId: id,
          params: {
            bookingStatus: BookingStatus.CANCEL
          }
        }
      });
    });
  };

  const handleCompleteBookingBtnClick = () => {
    checkedIds.forEach(id => {
      updateBookerMu({
        variables: {
          bookerId: id,
          params: {
            bookingStatus: BookingStatus.COMPLETE
          }
        }
      });
    });
  };

  const deleteModalCallBackFn = (flag: boolean) => {
    if (flag) {
      checkedIds.forEach(bookerId => {
        deleteBookerMu({
          variables: {
            bookerId: bookerId
          }
        });
      });
    }
  };

  const TableColumns = [
    {
      Header: "예약일자",
      accessor: "createdAt",
      Cell: ({value, original}: Cellnfo<any>) => {
        const isCancled = original.bookingStatus === BookingStatus.CANCEL;
        return (
          <div className="resvList__createdAt">
            {value.slice(0, 16).replace("T", " ")}
            {isCancled && (
              <Fragment>
                <br />
                <JDbadge
                  className="resvList__bookerStatusBadge"
                  thema={BADGE_THEMA.ERROR}
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
      Cell: ({value, original}: Cellnfo<any>) => {
        const roomTypes: IRoomType[] = value;
        return roomTypes.map(roomType => (
          <JDbox align="center" key={`${original._id}${roomType._id}`}>
            {roomType.name}
            <br />
            <span>
              {(() => {
                const guestsCount = bookingGuestsMerge(
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
                      <span>{guestsCount.count}개</span>
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
      Header: "숙박일자",
      accessor: "booker",
      Cell: ({original}: Cellnfo<any>) => (
        <div>
          {setYYYYMMDD(original.start)}
          <br />
          {setYYYYMMDD(original.end)}
        </div>
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
      Cell: ({original}: Cellnfo<any>) => {
        const Booker: IBooker = original;
        return (
          <div>
            {Booker.name}
            <br />
            {autoHyphen(Booker.phoneNumber)}
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
      Cell: ({value, original}: Cellnfo<any>) => (
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
      Cell: ({value}: Cellnfo<any>) => (
        <div
          className={`JDscrool resvList__memo ${value &&
            value.length > 20 &&
            "resvList__memo--full"}`}
        >
          {value}
        </div>
      )
    },
    {
      Header: "상세",
      accessor: "_id",
      minWidth: 50,
      Cell: ({value}: Cellnfo<any>) => (
        <JDIcon
          onClick={() => {
            bookerModalHook.openModal({
              bookerId: value
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

    return <CheckBox onChange={onChange} checked={checked} />;
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
          <Button
            onClick={handleCompleteBookingBtnClick}
            size="small"
            thema="primary"
            label="예약확정"
          />
          {/* ⛔️ 아래 두버튼은 하지마시요. 충분히 팝업에서 할수있는 일임 */}
          {/* <Button size="small" thema="primary" label="결제완료" /> */}
          {/* <Button size="small" thema="primary" label="미결제" /> */}
          <Button
            size="small"
            onClick={handleCancleBookerBtnClick}
            thema="primary"
            label="예약취소"
          />
          <Button
            onClick={handleDeleteBookerBtnClick}
            size="small"
            thema="warn"
            label="예약삭제"
          />
        </div>
        <SelectableJDtable
          {...ReactTableDefault}
          toggleAll={() => {}}
          toggleSelection={onToogleRow}
          SelectAllInputComponent={selectAllInputComponentProps}
          SelectInputComponent={selectInputCompoent}
          isCheckable
          align="center"
          data={bookersData}
          selectAll={selectAll}
          isSelected={(key: string) => checkedIds.includes(key)}
          columns={TableColumns}
          keyField="_id"
        />
        <JDPagination
          onPageChange={({selected}: {selected: number}) => {
            setPage(selected + 1);
          }}
          pageCount={pageInfo ? pageInfo.totalPage : 1}
          pageRangeDisplayed={1}
          marginPagesDisplayed={4}
        />
        <BookerModalWrap
          key={`${bookerModalHook.info.bookerId || "BookerModaldefaultId"}`}
          modalHook={bookerModalHook}
          houseId={houseId}
        />
        <JDtoastModal
          confirm
          confirmCallBackFn={deleteModalCallBackFn}
          {...alertModalHook}
        />
      </div>
    </div>
  );
};

export default ResvList;
