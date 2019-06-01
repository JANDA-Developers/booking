import React, {useRef, useState} from "react";
import {RowInfo, CellInfo} from "react-table";
import {Tab, Tabs, TabList, TabPanel} from "../../../atoms/tabs/tabs";
import CircleIcon from "../../../atoms/circleIcon/CircleIcon";
import Icon from "../../../atoms/icons/Icons";
import InputText from "../../../atoms/forms/inputText/InputText";

import Button from "../../../atoms/button/Button";
import Card from "../../../atoms/cards/Card";
import {useInput} from "../../../actions/hook";
import Switch from "../../../atoms/forms/switch/Switch";
import JDtable, {ReactTableDefault} from "../../../atoms/table/Table";
import SmsTemplate from "./components/smsTemplate";
import {MutationFn} from "react-apollo";
import {
  updateSmsTemplate,
  updateSmsTemplateVariables,
  deleteSmsTemplate,
  deleteSmsTemplateVariables,
  createSmsTemplate,
  createSmsTemplateVariables,
  getSmsInfo_GetSmsInfo_smsInfo
} from "../../../types/api";
import Preloader from "../../../atoms/preloader/Preloader";
import {DEFAULT_SMS_TEMPLATE} from "../../../types/defaults";

// TODO 쿼리랑 뮤테이션 받아서 연결하면됨

interface IProps {
  smsTemplateMutationes: {
    updateSmsTemplateMu: MutationFn<
      updateSmsTemplate,
      updateSmsTemplateVariables
    >;
    deleteSmsTemplateMu: MutationFn<
      deleteSmsTemplate,
      deleteSmsTemplateVariables
    >;
    createSmsTemplateMu: MutationFn<
      createSmsTemplate,
      createSmsTemplateVariables
    >;
  };
  loading: boolean;
  smsInfo: getSmsInfo_GetSmsInfo_smsInfo | null | undefined;
  houseId: string;
}

const Qna: React.FC<IProps> = ({
  smsTemplateMutationes,
  loading,
  smsInfo,
  houseId
}) => {
  const hostNumber = useInput("");

  // 추가용
  if (smsInfo) {
    if (smsInfo.smsTemplates === null) {
      smsInfo.smsTemplates = [DEFAULT_SMS_TEMPLATE];
    } else {
      smsInfo.smsTemplates.push(DEFAULT_SMS_TEMPLATE);
    }
  }

  const templateNames =
    smsInfo && smsInfo.smsTemplates!.map(smsTemplate => smsTemplate.formatName);
  const [templateTitles, setTemplateTitles] = useState<string[]>(
    templateNames || []
  );

  const TableColumns = [
    {
      Header: "관리자 성함",
      accessor: "name",
      Cell: ({original}: CellInfo<any>) => <InputText hyphen />
    },
    {
      Header: "번호",
      accessor: "phoneNumber",
      Cell: ({original}: CellInfo<any>) => <InputText hyphen /> // Custom cell components!
    },
    {
      Header: "활성화",
      accessor: "active",
      Cell: ({value}: CellInfo<any>) => <Switch checked={value} />
    },
    {
      Header: "삭제",
      accessor: "clear",
      Cell: ({original, index}: CellInfo<any>) =>
        index + 1 !== data.length ? (
          <Button mode="flat" thema="warn" label="삭제" />
        ) : (
          <Button mode="flat" thema="primary" label="추가" />
        )
    }
  ];

  return (
    <div id="seasonTable" className="seasonT container">
      <div className="docs-section">
        <div className="docs-section__box">
          <h3>
            SMS 설정
            {loading && <Preloader size="medium" />}
          </h3>
          <div className="flex-grid">
            <div className="flex-grid__col col--full-6 col--md-12">
              <Card>
                <h6>기본설정</h6>
                {/* direct Mu */}
                <InputText {...hostNumber} hyphen label="관리자 발신번호" />
                <InputText label="알리고 토큰" />
                <InputText label="알리고 아이디" />
              </Card>
            </div>
            <div className="flex-grid__col col--full-6 col--md-12">
              <Card>
                <h6>관라자 수신 등록</h6>
                <JDtable
                  {...ReactTableDefault}
                  // data={data}
                  columns={TableColumns}
                />
              </Card>
            </div>
          </div>
        </div>
        <div className="docs-section__box">
          <h6>문자 템플릿 설정</h6>
          <Tabs>
            <TabList>
              {templateTitles.map((title: string, index: number) => (
                <Tab>
                  <InputText
                    onChange={() => {
                      templateTitles[index] = title;
                      setTemplateTitles([...templateTitles]);
                    }}
                    value={title}
                    placeholder="템플릿 명칭"
                  />
                </Tab>
              ))}
            </TabList>
            {smsInfo &&
              smsInfo.smsTemplates &&
              smsInfo.smsTemplates.map((smsTemplate, index) => (
                <SmsTemplate
                  templateTitle={templateTitles[index]}
                  smsTemplateMutationes={smsTemplateMutationes}
                  templateData={smsTemplate}
                  houseId={houseId}
                />
              ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Qna;
