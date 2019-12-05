import React from "react";
import PageHeader from "../../../components/pageHeader/PageHeader";
import { LANG } from "../../../hooks/hook";
import PageBody from "../../../components/pageBody/PageBody";
import Doc, { DocSection, DocHeader } from "../../../components/doc/Doc";
import Button from "../../../atoms/button/Button";
import JDlist from "../../../atoms/list/List";
import PhotoFrame from "../../../atoms/photoFrame/PhotoFrame";
import { IMG_REPO } from "../../../types/enum";
import { IContext } from "../BookingHostRouter";

interface Iprops {
  context: IContext;
}

const SmsInfo: React.FC<Iprops> = ({ context }) => {
  return (
    <div>
      <PageHeader
        desc={LANG("bookingList__desc")}
        title={LANG("bookingList")}
      />
      <PageBody>
        <PhotoFrame
          unStyle
          type=".png"
          context={context}
          langPic
          src={IMG_REPO + `smsInfo/smsinfo_img_02`}
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
