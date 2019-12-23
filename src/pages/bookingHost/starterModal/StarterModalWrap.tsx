import React, * as react from "react";
import { Mutation } from "react-apollo";
import { IContext } from "../../bookingHost/BookingHostRouter";
import StarterModal from "./StarterModal";
import { updateHouse, updateHouseVariables } from "../../../types/api";
import { onCompletedMessage } from "../../../utils/utils";
import { UPDATE_HOUSE, GET_USER_INFO } from "../../../apollo/queries";
import { LANG } from "../../../hooks/hook";
import { getOperationName } from "apollo-link";

interface IProps {
  context: IContext;
  callBackStartStepEnd?: () => void;
}
class UpdateHouseMu extends Mutation<updateHouse, updateHouseVariables> {}

const StarterModalWrap: React.FC<IProps> = ({
  context,
  callBackStartStepEnd
}) => {
  return (
    <UpdateHouseMu
      mutation={UPDATE_HOUSE}
      onCompleted={({ UpdateHouse }) =>
        onCompletedMessage(
          UpdateHouse,
          LANG("default_Setting_complted"),
          LANG("setting_fail")
        )
      }
      refetchQueries={[getOperationName(GET_USER_INFO)!]}
    >
      {(updateHouseMu, { loading: updateHouseLoading }) => (
        <div className="bookingHost__starterBg">
          <StarterModal
            callBackStartStepEnd={callBackStartStepEnd}
            updateHouseMu={updateHouseMu}
            context={context}
          />
        </div>
      )}
    </UpdateHouseMu>
  );
};

export default StarterModalWrap;
