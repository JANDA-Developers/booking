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

interface IProps {
  modalHook: IUseModal;
}

const DayOfWeekModal: React.SFC<IProps> = ({ modalHook }) => {
  const [checking, setChecking] = useState([false, false, false, false, false, false, false]);
  const valueHook = useInput('');
  const classes = classNames('dayOfWeekModal', '', {});
  const tempWeek = [0, 1, 2, 3, 4, 5, 6];

  return (
    <JDmodal {...modalHook} className={classes}>
      <h6>적용요일</h6>
      {tempWeek.map(day => (
        <div>
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
        </div>
      ))}
      <InputText {...valueHook} />
      <div className="JDmodal__EndSection">
        <Button label="적용" thema="primary" mode="flat" />
      </div>
    </JDmodal>
  );
};

export default ErrProtecter<IProps>(DayOfWeekModal);
