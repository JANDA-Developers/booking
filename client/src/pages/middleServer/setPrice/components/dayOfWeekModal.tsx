import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Node } from 'unist';
import { IUseModal, useInput } from '../../../../actions/hook';
import JDmodal from '../../../../atoms/modal/Modal';
import CheckBox from '../../../../atoms/forms/CheckBox';
import { JDWeekChanger, ErrProtecter } from '../../../../utils/utils';
import Button from '../../../../atoms/button/Button';
import InputText from '../../../../atoms/forms/InputText';
import { DayOfWeekPriceInput } from '../../../../types/api';

interface IProps {
  modalHook: IUseModal;
  onSubmit?(foo:DayOfWeekPriceInput): void;
}

const DayOfWeekModal: React.SFC<IProps> = ({ modalHook, onSubmit }) => {
  const [checking, setChecking] = useState([false, false, false, false, false, false, false]);
  const valueHook = useInput('');
  const classes = classNames('dayOfWeekModal', '', {});
  const tempWeek = [0, 1, 2, 3, 4, 5, 6];


  checking= [1,0,1,0,1,0,0] = > 2진수로

  return (
    <JDmodal {...modalHook} className={classes}>
      <h6>적용요일</h6>
      <div>
        {tempWeek.map(day => (
          <CheckBox
            label={JDWeekChanger(day)}
            onChange={(value: boolean) => {
              const tempCehcking = checking;
              tempCehcking[day] = value;
              setChecking([...tempCehcking]);
            }}
            checked={checking[day]}
            disabled={false}
            //   disabled={modalHook.info.aplyWeek && modalHook.info.aplyWeek[day]}
          />
        ))}
      </div>
      <div>
        <InputText {...valueHook} label="적용가격" />
      </div>
      <div className="JDmodal__endSection">
        <Button
          onClick={() => {
            onSubmit({
              applyDays: parseInt(checking.join(""),2),
              price: valueHook.value,
            });
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
