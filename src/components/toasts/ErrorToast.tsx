import React from "react";
import { insideRedirect } from "../../utils/utils";
import Button from "../../atoms/button/Button";
import { LANG } from "../../hooks/hook";
interface Iprops {}

const ToastError: React.FC<Iprops> = ({}) => {
  return (
    <span style={{ height: "100%" }} className="JDflex JDflex--vCenter">
      <span className="JDstandard-space">
        {LANG("opps_something_problem_happend")}
      </span>
      <Button
        mr="no"
        size="small"
        className="JDmargin-bottom0"
        redirect={insideRedirect("qna")}
        label={LANG("do_question")}
        thema="white"
        mode="flat"
        transparent
      />
    </span>
  );
};

export default ToastError;
