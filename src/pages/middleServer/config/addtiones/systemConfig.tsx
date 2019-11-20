import React, { useState } from "react";
import JDLabel from "../../../../atoms/label/JDLabel";
import JDrange from "../../../../atoms/forms/range/Range";
import { MutationFn } from "react-apollo";
import {
  updateHouseConfig,
  updateHouseConfigVariables
} from "../../../../types/api";
import { IContext } from "../../../MiddleServerRouter";
import { LANG } from "../../../../hooks/hook";

interface IProps {
  updateHouseConfigMu: MutationFn<
    updateHouseConfig,
    updateHouseConfigVariables
  >;
  context: IContext;
}

const SystemDescription: React.FC<IProps> = ({
  updateHouseConfigMu,
  context
}) => {
  const { house } = context;
  const [range, setRange] = useState<any>(
    house.houseConfig.pollingPeriod ? house.houseConfig.pollingPeriod.period : 0
  );

  const handleRangeChange = (value: any) => {
    if (typeof value !== "number") return;
    setRange(value);

    updateHouseConfigMu({
      variables: {
        houseId: house._id,
        UpdateHouseConfigParams: {
          pollingPeriod: {
            enable: true,
            period: value
          }
        }
      }
    });
  };

  return (
    <div>
      <div className="docs-section__box">
        <span>{LANG("default_system_setting")}</span>
      </div>
      <div>
        <h6>{LANG("polling_period")}</h6>
        <JDLabel txt={LANG("polling_period_setting")} />
        <JDrange
          onChange={setRange}
          onChangeComplete={handleRangeChange}
          value={range}
          minValue={10000}
          maxValue={180000}
        />
        <p>
          <div className="">
            {LANG("server_will_check_if_there_is_a_new_reservation_once_every_set_number_by_ms")}
          </div>
          <div>
            {LANG("if_there_is_a_new_reservation_the_new_reservation_will_be_displayed_without_refreshing_the_screen")}
          </div>
          <div>
            *
            {LANG("if_you_have_problems_with_computer_performance_and_frequent_screen_updates_try_setting_a_higher_pooling_frequency")}
          </div>
        </p>
      </div>
    </div>
  );
};

export default SystemDescription;
