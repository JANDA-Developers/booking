import React, {useState} from "react";
import JDLabel from "../../../../atoms/label/JDLabel";
import JDrange from "../../../../atoms/forms/range/range";
import {IAddtionProp} from "../components/AddtionModule";
import JDswitch from "../../../../atoms/forms/switch/Switch";
import {useSwitch} from "../../../../actions/hook";
import {muResult} from "../../../../utils/utils";
import JDbox from "../../../../atoms/box/JDbox";
import TabUsePhoto from "../../../../img/describe/roomTypeTap.gif";

const AssigTimelineRoomTabs: React.FC<IAddtionProp> = ({
  updateHouseConfigMu,
  house
}) => {
  const {houseConfig} = house;
  const {assigTimeline} = houseConfig;
  const [use, setUse] = useState(
    assigTimeline ? assigTimeline.roomTypeTabEnable : false
  );

  return (
    <div className="additionDetail">
      <div className="docs-section__box">
        <span> 방타입별 탭을 사용합니다.</span>
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
                params: {
                  assigTimeline: {
                    roomTypeTabEnable: flag
                  }
                }
              }
            });
            if (!muResult(result, "UpdateHouseConfig")) {
              setUse(!flag);
            }
          }}
          label="사용하기"
        />
      </div>
      <JDbox mode="photoFrame" photo={TabUsePhoto} />
      <div />
    </div>
  );
};

export default AssigTimelineRoomTabs;
