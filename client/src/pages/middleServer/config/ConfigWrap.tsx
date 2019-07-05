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
import {IHouse} from "../../../types/interface";

class UpdateHouseConfig extends Mutation<
  updateHouseConfig,
  updateHouseConfigVariables
> {}

interface IProps {
  house: IHouse;
}

const ConfigWrap: React.FC<IProps> = ({house}) => (
  <UpdateHouseConfig
    onCompleted={({UpdateHouseConfig}) => {
      onCompletedMessage(UpdateHouseConfig, "숙소설정 완료", "숙소설정 실패");
    }}
    onError={showError}
    mutation={UPDATE_HOUSE_CONFIG}
    refetchQueries={[{query: GET_USER_INFO}]}
  >
    {updateHouseConfigMu => (
      <Config house={house} updateHouseConfigMu={updateHouseConfigMu} />
    )}
  </UpdateHouseConfig>
);

export default ErrProtecter(ConfigWrap);
