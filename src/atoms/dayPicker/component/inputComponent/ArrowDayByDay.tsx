import React, { Fragment } from "react";
import JDIcon from "../../../icons/Icons";
import { IUseDayPicker, LANG } from "../../../../hooks/hook";
import moment from "moment";
import "./ArrowDayByDay.scss";


interface Iprops {
  dayPickerHook: IUseDayPicker;
  format?: string;
}

const ArrowDayByDay: React.FC<Iprops> = ({
  dayPickerHook,
  format = `MM${LANG("month")} DD${LANG("date")}`,
  ...props
}) => {
  const handleDayPickerArrow = (direction: "prev" | "next") => {
    const directionNum = direction === "prev" ? -1 : 1;
    dayPickerHook.setDate(
      moment(dayPickerHook.from || undefined)
        .add(directionNum, "days")
        .toDate()
    );
  };

  return (
    <div className="arrowDayByDay">
      <JDIcon
        hover
        className="DayPicker-box--inputComponent__arrow DayPicker-box--inputComponent__arrow--left"
        onClick={e => {
          e.preventDefault();
          handleDayPickerArrow("prev");
        }}
        size="small"
        icon="arrowLeft"
      />
      <span {...props}>
        {moment(dayPickerHook.from || new Date()).format(format)}
      </span>
      <JDIcon
        hover
        size="small"
        className="DayPicker-box--inputComponent__arrow DayPicker-box--inputComponent__arrow--right"
        onClick={e => {
          e.stopPropagation();
          handleDayPickerArrow("next");
        }}
        icon="arrowRight"
      />
    </div>
  );
};

export default ArrowDayByDay;
