import React, {useState} from "react";
import {Doughnut, Line, ChartData} from "react-chartjs-2";
import Card from "../../../atoms/cards/Card";
import {
  SalesStatisticsUnit,
  WindowSize,
  StaticColors,
  FLOATING_PRElOADER_SIZE
} from "../../../types/enum";
import {IQueryOp} from "./StatisticWrap";
import {IUseDayPicker, useModal, LANG} from "../../../hooks/hook";
import Button from "../../../atoms/button/Button";
import moment from "moment";
import Preloader from "../../../atoms/preloader/Preloader";
import JDtable, {ReactTableDefault} from "../../../atoms/table/Table";
import {getSalesStatistic_GetSalesStatistic_data} from "../../../types/api";
import Color from "color";
import randomColor from "randomcolor";
import {CellInfo} from "react-table";
import "./Statistic.scss";
import {IContext} from "../../MiddleServerRouter";
import StaticController from "./component/StaticController";
import reactWindowSize, {WindowSizeProps} from "react-window-size";
import StaticIcons from "./component/StaticIcons";
import StaticsControllerModal from "./component/StaticsControllerModal";

export interface IStaticsWrapProps {
  queryOp: IQueryOp;
  queryDateHook: IUseDayPicker;
  staticData: getSalesStatistic_GetSalesStatistic_data[];
  setQueryOp: React.Dispatch<React.SetStateAction<IQueryOp>>;
}

export interface IStaticsProps extends IStaticsWrapProps {
  setViewMode: React.Dispatch<React.SetStateAction<IGraphViewMode>>;
  viewMode: IGraphViewMode;
}

interface IProps {
  staticsWrapProps: IStaticsWrapProps;
  loading: boolean;
  context: IContext;
}
// refetch 가 Query 컴포넌트 리턴 프로프임

export enum IGraphViewMode {
  list = "list",
  line = "line",
  pie = "pie"
}

const Statistic: React.FC<IProps & WindowSizeProps> = ({
  context,
  loading,
  staticsWrapProps,
  windowWidth
}) => {
  const {house} = context;
  const {setQueryOp, queryOp, staticData, queryDateHook} = staticsWrapProps;
  const [viewMode, setViewMode] = useState<IGraphViewMode>(IGraphViewMode.pie);
  const staticControllerModalHook = useModal(false);

  // 각 그래프 형태에따라 데이터셋 변화
  const addtionGraphDataset =
    viewMode === IGraphViewMode.list
      ? {
          borderColor: "rgba(75,192,192,1)"
        }
      : {};

  // 오바른 라벨구하기
  const labels = ((): string[] => {
    if (loading) return new Array(staticData.length).fill("loading");

    if (queryOp.unit === SalesStatisticsUnit.BY_DAY_OF_WEEK)
      return staticData.map(data => `${data.dateInfo.dayOfWeek}`);
    if (queryOp.unit === SalesStatisticsUnit.BY_DATE)
      return staticData.map(
        data =>
          `${data.dateInfo.year}-${data.dateInfo.month}-${data.dateInfo.date}`
      );
    if (queryOp.unit === SalesStatisticsUnit.MONTHLY)
      return staticData.map(
        data => `${data.dateInfo.year}-${data.dateInfo.month}`
      );
    if (queryOp.unit === SalesStatisticsUnit.WEEKLY)
      return staticData.map(
        data => `${data.dateInfo.year}-${data.dateInfo.month}`
      );
    if (queryOp.unit === SalesStatisticsUnit.YEARLY)
      return staticData.map(data => `${data.dateInfo.year}`);
    return [""];
  })();

  // 랜점컬러

  let randomColors = randomColor({
    count: staticData.length - StaticColors.length
  });

  // For 타입스크립트
  if (typeof randomColors === "string") {
    randomColors = [...StaticColors, randomColors];
  } else {
    randomColors = [...StaticColors, ...randomColors];
  }

  // 그래프 데이터
  const graphData: ChartData<Chart.ChartData> = {
    labels,
    datasets: [
      {
        label: queryOp.selectStatic,
        data: staticData.map(data => data.price),
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
      selectStatic: LANG("sales_statistics"),
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
      selectStatic: LANG("sales_statistics"),
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
      selectStatic: LANG("sales_statistics"),
      unit: SalesStatisticsUnit.BY_DATE
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

  const staticsProps: IStaticsProps = {
    ...staticsWrapProps,
    viewMode,
    setViewMode
  };

  return (
    <div className="container statistic">
      <div className="docs-section">
        <h3>통계</h3>
        <div className="statistic__shortBtnsWrap">
          <Button onClick={handleTodaySalesStatic} label="오늘매출" />
          <Button onClick={handleThisMonthSalesStatic} label="이번달매출" />
          <Button onClick={handleSetDaySalesStatic} label="일매출" />
          <Button onClick={handleSetMonthSalesStatic} label="월매출" />
          <Button onClick={handleSetYearSalesStatic} label="년매출" />
        </div>
        <div className="flex-grid">
          <div className="flex-grid__col col--full-6 col--wmd-12">
            <Card className="statistic__graphCard" fullHeight>
              <div>
                {windowWidth > WindowSize.TABLET && (
                  <StaticIcons
                    context={context}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                  />
                )}
                <Preloader
                  wrapClassName="statistic__graphPreloader"
                  position="center"
                  noAnimation
                  size={"large"}
                  loading={loading}
                />
                <Preloader
                  floating
                  size={FLOATING_PRElOADER_SIZE}
                  loading={loading}
                />
                <div>
                  {viewMode === IGraphViewMode.pie && (
                    <Doughnut data={graphData} />
                  )}
                  {viewMode === IGraphViewMode.line && (
                    <Line data={graphData} />
                  )}
                  {viewMode === IGraphViewMode.list && (
                    <JDtable
                      inClassNames="statistic__table"
                      {...ReactTableDefault}
                      data={
                        graphData.datasets
                          ? graphData.datasets[0].data || []
                          : []
                      }
                      columns={columns}
                    />
                  )}
                </div>
                {windowWidth > WindowSize.TABLET || (
                  <Button
                    mode="flat"
                    onClick={() => {
                      staticControllerModalHook.openModal();
                    }}
                    thema="primary"
                    label={LANG("change_statistics")}
                    icon="controller"
                  />
                )}
              </div>
            </Card>
          </div>
          {windowWidth > WindowSize.TABLET ? (
            <div className="flex-grid__col col--full-6 col--wmd-12">
              <Card fullHeight>
                <StaticController
                  staticsProps={staticsProps}
                  context={context}
                />
              </Card>
            </div>
          ) : (
            <StaticsControllerModal
              context={context}
              staticsProps={staticsProps}
              modalHook={staticControllerModalHook}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default reactWindowSize(Statistic);
