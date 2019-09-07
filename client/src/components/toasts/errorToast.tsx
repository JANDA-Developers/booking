import React from "react";
import {insideRedirect} from "../../utils/utils";
import Button from "../../atoms/button/Button";
interface Iprops {}

const ToastError: React.FC<Iprops> = ({}) => {
  return (
    <span className="JDflex">
      <span className="JDstandard-space">이런! 문제가 발생했습니다.</span>
      <Button
        size="small"
        className="JDmargin-bottom0"
        redirect={insideRedirect("qna")}
        label="문의하기"
        thema="white"
        mode="border"
        transparent
      />
    </span>
  );
};

export default ToastError;
