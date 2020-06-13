import React, { useState } from "react";
import { IAddtionProp } from "../components/ConfigBlock";
import JDswitch from "../../../../atoms/forms/switch/Switch";
import { LANG } from "../../../../hooks/hook";
import { muResult } from "../../../../utils/utils";
import JDbox from "../../../../atoms/box/JDbox";
import { IMG_REPO } from "../../../../types/const";
import { JDdoc } from "@janda-com/front";

const AssigTimelineRoomTabs: React.FC<IAddtionProp> = ({
  updateFn,
  context
}) => {
  const { houseConfig, house } = context;
  const { assigTimeline } = houseConfig;
  const [use, setUse] = useState(
    assigTimeline ? assigTimeline.roomTypeTabEnable : false
  );

  return (
    <div className="additionDetail">
      <JDdoc>
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
              const result = await updateFn({
                assigTimeline: {
                  roomTypeTabEnable: flag
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
        <JDbox
          mode="photoFrame"
          photo={`${IMG_REPO}booking_app/describe/roomTypeTap.gif`}
        />
        <div />
      </JDdoc>
    </div>
  );
};

export default AssigTimelineRoomTabs;
