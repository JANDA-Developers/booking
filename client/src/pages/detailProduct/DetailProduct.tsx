import React, {useState} from "react";
import "./Product.scss";
import {Product} from "../../../../types/enum";
import InputText from "../../atoms/forms/inputText/InputText";
import Button from "../../atoms/button/Button";
import {useInput} from "../../actions/hook";

//  👿 방관련된 정보들을 정리해서 interfcae로 만드는편이 낳음
interface IProps {}

const JDproduct: React.FC<IProps> = ({}) => {
  const reQuestDomain = useInput("");
  return (
    <div>
      <h6>홈페이지 신청</h6>
      <div />
      <div />
      <InputText {...reQuestDomain} label="신청도메인" />
      <Button>{신청하기 || 결제하기}</Button>
    </div>
  );
};

export default JDproduct;
