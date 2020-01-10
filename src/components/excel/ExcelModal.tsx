import React from "react";
import JDmodal from "../../atoms/modal/Modal";
import { IUseModal, useDayPicker, LANG, useSelect } from "../../hooks/hook";
import { Excel, IExcelProps, TMultiColumns } from "./Excel";
import JDdayPicker from "../../atoms/dayPicker/DayPicker";
import JDselect from "../../atoms/forms/selectBox/SelectBox";
import { ExcelExpress } from "../../types/enum";
import { EXCEL_EXPRESS_OP, MAX_PEOPLE_COUNT_OP_FN } from "../../types/const";
import JDpreloader from "../../atoms/preloader/Preloader";
import selectOpCreater from "../../utils/selectOptionCreater";

export interface TExcelGetDataProp {
  mode: ExcelExpress;
  count?: number;
  date?: { from: Date | string; to: Date | string };
}

export interface IExcelModalInfo extends IExcelProps {
  selectData: TMultiColumns[];
  loading?: boolean;
  getData: (prop: TExcelGetDataProp) => void;
}

interface Iprops {
  modalHook: IUseModal<IExcelModalInfo>;
}
const selectOp = selectOpCreater({
  count: 10000,
  labelAdd: LANG("unit"),
  start: 1
});

const ExcelModal: React.FC<Iprops> = ({ modalHook }) => {
  const { data, selectData, loading, getData } = modalHook.info;
  if (!data) return <div />;
  const dateCallDayPicker = useDayPicker(null, null);
  const excelExpressHook = useSelect(EXCEL_EXPRESS_OP[0]);
  const expressMode =
    excelExpressHook.selectedOption?.value || EXCEL_EXPRESS_OP[0];
  const dataLength = (() => {
    if (expressMode === ExcelExpress.SELECT_OP)
      return selectData[0]?.data.length || 0;
    else data[0]?.data.length || 0;
  })();

  const handleDateChange = (from: Date, to: Date) => {
    getData({ mode: ExcelExpress.DATE_OP, date: { from, to } });
  };

  const handleCountChange = (count: number) => {
    getData({ mode: ExcelExpress.COUNT_OP, count });
  };

  if (loading)
    return (
      <JDmodal visibleOverflow {...modalHook}>
        <JDpreloader size="large" />
      </JDmodal>
    );

  return (
    <JDmodal visibleOverflow {...modalHook}>
      <div className="JDz-index-1">
        <JDselect
          {...excelExpressHook}
          options={EXCEL_EXPRESS_OP}
          label={LANG("express_info")}
        />
      </div>
      {expressMode === ExcelExpress.DATE_OP && (
        <div>
          <JDdayPicker
            displayIcon
            canSelectBeforeDay
            label={LANG("express_info")}
            mode="input"
            onChangeDate={handleDateChange}
            {...dateCallDayPicker}
            isRange
          />
        </div>
      )}
      {expressMode === ExcelExpress.COUNT_OP && (
        <div className="JDz-index-1">
          <JDselect
            onChange={v => {
              v;
              handleCountChange(v.value);
            }}
            selectOp={selectOp}
            options={MAX_PEOPLE_COUNT_OP_FN(1000)}
            label={LANG("express_count")}
          />
        </div>
      )}
      {expressMode !== ExcelExpress.COUNT_OP && (
        <div className="JDstandard-margin-bottom">
          {`${LANG("express_count")}: `}
          {dataLength}
        </div>
      )}
      <div className="JDmodal__endSection">
        <Excel
          data={expressMode === ExcelExpress.SELECT_OP ? selectData : data}
        />
      </div>
    </JDmodal>
  );
};

export default ExcelModal;
