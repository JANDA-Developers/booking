import React from "react";
import { ErrProtecter, onCompletedMessage } from "../../../utils/utils";
import Config from "./Config";
import { UPDATE_HOUSE_CONFIG, GET_USER_INFO } from "../../../queries";
import { Mutation } from "react-apollo";
import {
  updateHouseConfig,
  updateHouseConfigVariables
} from "../../../types/api";
import { IContext } from "../../MiddleServerRouter";
import { LANG } from "../../../hooks/hook";

class UpdateHouseConfig extends Mutation<
  updateHouseConfig,
  updateHouseConfigVariables
  > { }

interface IProps {
  context: IContext;
}

const ConfigWrap: React.FC<IProps> = ({ context }) => {
  return (
    <UpdateHouseConfig
      onCompleted={({ UpdateHouseConfig }) => {
        onCompletedMessage(UpdateHouseConfig, LANG("house_setting_completed"), LANG("house_setting_failed"));
      }}
      mutation={UPDATE_HOUSE_CONFIG}
      refetchQueries={[{ query: GET_USER_INFO }]}
    >
      {updateHouseConfigMu => (
        <Config context={context} updateHouseConfigMu={updateHouseConfigMu} />
      )}
    </UpdateHouseConfig>
  );
};

export default ErrProtecter(ConfigWrap);
