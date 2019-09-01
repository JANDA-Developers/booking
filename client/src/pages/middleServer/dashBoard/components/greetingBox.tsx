import React, {useState, Fragment} from "react";
import classNames from "classnames";
import JDanimation, {Animation} from "../../../../atoms/animation/Animations";
import {IUser} from "../../../../types/interface";
import {randomIntFromInterval} from "../../../../utils/utils";
import JDbox from "../../../../atoms/box/JDbox";
import {IContext} from "../../../MiddleServerRouter";

interface IProps {
  context: IContext;
}

const GreetingBox: React.FC<IProps> = ({context}) => {
  const {user: userData} = context;
  const greetingTexts = [
    <span>
      {`${userData.name}님 안녕하세요.`} <br />
      {`오늘도 밝은하루 되십시요`}
    </span>,
    `${userData.name}님 오늘도 힘찬 하루 되세요.`,
    `${userData.name}님 좋은일 가득하길 기원합니다.`
  ];

  const gretting = useState(
    greetingTexts[randomIntFromInterval(0, greetingTexts.length - 1)]
  );
  return (
    <JDbox className="greetingBox" mode="border">
      <JDanimation animation={[Animation.zoomIn]}>
        <div>{gretting[0]}</div>
      </JDanimation>
    </JDbox>
  );
};

export default GreetingBox;
