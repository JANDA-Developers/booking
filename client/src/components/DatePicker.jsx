// 이곳에서 제가 전달한 프로퍼티가 아닌이상 굳이 벨리데이션 하지 않겠습니다.
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import './DatePicker.scss';
import PropTypes from 'prop-types';
import Button from '../atoms/Buttons';

// ────────────────────────────────────────────────────────────────────────────────

class DatePicker extends React.Component {
  static propTypes = {
    classes: PropTypes.arrayOf(PropTypes.string),
  };

  constructor(props) {
    super(props);

    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
    this.classes = props.classes;
  }

  getInitialState() {
    return {
      from: null,
      to: null,
      enteredTo: null, // Keep track of the last day for mouseEnter.
    };
  }

  isSelectingFirstDay(from, to, day) {
    this.isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isRangeSelected = from && to;
    return !from || this.isBeforeFirstDay || isRangeSelected;
  }

  handleDayClick(day, modifiers) {
    console.log(this);
    if (modifiers.disabled) return;
    const { from, to } = this.state;
    if (from && to && day >= from && day <= to) {
      this.handleResetClick();
      return;
    }
    if (this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        from: day,
        to: null,
        enteredTo: null,
      });
    } else {
      this.setState({
        to: day,
        enteredTo: day,
      });
    }
  }

  handleDayMouseEnter(day) {
    if (this.classes.includes('DayPicker-Day--disabled')) return;
    const { from, to } = this.state;
    if (!this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        enteredTo: day,
      });
    }
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }

  render() {
    const { from, to, enteredTo } = this.state;
    const modifiers = { start: from, end: enteredTo };
    const disabledDays = { before: from };
    const selectedDays = [from, { from, to: enteredTo }];

    /* ----------------------------------- 설정 ----------------------------------- */
    // http://react-day-picker.js.org/docs/localization

    const MONTHS = [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ];
    const WEEKDAYS_LONG = ['월', '화', '수', '목', '금', '토', '일'];
    const WEEKDAYS_SHORT = ['월', '화', '수', '목', '금', '토', '일'];

    /* -------------------------------------------------------------------------- */

    return (
      <div>
        <DayPicker
          className="Range"
          numberOfMonths={2}
          fromMonth={from}
          selectedDays={selectedDays}
          disabledDays={disabledDays}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
          onDayMouseEnter={this.handleDayMouseEnter}
          onDayFocus={this.handleDayFocus}
          className={this.classes.join(' ')}
          numberOfMonths={1}
          months={MONTHS}
          weekdaysLong={WEEKDAYS_LONG}
          weekdaysShort={WEEKDAYS_SHORT}
          navbarElement={<Navbar />}
          disabledDays={[{ before: new Date() }]}
        />
        <JDdatePcikerInformation from={from} to={to} handler={this.handleDayMouseEnter} />
      </div>
    );
  }
}

DatePicker.defaultProps = {
  classes: [''],
};
// ────────────────────────────────────────────────────────────────────────────────

/* -------------------------------------------------------------------------- */

/* -------------------------- DatePcikerInformation ------------------------- */
const JDdatePcikerInformation = ({ from, to, handler }) => (
  <div className="JDdatePcikerInformation">
    {!from && !to && '체크인 날자를 선택해 주세요.'}
    {from && !to && '체크아웃 날자를 선택해 주세요.'}
    {from
      && to
      && ` ${from.toLocaleDateString()} 체크인
                ${to.toLocaleDateString()}`}
    {' '}
    {from && to && '체크아웃'}
  </div>
);
/* -------------------------------------------------------------------------- */

/* --------------------------------- NAVBAR --------------------------------- */
// http://react-day-picker.js.org/examples/elements-navbar

const Navbar = ({
  nextMonth,
  previousMonth,
  onPreviousClick,
  onNextClick,
  className,
  localeUtils,
}) => {
  const months = localeUtils.getMonths();
  const prev = months[previousMonth.getMonth()];
  const next = months[nextMonth.getMonth()];

  // 단순 변환 함수
  const JDMonthTextChanger = (englishMonth) => {
    if (englishMonth === 'December') return '12월';
    if (englishMonth === 'November') return '11월';
    if (englishMonth === 'October') return '10월';
    if (englishMonth === 'September') return '9월';
    if (englishMonth === 'August') return '8월';
    if (englishMonth === 'July') return '7월';
    if (englishMonth === 'June') return '6월';
    if (englishMonth === 'May') return '5월';
    if (englishMonth === 'April') return '4월';
    if (englishMonth === 'March') return '3월';
    if (englishMonth === 'February') return '2월';
    if (englishMonth === 'January') return '1월';
    console.err('JDMonthTextChanger');
    return '';
  };

  return (
    <div className={className}>
      <Button
        label={JDMonthTextChanger(prev)}
        classes={['JDbtn--flat', 'DayPicker-NavBar__button', 'DayPicker-NavBar__button--left']}
        onClick={() => onPreviousClick()}
      />
      {/* <button
        className="DayPicker-NavBar__button DayPicker-NavBar__button--left"
        type="button"
        onClick={() => onPreviousClick()}
      >
        {JDMonthTextChanger(prev)}
      </button>
      <button
        className="DayPicker-NavBar__button DayPicker-NavBar__button--right"
        type="button"
        onClick={() => onNextClick()}
      >
        {JDMonthTextChanger(next)}
      </button> */}
      <Button
        label={JDMonthTextChanger(next)}
        classes={['JDbtn--flat', 'DayPicker-NavBar__button', 'DayPicker-NavBar__button--right']}
        onClick={() => onNextClick()}
      />
    </div>
  );
};
// ────────────────────────────────────────────────────────────────────────────────

export default DatePicker;
