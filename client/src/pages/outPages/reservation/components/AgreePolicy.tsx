import React from "react";
import JDbox from "../../../../atoms/box/JDbox";
interface Iprops {}

const AgreePolicy: React.FC<Iprops> = () => {
  return (
    <div className="agreePrivacyPolicy" id="agreePrivacyPolicy">
      <JDbox className="paymentModal__JDbox" mode="table">
        <div className="JDlarge-text JDstandard-margin-bottom">
          서비스 제공을 위해 귀하의 개인정보를 수집합니다.
        </div>
        <table>
          <thead>
            <tr>
              <th>개인정보 항목</th>
              <th>수집 목적</th>
              <th>보유 기간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>이름,연락처</td>
              <td>원활한 예약관리</td>
              <td>숙박후 6개월</td>
            </tr>
          </tbody>
        </table>
        <p className="JDtiny-text JDtextColor-warring-text">
          {
            "※ 서비스 제공을 위해 필요한 최소한의 개인정보이므로 동의를 해주셔야 서비스를 이용하실수 있습니다."
          }
          <br />
          {
            "※ 게스트하우스 규정을 위반할 시 위반내용과 함께 개인정보가 저장됩니다. "
          }
        </p>
      </JDbox>
    </div>
  );
};

export default AgreePolicy;
