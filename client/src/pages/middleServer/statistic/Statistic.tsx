import React, {useState} from "react";
import {Doughnut, Line, ChartData} from "react-chartjs-2";
import {randomIntFromInterval} from "../../../utils/utils";
import Card from "../../../atoms/cards/Card";
import JDselect from "../../../atoms/forms/selectBox/SelectBox";

import {
  SELECT_DUMMY_OP,
  STATISTICS_TYPE_OP,
  SalesStatisticsUnitKr,
  STATISTICS_OP,
  SalesStatisticsUnit
} from "../../../types/enum";
import {IQueryOp} from "./StatisticWrap";
import InputText from "../../../atoms/forms/inputText/InputText";
import DayPicker from "react-day-picker";
import JDdayPicker from "../../../atoms/dayPicker/DayPicker";
import {IUseDayPicker} from "../../../actions/hook";
import Button from "../../../atoms/button/Button";
import moment from "moment";
import JDIcon from "../../../atoms/icons/Icons";
import Preloader from "../../../atoms/preloader/Preloader";
import JDtable, {ReactTableDefault} from "../../../atoms/table/Table";
import {getSalesStatistic_GetSalesStatistic_data} from "../../../types/api";
import Color from "color";
import randomColor from "randomcolor";
import {CellInfo} from "react-table";
import "./Statistic.scss";
import {IContext} from "../../MiddleServerRouter";

interface IProps {
  outData: getSalesStatistic_GetSalesStatistic_data[];
  loading: boolean;
  setQueryOp: React.Dispatch<React.SetStateAction<IQueryOp>>;
  queryOp: IQueryOp;
  queryDateHook: IUseDayPicker;
  context: IContext;
}
// refetch 가 Query 컴포넌트 리턴 프로프임

export enum IGraphViewMode {
  list = "list",
  line = "line",
  pie = "pie"
}

const Statistic: React.FC<IProps> = ({
  outData,
  context,
  loading,
  queryOp,
  queryDateHook,
  setQueryOp
}) => {
  const {house} = context;
  const [viewMode, setViewMode] = useState<IGraphViewMode>(IGraphViewMode.pie);

  // 각 그래프 형태에따라 데이터셋 변화
  const addtionGraphDataset =
    viewMode === IGraphViewMode.list
      ? {
          borderColor: "rgba(75,192,192,1)"
        }
      : {};

  // 오바른 라벨구하기
  const labels = ((): string[] => {
    if (queryOp.unit === SalesStatisticsUnit.BY_DAY_OF_WEEK)
      return outData.map(data => `${data.dateInfo.dayOfWeek}`);
    if (queryOp.unit === SalesStatisticsUnit.BY_DATE)
      return outData.map(
        data =>
          `${data.dateInfo.year}-${data.dateInfo.month}-${data.dateInfo.date}`
      );
    if (queryOp.unit === SalesStatisticsUnit.MONTHLY)
      return outData.map(
        data => `${data.dateInfo.year}-${data.dateInfo.month}`
      );
    if (queryOp.unit === SalesStatisticsUnit.WEEKLY)
      return outData.map(
        data => `${data.dateInfo.year}-${data.dateInfo.month}`
      );
    if (queryOp.unit === SalesStatisticsUnit.YEARLY)
      return outData.map(data => `${data.dateInfo.year}`);
    return [""];
  })();

  // 랜점컬러
  let randomColors = randomColor({
    count: outData.length
  });

  // For 타입스크립트
  if (typeof randomColors === "string") {
    randomColors = [randomColors];
  }

  // 그래프 데이터
  const graphData: ChartData<Chart.ChartData> = {
    labels,
    datasets: [
      {
        label: queryOp.selectStatic,
        data: outData.map(data => data.price),
        fill: false,
        backgroundColor: randomColors,
        hoverBackgroundColor: randomColors.map(color =>
          Color(color)
            .lighten(0.15)
            .toString()
        )
      }
    ]
  };

  Object.assign(graphData, addtionGraphDataset);

  const columns = [
    {
      Header: "구분",
      accessor: "data",
      Cell: ({value, original, index}: CellInfo) => {
        return <div>{labels[index]}</div>;
      }
    },
    {
      Header: "매출",
      accessor: "data",
      Cell: ({value, original}: CellInfo) => {
        return <div>{original}</div>;
      }
    }
  ];

  const handleTodaySalesStatic = () => {
    setQueryOp({
      selectStatic: "매출통계",
      unit: SalesStatisticsUnit.BY_DAY_OF_WEEK
    });
    queryDateHook.setFrom(
      moment(new Date())
        .add(-1, "day")
        .toDate()
    );
    queryDateHook.setTo(new Date());
  };

  const handleThisMonthSalesStatic = () => {
    setQueryOp({
      selectStatic: "매출통계",
      unit: SalesStatisticsUnit.BY_DAY_OF_WEEK
    });
    queryDateHook.setFrom(
      moment(new Date())
        .startOf("month")
        .toDate()
    );
    queryDateHook.setTo(new Date());
  };

  const handleSetDaySalesStatic = () => {
    setQueryOp({
      selectStatic: "매출통계",
      unit: SalesStatisticsUnit.BY_DAY_OF_WEEK
    });
    queryDateHook.setFrom(
      moment(new Date())
        .add(-14, "day")
        .toDate()
    );
    queryDateHook.setTo(new Date());
  };

  const handleSetMonthSalesStatic = () => {
    setQueryOp({
      unit: SalesStatisticsUnit.MONTHLY,
      selectStatic: ""
    });
    queryDateHook.setFrom(
      moment(new Date())
        .add(-12, "month")
        .toDate()
    );
    queryDateHook.setTo(new Date());
  };

  const handleSetYearSalesStatic = () => {
    setQueryOp({
      unit: SalesStatisticsUnit.YEARLY,
      selectStatic: ""
    });
    queryDateHook.setFrom(
      moment(new Date())
        .add(-3, "year")
        .toDate()
    );
    queryDateHook.setTo(new Date());
  };

  return (
    <div className="container">
      <div className="docs-section">
        <h3>통계</h3>
        <Button onClick={handleTodaySalesStatic} label="오늘매출" />
        <Button onClick={handleThisMonthSalesStatic} label="이번달매출" />
        <Button onClick={handleSetDaySalesStatic} label="일매출" />
        <Button onClick={handleSetMonthSalesStatic} label="월매출" />
        <Button onClick={handleSetYearSalesStatic} label="년매출" />
        <div className="flex-grid">
          <div className="flex-grid__col col--full-6">
            <Card fullHeight>
              <div className="statistic__iconsWrap">
                <JDIcon
                  onClick={() => {
                    setViewMode(IGraphViewMode.list);
                  }}
                  selected={viewMode === "list"}
                  hover
                  icon="checkList"
                />
                <JDIcon
                  onClick={() => {
                    setViewMode(IGraphViewMode.line);
                  }}
                  selected={viewMode === IGraphViewMode.line}
                  hover
                  icon="graphLine"
                />
                <JDIcon
                  onClick={() => {
                    setViewMode(IGraphViewMode.pie);
                  }}
                  selected={viewMode === IGraphViewMode.pie}
                  hover
                  icon="graphPie"
                />
              </div>
              <Preloader floating size="large" loading={loading} />
              <div>
                {viewMode === IGraphViewMode.pie && (
                  <Doughnut data={graphData} />
                )}
                {viewMode === IGraphViewMode.line && <Line data={graphData} />}
                {viewMode === IGraphViewMode.list && (
                  <JDtable
                    inClassNames="statistic__table"
                    {...ReactTableDefault}
                    data={
                      graphData.datasets ? graphData.datasets[0].data || [] : []
                    }
                    columns={columns}
                  />
                )}
              </div>
            </Card>
          </div>
          <div className="flex-grid__col col--full-6">
            <Card fullHeight>
              <h6>통계 변환</h6>
              <div>
                <JDselect
                  selectedOption={{value: "매출통계", label: "매출통계"}}
                  onChange={value => {
                    setQueryOp({
                      ...queryOp,
                      selectStatic: value.value
                    });
                  }}
                  options={STATISTICS_OP}
                  label="통계 보기"
                />
              </div>
              <div>
                <JDdayPicker {...queryDateHook} label="통계날자" input />
              </div>
              <div>
                <JDselect
                  onChange={value => {
                    setQueryOp({
                      ...queryOp,
                      unit: value.value
                    });
                  }}
                  selectedOption={{
                    value: queryOp.unit,
                    label: SalesStatisticsUnitKr[queryOp.unit]
                  }}
                  options={STATISTICS_TYPE_OP}
                  label="보기 단위"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
