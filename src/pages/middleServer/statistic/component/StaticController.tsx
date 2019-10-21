import React from "react";
import {IContext} from "../../../MiddleServerRouter";
import {
  SalesStatisticsUnitKr,
  STATISTICS_OP,
  STATISTICS_TYPE_OP
} from "../../../../types/enum";
import {IQueryOp} from "../../../outPages/HM/HMwrap";
import JDselect from "../../../../atoms/forms/selectBox/SelectBox";
import JDdayPicker from "../../../../atoms/dayPicker/DayPicker";
import {IStaticsWrapProps, IGraphViewMode, IStaticsProps} from "../Statistic";
import StaticIcons from "./StaticIcons";
import {IconSize} from "../../../../atoms/icons/Icons";
import {LANG} from "../../../../hooks/hook";

interface Iprops {
  context: IContext;
  staticsProps: IStaticsProps;
}

const StaticController: React.FC<Iprops> = ({context, staticsProps}) => {
  const {queryDateHook, queryOp, setQueryOp} = staticsProps;
  return (
    <div>
      <h6>{LANG("statistical_transformation")}</h6>
      <div>
        <JDselect
          selectedOption={{
            value: LANG("sales_statistics"),
            label: LANG("sales_statistics")
          }}
          onChange={value => {
            setQueryOp({
              ...queryOp,
              selectStatic: value.value
            });
          }}
          options={STATISTICS_OP}
          label={LANG("witch_statistics_do_you_want")}
        />
      </div>
      <div>
        <JDdayPicker
          canSelectBeforeDay={true}
          {...queryDateHook}
          label={LANG("date_of_statistics")}
          input
        />
      </div>
      <div>
        <JDselect
          onChange={value => {
            setQueryOp({
              ...queryOp,
              unit: value.value
            });
          }}
          // @ts-ignore
          selectedOption={{
            value: queryOp.unit,
            label: SalesStatisticsUnitKr[queryOp.unit]
          }}
          // @ts-ignore
          options={STATISTICS_TYPE_OP}
          label={LANG("which_unit_would_you_like_to_see")}
        />
      </div>
    </div>
  );
};

export default StaticController;
