import React, { useMemo } from "react";
import DashBoard from "./DashBoard";
import { IContext } from "../../MiddleServerRouter";
import { IUseModal } from "../../../hooks/hook";

interface Iprops {
  context: IContext;
  modalHook: IUseModal;
}

// eslint-disable-next-line react/prop-types
const DashBoardWrap: React.FC<Iprops> = ({ context }) => {
  const { house, user } = context;

  const MemorizedDashBoardWrap = useMemo(
    () => (
      <div>
        <DashBoard context={context} />}
      </div>
    ),
    [house._id]
  );

  return <div>{MemorizedDashBoardWrap}</div>;
};

export default DashBoardWrap;
