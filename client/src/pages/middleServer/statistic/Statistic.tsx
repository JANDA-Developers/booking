import React, {useState} from "react";
import {Doughnut, Line} from "react-chartjs-2";
import {randomIntFromInterval} from "../../../utils/utils";
import Card from "../../../atoms/cards/Card";
import JDselect from "../../../atoms/forms/selectBox/SelectBox";
import {SELECT_DUMMY_OP} from "../../../types/enum";
import {IQueryOp} from "./StatisticWrap";
import InputText from "../../../atoms/forms/inputText/InputText";
import DayPicker from "react-day-picker";
import JDdayPicker from "../../../atoms/dayPicker/DayPicker";
import {IUseDayPicker} from "../../../actions/hook";
import Button from "../../../atoms/button/Button";
import moment from "moment";
import JDIcon from "../../../atoms/icons/Icons";

interface IProps {
  outData: any[];
  houseId: string;
  setQueryOp: React.Dispatch<React.SetStateAction<IQueryOp>>;
  queryOp: IQueryOp;
  queryDateHook: IUseDayPicker;
}
// refetch 가 Query 컴포넌트 리턴 프로프임

export enum IGraphViewMode {
  list = "list",
  line = "line",
  pie = "pie"
}

const Statistic: React.FC<IProps> = ({
  outData,
  houseId,
  queryOp,
  queryDateHook,
  setQueryOp
}) => {
  const [viewMode, setViewMode] = useState<IGraphViewMode>(IGraphViewMode.pie);

  const addtionGraphDataset =
    viewMode === IGraphViewMode.list
      ? {
          borderColor: "rgba(75,192,192,1)"
        }
      : {};

  const data = {
    labels: ["Red", "Green", "Yellow"],
    datasets: [
      {
        data: [
          randomIntFromInterval(50, 200),
          randomIntFromInterval(100, 150),
          randomIntFromInterval(150, 250)
        ],
        fill: false,
        backgroundColor: ["#CCC", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
      }
    ]
  };

  Object.assign(data, addtionGraphDataset);

  const setDaySalesStatic = () => {
    setQueryOp({
      selectStatic: ""
    });
    queryDateHook.setFrom(
      moment(new Date())
        .add(-1, "day")
        .toDate()
    );
    queryDateHook.setTo(new Date());
  };

  const setMonthSalesStatic = () => {
    setQueryOp({
      selectStatic: ""
    });
    queryDateHook.setFrom(
      moment(new Date())
        .add(-1, "month")
        .toDate()
    );
    queryDateHook.setTo(new Date());
  };

  const setYearSalesStatic = () => {
    setQueryOp({
      selectStatic: ""
    });
    queryDateHook.setFrom(
      moment(new Date())
        .add(-1, "year")
        .toDate()
    );
    queryDateHook.setTo(new Date());
  };

  return (
    <div className="container">
      <div className="docs-section">
        <h3>통계</h3>
        <Button onClick={setDaySalesStatic} label="일매출" />
        <Button onClick={setMonthSalesStatic} label="월매출" />
        <Button onClick={setYearSalesStatic} label="년매출" />
        <div className="flex-grid">
          <div className="flex-grid__col col--full-6">
            <Card fullHeight>
              <div className="statistic__iconsWrap">
                {viewMode === IGraphViewMode.list && (
                  <JDIcon
                    onClick={() => {
                      setViewMode(IGraphViewMode.list);
                    }}
                    selected={viewMode === "list"}
                    hover
                    icon="checkList"
                  />
                )}
                {viewMode === IGraphViewMode.line && (
                  <JDIcon
                    onClick={() => {
                      setViewMode(IGraphViewMode.line);
                    }}
                    selected={viewMode === IGraphViewMode.line}
                    hover
                    icon="graphLine"
                  />
                )}
                {viewMode === IGraphViewMode.pie && (
                  <JDIcon
                    onClick={() => {
                      setViewMode(IGraphViewMode.pie);
                    }}
                    selected={viewMode === IGraphViewMode.pie}
                    hover
                    icon="graphPie"
                  />
                )}
              </div>
              <Doughnut data={data} />
              <Line data={data} />
            </Card>
          </div>
          <div className="flex-grid__col col--full-6">
            <Card fullHeight>
              <h6>통계 변환</h6>
              <div>
                <JDselect
                  onChange={value => {
                    setQueryOp({
                      ...queryOp,
                      selectStatic: value.value
                    });
                  }}
                  options={SELECT_DUMMY_OP}
                  label="통계 보기"
                />
              </div>
              <div>
                <JDdayPicker {...queryDateHook} label="통계날자" input />
              </div>
            </Card>
          </div>
          <div>asasasss</div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
