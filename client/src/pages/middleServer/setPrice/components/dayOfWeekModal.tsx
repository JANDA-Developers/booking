import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { Node } from 'unist';
import { IUseModal, useInput } from '../../../../actions/hook';
import JDmodal from '../../../../atoms/modal/Modal';
import CheckBox from '../../../../atoms/forms/CheckBox';
import { JDWeekChanger, ErrProtecter, stringToPrice } from '../../../../utils/utils';
import Button from '../../../../atoms/button/Button';
import InputText from '../../../../atoms/forms/InputText';
import { DayOfWeekPriceInput } from '../../../../types/api';
import { arrToApplyDays, applyDaysToArr } from '../../../../utils/dayOfweeks';

interface IProps {
  modalHook: IUseModal;
  onSubmit?(foo: DayOfWeekPriceInput): void;
}

const DayOfWeekModal: React.SFC<IProps> = ({ modalHook, onSubmit }) => {
  const [checking, setChecking] = useState([false, false, false, false, false, false, false]);
  const valueHook = useInput('');
  const classes = classNames('dayOfWeekModal', '', {});
  const tempWeek = [0, 1, 2, 3, 4, 5, 6];
  const applyedDays = applyDaysToArr(modalHook.info.applyedDays);

  // 🐘 이미 선택된 요일들 체크해줌
  useEffect(() => {
    const updateChecking = checking.map((_, index) => !applyedDays.includes(2 ** index));
    setChecking(updateChecking);
  }, [modalHook.info.applyedDays]);

  const submitValidate = (): boolean => {
    //  전부 체크상태가 false인지 검사
    if (!arrToApplyDays(checking)) return false;
    return true;
  };

  return (
    <JDmodal {...modalHook} className={classes}>
      <h6>적용요일</h6>
      <div>
        {tempWeek.map((day, index) => (
          <CheckBox
            key={`weekBox${day}`}
            label={JDWeekChanger(day)}
            onChange={(value: boolean) => {
              const tempCehcking = checking;
              tempCehcking[day] = value;
              setChecking([...tempCehcking]);
            }}
            checked={checking[day]}
            disabled={applyedDays.includes(2 ** index)}
          />
        ))}
      </div>
      <div>
        <InputText {...valueHook} comma label="적용가격" />
      </div>
      <div className="JDmodal__endSection">
        <Button
          onClick={() => {
            if (submitValidate() && onSubmit) {
              onSubmit({
                applyDays: arrToApplyDays(checking),
                price: stringToPrice(valueHook.value),
              });
              modalHook.closeModal();
            }
          }}
          label="적용"
          thema="primary"
          mode="flat"
        />
      </div>
    </JDmodal>
  );
};

export default ErrProtecter<IProps>(DayOfWeekModal);
