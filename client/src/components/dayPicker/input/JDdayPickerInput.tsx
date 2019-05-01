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
import { IconSize } from '../../../atoms/icons/Icons';
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

// 👿 이 파일은 전체적으로 타입스크립트 작업이 필요하다.
const JDdayPickerInput: React.FC<IProps> = ({
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

    // 마운트 전인지 검사
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (DayPickerInputRef && DayPickerInputRef.current) {
      if (from && to) {
        DayPickerInputRef.current.hideDayPicker();
      } else {
        DayPickerInputRef.current.showDayPicker();
      }
    }
  }, [from, to]);

  // input에 들어갈 값을 여기서 조작
  //  어째서인지 여기 2번쨰 호출시에만 호출됨
  const valueFormatter = (date: Date, informat: string, locale: string): string => {
    let inDate = from;
    if (!inDate) inDate = date;
    const inFrom = dateForMatter(inDate, informat, locale);
    const inTo = dateForMatter(date, informat, locale);

    if (inFrom === '') return '';
    if (from && to && date >= from && date <= to) return '';
    if (inTo === '' || !from) return inFrom;
    return `${inFrom} ~ ${inTo}`;
  };

  return (
    <Fragment>
      {/* 😶 REF는 잘 작동하지만 브라우저상 오류를 낸다 이유는... ref가
      그냥 맨껍데기에 적용되서 그렇다는데 아무래도 해결방법은 깃허브에 문의해봐야겠다. */}
      <DayPickerInput
        ref={DayPickerInputRef}
        placeholder={placeholder}
        dayPickerProps={{ ...dayPickerProps }}
        formatDate={(date: Date, informat: string, locale: string) => valueFormatter(date, informat, locale)}
        format={format}
        component={(inProps: any) => (
          <InputText
            label={label}
            icon="calendar"
            daypicker
            {...props}
            {...inProps}
            value={!isRange && from && dateForMatter(from, format, 'kr')}
          />
        )}
        hideOnDayClick={!isRange}
      />
    </Fragment>
  );
};

export default JDdayPickerInput;
