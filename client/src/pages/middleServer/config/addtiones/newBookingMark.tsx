import React, {useState} from "react";
import JDLabel from "../../../../atoms/label/JDLabel";
import JDrange from "../../../../atoms/forms/range/range";
import {IAddtionProp} from "../components/AddtionModule";
import JDswitch from "../../../../atoms/forms/switch/Switch";
import {useSwitch, useRange} from "../../../../actions/hook";
import {muResult} from "../../../../utils/utils";
import JDbox from "../../../../atoms/box/JDbox";
import TabUsePhoto from "../../../../img/describe/roomTypeTap.gif";
import {DEFAULT_HOUSE_CONFIG} from "../../../../types/defaults";
import {TimePerMs} from "../../../../types/enum";
import JDbadge from "../../../../atoms/badge/Badge";

const NewBookingMark: React.FC<IAddtionProp> = ({
  updateHouseConfigMu,
  context
}) => {
  const {houseConfig, house} = context;
  const {bookingConfig} = houseConfig;
  const {newBookingMark} = bookingConfig || DEFAULT_HOUSE_CONFIG.bookingConfig;
  const {enable, newGuestTime} =
    newBookingMark || DEFAULT_HOUSE_CONFIG.bookingConfig.newBookingMark;
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
        <span>새로운 예약을 표시합니다.</span>
      </div>
      <div className="additionDetail__titleTopRight">
        <JDswitch
          key={
            use ? "AssigTimelineRoomTabs__true" : "AssigTimelineRoomTabs__false"
          }
          checked={use}
          onChange={handleSwitchCange}
          label="사용하기"
        />
      </div>
      <h6>표시 기한</h6>
      <JDLabel txt="표시기한 / 시간" />
      <JDrange
        maxValue={TimePerMs.DAY * 7}
        minValue={TimePerMs.H}
        formatLabel={value =>
          `${parseInt((value / TimePerMs.H).toString(), 10)} 시간`
        }
        value={timeHook.value}
        onChangeComplete={handleRangeChange}
        onChange={timeHook.onChange}
      />
      <JDbox mode="photoFrame" photo={TabUsePhoto} />
      <div>
        <p>
          <div className="">설정된 시간 내의 새로운 예약을 표시합니다.</div>
          <div>관리자가 직접 예약한 예약은 표시되지 않습니다.</div>
          <div>
            예약표시
            <JDbadge thema="new">new</JDbadge>를 클릭하여 해당 표시를 지울수
            있습니다.
          </div>
        </p>
      </div>
    </div>
  );
};

export default NewBookingMark;
