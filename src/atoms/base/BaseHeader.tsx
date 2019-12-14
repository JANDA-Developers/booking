import React from "react";
import { IDiv, TElements, JDatomExtentionSet } from "../../types/interface";
import "./BaseHeader.scss";
import classNames from "classnames";
import { JDmbClass } from "../../utils/autoClasses";

interface Iprops extends IDiv, JDatomExtentionSet {
  titleElement: TElements;
  desc?: TElements;
  headerRgiht?: TElements;
}

const BaseHeader: React.FC<Iprops> = ({
  headerRgiht,
  desc,
  titleElement,
  mb,
  ...prop
}) => {
  const classes = classNames("baseHeader", prop.className, {
    ...JDmbClass(mb)
  });
  return (
    <div {...prop} className={classes}>
      <div className="baseHeader__titleSection">
        <div className="baseHeader__title">{titleElement}</div>
        {desc && <div className="baseHeader__decs">{desc}</div>}
      </div>
      <div className="baseHeader__rightWrap">
        {headerRgiht && <div>{headerRgiht}</div>}
      </div>
    </div>
  );
};

export default BaseHeader;
