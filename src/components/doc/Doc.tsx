import React from "react";
import "./Doc.scss";

interface Iprops {}

const Doc: React.FC<Iprops> = ({ children }) => {
  return <div className="JDdoc">{children}</div>;
};

const DocSection: React.FC = ({ children }) => {
  return <div className="JDdocSection">{children}</div>;
};

const DocHeader: React.FC = ({ children }) => {
  return (
    <div className="JDdocHeader">
      <h4>
        <span className="">{children}</span>
      </h4>
    </div>
  );
};

export { DocHeader, DocSection };
export default Doc;
