import React, { useState } from "react";
import "./MyPage.scss";
import { LANG } from "../../../hooks/hook";
import { IContext } from "../../bookingHost/BookingHostRouter";
import PageBody from "../../../components/pageBody/PageBody";
import PageHeader from "../../../components/pageHeader/PageHeader";
import { JDtabs, TabList, Tab, TabPanel } from "../../../atoms/tabs/Tabs_";
import UserProfile from "./components/userProfile/UserProfile";
import PeriodicalPay from "./components/periodicalPay/PeriodicalPay";
import { getUserForSU_GetUserForSU_user } from "../../../types/api";
import UsageGuide from "./components/usageGuide/UsageGuide";

interface IProps {
  context: IContext;
  userInfo: getUserForSU_GetUserForSU_user;
  [foo: string]: any;
}

const Mypage: React.SFC<IProps> = ({ context, userInfo }) => {
  const [currentTab, setCurrentTab] = useState("userProfile");

  const tabContents = [
    {
      key: "userProfile",
      tab: LANG("user_info"),
      content: <UserProfile userInfo={userInfo} context={context} />
    },
    {
      key: "PeriodicalPay",
      tab: <span className="payTabIn">{LANG("periodicalPay_manage")}</span>,
      content: <PeriodicalPay context={context} />
    },
    {
      key: "UsageGuide",
      tab: <span>{LANG("solution_usage_guide")}</span>,
      content: <UsageGuide context={context} />
    }
  ];

  const headerProp = {
    desc:
      currentTab === "UsageGuide"
        ? LANG("solution_usage_guide_desc")
        : LANG("mypage_desc"),
    title: currentTab === "UsageGuide" ? LANG("solution_usage_guide") : "MyPage"
  };

  return (
    <div id="myPage" className="myPage">
      <PageHeader {...headerProp} />
      <PageBody>
        <JDtabs
          onSelect={index => setCurrentTab(tabContents[index].key)}
          tabsAlign="spaceAround"
          mb="large"
        >
          <TabList>
            {tabContents.map(tabC => (
              <Tab>{tabC.tab}</Tab>
            ))}
          </TabList>
          {tabContents.map(tabC => (
            <TabPanel>{tabC.content}</TabPanel>
          ))}
        </JDtabs>
      </PageBody>
    </div>
  );
};

export default Mypage;
