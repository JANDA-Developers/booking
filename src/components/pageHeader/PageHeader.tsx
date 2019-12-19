import React from "react";
import "./PageHeader.scss";
import JDIcon from "../../atoms/icons/Icons";
import { IDiv } from "../../types/interface";

interface Iprops extends IDiv {
  title?: string;
  desc?: string | JSX.Element;
}

const PageHeader: React.FC<Iprops> = ({ title, desc, ...props }) => {
  return (
    <div className="PageHeader" {...props}>
      <div className="PageHeader__inner container container--full">
        <span className="PageHeader__quotoes">
          <JDIcon size="largest" icon="quoteLeft" />
        </span>
        <div>
          <h3 className="PageHeader__title">
            <b>{title}</b>
          </h3>
          <span className="PageHeader__desc">{desc}</span>
        </div>
        <span className="PageHeader__quotoes">
          <JDIcon size="largest" icon="quoteRight" />
        </span>
      </div>
    </div>
  );
};

export default PageHeader;
