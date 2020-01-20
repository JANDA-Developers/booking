import React from "react";
// @ts-ignore
import ReactExport from "react-export-excel";
import Button from "../../atoms/button/Button";
import { isEmpty } from "../../utils/utils";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export type TMultiColumnData = {
  value: string;
  style?: any;
}[];

export type TMultiColumns = {
  columns: string[];
  data: TMultiColumnData[];
};

export interface IExcelProps {
  data: TMultiColumns[];
  element?: JSX.Element;
}

export const Excel: React.FC<IExcelProps> = ({ data: datas, element }) => {
  return (
    <div>
      <ExcelFile
        element={
          element || (
            <Button
              disabled={isEmpty(datas)}
              mode="flat"
              thema="primary"
              size="long"
              label="excel_express"
              icon="download"
            />
          )
        }
      >
        <ExcelSheet dataSet={datas} name="Organization" />
      </ExcelFile>
    </div>
  );
};

// 데이터 예시
