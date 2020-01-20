import React, { Fragment, useMemo, useState, useEffect } from "react";

import { ErrProtecter } from "../../../utils/utils";
import Card from "../../../atoms/cards/Card";
import DailyAssigWrap from "../../../components/dailyAssjg/DailyAssigWrap";
import "./DashBoard.scss";
import { useModal, useDayPicker, LANG } from "../../../hooks/hook";
import Button from "../../../atoms/button/Button";
import { IContext } from "../../bookingHost/BookingHostRouter";
import DaySalesWrap from "../../../components/shortStatisces/DaySalesWrap";
import DayCheckInWrap from "../../../components/shortStatisces/DayCheckInWrap";
import ReservationModal from "../../../components/reservationModala/ReservationModal";
import JDIcon from "../../../atoms/icons/Icons";
import TooltipList from "../../../atoms/tooltipList/TooltipList";
import DayPickerModal from "../../../components/dayPickerModal/DayPickerModal";
import SendSMSmodalWrap, {
  IModalSMSinfo
} from "../../../components/smsModal/SendSmsModalWrap";
import moment from "moment";
import PageHeader from "../../../components/pageHeader/PageHeader";
import PageBody from "../../../components/pageBody/PageBody";
import JDcard from "../../../atoms/cards/Card";

interface Iprops {
  context: IContext;
}

// eslint-disable-next-line react/prop-types
const DashBoard: React.SFC<Iprops> = ({ context }) => {
  const reservationModal = useModal();
  const dayPickerModalHook = useModal();
  const smsModalHook = useModal<IModalSMSinfo>(false);
  const dailyAssigDateHook = useDayPicker(new Date(), new Date());
  const [loading, setLoading] = useState(true);
  const { house } = context;

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
        onRederCallBack={() => {
          setLoading(false);
        }}
        calendarPosition="inside"
        context={context}
        date={dailyAssigDateHook.from || new Date()}
        key={"" + dailyAssigDateHook.from}
      />
    );
  }, [dailyAssigDateHook.from]);

  return (
    <div id="dashboard" className="dashboard">
      <PageHeader title={LANG("JANDA_home")} desc={LANG("JANDA_home_desc")} />
      <PageBody>
        <div className="dashboard__section1">
          <div className="flex-grid">
            <div
              className={`flex-grid__col col--wmd-12
                col--full-12`}
            >
              {/* 상단 버튼 집합 */}
              <div>
                <Button
                  id="CreateResvModalUpBtn"
                  onClick={() => {
                    reservationModal.openModal();
                  }}
                  label={LANG("make_reservation")}
                  thema="primary"
                />
                <Button
                  onClick={() => {
                    smsModalHook.openModal({
                      receivers: []
                    });
                  }}
                  icon="sms"
                  label={LANG("send_sms")}
                />
              </div>
              <JDcard toogleCardId="TutorialCard"></JDcard>
              <Card>
                <Fragment>
                  <div className="JDdisplay-none--wmdUp">
                    <h6>
                      {moment(dailyAssigDateHook.from || new Date()).format(
                        "YY.MM.DD."
                      )}
                    </h6>
                    {/* 데일리 어시그 컨트롤 툴팁 버튼 */}
                    <div className="dashboard__tooltipsWrap">
                      <span
                        data-event="click"
                        data-tip={true}
                        data-for="DailyAssigTooltip"
                      >
                        <JDIcon hover icon="dotMenuVertical" />
                      </span>
                    </div>
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
          {/* 통계 */}

          {loading || (
            <div className="flex-grid flex-grid--start">
              <div className="flex-grid__col col--full-4 col--md-12 JDstandard-space">
                <Card className="dashboard__dailyStaticsCard">
                  <h6>{LANG("today_sales")}</h6>
                  {MemoDaySalesWrap}
                </Card>
              </div>
              <div className="flex-grid__col col--full-4 col--md-12">
                <Card className="dashboard__dailyStaticsCard flex-grid__col">
                  <h6>{LANG("checkin_status")}</h6>
                  {MemoDayCheckInWrap}
                </Card>
              </div>
            </div>
          )}
        </div>
      </PageBody>
      {/* 데일리 어시그 컨트롤 툴팁 */}
      <TooltipList id="DailyAssigTooltip">
        <ul className="tooltipList__ul">
          <li>
            <Button
              label={LANG("make_reservation")}
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
              label={LANG("change_date")}
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
      <SendSMSmodalWrap modalHook={smsModalHook} context={context} />
    </div>
  );
};

export default ErrProtecter(DashBoard);
