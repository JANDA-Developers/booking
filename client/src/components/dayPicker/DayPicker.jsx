import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import PropTypes from 'prop-types';
import Caption from './Caption';
import Information from './Information';
import Navbar from './Navbar';
import HorizenDay from './horizen/HorizenDays';
import HorizenCaption from './horizen/HorizenCaption';
import './DayPicker.scss';

// ────────────────────────────────────────────────────────────────────────────────

class JDdayPicker extends React.Component {
  static propTypes = {
    horizen: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    const classes = [''];
    if (props.horizen) classes.push('DayPicker--horizen');

    this.box = React.createRef();

    this.state = {
      classes,
      from: null,
      enteredTo: null,
    };
  }

  componentDidMount() {
    const { horizen } = this.props;
    if (horizen) {
      const Months = this.box.current.querySelector('.DayPicker-Months');
      const today = Months.querySelector('.DayPicker-Day--today');
      const todayOffestX = today.offsetLeft;
      Months.scrollLeft = todayOffestX - Months.offsetWidth / 2 + 40;
    }
  }

  handleDayMouseEnter = (day) => {
    const { from, to } = this.state;
    if (!this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        enteredTo: day,
      });
    }
  };

  // 첫번째 날자를 선택하였다면
  isSelectingFirstDay = (from, to, day) => {
    this.isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isRangeSelected = from && to;
    return !from || this.isBeforeFirstDay || isRangeSelected;
  };

  // 날자 클릭 이벤트
  handleDayClick = (day, modifiers) => {
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
  };

  // 리셋버튼 클릭 이벤트
  handleResetClick = () => {
    this.setState({
      from: null,
      enteredTo: null,
    });
  };

  render() {
    const {
      from, to, enteredTo, classes,
    } = this.state;
    const { horizen } = this.props;
    const modifiers = { start: from, end: enteredTo };
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
      <div ref={this.box}>
        <DayPicker
          renderDay={horizen ? HorizenDay : undefined}
          navbarElement={<Navbar />}
          weekdayElement={horizen ? undefined : undefined}
          showWeekDays={!horizen}
          captionElement={({ date }) => {
            const element = horizen ? (
              <HorizenCaption date={date} onChange={this.handleYearMonthChange} />
            ) : (
              <Caption date={date} onChange={this.handleYearMonthChange} />
            );
            return element;
          }}
          className={`Range ${classes.join(' ')}`}
          fromMonth={from}
          selectedDays={selectedDays}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
          onDayMouseEnter={this.handleDayMouseEnter}
          onDayFocus={this.handleDayFocus}
          numberOfMonths={horizen ? 3 : 1}
          pagedNavigation
          months={MONTHS}
          weekdaysLong={WEEKDAYS_LONG}
          weekdaysShort={WEEKDAYS_SHORT}
          showOutsideDays={false}
          disabledDays={[{ before: new Date() }]}
        />
        <Information from={from} to={to} handler={this.handleDayMouseEnter} />
      </div>
    );
  }
}

JDdayPicker.defaultProps = {
  horizen: false,
};

export default JDdayPicker;
