import React from "react";
import JDLabel from "../../label/JDLabel";
import { IDiv } from "../../../types/interface";
import classNames from "classnames";
import BaseHeader from "../../base/BaseHeader";

interface Iprops {
  headerRgiht?: JSX.Element | JSX.Element[];
  title: string;
  desc?: string;
}

const CardHeader: React.FC<Iprops & IDiv> = ({
  headerRgiht,
  className,
  title,
  desc,
  ...props
}) => {
  const classes = classNames("cardHeader", className, {});
  return (
    <BaseHeader
      titleElement={
        <h5>
          <b>{title}</b>
        </h5>
      }
      headerRgiht={headerRgiht}
      desc={desc}
      {...props}
      className={classes}
    />
  );
};

export default CardHeader;
