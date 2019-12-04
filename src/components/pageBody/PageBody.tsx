import React from "react";
import "./PageBody.scss";

const PageBody: React.FC = ({ children }) => {
  return <div className="pageBody container container--full">{children}</div>;
};

export default PageBody;
