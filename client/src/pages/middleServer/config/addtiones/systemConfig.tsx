import React, {useState} from "react";
import {IAddition} from "../components/AddtionModule";
import JDLabel from "../../../../atoms/label/JDLabel";
import JDrange from "../../../../atoms/forms/range/range";
import {MutationFn} from "react-apollo";
import {
  updateHouseConfig,
  updateHouseConfigVariables
} from "../../../../types/api";
import {IHouse} from "../../../../types/interface";

interface IProps {
  updateHouseConfigMu: MutationFn<
    updateHouseConfig,
    updateHouseConfigVariables
  >;
  house: IHouse;
}

const SystemDescription: React.FC<IProps> = ({updateHouseConfigMu, house}) => {
  const [range, setRange] = useState<any>(0);

  return (
    <div>
      <div className="docs-section__box">
        <span>기본 시스템설정.</span>
      </div>
      <div>
        <h6>풀링주기</h6>
        <JDLabel txt="풀링주기설정" />
        <JDrange
          onChange={setRange}
          value={range}
          minValue={5000}
          maxValue={30000}
        />
        <p>
          설정한 숫자/ms 마다 한번씩 서버로 부터 새로운 예약이 있는지 서버로부터
          확인받습니다.
          <br />
          새로운 예약이 있다면 새로운 예약을 화면에 새로고침 없이 나타냅니다.
          <br />* 컴퓨터 성능 및 잦은 화면 업데이트에 문제가 있을경우 풀링주기를
          높게 설정해보세요.
        </p>
      </div>
    </div>
  );
};

export default SystemDescription;
