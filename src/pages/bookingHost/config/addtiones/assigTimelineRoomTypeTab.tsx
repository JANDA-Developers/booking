import React, { useState } from "react";
import JDLabel from "../../../../atoms/label/JDLabel";
import JDrange from "../../../../atoms/forms/range/Range";
import { IAddtionProp } from "../components/ConfigBlock";
import JDswitch from "../../../../atoms/forms/switch/Switch";
import { useSwitch, LANG } from "../../../../hooks/hook";
import { muResult } from "../../../../utils/utils";
import JDbox from "../../../../atoms/box/JDbox";
import { IMG_REPO } from "../../../../types/enum";

const AssigTimelineRoomTabs: React.FC<IAddtionProp> = ({
  updateHouseConfigMu,
  context
}) => {
  const { houseConfig, house } = context;
  const { assigTimeline } = houseConfig;
  const [use, setUse] = useState(
    assigTimeline ? assigTimeline.roomTypeTabEnable : false
  );

  return (
    <div className="additionDetail">
      <div className="docs-section__box">
        <span>{LANG("Use_room_specific_tabs")}</span>
      </div>
      <div className="additionDetail__titleTopRight">
        <JDswitch
          key={
            use ? "AssigTimelineRoomTabs__true" : "AssigTimelineRoomTabs__false"
          }
          checked={use}
          onChange={async flag => {
            setUse(flag);
            const result = await updateHouseConfigMu({
              variables: {
                houseId: house._id,
                UpdateHouseConfigParams: {
                  assigTimeline: {
                    roomTypeTabEnable: flag
                  }
                }
              }
            });
            // 에러처리
            if (!muResult(result, "UpdateHouseConfig")) {
              setUse(!flag);
            }
          }}
          label={LANG("use")}
        />
      </div>
      <JDbox mode="photoFrame" photo={`${IMG_REPO}describe/roomTypeTap.gif`} />
      <div />
    </div>
  );
};

export default AssigTimelineRoomTabs;
