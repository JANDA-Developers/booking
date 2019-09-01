import React, * as react from "react";
import {Mutation} from "react-apollo";
import {IContext} from "../../MiddleServerRouter";
import StarterModal from "./StarterModal";
import {updateHouse, updateHouseVariables} from "../../../types/api";
import {onCompletedMessage} from "../../../utils/utils";
import {UPDATE_HOUSE} from "../../../queries";

interface IProps {
  context: IContext;
}
class UpdateHouseMu extends Mutation<updateHouse, updateHouseVariables> {}

const StarterModalWrap: React.FC<IProps> = ({context}) => {
  return (
    <UpdateHouseMu
      mutation={UPDATE_HOUSE}
      onCompleted={({UpdateHouse}) =>
        onCompletedMessage(UpdateHouse, "기본 설정완료", "설정실패")
      }
    >
      {(updateHouseMu, {loading: updateHouseLoading}) => (
        <StarterModal updateHouseMu={updateHouseMu} context={context} />
      )}
    </UpdateHouseMu>
  );
};

export default StarterModalWrap;
