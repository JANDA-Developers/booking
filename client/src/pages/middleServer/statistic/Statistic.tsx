import React, {useState} from "react";
import {Doughnut} from "react-chartjs-2";
import {randomIntFromInterval} from "../../../utils/utils";

interface IProps {
  outData: any[];
  houseId: string;
}
// refetch 가 Query 컴포넌트 리턴 프로프임

const Statistic: React.FC<IProps> = ({outData, houseId}) => {
  const [state, setstate] = useState(outData);

  const data = {
    labels: ["Red", "Green", "Yellow"],
    datasets: [
      {
        data: [
          randomIntFromInterval(50, 200),
          randomIntFromInterval(100, 150),
          randomIntFromInterval(150, 250)
        ],
        backgroundColor: ["#CCC", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
      }
    ]
  };

  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};

export default Statistic;
