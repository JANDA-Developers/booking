import React from "react";
import Button from "../../atoms/button/Button";
import {insideRedirect} from "../../utils/utils";
import JDbox from "../../atoms/box/JDbox";
import {IContext} from "../../pages/MiddleServerRouter";
import Mbr from "../../atoms/mbr/Mbr";
import {LANG} from "../../hooks/hook";

interface Iprops {
  context: IContext;
}

const AdditionConfigPitch: React.FC<Iprops> = ({context}) => {
  const JDLANG = LANG.bind(LANG, "components");
  return (
    <p>
      <h3>
        {JDLANG("defaultSettingIs")} <Mbr /> {JDLANG("completed")}
      </h3>
      <p>
        {JDLANG("additionalySettingTo")} <Mbr />{" "}
        {JDLANG("willGoodForManageMent")}
      </p>
      <div>
        <JDbox align="flexVcenter" textAlign="left" mode="border">
          <div>
            <h6>{LANG("common", "HM")}</h6>
            <span>
              {JDLANG("additionalySettingTo")}게스트에게 숙소 이용 <Mbr />{" "}
              안내를 편리하게 해보세요.
            </span>
          </div>
          <Button
            size="small"
            onClick={() => {
              sessionStorage.setItem("isHMconfigBtnClick", "Y");
            }}
            redirect={insideRedirect("HMconfig")}
            mode="border"
            label="설정하러가기"
          />
        </JDbox>
      </div>
      <div>
        <JDbox align="flexVcenter" textAlign="left" mode="border">
          <div>
            <h6>가격설정</h6>
            <span>
              날자별로 가격을 다르게
              <Mbr /> 설정해보세요.
            </span>
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
            <span>
              게스트에게 안내문자를 <Mbr /> 자동 발송해 보세요.
            </span>
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
