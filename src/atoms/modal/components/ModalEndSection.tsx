import React from "react";
import { IDiv } from "../../../types/interface";

const ModalEndSection: React.FC<IDiv> = ({ className, children, ...props }) => (
  <div className={`JDmodal__endSection ${className}`} {...props}>
    {children}
  </div>
);

export default ModalEndSection;
