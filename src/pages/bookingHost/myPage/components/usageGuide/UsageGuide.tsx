import React from "react";
import PageHeader from "../../../../../components/pageHeader/PageHeader";
import { LANG } from "../../../../../hooks/hook";
import PageBody from "../../../../../components/pageBody/PageBody";
import PhotoFrame from "../../../../../atoms/photoFrame/PhotoFrame";
import { IMG_REPO } from "../../../../../types/const";
import { DocSection, DocHeader } from "../../../../../components/doc/Doc";
import Button from "../../../../../atoms/button/Button";
import { IContext } from "../../../BookingHostRouter";

interface IProps {
  context: IContext;
}

const UsageGuide: React.FC<IProps> = context => {
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
        </Doc>
      </PageBody>
    </div>
  );
};

export default UsageGuide;
