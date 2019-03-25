import React, { useState, useRef } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import InputText from '../../../atoms/forms/InputText';

// 데이픽커 인풋은 어레인이지를 지원하지 않을려는것만 같다.
// 무리하게 바꾸었는데 잘 동작할지 모르겠다.

const CustomDayPickerInput = ({ isRange, dayPickerProps, ...props }) => {
  const [formatedFrom, setformatedFrom] = useState(null);
  const [formatedTo, formatedSetFrom] = useState(null);
  const DayPickerInputRef = useRef(null);

  const handleFromChange = (day, modifiers) => {
    if (dayPickerProps.selectedDays) {
      const { from, to } = dayPickerProps.selectedDays[1];
      if (modifiers.disabled) return;
      if (from && day >= from) {
        DayPickerInputRef.current.hideDayPicker();
      } else {
        DayPickerInputRef.current.showDayPicker();
      }
      setformatedFrom(new Date(from).toISOString().split('T')[0]);
      formatedSetFrom(new Date(to).toISOString().split('T')[0]);
    }
  };

  return (
    <DayPickerInput
      ref={DayPickerInputRef}
      dayPickerProps={{ ...dayPickerProps }}
      format="YYYY-MM-DD"
      formatDate={formatDate}
      parseDate={parseDate}
      value={isRange ? `${formatedFrom} ─ ${formatedTo}` : undefined}
      onDayChange={handleFromChange}
      component={inProps => <InputText icon="calendar" dayPicker className="JDinput" {...props} {...inProps} />}
      hideOnDayClick={!isRange}
      hideDayPicker
    />
  );
};

export default CustomDayPickerInput;
