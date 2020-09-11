import React from "react";
import { useSelect } from "@janda-com/front";
import moment from "moment";
import { TElements } from "@janda-com/front/build/types/interface";

interface IPriceTableCaption {
  date: Date;
  ToolElement: () => TElements;
}

const DUMMY_OPS = [
  {
    label: "민들레방1",
    value: "asdasdqwcv123123"
  },
  {
    label: "민들레방2",
    value: "asdasdqwcv2123123"
  },
  {
    label: "민들레방3",
    value: "asdasdqwcv1323123"
  },
  {
    label: "민들레방4",
    value: "asdasdqwcv4123123"
  }
];

const PriceTableCaption: React.FC<IPriceTableCaption> = ({
  date,
  ToolElement
}) => {
  const roomSelectHook = useSelect(DUMMY_OPS[0], DUMMY_OPS);

  return (
    <div className="DayPicker-Caption">
      <div className="DayPicker-Caption__time">
        <span className="DayPicker-Caption__year">
          {moment(date).format("YYYY")}.
        </span>
        <span className="DayPicker-Caption__month">
          {moment(date).format("MM")}
        </span>
      </div>
      <div className="DayPicker-Caption__btnList">{ToolElement()}</div>
    </div>
  );
};

export default PriceTableCaption;
