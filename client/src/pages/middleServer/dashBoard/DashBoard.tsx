import React from "react";
import {ErrProtecter} from "../../../utils/utils";
import JDSlider from "../../../atoms/slider/Slider";
import Card from "../../../atoms/cards/Card";
import JDbox from "../../../atoms/box/JDbox";
import {IUser, IHouse} from "../../../types/interface";
import DashBoardHeader from "./components/dashboardHeader";
import DailyAssigWrap from "../../../components/dailyAssjg/DailyAssigWrap";

interface Iprops {
  userData: IUser;
  house: IHouse;
}

// eslint-disable-next-line react/prop-types
const DashBoard: React.SFC<Iprops> = ({userData, house}) => {
  return (
    <div id="DashBoard">
      <div className="container">
        <DashBoardHeader />
        <div className="flex-grid">
          <div className="flex-grid__col col--full-9">
            <Card>
              <h6>방배정현황</h6>
              <DailyAssigWrap house={house} date={new Date()} />
            </Card>
          </div>
          <div className="flex-grid__col col--full-3">
            <Card>
              <JDbox mode="border">
                {userData.name}님 안녕하세요! <br />
                오늘도 밝은 하루 되십시요.
              </JDbox>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrProtecter(DashBoard);
