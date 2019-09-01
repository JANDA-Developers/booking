import React from "react";
import Button from "../../atoms/button/Button";
import {insideRedirect} from "../../utils/utils";
import JDbox from "../../atoms/box/JDbox";
import {IContext} from "../../pages/MiddleServerRouter";

interface Iprops {
  context: IContext;
}

const AdditionConfigPitch: React.FC<Iprops> = ({context}) => {
  return (
    <p>
      <h3>기본설정이 완료되었습니다.</h3>
      <p>추가로 다음과 같은 설정을 해두면 숙소설정에 도움이 될거에요!</p>
      <div>
        <JDbox align="flexVcenter" textAlign="left" mode="border">
          <div>
            <h6>하우스메뉴얼</h6>
            <span>게스트에게 숙소 이용 안내를 편리하게 해보세요.</span>
          </div>
          <Button
            size="small"
            onClick={() => {
              sessionStorage.setItem("isHouseManualConfigBtnClick", "Y");
            }}
            redirect={insideRedirect("houseManualConfig")}
            mode="border"
            label="설정하러가기"
          />
        </JDbox>
      </div>
      <div>
        <JDbox align="flexVcenter" textAlign="left" mode="border">
          <div>
            <h6>가격설정</h6>
            <span>날자별로 가격을 다르게 설정해보세요.</span>
          </div>
          <Button
            size="small"
            redirect={insideRedirect("setPrice")}
            mode="border"
            label="설정하러가기"
          />
        </JDbox>
      </div>
      <div>
        <JDbox align="flexVcenter" textAlign="left" mode="border">
          <div>
            <h6>SMS설정</h6>
            <span>게스트에게 안내문자를 자동 발송해 보세요.</span>
          </div>
          <Button
            size="small"
            redirect={insideRedirect("sms")}
            mode="border"
            label="설정하러가기"
          />
        </JDbox>
      </div>
    </p>
  );
};

export default AdditionConfigPitch;
