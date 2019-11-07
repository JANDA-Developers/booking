import React from "react";
import {Doughnut, ChartData, ChartComponentProps, Line} from "react-chartjs-2";
import * as chartjs from "chart.js";
import {LANG} from "../../hooks/hook";
import {isEmpty} from "../../utils/utils";
import JDtable, {ReactTableDefault} from "../table/Table";
import {CellInfo} from "react-table";

interface Iprops extends ChartComponentProps {
  JDtype: chartjs.ChartType | "list";
  originalData?: any[];
}

const JDgraph: React.FC<Iprops> = ({JDtype, data, originalData, ...prop}) => {
  const defaultDataSets = {
    labels: [LANG("none_data")],
    datasets: [
      {
        data: [1],
        backgroundColor: "#CFCFCF",
        hoverBackgroundColor: "#b8b8b8"
      }
    ]
  };

  const dataset = isEmpty(originalData) ? defaultDataSets : data;

  const columns = [
    {
      Header: LANG("division"),
      accessor: "data",
      Cell: ({value, original, index}: CellInfo) => {
        // @ts-ignore
        return <div>{dataset.labels[index]}</div>;
      }
    },
    {
      Header: LANG("sales"),
      accessor: "data",
      Cell: ({value, original}: CellInfo) => {
        return <div>{original}</div>;
      }
    }
  ];

  switch (JDtype) {
    case "doughnut":
      return <Doughnut data={dataset} {...prop} />;
    case "line":
      return <Line data={dataset} {...prop} />;
    case "list":
      return (
        <JDtable
          {...ReactTableDefault}
          // @ts-ignore
          data={dataset.datasets ? dataset.datasets[0].data || [] : []}
          columns={columns}
        />
      );
    default:
      return <div />;
  }
};

export default JDgraph;
