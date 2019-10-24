import React, { useState } from "react";
import JDLabel from "../../../../atoms/label/JDLabel";
import JDrange from "../../../../atoms/forms/range/Range";
import { IAddtionProp } from "../components/ConfigBlock";
import JDswitch from "../../../../atoms/forms/switch/Switch";
import { useSwitch, useRange, LANG } from "../../../../hooks/hook";
import { muResult } from "../../../../utils/utils";
import JDbox from "../../../../atoms/box/JDbox";
import NewBookingBadge from "../../../../img/describe/newBookingBadge.png";
import { DEFAUT_HOUSE_CONFIG } from "../../../../types/defaults";
import { TimePerMs } from "../../../../types/enum";
import JDbadge from "../../../../atoms/badge/Badge";

const NewBookingMark: React.FC<IAddtionProp> = ({
  updateHouseConfigMu,
  context
}) => {
  const { houseConfig, house } = context;
  const { bookingConfig } = houseConfig;
  const { newBookingMark } = bookingConfig || DEFAUT_HOUSE_CONFIG.bookingConfig;
  const { enable, newGuestTime } =
    newBookingMark || DEFAUT_HOUSE_CONFIG.bookingConfig.newBookingMark;
  const [use, setUse] = useState(enable || false);
  const timeHook = useRange(newGuestTime);

  const handleRangeChange = (value: any) => {
    if (typeof value !== "number") return;
    timeHook.onChange(value);

    updateHouseConfigMu({
      variables: {
        houseId: house._id,
        UpdateHouseConfigParams: {
          bookingConfig: {
            newBookingMark: {
              enable: use,
              newGuestTime: timeHook.value
            }
          }
        }
      }
    });
  };

  const handleSwitchCange = async (flag: boolean) => {
    setUse(flag);
    const result = await updateHouseConfigMu({
      variables: {
        houseId: house._id,
        UpdateHouseConfigParams: {
          bookingConfig: {
            newBookingMark: {
              enable: flag,
              newGuestTime: timeHook.value
            }
          }
        }
      }
    });
    if (!muResult(result, "UpdateHouseConfig")) {
      setUse(!flag);
    }
  };

  return (
    <div className="additionDetail">
      <div className="docs-section__box">
        <span>{LANG("mark_new_reservation")}</span>
      </div>
      <div className="additionDetail__titleTopRight">
        <JDswitch
          key={
            use ? "AssigTimelineRoomTabs__true" : "AssigTimelineRoomTabs__false"
          }
          checked={use}
          onChange={handleSwitchCange}
          label={LANG("use")}
        />
      </div>
      <h6>{LANG("display_deadline")}</h6>
      <JDLabel txt={`${LANG("display_deadline")} / ${LANG("time")}`} />
      <JDrange
        maxValue={TimePerMs.DAY * 7}
        minValue={TimePerMs.H}
        formatLabel={value =>
          `${parseInt((value / TimePerMs.H).toString(), 10)} ${LANG('time')}`
        }
        value={timeHook.value}
        onChangeComplete={handleRangeChange}
        onChange={timeHook.onChange}
      />
      <JDbox mode="photoFrame" photo={NewBookingBadge} />
      <div>
        <p>
          <div className="">{LANG("displays_a_new_reservation_within_the_set_time")}</div>
          <div>{LANG("reservations_booked_directly_by_the_administrator_are_not_displayed")}</div>
          <div>
            {LANG("reservation_mark")}
            <JDbadge thema="new">new</JDbadge>{LANG("you_can_clear_the_display_by_clicking")}
          </div>
        </p>
      </div>
    </div>
  );
};

export default NewBookingMark;
