import React, {useMemo} from "react";
import {onCompletedMessage, s4} from "../../../utils/utils";
import DashBoard from "./DashBoard";
import {updateHouse, updateHouseVariables} from "../../../types/api";
import {Mutation} from "react-apollo";
import {UPDATE_HOUSE} from "../../../queries";
import {IContext} from "../../MiddleServerRouter";
import StarterModalWrap from "../starterModal/StarterModalWrap";
import {IUseModal, LANG} from "../../../hooks/hook";

class UpdateHouse extends Mutation<updateHouse, updateHouseVariables> {}

interface Iprops {
  context: IContext;
  modalHook: IUseModal;
}

// eslint-disable-next-line react/prop-types
const DashBoardWrap: React.FC<Iprops> = ({context}) => {
  const {house, user} = context;

  const MemorizedDashBoardWrap = useMemo(
    () => (
      <div>
        <UpdateHouse
          mutation={UPDATE_HOUSE}
          onCompleted={({UpdateHouse}) => {
            onCompletedMessage(
              UpdateHouse,
              LANG("memo_save_completed"),
              LANG("memo_save_failed")
            );
          }}
        >
          {updateHouseMu => (
            <DashBoard updateHouseMu={updateHouseMu} context={context} />
          )}
        </UpdateHouse>
      </div>
    ),
    [house._id]
  );

  return <div>{MemorizedDashBoardWrap}</div>;
};

export default DashBoardWrap;
