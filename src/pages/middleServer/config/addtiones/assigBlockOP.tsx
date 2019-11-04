import React, { useState } from "react";
import JDLabel from "../../../../atoms/label/JDLabel";
import JDrange from "../../../../atoms/forms/range/Range";
import { IAddtionProp } from "../components/ConfigBlock";
import JDswitch from "../../../../atoms/forms/switch/Switch";
import { useSwitch, LANG } from "../../../../hooks/hook";
import { muResult } from "../../../../utils/utils";
import JDbox from "../../../../atoms/box/JDbox";
import HilightPhoto from "../../../../img/describe/guestHilight.gif";
import {
  DEFAULT_ADDITION_BLOCKOP,
  DEFAULT_HOUSE_CONFIG
} from "../../../../types/defaults";

const AssigTimelineRoomTabs: React.FC<IAddtionProp> = ({
  updateHouseConfigMu,
  context
}) => {
  const { houseConfig, house } = context;
  const { assigTimeline } = houseConfig;
  const { itemBlockOp, roomTypeTabEnable } =
    assigTimeline || DEFAULT_HOUSE_CONFIG.assigTimeline;
  const { useColor, itemBlockOpEnable } = itemBlockOp || DEFAULT_ADDITION_BLOCKOP;
  const [use, setUse] = useState(itemBlockOpEnable);
  const [colorEnable, setEnableColor] = useState(useColor);

  const updateFn = async () => {
    const result = await updateHouseConfigMu({
      variables: {
        houseId: house._id,
        UpdateHouseConfigParams: {
          assigTimeline: {
            roomTypeTabEnable,
            itemBlockOp: {
              itemBlockOpEnable: !use,
              useColor: !colorEnable
            }
          }
        }
      }
    });

    return result;
  };
  return (
    <div className="additionDetail">
      <div className="docs-section__box">
        <span>{LANG("display_related_setting")}</span>
      </div>
      <div className="additionDetail__titleTopRight">
        {/* <JDswitch
          checked={use}
          onChange={async flag => {
            await setUse(flag);
            const result = await updateFn();
            if (!muResult(result, "UpdateHouseConfig")) {
              setUse(!flag);
            }
          }}
          label="사용하기"
        /> */}
      </div>
      <h6>{LANG("use_color_setting_function")}</h6>
      <JDswitch
        checked={colorEnable}
        onChange={async flag => {
          await setEnableColor(flag);
          const result = await updateFn();
          if (!muResult(result, "UpdateHouseConfig")) {
            setEnableColor(!flag);
          }
        }}
        // disabled={!use}
        label={LANG("use")}
      />
      <JDbox
        className="additionDetail__HilightPhoto"
        mode="photoFrame"
        photo={HilightPhoto}
      />
      <div />
    </div>
  );
};

export default AssigTimelineRoomTabs;
