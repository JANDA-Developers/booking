import React from "react";
import "./MyPage.scss";
import { LANG } from "../../../hooks/hook";
import { IContext } from "../../bookingHost/BookingHostRouter";
import PageBody from "../../../components/pageBody/PageBody";
import PageHeader from "../../../components/pageHeader/PageHeader";
import { JDtabs, TabList, Tab, TabPanel } from "../../../atoms/tabs/Tabs_";
import UserProfile from "./components/userProfile/UserProfile";
import PeriodicalPay from "./components/periodicalPay/PeriodicalPay";
import { getUserForSU_GetUserForSU_user } from "../../../types/api";

interface IProps {
  context: IContext;
  userInfo: getUserForSU_GetUserForSU_user;
  [foo: string]: any;
}

const Mypage: React.SFC<IProps> = ({ context, userInfo }) => {
  return (
    <div id="myPage" className="myPage">
      <PageHeader desc={LANG("mypage_desc")} title={"MyPage"} />
      <PageBody>
        <JDtabs tabsAlign="spaceAround" mb="large">
          <TabList>
            <Tab>{LANG("user_info")}</Tab>
            <Tab>
              <span className="payTabIn">{LANG("periodicalPay_manage")}</span>
            </Tab>
            {/* <Tab>
              <span>{LANG("solution_usage_guide")}</span>
            </Tab> */}
          </TabList>
          <TabPanel>
            <UserProfile userInfo={userInfo} context={context} />
          </TabPanel>
          <TabPanel>
            <PeriodicalPay context={context} />
          </TabPanel>
          {/* <TabPanel><UsageGuid context={context} /></TabPanel> */}
        </JDtabs>
      </PageBody>
    </div>
  );
};

export default Mypage;
