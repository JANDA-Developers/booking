import React, { Fragment } from "react";
import "./PageBody.scss";
import { IDiv } from "../../types/interface";
import { any } from "prop-types";

const PageBody: React.FC = ({ children }) => {
  return <div className="pageBody container container--full">{children}</div>;
};

export const PageBottom: React.FC<IDiv> = props => <div {...props} />;

interface ICondition extends IDiv {
  if: any;
}

export const Condition: React.FC<ICondition> = props => (
  <Fragment>{props.if ? props.children : undefined}</Fragment>
);

export default PageBody;
