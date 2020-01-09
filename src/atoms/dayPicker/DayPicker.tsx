import React, { Fragment, useRef, useState, useEffect } from "react";
import DayPicker, {
  CaptionElementProps,
  DayModifiers,
  DayPickerProps
} from "react-day-picker";
import classNames from "classnames";
import Caption from "./component/Caption";
import Information from "./component/Information";
import Navbar from "./component/Navbar";
import JDdayPickerInput from "./component/input/JDdayPickerInput";
import HorizenDay from "./component/horizen/HorizenDays";
import HorizenCaption from "./component/horizen/HorizenCaption";
import "./DayPicker.scss";
import { IUseDayPicker } from "../../hooks/hook";
import { getDateCharLang } from "./helper";
import { JDatomExtentionSet } from "../../types/interface";
import { JDmbClass, JDmrClass } from "../../utils/autoClasses";
import moment from "moment";

export interface IJDdayPickerProps extends IUseDayPicker, JDatomExtentionSet {
  canSelectBeforeDay?: boolean;
  placeholder?: string;
  mode?: "horizen" | "input" | "checkInOutStyle";
  label?: string;
  readOnly?: boolean;
  isRange?: boolean;
  displayYear?: boolean;
  canSelectSameDate?: boolean;
  format?: string;
  lang?: string;
  displayIcon?: boolean;
  inputDisabled?: boolean;
  maxLimit?: boolean;
  showWeekEndColor?: boolean;
  inputComponent?: any;
  onChangeDate?(foo?: string | Date | null, foo2?: string | Date | null): void;
  className?: string;
  inputClassName?: string;
  calenaderPosition?: "left" | "right" | "center";
  displayCaption?: boolean;
  displayHeader?: boolean;
  displayInfo?: boolean;
}

const JDdayPicker: React.FC<IJDdayPickerProps> = React.memo(
  ({
    mode,
    calenaderPosition = "right",
    isRange = true,
    label,
    inputDisabled,
    onChangeDate,
    canSelectSameDate = true,
    displayIcon = true,
    displayCaption = true,
    displayHeader = true,
    displayInfo = false,
    format,
    placeholder,
    lang = "ko",
    from,
    setFrom,
    to,
    setTo,
    entered,
    displayYear = true,
    canSelectBeforeDay,
    inputClassName,
    inputComponent,
    setEntered,
    maxLimit,
    readOnly,
    showWeekEndColor = true,
    className,
    mr,
    mb
  }) => {
    const dayPickerFullWrap: any = useRef();
    const isInitialMount = useRef(true);

    const isHorizen = mode === "horizen";
    // 리셋버튼 클릭 이벤트
    const handleResetClick = () => {
      setFrom(null);
      setTo(null);
      setEntered(null);
    };

    // From을 SET 할지 TO를 SET 할지 물어봄
    const isFromSelect = (inFrom: any, inTo: any, day: any) => {
      // From 이전의 날자를 선택했다면
      const isBeforeFirstDay =
        inFrom && DayPicker.DateUtils.isDayBefore(day, inFrom);
      // From과 To 가 ⭐️이미️️️⭐️ 존재하는가?
      const isRangeSelected = inFrom && inTo;
      return !inFrom || isBeforeFirstDay || isRangeSelected;
    };

    // handle --day : Enter
    const handleDayMouseEnter = (day: Date) => {
      if (!isFromSelect(from, to, day)) setEntered(day);
    };

    // handle --day : Click
    const handleDayClick = (day: Date, modifiers: DayModifiers) => {
      if (readOnly) return;
      // 불가능한 날자를 눌럿을경우에
      if (modifiers.disabled) return;

      // 같은날을 선택할수 없는경우에
      if (from && !canSelectSameDate && day <= from) {
        handleResetClick();
        return;
      }

      // 범위선택이 아닌 경우에
      if (!isRange) {
        setFrom(day);
        setEntered(day);
        setTo(day);
        return;
      }

      // 이미 선택된 날을 눌렀을경우에
      if (from && to && day >= from && day <= to) {
        handleResetClick();
        return;
      }

      // 첫선택 인가?
      if (isFromSelect(from, to, day)) {
        // 첫날을 셋팅하고 나머지날자는 널 기입
        setFrom(day);
        setEntered(null);
        setTo(null);
      } else {
        setTo(day);
        setEntered(day);
      }
    };

    // Effect : calendar With Set
    useEffect(() => {
      if (isHorizen) {
        const Months = dayPickerFullWrap.current.querySelector(
          ".DayPicker-Months"
        );
        const today = Months.querySelector(".DayPicker-Day--today");
        const todayOffestX = today.offsetLeft;
        Months.scrollLeft = todayOffestX - Months.offsetWidth / 2 + 40;
      }
    }, []);

    useEffect(() => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
      }
      onChangeDate && onChangeDate(from, to);
    }, [from, to]);

    // 여기다가 클래스 적립
    const wrapClasses = classNames("DayPicker-box", className, {
      "DayPicker-box--inputComponent": inputComponent,
      "DayPicker--readOnly": readOnly,
      "DayPicker--reservation": mode === "checkInOutStyle",
      "DayPicker--showWeekEndColor": showWeekEndColor,
      "DayPicker--unDisplayCaption": displayCaption === false,
      "DayPicker--unDisplayNavbar": displayHeader === false,
      "DayPicker--unDisplayInfo": displayInfo === false,
      ...JDmbClass(mb),
      ...JDmrClass(mr)
    });

    // 이건 순수하게 달력부분
    const classes = classNames({
      "DayPicker--horizen": isHorizen,
      "DayPicker--input": mode === "input",
      "DayPicker--maxLimit": maxLimit,
      "DayPicker--unYear": !displayYear,
      "DayPicker--unRange": !isRange,
      "DayPicker--right": calenaderPosition === "right",
      "DayPicker--left": calenaderPosition === "left",
      "DayPicker--center": calenaderPosition === "left"
    });

    const { MONTHS, WEEKDAYS_LONG, WEEKDAYS_SHORT } = getDateCharLang();

    const modifiers = { start: from || undefined, end: entered || undefined };
    const selectedDays: any = [from, { from, to: entered }];

    // 이부분 함수 또는 이넘으로 변경

    const horizenProps =
      mode === "horizen"
        ? {
            renderDay: HorizenDay,
            numberOfMonths: 3,
            showWeekDays: false,
            captionElement: ({ date }: CaptionElementProps) => (
              <HorizenCaption date={date} onChange={() => {}} />
            )
          }
        : {};

    const dayPickerProps: DayPickerProps = {
      tabIndex: 1,
      renderDay: undefined,
      numberOfMonths: 1,
      showWeekDays: true,
      captionElement: ({ date }: CaptionElementProps) => (
        <Caption displayYear={displayYear} date={date} />
      ),
      navbarElement: <Navbar />,
      className: `Range ${classes}`,
      selectedDays,
      modifiers,
      onDayClick: handleDayClick,
      onDayMouseEnter: handleDayMouseEnter,
      pagedNavigation: true,
      months: MONTHS,
      weekdaysLong: WEEKDAYS_LONG,
      weekdaysShort: WEEKDAYS_SHORT,
      locale: lang,
      showOutsideDays: false,
      disabledDays: canSelectBeforeDay ? undefined : [{ before: new Date() }],
      ...horizenProps
    };

    return (
      <div className={`${wrapClasses}`} ref={dayPickerFullWrap}>
        {mode === "input" ? (
          <JDdayPickerInput
            displayIcon={displayIcon}
            InputComponent={inputComponent}
            placeholder={placeholder}
            format={format}
            disabled={inputDisabled}
            from={from}
            to={to}
            label={label}
            readOnly={readOnly}
            isRange={isRange}
            dayPickerProps={dayPickerProps}
            inputClassName={inputClassName}
            displayYear={displayYear}
          />
        ) : (
          <Fragment>
            <Information from={from} to={to} handler={handleDayMouseEnter} />
            <DayPicker {...dayPickerProps} />
          </Fragment>
        )}
      </div>
    );
  }
);

export default JDdayPicker;
