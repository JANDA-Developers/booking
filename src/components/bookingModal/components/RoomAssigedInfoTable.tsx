import React from "react";
import JDtable, {
  JDcolumn,
  ReactTableDefault
} from "../../../atoms/table/Table";
import { Gender } from "../../../types/enum";
import { GENDER_OP } from "../../../types/const";
import { inOr } from "../../../utils/C";
import JDselect from "../../../atoms/forms/selectBox/SelectBox";
import { LANG } from "../../../hooks/hook";
import "./RoomAssigedInfoTable.scss";
import { IBookingModal_AssigInfo } from "../declaration";
import JDIcon from "../../../atoms/icons/Icons";

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
    return info.gender
      ? {
          value: info.gender,
          label: LANG(info.gender)
        }
      : GENDER_OP[0];
  };

  let TableColumns: JDcolumn<IGuestTableInfo>[] = [
    {
      Header: LANG("room"),
      accessor: "_id",
      Cell: ({ original }) => <div>{inOr(original.room, "name", "")}</div>
    },
    {
      Header: LANG("bedIndex"),
      accessor: "_id",
      Cell: ({ original }) => (
        <div>{original.bedIndex ? original.bedIndex + 1 : "1"}</div>
      )
    },
    {
      Header: (
        <div>
          {LANG("gender")}{" "}
          {assigInfo.length > 1 && (
            <JDIcon
              icon="reverse"
              hover
              onClick={() => {
                setAssigInfo(
                  assigInfo.map(assig => ({
                    ...assig,
                    gender:
                      assig.gender === Gender.MALE ? Gender.FEMALE : Gender.MALE
                  }))
                );
              }}
            />
          )}
        </div>
      ),
      accessor: "_id",
      Cell: ({ original }) => (
        <div
          style={{
            width: "100%"
          }}
        >
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
        </div>
      )
    }
  ];

  return (
    <div className={"RoomAssigedInfoTable"}>
      <JDtable
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

export default React.memo(RoomAssigedInfoTable);
