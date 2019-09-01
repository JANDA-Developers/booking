import React from "react";
import "./MultiStep.scss";

export interface step {
  name: string;
  current: boolean;
}

interface IProps {
  steps: step[];
}

const JDmultiStep: React.SFC<IProps> = ({steps}) => (
  <div className="multi-step">
    <ul className="multi-step-list">
      {steps.map(step => (
        <li
          key={step.name}
          className={`multi-step-item ${step.current && "current"}`}
        >
          <div className="item-wrap">
            <p className="item-title">{step.name}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default JDmultiStep;
