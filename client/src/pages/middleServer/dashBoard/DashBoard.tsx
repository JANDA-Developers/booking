import React, {useState, Fragment} from "react";
import {ErrProtecter, isEmpty} from "../../../utils/utils";
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
import {MutationFn} from "react-apollo";
import {updateHouse, updateHouseVariables, HouseType} from "../../../types/api";
import {useInput} from "../../../actions/hook";
import Button from "../../../atoms/button/Button";
import Steps from "../starterModal/comonent/steps";
import JDmultiBox from "../../../atoms/multiBox/MultiBox";
import JDmultiStep from "../../../atoms/multiStep/MultiStep";
import {HouseStatus, Product, MemoType} from "../../../types/enum";
import MemoWrap from "../../../components/Memo/MemoWrap";
import starterModal from "../starterModal/StarterModal";
import {IContext} from "../../MiddleServerRouter";
import StarterModal from "../starterModal/StarterModal";
import StarterModalWrap from "../starterModal/StarterModalWrap";
import DaySalesWrap from "../../../components/shortStatisces/DaySalesWrap";
import DayCheckIn from "../../../components/shortStatisces/DayCheckIn";
import DayCheckInWrap from "../../../components/shortStatisces/DayCheckInWrap";

interface Iprops {
  context: IContext;
  updateHouseMu: MutationFn<updateHouse, updateHouseVariables>;
}

// eslint-disable-next-line react/prop-types
const DashBoard: React.SFC<Iprops> = ({updateHouseMu, context}) => {
  const {house, user} = context;
  return (
    <div className="docs-section--narrowTop">
      <div id="dashBoard" className="dashBoard">
        <div className="container">
          <div>
            <DashBoardHeader />
          </div>
          <div className="dashBoard__section1">
            <div className="flex-grid JDstandard-margin-bottom">
              <div
                className={`flex-grid__col col--wmd-12
                col--full-${house ? "9" : "12"}`}
              >
                <Card className="JDcard--fullHeight JDcard--fullHeight-wmd">
                  <Fragment>
                    <h6>방배정현황</h6>
                    <DailyAssigWrap context={context} date={new Date()} />
                  </Fragment>
                </Card>
              </div>
              {house && (
                <div className="flex-grid__col col--wmd-12 col--full-3">
                  <div className="flex-grid__col flex-grid-grow flex-grid flex-grid--vertical">
                    <div className="flex-grid__col flex-grid col--wmd-12 flex-grid--unGrow">
                      <Card fullWidth>
                        <GreetingBox context={context} />
                      </Card>
                    </div>
                    <div className="flex-grid__col flex-grid col--wmd-12">
                      <Card className="dashBoard__memoCard" fullWidth>
                        <MemoWrap
                          houseId={house ? house._id : ""}
                          memoType={MemoType.HOST}
                        />
                      </Card>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex-grid">
              <div className="flex-grid__col col--wmd-12 col--full-9">
                <div className="flex-grid-grow">
                  <div className="flex-grid__col">
                    <Card>
                      <h6>금일 매출</h6>
                      <DaySalesWrap context={context} />
                    </Card>
                  </div>
                  <div className="flex-grid__col">
                    <Card className="flex-grid__col">
                      <h6>체크인 현황</h6>
                      <DayCheckInWrap context={context} />
                    </Card>
                  </div>
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
