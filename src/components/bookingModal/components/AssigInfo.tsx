import React from "react";
import { IBookingModalContext } from "../declaration";
import Align from "../../../atoms/align/Align";
import JDtypho from "../../../atoms/typho/Typho";
import { LANG } from "../../../hooks/hook";
import RoomSelectInfoTable from "./RoomSelectInfoTable";
import JDLabel from "../../../atoms/label/JDLabel";
import { Fragment } from "react";
import RoomAssigedInfoTable from "./RoomAssigedInfoTable";

interface IProps {
  responseStyle: any;
  bookingModalContext: IBookingModalContext;
}

const AssigInfo: React.FC<IProps> = ({
  bookingModalContext,
  responseStyle
}) => {
  const {
    roomSelectInfo,
    assigInfo,
    guests,
    setAssigInfo,
    mode,
    isDesktopUp
  } = bookingModalContext;
  return (
    <Align {...responseStyle}>
      {isDesktopUp && <JDtypho mb="normal">{LANG("room_assig_info")}</JDtypho>}
      <JDLabel txt={LANG("people_and_room_info")} />
      <RoomSelectInfoTable roomSelectInfo={roomSelectInfo} />
      {mode !== "CREATE" && (
        <Fragment>
          <JDLabel txt={LANG("assig_info")} />
          <RoomAssigedInfoTable
            setAssigInfo={setAssigInfo}
            assigInfo={assigInfo}
            guestsData={guests || []}
          />
        </Fragment>
      )}
    </Align>
  );
};

export default AssigInfo;
