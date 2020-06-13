import React from "react";
import PageHeader from "../../../../../components/pageHeader/PageHeader";
import { LANG } from "../../../../../hooks/hook";
import PageBody from "../../../../../components/pageBody/PageBody";
import PhotoFrame from "../../../../../atoms/photoFrame/PhotoFrame";
import { IMG_REPO } from "../../../../../types/const";
import Doc, { DocSection, DocHeader } from "../../../../../components/doc/Doc";
import { IContext } from "../../../BookingHostRouter";
import { DEFAULT_PRODUCT } from "../../../../../types/defaults";
import "./UsageGuide.scss";
import { currentLang } from "../../../../../langs/JDlang";

interface IProps {
  context: IContext;
}

const UsageGuide: React.FC<IProps> = ({ context }) => {
  const { applyedProduct } = context;
  const { price } = applyedProduct || DEFAULT_PRODUCT;
  return (
    <div className="usageGuide">
      <PhotoFrame
        isBgImg
        unStyle
        responseImg
        type=".png"
        className="usageGuide__topPhoto"
        lang={currentLang}
        src={IMG_REPO + `booking_app/describe/service_usage1`}
      />
      <Doc>
        <DocSection>
          <DocHeader>{LANG("pay_doc_title1")}</DocHeader>
          {LANG("pay_doc_desc1")(price)}
        </DocSection>
        <DocSection>
          <DocHeader>{LANG("pay_doc_title2")}</DocHeader>
          {LANG("pay_doc_desc2")}
        </DocSection>
        <DocSection>
          <DocHeader>{LANG("pay_doc_title3")}</DocHeader>
          {LANG("pay_doc_desc3")}
        </DocSection>
      </Doc>
    </div>
  );
};

export default UsageGuide;
