import DayPicker, { DayPickerProps, DayPickerInputProps } from 'react-day-picker';
import React, {
  useState, useRef, Ref, useEffect, Fragment,
} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import InputText from '../../../atoms/forms/InputText';
import 'moment/locale/ko';
import { isEmpty } from '../../../utils/utils';
import JDLabel from '../../../atoms/label/JDLabel';
// 데이픽커 인풋은 어레인이지를 지원하지 않을려는것만 같다.
// 무리하게 바꾸었는데 잘 동작할지 모르겠다.

interface IProps {
  from?: Date | null;
  to?: Date | null;
  isRange?: boolean;
  canSelectSameDate?: boolean;
  format?: string;
  label?: string;
  placeholder?: string;
  dayPickerProps: DayPickerProps;
}

const JDdayPickerInput: React.SFC<IProps> = ({
  from,
  to,
  isRange,
  label,
  dayPickerProps,
  placeholder = '날자를 선택해주세요',
  format = 'YYYY-MM-DD',
  ...props
}) => {
  const DayPickerInputRef: any = useRef();
  const isInitialMount = useRef(true);

  const dateForMatter = (date: Date | null | undefined, inFormat: string, locale: string): string => {
    moment.locale(locale);
    if (date) {
      return moment(date).format(inFormat);
    }
    return '';
  };

  useEffect(() => {
    // 상황에따라 DatePicker 투글
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (DayPickerInputRef && DayPickerInputRef.current) {
      if (from && to) {
        DayPickerInputRef.current.hideDayPicker();
      } else {
        DayPickerInputRef.current.showDayPicker();
      }
    }
  }, [from, to]);

  const valueFormatter = (date: Date, informat: string, locale: string): string => {
    let inDate = from;
    if (!inDate) inDate = date;
    console.log(dayPickerProps);
    const inFrom = dateForMatter(inDate, informat, locale);
    const inTo = dateForMatter(date, informat, locale);
    if (inFrom === '') return '';
    if (from && to && date >= from && date <= to) return '';
    if (inTo === '' || !from) return inFrom;
    return `${inFrom} ─ ${inTo}`;
  };

  return (
    <Fragment>
      <DayPickerInput
        ref={DayPickerInputRef}
        placeholder={placeholder}
        dayPickerProps={{ ...dayPickerProps }}
        formatDate={(date: Date, informat: string, locale: string) => valueFormatter(date, informat, locale)}
        format={format}
        component={(inProps: any) => (
          <InputText label={label} icon="calendar" dayPicker className="JDinput" {...props} {...inProps} />
        )}
        hideOnDayClick={!isRange}
      />
    </Fragment>
  );
};

export default JDdayPickerInput;
