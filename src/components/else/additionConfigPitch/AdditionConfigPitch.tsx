import React, { useState } from "react";
import Button from "../../../atoms/button/Button";
import JDbox from "../../../atoms/box/JDbox";
import { IContext } from "../../../pages/bookingHost/BookingHostRouter";
import { LANG } from "../../../hooks/hook";
import { Redirect } from "react-router-dom";

interface Iprops {
  context: IContext;
}

const AdditionConfigPitch: React.FC<Iprops> = ({ context }) => {
  const [redirect, setRedirect] = useState("");

  if (redirect) {
    alert("??2");
    return <Redirect to={redirect} />;
  }

  return (
    <div>
      <h3>
        {LANG("default_setting_is")} {LANG("completed")}
      </h3>
      <p>{LANG("additionaly_setting_to_will_good_for_manage_ment")}</p>
      <div>
        <JDbox align="flexVcenter" textAlign="left" mode="border">
          <div>
            <h6>{LANG("HM")}</h6>
            <span>
              {LANG("make_it_easy_to_guide_accommodation_for_guests")}
            </span>
          </div>
          <Button
            size="small"
            onClick={() => {
              setRedirect("HMconfig");
            }}
            mode="border"
            label={LANG("go_to_set")}
          />
        </JDbox>
      </div>
      <div>
        <JDbox align="flexVcenter" textAlign="left" mode="border">
          <div>
            <h6>{LANG("pricing")}</h6>
            <span>{LANG("try_setting_it_up_different_prices_by_date")}</span>
          </div>
          <Button
            size="small"
            onClick={() => {
              setRedirect("setPrice");
            }}
            mode="border"
            label={LANG("go_to_set")}
          />
        </JDbox>
      </div>
      <div>
        <JDbox align="flexVcenter" textAlign="left" mode="border">
          <div>
            <h6>{LANG("sms_setting")}</h6>
            <span>{LANG("automatically_send_prompts_to_your_guests")}</span>
          </div>
          <Button
            size="small"
            onClick={() => {
              setRedirect("sms");
            }}
            mode="border"
            label={LANG("go_to_set")}
          />
        </JDbox>
      </div>
    </div>
  );
};

export default AdditionConfigPitch;
