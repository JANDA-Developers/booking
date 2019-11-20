import React, {useState} from "react";
import {toast} from "react-toastify";
import Modal from "../atoms/modal/Modal";
import {IUseModal, LANG} from "../hooks/hook";
import Button from "../atoms/button/Button";
import CircleIcon from "../atoms/circleIcon/CircleIcon";
// @ts-ignore
import manualHwp from "../../../../docs/manual.hwp";
// @ts-ignore
import manualPdf from "../../../../docs/manual.pdf";
import hwpIcon from "../../../../img/icon/hwpIcon.png";
import pdfIcon from "../../../../img/icon/pdfIcon.png";
import {download} from "../utils/utils";
import JDbox from "../atoms/box/JDbox";

interface IProps {}

const JDHomePageManual: React.FC<IProps> = () => {
  // 설명서 다운로드
  const downloadManual = (form: string) => {
    let manual = "";
    if (form === "hwp") manual = manualHwp;
    if (form === "pdf") manual = manualPdf;

    download(manual, `${LANG("homepage_manual")}${form}`).then(() => {
      toast.success(LANG("manual_download_complete"));
    });
  };

  const onDownloadHwp = () => {
    downloadManual("hwp");
  };

  const onDownloadPdf = () => {
    downloadManual("pdf");
  };

  return (
    <div>
      <h5>JANDA {LANG("manual")}</h5>
      <div className="flex-grid">
        <div className="flex-grid__col col--full-6 downloadBox">
          <p className="downloadBox__header">
            <span>HWP{LANG("file")}</span>
            <CircleIcon onClick={onDownloadHwp} hover={false}>
              <img src={hwpIcon} alt="hwp Manual" />
            </CircleIcon>
          </p>
          <Button
            onClick={onDownloadHwp}
            label={LANG("download")}
            thema="grey"
            icon="download"
          />
        </div>
        <div className="flex-grid__col col--full-6 downloadBox">
          <JDbox size="small" className="downloadBox__header">
            <span>PDF{LANG("file")}</span>
            <CircleIcon onClick={onDownloadPdf} hover={false}>
              <img src={pdfIcon} alt="pdf Manual" />
            </CircleIcon>
            <Button
              onClick={onDownloadPdf}
              label={LANG("download")}
              thema="grey"
              icon="download"
            />
          </JDbox>
        </div>
        <div className="JDmodal__endSection JDmodal__endSection--float">
          <h6>
            <a href="http://janda-tmp.com" className="JDanchor">
              {LANG("start_experience")}
            </a>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default JDHomePageManual;
