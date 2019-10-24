import React from "react";
import JDtable, {JDcolumn, ReactTableDefault} from "../../../atoms/table/Table";
import {Gender, GENDER_OP} from "../../../types/enum";
import {inOr} from "../../../utils/C";
import JDselect from "../../../atoms/forms/selectBox/SelectBox";
import {IAssigInfo} from "../../../pages/middleServer/assig/components/assigIntrerface";
import {IBookingModal_AssigInfo} from "../BookingModal";
import {LANG} from "../../../hooks/hook";

interface IGuestTableInfo {
  _id: string;
  roomType: {
    _id: string;
    name: string;
  };
  room: {
    _id: string;
    name: string;
  } | null;
  bedIndex?: number;
  gender?: Gender | null;
  [key: string]: any;
}

interface Iprops {
  guestsData: IGuestTableInfo[];
  assigInfo: IBookingModal_AssigInfo[];
  setAssigInfo: React.Dispatch<React.SetStateAction<IBookingModal_AssigInfo[]>>;
}

const RoomAssigedInfoTable: React.FC<Iprops> = ({
  guestsData,
  assigInfo,
  setAssigInfo
}) => {
  const getGenderSelectedOption = (guestId: string) => {
    const info = assigInfo.find(info => info._id === guestId);
    if (!info) return;
    return {
      value: info.gender,
      label: info.gender ? LANG(info.gender) : ""
    };
  };

  const TableColumns: JDcolumn<IGuestTableInfo>[] = [
    {
      Header: LANG("guest"),
      accessor: "_id",
      maxWidth: 64,
      Cell: ({original}) => (
        <div className="RoomAssigedInfoTable__id">{original._id}</div>
      )
    },
    {
      Header: LANG("roomType"),
      accessor: "_id",
      Cell: ({original}) => <div>{original.roomType.name}</div>
    },
    {
      Header: LANG("room"),
      maxWidth: 80,
      accessor: "_id",
      Cell: ({original}) => <div>{inOr(original.room, "name", "")}</div>
    },
    {
      Header: LANG("bedIndex"),
      accessor: "_id",
      maxWidth: 80,
      Cell: ({original}) => <div>{(original.bedIndex || 0) + 1}</div>
    },
    {
      Header: LANG("gender"),
      accessor: "_id",
      maxWidth: 80,
      Cell: ({original}) => (
        <div
          style={{
            width: "100%"
          }}
        >
          {original.gender === null && (
            <JDselect
              onChange={value => {
                const targetInfo = assigInfo.find(
                  info => info._id === original._id
                );
                if (!targetInfo) return;
                targetInfo.gender = value.value;
                setAssigInfo([...assigInfo]);
              }}
              selectedOption={getGenderSelectedOption(original._id)}
              options={GENDER_OP}
            />
          )}
        </div>
      )
    }
  ];

  return (
    <div className={"RoomAssigedInfoTable"}>
      <JDtable
        visibleOver
        // @ts-ignore
        columns={TableColumns}
        {...ReactTableDefault}
        data={guestsData}
        minRows={1}
        noDataText={LANG("no_choosen_option")}
      />
    </div>
  );
};

export default RoomAssigedInfoTable;
