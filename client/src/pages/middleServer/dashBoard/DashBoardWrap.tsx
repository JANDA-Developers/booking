import React from "react";
import {ErrProtecter, onCompletedMessage} from "../../../utils/utils";
import JDSlider from "../../../atoms/slider/Slider";
import DashBoard from "./DashBoard";
import {updateHouse, updateHouseVariables} from "../../../types/api";
import {Mutation} from "react-apollo";
import {IUser, IHouse} from "../../../types/interface";
import {UPDATE_HOUSE} from "../../../queries";

class UpdateHouse extends Mutation<updateHouse, updateHouseVariables> {}

interface Iprops {
  userData: IUser;
  house: IHouse;
}

// eslint-disable-next-line react/prop-types
const DashBoardWrap: React.SFC<Iprops> = ({house, userData}) => {
  return (
    <div>
      <UpdateHouse
        mutation={UPDATE_HOUSE}
        onCompleted={({UpdateHouse}) => {
          onCompletedMessage(UpdateHouse, "메모 저장완료", "메모 저장실패");
        }}
      >
        {updateHouseMu => (
          <DashBoard
            updateHouseMu={updateHouseMu}
            house={house}
            userData={userData}
          />
        )}
      </UpdateHouse>
    </div>
  );
};

export default ErrProtecter(DashBoardWrap);
