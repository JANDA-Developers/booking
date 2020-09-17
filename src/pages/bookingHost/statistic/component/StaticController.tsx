import React, { useContext } from "react";
import { LANG } from "../../../../hooks/hook";
import { IContext } from "../../../bookingHost/BookingHostRouter";
import { STATISTICS_OP, STATISTICS_TYPE_OP } from "../../../../types/const";
import JDselect from "../../../../atoms/forms/selectBox/SelectBox";
import JDdayPicker from "../../../../atoms/dayPicker/DayPicker";
import { IStaticsProps } from "../Statistic";
import { StatisticContext } from "../StatisticWrap";
import { JDalign } from "@janda-com/front";

interface Iprops {
  context: IContext;
}

const StaticController: React.FC<Iprops> = () => {
  const {
    queryDateHook,
    queryOp,
    setQueryOp,
    payMethodHook,
    dateTypeHook,
    staticData
  } = useContext(StatisticContext)!;
  return (
    <div>
      <h6>{LANG("statistical_transformation")}</h6>
      <div>
        <JDselect
          mr="no"
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
      <JDalign
        flex={{
          between: true,
          oneone: true
        }}
      >
        <JDdayPicker
          {...queryDateHook}
          canSelectBeforeDay
          label={LANG("date_of_statistics")}
          mode="input"
          mr="normal"
        />
        <div>
          <JDselect {...dateTypeHook} mr="no" label={"시간 기준설정"} />
        </div>
      </JDalign>
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
            label: LANG(queryOp.unit)
          }}
          // @ts-ignore
          options={STATISTICS_TYPE_OP}
          label={LANG("which_unit_would_you_like_to_see")}
        />
      </div>
      <div>
        <JDselect mr="no" {...payMethodHook} label={"통계필터 - 결제수단"} />
      </div>
    </div>
  );
};

export default StaticController;
