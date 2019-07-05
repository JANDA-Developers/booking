import React from "react";
import InputRange, {InputRangeProps} from "react-input-range";
import "./range.scss";
import "react-input-range/lib/css/index.css";

// 👿 이건 그냥 모듈안에서 타입정의를 가져온것이다.  확장하려했으니 안되는 이유를 모르겠다.
interface IProps extends InputRangeProps {}

const JDrange: React.FC<IProps> = props => {
  return <InputRange {...props} />;
};

export default JDrange;
