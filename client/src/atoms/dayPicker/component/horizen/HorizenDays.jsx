import React from 'react';

const HorizenDay = (day) => {
  const date = day.getDate();
  let Month = day.getMonth() + 1;

  if (Month === 0) Month = 12;

  return (
    <div className="DayPicker-Day">
      {date}
      <span className="DayPicker-Day__month">{` / ${Month}`}</span>
    </div>
  );
};

export default HorizenDay;
