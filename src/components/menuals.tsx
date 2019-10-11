import React, {useState} from "react";
import {toast} from "react-toastify";
import Modal from "../atoms/modal/Modal";
import {IUseModal} from "../hooks/hook";
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

// ❕ 어차피 버튼 눌러서 수정할거니까 전부 STATE 에 하면됨
const JDHomePageManual: React.FC<IProps> = () => {
  // 설명서 다운로드
  const downloadManual = (form: string) => {
    let manual = "";
    if (form === "hwp") manual = manualHwp;
    if (form === "pdf") manual = manualPdf;

    download(manual, `홈페이지 사용 메뉴얼.${form}`).then(() => {
      toast.success("메뉴얼 다운로드 완료");
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
      <h5>JANDA 메뉴얼</h5>
      <div className="flex-grid">
        <div className="flex-grid__col col--full-6 downloadBox">
          <p className="downloadBox__header">
            <span>HWP파일</span>
            <CircleIcon onClick={onDownloadHwp} hover={false}>
              <img src={hwpIcon} alt="hwp Manual" />
            </CircleIcon>
          </p>
          <Button
            onClick={onDownloadHwp}
            label="다운로드"
            thema="grey"
            
            icon="download"
          />
        </div>
        <div className="flex-grid__col col--full-6 downloadBox">
          <JDbox size="small" className="downloadBox__header">
            <span>PDF파일</span>
            <CircleIcon onClick={onDownloadPdf} hover={false}>
              <img src={pdfIcon} alt="pdf Manual" />
            </CircleIcon>
            <Button
              onClick={onDownloadPdf}
              label="다운로드"
              thema="grey"
              
              icon="download"
            />
          </JDbox>
        </div>
        <div className="JDmodal__endSection JDmodal__endSection--float">
          <h6>
            <a href="http://janda-tmp.com" className="JDanchor">
              {"체험시작"}
            </a>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default JDHomePageManual;
