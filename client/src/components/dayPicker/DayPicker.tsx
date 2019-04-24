import React, {
  Fragment, useRef, useState, useEffect,
} from 'react';
import DayPicker, {
  Modifiers, CaptionElementProps, DayModifiers, DayPickerProps, Modifier,
} from 'react-day-picker';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Caption from './Caption';
import Information from './Information';
import Navbar from './Navbar';
import DayPickerInput from './input/JDdayPickerInput';
import HorizenDay from './horizen/HorizenDays';
import HorizenCaption from './horizen/HorizenCaption';
import './DayPicker.scss';
import { IUseDayPicker } from '../../actions/hook';

interface IProps extends IUseDayPicker {
  horizen?: boolean;
  placeholder?: string;
  input?: boolean;
  label?: string;
  isRange?: boolean;
  canSelectSameDate?: boolean;
  format?: string;
  lang?: string;
  onChange(foo?: string | Date | null, foo2?: string | Date | null): void;
}

const JDdayPicker: React.SFC<IProps> = ({
  horizen,
  input,
  isRange = true,
  label,
  onChange,
  canSelectSameDate,
  format,
  placeholder,
  lang = 'ko',
  from,
  setFrom,
  to,
  setTo,
  entered,
  setEntered,
}) => {
  const dayPickerFullWrap: any = useRef();

  // 리셋버튼 클릭 이벤트
  const handleResetClick = () => {
    setFrom(null);
    setTo(null);
    setEntered(null);
  };

  // From을 SET 할지 TO를 SET 할지 물어봄
  const isSelectingFromDay = (inFrom: any, inTo: any, day: any) => {
    // From 이전의 날자를 선택했다면
    const isBeforeFirstDay = inFrom && DayPicker.DateUtils.isDayBefore(day, inFrom);
    // From과 To 가 ⭐️이미️️️⭐️ 존재하는가?
    const isRangeSelected = inFrom && inTo;
    return !inFrom || isBeforeFirstDay || isRangeSelected;
  };

  // handle --day : Enter
  const handleDayMouseEnter = (day: Date) => {
    if (!isSelectingFromDay(from, to, day)) setEntered(day);
  };

  // handle --day : Click
  const handleDayClick = (day: Date, modifiers: DayModifiers) => {
    if (modifiers.disabled) return;
    if (from && to && day >= from && day <= to) {
      handleResetClick();
      return;
    }

    // 첫선택 인가?
    if (isSelectingFromDay(from, to, day)) {
      // 첫날을 셋팅하고 나머지날자는 널 기입
      setFrom(day);
      setEntered(null);
      setTo(null);
    } else {
      // 마지막 날에 값 기입
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

  useEffect(() => {
    onChange(entered, to);
  }, [entered, to]);

  const classes = classNames({
    'DayPicker--horizen': horizen,
    'DayPicker--input': input,
  });

  const modifiers = { start: from, end: entered };
  const selectedDays: any = [from, { from, to: entered }];
  const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const WEEKDAYS_LONG = ['월', '화', '수', '목', '금', '토', '일'];
  const WEEKDAYS_SHORT = ['월', '화', '수', '목', '금', '토', '일'];

  // TODO : 너무 아슬아슬하게 결합되어있다 분리가 필요함
  const dayPickerProps: DayPickerProps = {
    renderDay: horizen ? HorizenDay : undefined,
    navbarElement: <Navbar />,
    weekdayElement: horizen ? undefined : undefined,
    showWeekDays: !horizen,
    captionElement: ({ date }: CaptionElementProps) => {
      const element = horizen ? (
        <HorizenCaption date={date} onChange={() => {}} />
      ) : (
        <Caption date={date} onChange={() => {}} />
      );
      return element;
    },
    className: `Range ${classes}`,
    fromMonth: from || undefined,
    selectedDays: isRange ? selectedDays : undefined,
    modifiers,
    onDayClick: isRange ? handleDayClick : undefined,
    onDayMouseEnter: handleDayMouseEnter,
    numberOfMonths: horizen ? 3 : 1,
    pagedNavigation: true,
    months: MONTHS,
    weekdaysLong: WEEKDAYS_LONG,
    weekdaysShort: WEEKDAYS_SHORT,
    locale: lang,
    showOutsideDays: false,
    disabledDays: [{ before: new Date() }],
  };

  return (
    <div className="DayPicker-box" ref={dayPickerFullWrap}>
      {input ? (
        <DayPickerInput
          placeholder={placeholder}
          format={format}
          from={from}
          to={to}
          label={label}
          isRange={isRange}
          dayPickerProps={dayPickerProps}
        />
      ) : (
        <Fragment>
          <DayPicker {...dayPickerProps} />
          <Information from={from} to={to} handler={handleDayMouseEnter} />
        </Fragment>
      )}
    </div>
  );
};

export default JDdayPicker;
