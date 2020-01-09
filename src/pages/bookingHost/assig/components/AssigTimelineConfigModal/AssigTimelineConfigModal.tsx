import React from "react";
import JDmodal from "../../../../../atoms/modal/Modal";
import { IUseModal, LANG } from "../../../../../hooks/hook";
import MarkController from "./components/MarkController";
import {
  JDtabs,
  TabPanel,
  Tab,
  TabList
} from "../../../../../atoms/tabs/Tabs_";
import BasicConfig from "./components/BasicConfig";
import ShortKeyConfig from "./components/ShortKeyConfig";
import { IContext } from "../../../BookingHostRouter";
import { MODAL_MIN_WIDTH } from "../../../../../types/const";

interface IProps {
  modalHook: IUseModal;
  context: IContext;
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

const AssigTimelineConfigModal: React.FC<IProps> = ({ modalHook, context }) => {
  return (
    <JDmodal
      minWidth={MODAL_MIN_WIDTH}
      visibleOverflow
      className="assig__blockOpModal"
      {...modalHook}
    >
      <JDtabs tabsAlign="spaceAround" mb="large">
        <TabList>
          <Tab>{LANG("basic_config")}</Tab>
          {/* <Tab>{LANG("guestStatus_mark")}</Tab>
          <Tab>{LANG("shortkey_config")}</Tab> */}
        </TabList>
        <TabPanel>
          <BasicConfig context={context} />
        </TabPanel>
        {/* <TabPanel>
          <MarkController context={context} />
        </TabPanel>
        <TabPanel>
          <ShortKeyConfig context={context} />
        </TabPanel> */}
      </JDtabs>
    </JDmodal>
  );
};

export default React.memo(
  AssigTimelineConfigModal,
  (prevProp, nextProp) =>
    prevProp.modalHook.isOpen === nextProp.modalHook.isOpen
);
