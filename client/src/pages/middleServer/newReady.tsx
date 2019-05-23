import React, {Fragment} from "react";
import PropTypes from "prop-types";
import "./Ready.scss";
import Button from "../../atoms/button/Button";

const Ready = ({hostApp, currentProduct, selectedHouse}) => (
  <div id="Ready" className="container container--sm">
    <JDbox mode="table">
      <table>
        <thead>
          <tr>
            <th>신청숙소</th>
            <th>신청도메인</th>
            <th>신청 레이아웃</th>
            <th>결제방식</th>
            <th>결제금액</th>
            <th>적용상품</th>
            <th>신청일시</th>
            <th>결제여부</th>
            <th>접수상태</th>
            <th>입금계좌</th>
            <th>입금기한</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
          </tr>
        </tbody>
      </table>
    </JDbox>
  </div>
);

Ready.propTypes = {
  product: PropTypes.string,
  title: PropTypes.string
};

Ready.defaultProps = {
  product: "Default",
  title: "Default"
};

export default Ready;
