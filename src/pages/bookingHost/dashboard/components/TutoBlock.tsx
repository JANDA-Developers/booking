import React from "react";
import "./TutoBlock.scss";
import { LANG } from "../../../../hooks/hook";
import classNames from "classnames";
import JDToolTip from "../../../../atoms/tooltip/Tooltip";
import JDlist from "../../../../atoms/list/List";

type tutoStep = {
  title: string;
  isDone?: boolean;
};

interface IProps {
  title: string;
  steps: tutoStep[];
  className?: string;
}

const TutoBlock: React.FC<IProps> = ({ title, steps, className }) => {
  const max = steps.length;
  const doneCount = steps.filter(s => s.isDone).length;
  const isDone = max === doneCount;
  const id = `TutoBlock${title}`;
  const classes = classNames("TutoBlock", className, {
    "TutoBlock--done": isDone
  });

  return (
    <div className={classes}>
      <span>{LANG(isDone ? "complete" : "un_complete")}</span>
      <h3>
        {title}
        <span>
          {doneCount}/{max}
        </span>
      </h3>
      <JDToolTip type="dark" effect="solid" id={`btnTooltip${id}`}>
        <JDlist
          contents={steps.map(s => (
            <span key={id + s.title}>
              {s.title + "  " + s.isDone ? "✔️" : "⚪"}
            </span>
          ))}
        />
      </JDToolTip>
    </div>
  );
};

export default TutoBlock;
