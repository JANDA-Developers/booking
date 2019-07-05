import React from "react";
import {ErrProtecter} from "../../../utils/utils";
import JDSlider from "../../../atoms/slider/Slider";
import Card from "../../../atoms/cards/Card";
import JDbox from "../../../atoms/box/JDbox";
import {IUser, IHouse} from "../../../types/interface";
import DashBoardHeader from "./components/dashboardHeader";
import DailyAssigWrap from "../../../components/dailyAssjg/DailyAssigWrap";
import "./DashBoard.scss";
import InputText from "../../../atoms/forms/inputText/InputText";
import JDLabel from "../../../atoms/label/JDLabel";
import GreetingBox from "./components/greetingBox";

interface Iprops {
  userData: IUser;
  house: IHouse;
}

// eslint-disable-next-line react/prop-types
const DashBoard: React.SFC<Iprops> = ({userData, house}) => {
  return (
        <div className="docs-section--narrowTop">
    <div id="dashBoard" className="dashBoard">
      <div className="container">
        <DashBoardHeader />
          <div className="flex-grid dashBoard__section1">
            <div className="flex-grid__col col--full-9">
              <Card fullHeight>
                <h6>방배정현황</h6>
                <DailyAssigWrap house={house} date={new Date()} />
              </Card>
            </div>
            <div className="flex-grid__col col--full-3">
              <div className="flex-grid flex-grid--vertical">
                <div className="flex-grid flex-grid--unGrow">
                  <Card fullWidth>
                    <GreetingBox userData={userData} />
                  </Card>
                </div>
                <div className="flex-grid">
                  <Card fullWidth noMargin>
                    <InputText label="메모" scroll fullHeight textarea />
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrProtecter(DashBoard);
