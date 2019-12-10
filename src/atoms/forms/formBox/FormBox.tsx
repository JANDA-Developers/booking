import React, { Fragment } from "react";
import { IDiv } from "../../../types/interface";
import "./FormBox.scss";
import JDLabel from "../../label/JDLabel";

const FormBox: React.FC<IDiv> = prop => {
  return <div className="formBox" {...prop} />;
};

interface IFormCellProp {
  label?: string;
}

const FormCell: React.FC<IFormCellProp & IDiv> = ({
  label,
  children,
  ...prop
}) => {
  return (
    <div className="formBox__cell" {...prop}>
      {label && <JDLabel txt={label} />}
      {children}
    </div>
  );
};

const FormHeader: React.FC<IDiv> = prop => {
  return <div className="formBox__header" {...prop} />;
};

const FormRow: React.FC<IDiv> = ({ className, ...prop }) => {
  return <div className={`formBox__row ${className}`} {...prop} />;
};

export { FormCell, FormHeader, FormRow };
export default FormBox;
