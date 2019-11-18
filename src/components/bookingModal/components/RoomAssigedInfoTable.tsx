import React from "react";
import JDtable, {
  JDcolumn,
  ReactTableDefault
} from "../../../atoms/table/Table";
import { Gender, GENDER_OP, WindowSize } from "../../../types/enum";
import { inOr } from "../../../utils/C";
import JDselect from "../../../atoms/forms/selectBox/SelectBox";
import reactWindowSize, { WindowSizeProps } from "react-window-size";
import { LANG } from "../../../hooks/hook";
import "./RoomAssigedInfoTable.scss";
import { IBookingModal_AssigInfo } from "../declaration";

const Alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

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

const RoomAssigedInfoTable: React.FC<Iprops & WindowSizeProps> = ({
  guestsData,
  assigInfo,
  setAssigInfo,
  windowWidth
}) => {
  const isTabletUp = windowWidth > WindowSize.TABLET;

  const getGenderSelectedOption = (guestId: string) => {
    const info = assigInfo.find(info => info._id === guestId);
    if (!info) return;
    return {
      value: info.gender,
      label: info.gender ? LANG(info.gender) : ""
    };
  };

  let TableColumns: JDcolumn<IGuestTableInfo>[] = [
    {
      Header: LANG("room"),
      maxWidth: isTabletUp ? 80 : undefined,
      accessor: "_id",
      Cell: ({ original }) => <div>{inOr(original.room, "name", "")}</div>
    },
    {
      Header: LANG("bedIndex"),
      accessor: "_id",
      maxWidth: isTabletUp ? 80 : undefined,
      Cell: ({ original }) => (
        <div>{original.bedIndex ? original.bedIndex + 1 : ""}</div>
      )
    },
    {
      Header: LANG("gender"),
      accessor: "_id",
      maxWidth: isTabletUp ? 80 : undefined,
      Cell: ({ original }) => (
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

  if (windowWidth > WindowSize.TABLET) {
    TableColumns = [
      // {
      //   Header: LANG("guest"),
      //   accessor: "_id",
      //   maxWidth: 64,
      //   Cell: ({ original, index }) => (
      //     <div className="RoomAssigedInfoTable__id">{Alphabet[index || 0]}</div>
      //   )
      // },
      {
        Header: LANG("roomType"),
        accessor: "_id",
        Cell: ({ original }) => <div>{original.roomType.name}</div>
      },

      ...TableColumns
    ];
  }

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

export default reactWindowSize(RoomAssigedInfoTable);
