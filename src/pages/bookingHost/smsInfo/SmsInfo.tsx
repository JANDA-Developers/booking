import React, { useState } from "react";
import PageHeader from "../../../components/pageHeader/PageHeader";
import { LANG } from "../../../hooks/hook";
import PageBody from "../../../components/pageBody/PageBody";
import Doc, { DocSection, DocHeader } from "../../../components/doc/Doc";
import Button from "../../../atoms/button/Button";
import PhotoFrame from "../../../atoms/photoFrame/PhotoFrame";
import { IMG_REPO } from "../../../types/const";
import { IContext } from "../BookingHostRouter";
import { Redirect } from "react-router-dom";

interface Iprops {
  context: IContext;
}

const SmsInfo: React.FC<Iprops> = ({ context }) => {
  const [redirect, setRedirect] = useState();

  if (redirect) return <Redirect to={redirect} />;

  return (
    <div>
      <PageHeader desc={LANG("sms_info_decs")} title={LANG("sms_info")} />
      <PageBody>
        <PhotoFrame
          unStyle
          type=".png"
          lang={context.langHook.currentLang}
          src={IMG_REPO + `booking_app/describe/smsinfo_img_02`}
        />
        <Doc>
          <DocSection>
            <DocHeader>{LANG("how_to_save_sms_template_title")}</DocHeader>
            {LANG("how_to_save_sms_template_doc")}
          </DocSection>
          <DocSection>
            <DocHeader>{LANG("how_to_send_sms_for_all_title")}</DocHeader>
            {LANG("how_to_send_sms_for_all_doc")}
          </DocSection>
          <div className="JDflex--center">
            <Button
              mr="no"
              onClick={() => {
                setRedirect("smsTemplate");
              }}
              thema="primary"
              icon="arrowTo"
              label={LANG("go_to_sms_template")}
            />
          </div>
        </Doc>
      </PageBody>
    </div>
  );
};

export default SmsInfo;
