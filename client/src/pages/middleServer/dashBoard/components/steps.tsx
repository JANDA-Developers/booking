import React, {useState, Fragment} from "react";
import classNames from "classnames";
import JDanimation, {Animation} from "../../../../atoms/animation/Animations";
import {IUser, IHouse} from "../../../../types/interface";
import {randomIntFromInterval} from "../../../../utils/utils";
import JDbox from "../../../../atoms/box/JDbox";
import Button from "../../../../atoms/button/Button";
import {IStepsStart} from "../DashBoard";
import {NavLink} from "react-router-dom";
import SpecificAtion from "../../../../components/specification/Specification";
import SpecificAtionWrap from "../../../../components/specification/SpecificationWrap";
import $ from "jquery";

interface IProps {
  step: IStepsStart;
  houseId?: string;
}

// 스탭 1 : 휴대폰인증
// 스탭 2 : 숙소생성
// 스탭 3 : 상품등록
// 스탭 3.5 : 승인대기
// 스탭 4 : 방타입생성

const Steps: React.FC<IProps> = ({step, houseId}) => {
  switch (step) {
    case "phoneVerification":
      return (
        <Fragment>
          <h5>
            휴대폰이 인증되지 않았습니다.
            <br /> 인증절차를 진행해주세요.
          </h5>
          <Button
            onClick={() => {
              $("#HeaderPhoneVerificationBtn").click();
            }}
            mode="border"
            thema="primary"
            label="휴대폰 인증하기"
          />
        </Fragment>
      );
    case "houseMake":
      return (
        <Fragment>
          <h5>아직 숙소를 생성하지 않으셨군요.</h5>
          <NavLink to="./makeHouse">
            <Button mode="border" thema="primary" label="숙소등록하기" />
          </NavLink>
        </Fragment>
      );
    case "makeProduct":
      return (
        <Fragment>
          <h5>
            상품을 아직 적용하지 않으셨군요.
            <br /> 상품구매 또는 무료체험을 진행해주세요.
          </h5>
          <NavLink to="./products">
            <Button mode="border" thema="primary" label="상품 선택하기" />
          </NavLink>
        </Fragment>
      );
    case "readyAssign":
      return (
        <Fragment>
          <h5>현재 승인 대기중입니다.</h5>
          {houseId && <SpecificAtionWrap houseId={houseId} />}
        </Fragment>
      );
    case "makeRoom":
      return (
        <Fragment>
          <h5>
            아직 생성된 방이 없군요.
            <br /> 방을 생성해보세요.
          </h5>
          <NavLink to="./timelineConfig">
            <Button mode="border" thema="primary" label="방생성하기" />
          </NavLink>
        </Fragment>
      );
    default:
      return <div />;
  }
};

export default Steps;
