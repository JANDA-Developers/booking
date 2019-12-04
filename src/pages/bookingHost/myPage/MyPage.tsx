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
import PhotoFrame from "../../../atoms/photoFrame/PhotoFrame";

interface IProps {
  context: IContext;
  userInfo: getUserForSU_GetUserForSU_user;
  [foo: string]: any;
}

const Mypage: React.SFC<IProps> = ({ context, userInfo }) => {
  return (
    <div id="myPage" className="myPage">
      <PageHeader desc={""} title={"MyPage"} />
      <PageBody>
        <JDtabs tabsAlign="spaceAround" mb="large">
          <TabList>
            <Tab>{LANG("user_info")}</Tab>
            <Tab>{LANG("periodicalPay_manage")}</Tab>
          </TabList>
          <TabPanel>
            <UserProfile userInfo={userInfo} context={context} />
          </TabPanel>
          <TabPanel>
            <PeriodicalPay context={context} />
          </TabPanel>
        </JDtabs>
      </PageBody>
    </div>
  );
};

export default Mypage;
