import React, {Fragment} from "react";
import PropTypes from "prop-types";
import "./Ready.scss";
import {
  getHouse_GetHouse_house_appInfo,
  getHouse_GetHouse_house_product
} from "../../../types/api";
import {IHouse} from "../../../types/interface";
import {SpecificAtion} from "../../../components/specification/Specification";
import SpecificationWrap from "../../../components/specification/SpecificationWrap";
import JDlist from "../../../atoms/list/List";
import {SERVICE_CONTECT} from "../../../types/enum";
import {IContext} from "../../MiddleServerRouter";

interface IProps {
  context: IContext;
}

const Ready: React.SFC<IProps> = ({context}) => {
  const {house} = context;
  return (
    <div id="Ready" className="ready">
      <Fragment>
        {/* PC용 */}
        <div className="container container--center">
          <div className="docs-section">
            <div>
              <h4>서비스 신청이 완료되었습니다.</h4>
              <h6>
                서비스 신청이 완료되었습니다. 3일 내로 담당자가 연락드릴
                예정입니다. 감사합니다.
              </h6>
              <SpecificationWrap houseId={house._id} />
              <div>
                <JDlist
                  contents={[
                    <span>
                      문의 사항이 있으시면 아래연락처로 편하게 연락주세요.
                    </span>,
                    <span className="JDlarge-text">
                      ☎️ 문의 전화번호 {SERVICE_CONTECT.SERVICE_MANGER_PHONE}
                    </span>,
                    <span className="JDlarge-text">
                      📧 문의 이메일 {SERVICE_CONTECT.SERVICE_MANGER_MAIL}
                    </span>,
                    <span className="JDlarge-text">
                      ⏲ 문의 시간 11:00 ~ 17:30
                    </span>
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </div>
  );
};

export default Ready;
