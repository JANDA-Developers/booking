import React from "react";
import { IDiv } from "../../../types/interface";
import classNames from "classnames";

interface Iprops extends IDiv {}

const CardSection: React.FC<Iprops> = prop => {
  const classes = classNames("cardSection", prop.className, {});
  return <div {...prop} className={classes} />;
};

export default CardSection;
