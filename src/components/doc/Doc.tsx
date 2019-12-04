import React from "react";
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
      <h6>
        <span className="">{children}</span>
      </h6>
    </div>
  );
};

export { DocHeader, DocSection };
export default Doc;
