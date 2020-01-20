import React from "react";
import JDbox from "../../../../atoms/box/JDbox";
import {LANG} from "../../../../hooks/hook";
interface Iprops {}

const AgreePolicy: React.FC<Iprops> = () => {
  return (
    <div className="agreePrivacyPolicy" id="agreePrivacyPolicy">
      <JDbox className="paymentModal__JDbox" mode="table">
        <div className="JDlarge-text JDstandard-margin-bottom">
          {LANG("we_collect_your_personal_information_to_provide_the_service")}
        </div>
        <table>
          <thead>
            <tr>
              <th>{LANG("privacy_item")}</th>
              <th>{LANG("purpose_of_collection")}</th>
              <th>{LANG("retention_period")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {LANG("name")},{LANG("contact")}
              </td>
              <td>{LANG("smooth_reservation_management")}</td>
              <td>{LANG("six_months_after_stay")}</td>
            </tr>
          </tbody>
        </table>
        <p className="JDtiny-text JDtextColor--warn">
          {`※ ${LANG(
            "the_minimum_personal_information_required_to_provide_the_service_is_required_to_use_the_service"
          )}`}
          <br />
          {`※ ${LANG(
            "if_you_violate_the_accommodation_policy_your_personal_information_will_be_saved_with_the_violation"
          )} `}
        </p>
      </JDbox>
    </div>
  );
};

export default AgreePolicy;
