import React from 'react';
import PropTypes from 'prop-types';
import { JDMonthTextChanger } from '../../utils/utils';

function JDdateCaption({ date }) {
  const month = JDMonthTextChanger(date.getMonth());
  const year = date.getFullYear();
  return (
    <div className="DayPicker-Caption">
      <span className="DayPicker-Caption__year">{year}</span>
      <span className="DayPicker-Caption__month">{month}</span>
    </div>
  );
}

JDdateCaption.propTypes = {
  date: PropTypes.instanceOf(Date),
};

JDdateCaption.defaultProps = {
  date: new Date(),
};

export default JDdateCaption;
