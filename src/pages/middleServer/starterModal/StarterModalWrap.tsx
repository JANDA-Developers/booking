import React, * as react from "react";
import { Mutation } from "react-apollo";
import { IContext } from "../../MiddleServerRouter";
import StarterModal from "./StarterModal";
import { updateHouse, updateHouseVariables } from "../../../types/api";
import { onCompletedMessage } from "../../../utils/utils";
import { UPDATE_HOUSE } from "../../../queries";
import { LANG } from "../../../hooks/hook";

interface IProps {
  context: IContext;
}
class UpdateHouseMu extends Mutation<updateHouse, updateHouseVariables> { }

const StarterModalWrap: React.FC<IProps> = ({ context }) => {
  return (
    <UpdateHouseMu
      mutation={UPDATE_HOUSE}
      onCompleted={({ UpdateHouse }) =>
        onCompletedMessage(UpdateHouse, LANG("default_Setting_complted"), LANG("setting_fail"))
      }
    >
      {(updateHouseMu, { loading: updateHouseLoading }) => (
        <StarterModal updateHouseMu={updateHouseMu} context={context} />
      )}
    </UpdateHouseMu>
  );
};

export default StarterModalWrap;
