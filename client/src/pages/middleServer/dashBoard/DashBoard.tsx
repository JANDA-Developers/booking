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
                    {MemoDailyAssigWrap}
                    <ReservationModal
                      context={context}
                      houseId={house._id}
                      modalHook={reservationModal}
                      callBackCreateBookingMu={(foo: any) => {}}
                      publicKey={house.publicKey || undefined}
                      isHost
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
                      {MemoDaySalesWrap}
                    </Card>
                  </div>
                  <div className="flex-grid__col">
                    <Card className="flex-grid__col">
                      <h6>체크인 현황</h6>
                      {MemoDayCheckInWrap}
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
