import {DayPickerProps} from "react-day-picker";
import React, {useRef, useEffect, Fragment} from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import moment from "moment";
import InputText from "../../../forms/inputText/InputText";
import "moment/locale/ko";
import {isEmpty} from "../../../../utils/utils";
import {LANG} from "../../../../hooks/hook";
// 데이픽커 인풋은 어레인이지를 지원하지 않을려는것만 같다.
// 무리하게 바꾸었는데 잘 동작할지 모르겠다.

interface IProps {
  from?: Date | null;
  to?: Date | null;
  isRange?: boolean;
  readOnly?: boolean;
  canSelectSameDate?: boolean;
  format?: string;
  label?: string;
  showInputIcon: boolean;
  placeholder?: string;
  inputClassName?: string;
  displayYear?: boolean;
  dayPickerProps: DayPickerProps;
  inputComponent?: any;
  disabled?: boolean;
}

// 👿 이 파일은 전체적으로 타입스크립트 작업이 필요하다.
const JDdayPickerInput: React.FC<IProps> = ({
  from,
  to,
  isRange,
  label,
  readOnly,
  showInputIcon,
  dayPickerProps,
  displayYear,
  inputClassName,
  placeholder = LANG("please_select_date"),
  format = displayYear ? "YYYY-MM-DD" : "MM-DD",
  inputComponent: InputComponent,
  disabled,
  ...props
}) => {
  let DayPickerInputRef = useRef<DayPickerInput>(null);
  const isInitialMount = useRef(true);

  const dateForMatter = (
    date: Date | null | undefined,
    inFormat: string,
    locale: string
  ): string => {
    moment.locale(locale);
    if (date) {
      return moment(date).format(inFormat);
    }
    return "";
  };

  const handleWindowClickEvent = () => {
    const dayPickerRef = DayPickerInputRef.current;
    if (dayPickerRef) dayPickerRef.hideDayPicker();
  };

  useEffect(() => {
    // 상황에따라 DatePicker 투글
    // 마운트 전인지 검사
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const dayPickerRef = DayPickerInputRef.current;
    // 화면을 클릭하면 나갈수 달력을 닫도록 해줌
    if (dayPickerRef) {
      if (from && to) {
        dayPickerRef.hideDayPicker();
      } else {
        dayPickerRef.showDayPicker();
      }
    }
  }, [from, to]);

  const valueFormatter = (
    inFrom: Date | null | undefined,
    inTo: Date | null | undefined,
    informat: string,
    locale: string
  ): string => {
    if (isRange) {
      const formatFrom = dateForMatter(inFrom, informat, locale);
      const formatTo = dateForMatter(inTo, informat, locale);

      // 이상하게 return ''는 오류를 일으킨다.
      if (formatFrom === "") return " ";
      if (formatTo === "") return formatFrom;
      return `${formatFrom} ~ ${formatTo}`;
    }
    const formatFrom = dateForMatter(inFrom, informat, locale);
    return `${formatFrom}`;
  };

  const MyComponent = React.forwardRef((prop: any, ref) =>
    InputComponent ? (
      InputComponent(prop)
    ) : (
      <InputText
        ref={ref}
        wrapClassName={"DayPicker__inputWrap"}
        className={`DayPicker__input ${inputClassName}`}
        readOnly={readOnly}
        disabled={disabled}
        label={label}
        icon={label && showInputIcon ? "calendar" : undefined}
        {...props}
        {...prop}
      />
    )
  );

  return (
    <Fragment>
      {/* 😶 REF는 잘 작동하지만 브라우저상 오류를 낸다 이유는... ref가
      그냥 맨껍데기에 적용되서 그렇다는데 아무래도 해결방법은 깃허브에 문의해봐야겠다. */}
      <DayPickerInput
        ref={DayPickerInputRef}
        placeholder={placeholder}
        dayPickerProps={{...dayPickerProps}}
        format={format}
        component={MyComponent}
        hideOnDayClick={!isRange}
        value={valueFormatter(from, to, format, "kr")}
      />
    </Fragment>
  );
};

export default JDdayPickerInput;
