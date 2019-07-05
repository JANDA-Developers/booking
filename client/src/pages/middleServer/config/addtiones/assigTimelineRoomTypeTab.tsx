import React, {useState} from "react";
import JDLabel from "../../../../atoms/label/JDLabel";
import JDrange from "../../../../atoms/forms/range/range";
import {IAddtionProp} from "../components/AddtionModule";
import JDswitch from "../../../../atoms/forms/switch/Switch";

const AssigTimelineRoomTabs: React.FC<IAddtionProp> = ({
  updateHouseConfigMu,
  house
}) => {
  const {houseConfig} = house;
  const {assigTimeline} = houseConfig;
  const enable = assigTimeline ? assigTimeline.roomTypeTabEnable : false;

  return (
    <div className="additionDetail">
      <div className="docs-section__box">
        <span> 방타입별 탭을 사용합니다.</span>
      </div>
      <div className="additionDetail__titleTopRight">
        <JDswitch
          key={
            enable
              ? "AssigTimelineRoomTabs__true"
              : "AssigTimelineRoomTabs__false"
          }
          checked={enable}
          onChange={flag => {
            updateHouseConfigMu({
              variables: {
                houseId: house._id,
                params: {
                  assigTimeline: {
                    roomTypeTabEnable: flag
                  }
                }
              }
            });
          }}
          label="사용하기"
        />
      </div>
      <div />
    </div>
  );
};

export default AssigTimelineRoomTabs;
