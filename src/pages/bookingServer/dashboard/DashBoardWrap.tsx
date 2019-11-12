import React, {useMemo} from "react";
import {onCompletedMessage, s4} from "../../../utils/utils";
import DashBoard from "./DashBoard";
import {updateHouse, updateHouseVariables} from "../../../types/api";
import {Mutation} from "react-apollo";
import {UPDATE_HOUSE, GET_USER_INFO} from "../../../apollo/queries";
import {IContext} from "../MiddleServerRouter";
import StarterModalWrap from "../starterModal/StarterModalWrap";
import {IUseModal, LANG} from "../../../hooks/hook";
import {getOperationName} from "apollo-link";

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
          refetchQueries={[getOperationName(GET_USER_INFO)!]}
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
