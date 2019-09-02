import React from "react";
import {
  ErrProtecter,
  showError,
  onCompletedMessage
} from "../../../utils/utils";
import Config from "./Config";
import {UPDATE_HOUSE_CONFIG, GET_USER_INFO} from "../../../queries";
import {Mutation} from "react-apollo";
import {
  updateHouseConfig,
  updateHouseConfigVariables
} from "../../../types/api";
import {IHouse, IHouseConfigFull} from "../../../types/interface";
import {IContext} from "../../MiddleServerRouter";

class UpdateHouseConfig extends Mutation<
  updateHouseConfig,
  updateHouseConfigVariables
> {}

interface IProps {
  context: IContext;
}

const ConfigWrap: React.FC<IProps> = ({context}) => {
  return (
    <UpdateHouseConfig
      onCompleted={({UpdateHouseConfig}) => {
        onCompletedMessage(UpdateHouseConfig, "숙소설정 완료", "숙소설정 실패");
      }}
      mutation={UPDATE_HOUSE_CONFIG}
      refetchQueries={[{query: GET_USER_INFO}]}
    >
      {updateHouseConfigMu => (
        <Config context={context} updateHouseConfigMu={updateHouseConfigMu} />
      )}
    </UpdateHouseConfig>
  );
};

export default ErrProtecter(ConfigWrap);
