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
import {useInput, useModal, useDayPicker} from "../../../actions/hook";
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
import ReservationModal from "../../../components/reservationModala/ReservationModal";
import JDIcon from "../../../atoms/icons/Icons";
import CircleIcon from "../../../atoms/circleIcon/CircleIcon";
import {isMobile as getIsMobile} from "is-mobile";
import TooltipList from "../../../atoms/tooltipList/TooltipList";
import DayPickerModal from "../../../components/dayPickerModal/dayPickerModal";

interface Iprops {
  context: IContext;
  updateHouseMu: MutationFn<updateHouse, updateHouseVariables>;
}

// eslint-disable-next-line react/prop-types
const DashBoard: React.SFC<Iprops> = ({updateHouseMu, context}) => {
  const reservationModal = useModal();
  const dayPickerModalHook = useModal();
  const dailyAssigDateHook = useDayPicker(new Date(), new Date());
  const {house, user} = context;
  const isMobile = getIsMobile();

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
                col--full-12`}
              >
                <Card className="JDcard--fullHeight JDcard--fullHeight-wmd">
                  <Fragment>
                    <h6>방배정현황</h6>
                    <div className="dashBoard__tooltipsWrap">
                      <span
                        data-event="click"
                        data-tip={true}
                        data-for="DailyAssigTooltip"
                      >
                        <JDIcon hover icon="dotMenuVertical" />
                      </span>
                    </div>
                    <ReservationModal
                      context={context}
                      houseId={house._id}
                      modalHook={reservationModal}
                      callBackCreateBookingMu={(foo: any) => {}}
                      publicKey={house.publicKey || undefined}
                      isAdmin
                    />
                    <DailyAssigWrap
                      calendarPosition="inside"
                      context={context}
                      date={dailyAssigDateHook.from || new Date()}
                      key={"" + dailyAssigDateHook.from}
                    />
                  </Fragment>
                </Card>
              </div>
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
      <TooltipList id="DailyAssigTooltip">
        <ul className="tooltipList__ul">
          <li>
            <Button
              label="예약하기"
              size="small"
              float="right"
              mode="border"
              onClick={() => {
                reservationModal.openModal();
              }}
            />
          </li>
          <li>
            <Button
              label="날자변경"
              size="small"
              float="right"
              mode="border"
              onClick={() => {
                dayPickerModalHook.openModal();
              }}
            />
          </li>
        </ul>
        <DayPickerModal
          modalHook={dayPickerModalHook}
          isRange={false}
          {...dailyAssigDateHook}
        />
      </TooltipList>
    </div>
  );
};

export default ErrProtecter(DashBoard);
