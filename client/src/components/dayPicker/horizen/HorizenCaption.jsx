import React from 'react';
import PropTypes from 'prop-types';
import { JDMonthTextChanger, JDWeekChanger } from '../../../utils/utils';

function HorizeCaption({ date }) {
  const firstDate = date;
  const lastMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  lastMonth.setDate(0);
  const lastDay = lastMonth.getDate();
  const firstWeek = date.getDay();
  console.log(firstWeek);
  const month = JDMonthTextChanger(firstDate.getMonth());
  const year = firstDate.getFullYear();
  const weeks = [];

  console.log(lastDay);
  for (let i = 0; i < lastDay; i += 1) {
    const dayWeek = firstWeek + i;
    weeks.push(JDWeekChanger(dayWeek));
  }

  return (
    <div className="DayPicker-Caption">
      <div className="DayPicker-Caption__year">{year}</div>
      <div className="DayPicker-Caption__month">{month}</div>
      {weeks.map(value => (
        <div className="DayPicker-Caption__week">{value}</div>
      ))}
    </div>
  );
}

HorizeCaption.propTypes = {
  date: PropTypes.instanceOf(Date),
};

HorizeCaption.defaultProps = {
  date: new Date(),
};

export default HorizeCaption;
