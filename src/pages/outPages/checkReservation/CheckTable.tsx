/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useState, useEffect } from "react";
import { ErrProtecter, s4, autoComma } from "../../../utils/utils";
import { getBookingForPublic_GetBookingForPublic_booking } from "../../../types/api";
import JDtable, { JDcolumn } from "../../../atoms/table/Table";
import { ReactTableDefaults } from "react-table";
import { IRoomType } from "../../../types/interface";
import JDbox from "../../../atoms/box/JDbox";
import { PricingType } from "../../../types/enum";
import dayjs from "dayjs";
import { getRoomSelectInfo } from "../../../utils/typeChanger";
import { LANG } from "../../../hooks/hook";

export interface IProps {
  tableData: getBookingForPublic_GetBookingForPublic_booking[] | undefined;
}

// 하우스 아이디를 우선 Props를 통해서 받아야함
const CheckTable: React.FC<IProps> = ({ tableData: tableDataProp }) => {
  const [tableData, setTableData] = useState(tableDataProp);
  useEffect(() => {
    if (tableDataProp) setTableData([...tableDataProp]);
  }, [tableDataProp?.length]);

  const TableColumns: JDcolumn<
    getBookingForPublic_GetBookingForPublic_booking
  >[] = [
    {
      Header: LANG("checkIn"),
      accessor: "_id",
      Cell: ({ original }) => (
        <div>
          <span>{dayjs(original.checkIn).format("YYYY-MM-DD")}</span>
        </div>
      )
    },
    {
      Header: LANG("checkOut"),
      accessor: "_id",
      Cell: ({ original }) => (
        <div>
          <span>{dayjs(original.checkOut).format("YYYY-MM-DD")}</span>
        </div>
      )
    },
    {
      Header: LANG("reservation_information"),
      accessor: "roomTypes",
      Cell: ({ value, original }) => {
        const roomTypes: IRoomType[] = value;
        // ⛔️ 젠더정보가 없기때문에 들어갈수없다 gender를 넣을려면 코드겐부터
        const roomSelectInfo = getRoomSelectInfo(original.guests, roomTypes);
        return roomSelectInfo.map(selectInfo => (
          <JDbox key={s4()} size="small">
            {selectInfo.roomTypeName}
            <br />
            <span>
              {(() => {
                const { female, male, roomCount } = selectInfo.count;

                return (
                  <span>
                    {selectInfo.pricingType === PricingType.DOMITORY ? (
                      <Fragment>
                        {female && <span>{female + LANG("female") + " "}</span>}
                        {male && <span>{male + LANG("male")}</span>}
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
      Header: LANG("usage_amount"),
      accessor: "payment",
      Cell: ({ value }) => {
        return (
          <div>
            {autoComma(value.totalPrice)}
            {LANG("money_unit")}
            <br />
            {LANG("PaymentStatus", value.status)}
          </div>
        );
      }
    },
    {
      Header: LANG("status"),
      accessor: "status",
      Cell: ({ value }) => <span>{LANG(value)}</span>
    }
  ];

  return (
    <Fragment>
      <JDtable
        {...ReactTableDefaults}
        data={tableData || []}
        minRows={1}
        columns={TableColumns}
      />
    </Fragment>
  );
};

export default ErrProtecter(CheckTable);
