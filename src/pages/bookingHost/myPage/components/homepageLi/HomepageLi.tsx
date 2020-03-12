import React from "react";
import JDbox from "../../../../../atoms/box/JDbox";
import "./HomepageLi.scss";
import JDtypho from "../../../../../atoms/typho/Typho";
import { LANG } from "../../../../../hooks/hook";
import {
  getHomepages_GetHomepages_result_homepages,
  getUserRequests_GetUserRequests_result_userRequests
} from "../../../../../types/api";
import Align from "../../../../../atoms/align/Align";

interface IProps {
  request: getUserRequests_GetUserRequests_result_userRequests;
  homepage?: getHomepages_GetHomepages_result_homepages;
}

const HomepageLi: React.FC<IProps> = ({ homepage, request }) => {
  const { homepageInfo, status } = request;
  if (!homepageInfo) {
    throw Error("this is not hompage request");
  }
  const {
    design,
    eamil,
    houseId,
    managerName,
    options,
    siteName,
    url,
    contact
  } = homepageInfo;

  if (homepage) {
    return (
      <JDbox className="HomepageLi">
        <Align flex={{}}>
          <JDtypho weight={600}>{LANG("site_name")}</JDtypho>
          <JDtypho>{siteName}</JDtypho>
          <JDtypho weight={500}>{LANG("request_design")}</JDtypho>
          <JDtypho>{design}</JDtypho>
        </Align>
        <JDtypho weight={500}>{LANG("request_urls")}</JDtypho>
        <JDtypho weight={500}>{LANG("request_date")}</JDtypho>
        <JDtypho weight={500}>{LANG("connected_house")}</JDtypho>
      </JDbox>
    );
  }

  return (
    <JDbox mode="border" className="HomepageLi">
      <div>
        <JDtypho weight={500}>{LANG("site_name")}</JDtypho>
        <JDtypho>{siteName}</JDtypho>
        <JDtypho weight={500}>{LANG("request_design")}</JDtypho>
        <JDtypho>{design}</JDtypho>
        <JDtypho weight={500}>{LANG("request_urls")}</JDtypho>
        <JDtypho weight={500}>{LANG("request_date")}</JDtypho>
        <JDtypho weight={500}>{LANG("connected_house")}</JDtypho>
      </div>
      <span className="HompageLi__processing">
        {LANG("homepage_is_processing")}
      </span>
    </JDbox>
  );
};

export default HomepageLi;
