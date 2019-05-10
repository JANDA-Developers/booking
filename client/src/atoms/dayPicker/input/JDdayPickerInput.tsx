import { DayPickerProps } from 'react-day-picker';
import React, { useRef, useEffect, Fragment } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import InputText from '../../forms/InputText';
import 'moment/locale/ko';
import { isEmpty } from '../../../utils/utils';
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
  inputComponent?: JSX.Element[] | JSX.Element;
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
  inputComponent: InputComponent,
  ...props
}) => {
  let DayPickerInputRef: DayPickerInput | null = null;
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

    if (!isEmpty(DayPickerInputRef)) {
      if (from && to) {
        DayPickerInputRef.hideDayPicker();
      } else {
        DayPickerInputRef.showDayPicker();
      }
    }
  }, [from, to]);

  // // input에 들어갈 값을 여기서 조작
  // const valueFormatter = (date: Date, informat: string, locale: string): string => {
  //   // 방금 누른 늘자가 들어오지만 from으로 대체된다.
  //   let inDate = from;
  //   // 만약에 from이 없다면 방금들어온 날자를 사용한다.
  //   if (!from) inDate = date;
  //   // 만약에 date또한 없다면 엠티 스트링이 리턴된다 :: 이상한 선택을 한경우.
  //   if (!inDate) return '';
  //   // 만약에 from과 to가 모두존재하면서
  //   if (from && to) {
  //     // 방금 누른것이 지금까지 누른것들 사이에 있다면 엠티스트링을 리턴한다 :: 중복을 누른경우 초기화.
  //     if (date >= from && date <= to) return '';
  //   }

  //   const inFrom = dateForMatter(inDate, informat, locale);
  //   const inTo = dateForMatter(date, informat, locale);

  //   // 만약에 방금누른날자가 유효하면서 아직 프롬이 존재안한다면:: from을 선택한경우
  //   if (!date || !from) return inFrom;
  //   return `${inFrom} ~ ${inTo}`;
  // };

  const valueFormatter = (
    inFrom: Date | null | undefined,
    inTo: Date | null | undefined,
    informat: string,
    locale: string,
  ): string => {
    if (isRange) {
      const formatFrom = dateForMatter(inFrom, informat, locale);
      const formatTo = dateForMatter(inTo, informat, locale);

      // 이상하게 return ''는 오류를 일으킨다.
      if (formatFrom === '') return ' ';
      if (formatTo === '') return formatFrom;
      return `${formatFrom} ~ ${formatTo}`;
    }
    const formatFrom = dateForMatter(inFrom, informat, locale);
    return `${formatFrom}`;
  };

  return (
    <Fragment>
      {/* 😶 REF는 잘 작동하지만 브라우저상 오류를 낸다 이유는... ref가
      그냥 맨껍데기에 적용되서 그렇다는데 아무래도 해결방법은 깃허브에 문의해봐야겠다. */}
      {InputComponent}
      <DayPickerInput
        ref={(ref) => {
          DayPickerInputRef = ref;
        }}
        placeholder={placeholder}
        dayPickerProps={{ ...dayPickerProps }}
        format={format}
        component={(inProps: any) => <InputText label={label} icon="calendar" {...props} {...inProps} />}
        hideOnDayClick={!isRange}
        value={valueFormatter(from, to, format, 'kr')}
      />
    </Fragment>
  );
};

export default JDdayPickerInput;
