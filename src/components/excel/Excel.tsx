import React from "react";
// @ts-ignore
import ReactExport from "react-export-excel";
import Button from "../../atoms/button/Button";
import { JDcolumn } from "../../atoms/table/Table";
import { useModal } from "../../hooks/hook";
import { ExcelExpress } from "../../types/enum";
import { isEmpty } from "../../utils/utils";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const dummy = [
  {
    columns: ["Headings", "Text Style", "Colors"],
    data: [
      [
        {
          value: "H1",
          style: { font: { sz: "24", bold: true } },
          width: "1000"
        },
        { value: "Bold", style: { font: { bold: true } } },
        {
          value: "Red",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "FFFF0000" } }
          }
        }
      ],
      [
        { value: "H2", style: { font: { sz: "18", bold: true } } },
        {
          value: "underline12222222222222SS",
          style: { font: { underline: true } }
        },
        {
          value: "Blue",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "FF0000FF" } }
          }
        }
      ],
      [
        { value: "H3", style: { font: { sz: "14", bold: true } } },
        { value: "italic", style: { font: { italic: true } } },
        {
          value: "Green",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "FF00FF00" } }
          }
        }
      ],
      [
        { value: "H4", style: { font: { sz: "12", bold: true } } },
        { value: "strike", style: { font: { strike: true } } },
        {
          value: "Orange",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "FFF86B00" } }
          }
        }
      ],
      [
        { value: "H5", style: { font: { sz: "10.5", bold: true } } },
        { value: "outline", style: { font: { outline: true } } },
        {
          value: "Yellow",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "FFFFFF00" } }
          }
        }
      ],
      [
        { value: "H6", style: { font: { sz: "7.5", bold: true } } },
        { value: "shadow", style: { font: { shadow: true } } },
        {
          value: "Light Blue",
          style: {
            fill: { patternType: "solid", fgColor: { rgb: "FFCCEEFF" } }
          }
        }
      ]
    ]
  }
];

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
        <ExcelSheet dataSet={dummy} name="Organization" />
      </ExcelFile>
    </div>
  );
};

// 데이터 예시
