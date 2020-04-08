import React from "react";
import { LANG } from "../../hooks/hook";
interface Iprops {}

const ToastError: React.FC<Iprops> = ({}) => {
  return (
    <span style={{ height: "100%" }} className="JDflex JDflex--vCenter">
      <span className="JDstandard-space">
        {LANG("opps_something_problem_happend")}
      </span>
    </span>
  );
};

export default ToastError;
