import React, {useState, Fragment} from "react";
import {CellInfo} from "react-table";
import selectTableHOC, {
  SelectInputComponentProps,
  SelectAllInputComponentProps
} from "react-table/lib/hoc/selectTable";
import JDtable, {ReactTableDefault} from "../../../atoms/table/Table";
import JDselect from "../../../atoms/forms/selectBox/SelectBox";
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
import {JDtoastModal} from "../../../atoms/modal/Modal";
import {PaymentStatus, PricingType} from "../../../types/enum";
import {bookingGuestsMerge} from "../../../utils/booking";

interface IProps {
  pageInfo: IPageInfo | undefined;
  bookersData: IBooker[];
  loading: boolean;
  houseId: string;
  deleteBookerMu: MutationFn<deleteBooker, deleteBookerVariables>;
  updateBookerMu: MutationFn<updateBooker, updateBookerVariables>;
}

const ResvList: React.SFC<IProps> = ({
  pageInfo,
  bookersData,
  loading,
  updateBookerMu,
  deleteBookerMu,
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
            name: ""
          }
        }
      });
    });
  };

  const handleCompleteBookingBtnClick = () => {
    // checkedIds.forEach(id => {
    //   updateBookerMu({
    //     variables: {
    //       bookerId: id,
    //       params: {
    //       }
    //     }
    //   });
    // });
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
      Cell: ({value}: CellInfo) => <div>{setYYYYMMDD(value.createdAt)}</div>
    },
    {
      Header: "숙박정보",
      accessor: "roomTypes",
      Cell: ({value, original}: CellInfo) => {
        const roomTypes: IRoomType[] = value;
        return roomTypes.map(roomType => (
          <JDbox>
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
                        <span>{guestsCount.female}여</span>
                        <span>{guestsCount.male}남</span>
                      </Fragment>
                    ) : (
                      <span>{guestsCount.count}개</span>
                    )}
                  </span>
                );
              })()}
            </span>
            }
          </JDbox>
        ));
      }
    },
    {
      Header: "숙박일자",
      accessor: "booker",
      Cell: ({value}: CellInfo) => (
        <div>
          {setYYYYMMDD(value.start)}
          <br />
          {setYYYYMMDD(value.end)}
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
      Cell: ({original}: CellInfo) => {
        const Booker: IBooker = original;
        return (
          <div>
            {Booker.name}
            <br />
            {Booker.phoneNumber}
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
      accessor: "booker",
      Cell: ({value}: CellInfo) => <div>{value.price}</div>
    },
    {
      Header: "메모",
      accessor: "memo",
      minWidth: 200,
      Cell: ({value}: CellInfo) => <div>{value}</div>
    },
    {
      Header: "상세",
      accessor: "_id",
      minWidth: 50,
      Cell: ({value}: CellInfo) => (
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
    <div id="seasonTable" className="seasonT container container--lg">
      <div className="docs-section">
        <h3>예약목록</h3>
        <div>
          <Button size="small" thema="primary" label="예약확정" />
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
          data={bookersData}
          selectAll={selectAll}
          isSelected={(key: string) => checkedIds.includes(key)}
          columns={TableColumns}
          keyField="_id"
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
