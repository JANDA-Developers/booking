import React from "react";
import Button from "../../../../../atoms/button/Button";
import JDmodal from "../../../../../atoms/modal/Modal";
import { IUseModal, LANG } from "../../../../../hooks/hook";
import MarkController from "./MarkController";
import { TabPanel, Tab, TabList } from "react-tabs";
import { JDtabs } from "../../../../../atoms/tabs/Tabs_";

interface IProps {
  blockOpModal: IUseModal;
}


// Device storage
// basic
    // Today Marker
    // Mouse Market
    // ZoomLevel

// DB storage
// GuestStatusMark
    //  useToogle
    // - new
    // - memo
    // - payed

// Device storage
// Short Keys
    // "MoveTo today",
    // "ZoomOut 처리",
    // "Zoom 처리",
    // "Delete 처리",
    // "CheckIn 처리"


const AssigTimelineSettingModal: React.FC<IProps> = ({ blockOpModal }) => {
  return (
    <JDmodal visibleOverflow className="assig__blockOpModal" {...blockOpModal}>
      <h5>단축키 설정</h5>
        <JDtabs tabsAlign="spaceAround" mb="large">
          <TabList>
            <Tab>{LANG("basic_config")}</Tab>
            <Tab>{LANG("guestStatus_mark")}</Tab>
            <Tab>{LANG("shortkey_config")}</Tab>
          </TabList>
          <TabPanel>
            <BasicConfig/>
          </TabPanel>
          <TabPanel>
            <MarkController />
          </TabPanel>
      <JDbox mode="table">
    </JDmodal>
  );
};

export default AssigTimelineSettingModal;
