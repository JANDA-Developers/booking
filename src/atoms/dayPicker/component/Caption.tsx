import React from "react";
import PropTypes from "prop-types";
import {JDMonthTextChanger} from "../../../utils/utils";

interface IProps {
  date: Date;
  [foo: string]: any;
}

const JDdateCaption: React.SFC<IProps> = ({date}) => {
  const month = JDMonthTextChanger(date.getMonth());
  const year = date.getFullYear();
  return (
    <div className="DayPicker-Caption">
      <span className="DayPicker-Caption__year">{year}</span>
      <span className="DayPicker-Caption__month">{month}</span>
    </div>
  );
};

JDdateCaption.defaultProps = {
  date: new Date()
};

export default JDdateCaption;
