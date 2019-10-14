import React, {Fragment, useMemo} from "react";
import {ErrProtecter} from "../../../utils/utils";
import Card from "../../../atoms/cards/Card";
import DashBoardHeader from "./components/dashboardHeader";
import DailyAssigWrap from "../../../components/dailyAssjg/DailyAssigWrap";
import "./DashBoard.scss";
import {MutationFn} from "react-apollo";
import {updateHouse, updateHouseVariables} from "../../../types/api";
import {useModal, useDayPicker} from "../../../hooks/hook";
import Button from "../../../atoms/button/Button";
import {IContext} from "../../MiddleServerRouter";
import DaySalesWrap from "../../../components/shortStatisces/DaySalesWrap";
import DayCheckInWrap from "../../../components/shortStatisces/DayCheckInWrap";
import ReservationModal from "../../../components/reservationModala/ReservationModal";
import JDIcon from "../../../atoms/icons/Icons";
import TooltipList from "../../../atoms/tooltipList/TooltipList";
import DayPickerModal from "../../../components/dayPickerModal/DayPickerModal";
// @ts-ignore
import {Doughnut} from "react-chartjs-2";
// @ts-ignore
import Calculater from "react-calculator";
import TempWeel from "./components/tempWheel";

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

  const MemoDaySalesWrap = useMemo(
    () => <DaySalesWrap context={context} />,
    []
  );
  const MemoDayCheckInWrap = useMemo(
    () => <DayCheckInWrap context={context} />,
    []
  );

  const MemoDailyAssigWrap = useMemo(() => {
    return (
      <DailyAssigWrap
        calendarPosition="inside"
        context={context}
        date={dailyAssigDateHook.from || new Date()}
        key={"" + dailyAssigDateHook.from}
      />
    );
  }, [dailyAssigDateHook.from]);

  return (
    <div className="docs-section">
      <div id="dashboard" className="dashboard">
        <div className="container container--full">
          <div>{/* <DashBoardHeader /> */}</div>
          <div className="dashboard__section1">
            <div className="flex-grid JDstandard-margin-bottom">
              <div
                className={`flex-grid__col col--wmd-12
                col--full-12`}
              >
                <Card className="JDcard--fullHeight JDcard--fullHeight-wmd">
                  <Fragment>
                    <div className="JDstandard-margin-bottom">
                      <Button icon="negative" label="방막기" />
                      <Button icon="sms" label="단체 메세지" />
                      <Button float="right" label="예약하기" thema="primary" />
                    </div>

                    <div className="dashboard__tooltipsWrap">
                      <span
                        data-event="click"
                        data-tip={true}
                        data-for="DailyAssigTooltip"
                      >
                        <JDIcon hover icon="dotMenuVertical" />
                      </span>
                    </div>
                    {MemoDailyAssigWrap}
                    <ReservationModal
                      context={context}
                      modalHook={reservationModal}
                      callBackCreateBookingMu={(foo: any) => {}}
                      publicKey={house.publicKey || undefined}
                    />
                  </Fragment>
                </Card>
              </div>
            </div>
            <div className="flex-grid flex-grid--start">
              <div className="flex-grid__col col--full-4 JDstandard-space">
                <Card className="dashboard__dailyStaticsCard">
                  <h6>금일 매출</h6>
                  {MemoDaySalesWrap}
                  <Doughnut
                    data={{
                      datasets: [
                        {
                          label: "매출",
                          data: [12312]
                        }
                      ]
                    }}
                  />
                </Card>
              </div>
              <div className="flex-grid__col col--full-4">
                <Card className="dashboard__dailyStaticsCard flex-grid__col">
                  <h6>체크인 현황</h6>
                  <Doughnut
                    data={{
                      datasets: [
                        {
                          label: "매출",
                          data: [12312]
                        }
                      ]
                    }}
                  />
                  {MemoDayCheckInWrap}
                </Card>
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
          displayInfo={false}
          modalHook={dayPickerModalHook}
          isRange={false}
          {...dailyAssigDateHook}
        />
      </TooltipList>
    </div>
  );
};

export default ErrProtecter(DashBoard);
