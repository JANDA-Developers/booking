import React, { useEffect, useState } from "react";
import {
  isHaveNumber,
  isLengthIn,
  isHaveScharacter
} from "../../../utils/inputValidations";
import classNames from "classnames";
import { LANG } from "../../../hooks/hook";
import { IDiv } from "../../../types/interface";
import "./SecurityLevelViewer.scss";
import JDtypho from "../../../atoms/typho/Typho";
import JDIcon from "../../../atoms/icons/Icons";
import Align from "../../../atoms/align/Align";

export type TCheck = {
  special: boolean;
  length: boolean;
  enAndNumber: boolean;
  checkedCount?: number;
};

export interface IProps extends IDiv {
  password: String;
  passwordCondition: TCheck;
  setPasswordCondition: React.Dispatch<React.SetStateAction<TCheck>>;
}

export const SecurityLevelViewer: React.FC<IProps> = ({
  password,
  passwordCondition,
  setPasswordCondition,
  ...props
}) => {
  let maxCount = 3;
  let fillCount = 0;

  if (passwordCondition.enAndNumber) fillCount++;
  if (passwordCondition.length) fillCount++;
  if (passwordCondition.special) fillCount++;

  useEffect(() => {
    setPasswordCondition({
      enAndNumber: isHaveNumber(password),
      length: isLengthIn(password, 15, 7),
      special: isHaveScharacter(password),
      checkedCount: fillCount
    });
  }, [password]);

  const classes = classNames("securityBar", undefined, {
    "securityBar--red": fillCount === 1,
    "securityBar--orange": fillCount === 2,
    "securityBar--green": fillCount === 3
  });

  let color: any = "grey";
  if (fillCount === 1) {
    color = "error";
  }
  if (fillCount === 2) {
    color = "warn";
  }
  if (fillCount === 3) {
    color = "positive";
  }

  return (
    <span {...props}>
      <div className={classes}>
        {Array(maxCount)
          .fill(null)
          .map((_, i) => (
            <span
              className={`securityBar__block ${i < fillCount &&
                "securityBar__block--fill"}`}
            ></span>
          ))}
      </div>
      <Align
        style={{
          justifyContent: "flex-end"
        }}
        flex={{
          vCenter: true
        }}
      >
        <JDtypho mr="small" color={color} size="small">
          {LANG("Validation")(fillCount)}
        </JDtypho>
        <JDIcon
          color="primary"
          icon="info"
          tooltip={LANG("password_condition")(
            passwordCondition.special,
            passwordCondition.length,
            passwordCondition.enAndNumber
          )}
        />
      </Align>
    </span>
  );
};

export default SecurityLevelViewer;
