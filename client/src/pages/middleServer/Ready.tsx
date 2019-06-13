import React, {Fragment} from "react";
import PropTypes from "prop-types";
import "./Ready.scss";
import {
  getHouse_GetHouse_house_appInfo,
  getHouse_GetHouse_house_product
} from "../../types/api";
import {IHouse} from "../../types/interface";
import {SpecificAtion} from "../../components/specification/Specification";
import SpecificationWrap from "../../components/specification/SpecificationWrap";

interface IProps {
  selectedHouse: IHouse | undefined;
}

const Ready: React.SFC<IProps> = ({selectedHouse}) => {
  return (
    <div id="Ready" className="ready">
      <Fragment>
        {/* PC용 */}
        <div className="container container--center">
          <div className="docs-section">
            <div>
              <h4>서비스 신청이 완료되었습니다.</h4>
              <SpecificationWrap houseId={selectedHouse!._id} />
              <div>
                <span className="JDlarge-text">⏲ 문의시간 11:00 ~ 17: 30</span>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </div>
  );
};

export default Ready;
