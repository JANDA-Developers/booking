import React, {
  Fragment, useRef, useState, useEffect,
} from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Caption from './Caption';
import Information from './Information';
import Navbar from './Navbar';
import DayPickerInput from './input/Input';
import HorizenDay from './horizen/HorizenDays';
import HorizenCaption from './horizen/HorizenCaption';
import './DayPicker.scss';

const JDdayPicker = ({
  horizen, input, isRange, label,
}) => {
  const dayPickerFullWrap = useRef(null);
  const [selectFrom, setSelectFrom] = useState(null);
  const [entered, setEntered] = useState(null);
  const [to, setTo] = useState(null);

  // 리셋버튼 클릭 이벤트
  const handleResetClick = () => {
    setSelectFrom(null);
    setEntered(null);
  };

  // Util
  const isSelectingFirstDay = (from, inTo, day) => {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isRangeSelected = from && inTo;
    return !from || isBeforeFirstDay || isRangeSelected;
  };

  // handle --day : Enter
  const handleDayMouseEnter = (day) => {
    if (!isSelectingFirstDay(selectFrom, to, day)) setEntered(day);
  };

  // handle --day : Click
  const handleDayClick = (day, modifiers) => {
    if (modifiers.disabled) return;
    if (selectFrom && to && day >= selectFrom && day <= to) {
      handleResetClick();
      return;
    }
    if (isSelectingFirstDay(selectFrom, to, day)) {
      setSelectFrom(day);
      setEntered(null);
      setTo(null);
    } else {
      setTo(day);
      setEntered(day);
    }
  };

  // Effect : calendar With Set
  useEffect(() => {
    if (horizen) {
      const Months = dayPickerFullWrap.current.querySelector('.DayPicker-Months');
      const today = Months.querySelector('.DayPicker-Day--today');
      const todayOffestX = today.offsetLeft;
      Months.scrollLeft = todayOffestX - Months.offsetWidth / 2 + 40;
    }
  }, []);

  const classes = classNames({
    'DayPicker--horizen': horizen,
    'DayPicker--input': input,
  });

  const modifiers = { start: selectFrom, end: entered };
  const selectedDays = [selectFrom, { from: selectFrom, to: entered }];
  const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const WEEKDAYS_LONG = ['월', '화', '수', '목', '금', '토', '일'];
  const WEEKDAYS_SHORT = ['월', '화', '수', '목', '금', '토', '일'];

  // TODO : 너무 아슬아슬하게 결합되어있다 분리가 필요함
  const dayPickerProps = {
    renderDay: horizen ? HorizenDay : undefined,
    navbarElement: <Navbar />,
    weekdayElement: horizen ? undefined : undefined,
    showWeekDays: !horizen,
    captionElement: ({ date }) => {
      const element = horizen ? (
        <HorizenCaption date={date} onChange={() => {}} />
      ) : (
        <Caption date={date} onChange={() => {}} />
      );
      return element;
    },
    className: `Range ${classes}`,
    fromMonth: selectFrom,
    selectedDays: isRange ? selectedDays : undefined,
    modifiers,
    onDayClick: isRange ? handleDayClick : undefined,
    onDayMouseEnter: handleDayMouseEnter,
    onDayFocus: () => {},
    numberOfMonths: horizen ? 3 : 1,
    pagedNavigation: true,
    months: MONTHS,
    weekdaysLong: WEEKDAYS_LONG,
    weekdaysShort: WEEKDAYS_SHORT,
    showOutsideDays: false,
    disabledDays: [{ before: new Date() }],
  };
  return (
    <div className="DayPicker-box" ref={dayPickerFullWrap}>
      {input ? (
        <DayPickerInput isRange={isRange} label={label} dayPickerProps={dayPickerProps} />
      ) : (
        <Fragment>
          <DayPicker {...dayPickerProps} />
          <Information from={selectFrom} to={to} handler={handleDayMouseEnter} />
        </Fragment>
      )}
    </div>
  );
};

JDdayPicker.propTypes = {
  horizen: PropTypes.bool,
  input: PropTypes.bool,
  isRange: PropTypes.bool,
};

JDdayPicker.defaultProps = {
  horizen: false,
  input: false,
  isRange: true,
};

export default JDdayPicker;
