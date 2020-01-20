import React from "react";
import "./MultiStep.scss";
import { s4 } from "../../utils/utils";
import classNames from "classnames";

export interface IMultiStepSteps {
  name: string | JSX.Element;
  current: boolean;
}

interface IProps {
  steps: IMultiStepSteps[];
  // index 배열
  clickAble?: number[];
  liClassNames?: string;
  onStepClick?: (index: number) => void;
}

const JDmultiStep: React.SFC<IProps> = ({
  onStepClick,
  liClassNames,
  steps,
  clickAble
}) => {
  return (
    <div className="multi-step">
      <ul className="multi-step-list">
        {steps.map((step, index) => {
          const isClickAble = clickAble && clickAble.includes(index);
          // 복사해서 가져온 코드라서 아직 명명법이 적용 안되어 있습니다.
          const liClasses = classNames("multi-step-item", liClassNames, {
            "multi-step-item--clickAble": isClickAble,
            current: step.current
          });

          return (
            <li
              onClick={() => {
                if (isClickAble && onStepClick) {
                  onStepClick(index);
                }
              }}
              key={s4()}
              className={liClasses}
            >
              <div className="item-wrap">
                <p className="item-title">{step.name}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default JDmultiStep;
