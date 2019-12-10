import React, { useState, Fragment } from "react";
import { ChartData } from "react-chartjs-2";
import Card from "../../../atoms/cards/Card";
import { SalesStatisticsUnit, WindowSize } from "../../../types/enum";
import { FLOATING_PRELOADER_SIZE } from "../../../types/const";
import { IQueryOp } from "./StatisticWrap";
import { IUseDayPicker, useModal, LANG } from "../../../hooks/hook";
import Button from "../../../atoms/button/Button";
import moment from "moment";
import Preloader from "../../../atoms/preloader/Preloader";
import { getSalesStatistic_GetSalesStatistic_data } from "../../../types/api";
import "./Statistic.scss";
import { IContext } from "../../bookingHost/BookingHostRouter";
import StaticController from "./component/StaticController";
import reactWindowSize, { WindowSizeProps } from "react-window-size";
import StaticIcons from "./component/StaticIcons";
import StaticsControllerModal from "./component/StaticsControllerModal";
import { getStaticColors } from "../../../utils/getStaticColors";
import JDgraph from "../../../atoms/graph/graph";
import PageHeader from "../../../components/pageHeader/PageHeader";
import PageBody from "../../../components/pageBody/PageBody";

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
  doughnut = "doughnut"
}

const Statistic: React.FC<IProps & WindowSizeProps> = ({
  context,
  loading,
  staticsWrapProps,
  windowWidth
}) => {
  const { setQueryOp, queryOp, staticData, queryDateHook } = staticsWrapProps;
  const [viewMode, setViewMode] = useState<IGraphViewMode>(
    IGraphViewMode.doughnut
  );
  const isTabletDown = windowWidth <= WindowSize.TABLET;
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
    // 로딩 처리
    if (loading) return new Array(staticData.length).fill("loading");

    // 단위별로 라벨 그룹화
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

  // 그래프 데이터
  const graphData: ChartData<Chart.ChartData> = {
    labels,
    datasets: [
      {
        label: queryOp.selectStatic,
        data: staticData.map(data => data.price),
        fill: false,
        backgroundColor: getStaticColors(staticData.length),
        hoverBackgroundColor: getStaticColors(staticData.length, {
          light: true
        })
      }
    ]
  };

  Object.assign(graphData, addtionGraphDataset);

  // 오늘날자 통계 선택
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

  // 이번달 매출 통계 선택
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
    <div className="statistic">
      <PageHeader title={LANG("statistics")} desc={LANG("static_page_desc")} />
      <PageBody>
        <div className="statistic__shortBtnsWrap">
          <Button
            onClick={handleTodaySalesStatic}
            label={LANG("today_sales")}
          />
          <Button
            onClick={handleThisMonthSalesStatic}
            label={LANG("this_month_sales")}
          />
          <Button onClick={handleSetDaySalesStatic} label={LANG("day_sales")} />
          <Button
            onClick={handleSetMonthSalesStatic}
            label={LANG("month_sales")}
          />
          <Button
            onClick={handleSetYearSalesStatic}
            label={LANG("year_sales")}
          />
        </div>
        <div className="flex-grid">
          <div className="flex-grid__col col--full-6 col--wmd-12">
            <Card className="statistic__graphCard">
              {loading ? (
                <div className="statistic__graphPreloader">
                  <Preloader
                    wrapClassName=""
                    position="center"
                    noAnimation
                    size={"large"}
                    loading={loading}
                  />
                </div>
              ) : (
                <Fragment>
                  {/* 통계 아이콘랩 */}
                  {!isTabletDown && (
                    <StaticIcons
                      context={context}
                      viewMode={viewMode}
                      setViewMode={setViewMode}
                    />
                  )}
                  {/* 그래프 랩 */}
                  <div
                    className={
                      (viewMode === "list" ? "statistic__table" : undefined) +
                      " statistic__graphWrap"
                    }
                  >
                    <JDgraph
                      originalData={staticData}
                      JDtype={viewMode}
                      data={graphData}
                    />
                  </div>
                </Fragment>
              )}
            </Card>
          </div>
          {windowWidth > WindowSize.TABLET ? (
            <div className="flex-grid__col col--full-6 col--wmd-12">
              <Card>
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
      </PageBody>
      <Preloader floating size={FLOATING_PRELOADER_SIZE} loading={loading} />
    </div>
  );
};

export default reactWindowSize(Statistic);
