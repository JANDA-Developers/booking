import React, { Fragment } from "react";
import "./PageBody.scss";
import { IDiv } from "../../types/interface";
import { WindowSize } from "../../types/enum";
import classNames from "classnames";

interface IContinaerProp extends IDiv {
  size?: WindowSize;
}

const PageBody: React.FC<IContinaerProp> = ({
  children,
  size,
  className,
  ...props
}) => {
  const classes = classNames("container", className, {
    "container--full": size === undefined,
    "container--sm": size === WindowSize.MOBILE,
    "container--md": size === WindowSize.PHABLET,
    "container--wmd": size === WindowSize.TABLET,
    "container--lg": size === WindowSize.DESKTOP,
    "container--wlg": size === WindowSize.DESKTOPHD
  });
  return (
    <div className={`pageBody ${classes}`} {...props}>
      {children}
    </div>
  );
};

export const PageBottom: React.FC<IDiv> = props => <div {...props} />;

interface ICondition extends IDiv {
  if: any;
}

export const Condition: React.FC<ICondition> = props => (
  <Fragment>{props.if ? props.children : undefined}</Fragment>
);

export default PageBody;
