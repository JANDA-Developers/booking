import React, { useRef } from 'react';
import { RowInfo, CellInfo } from 'react-table';
import {
  Tab, Tabs, TabList, TabPanel,
} from '../../../atoms/tabs/tabs';
import CircleIcon from '../../../atoms/circleIcon/CircleIcon';
import Icon from '../../../atoms/icons/Icons';
import InputText from '../../../atoms/forms/inputText/InputText';

import Button from '../../../atoms/button/Button';
import Card from '../../../atoms/cards/Card';
import { useInput } from '../../../actions/hook';
import Switch from '../../../atoms/forms/switch/Switch';
import JDtable, { ReactTableDefault } from '../../../atoms/table/Table';
import SmsTemplate from './components/smsTemplate';

// TODO 쿼리랑 뮤테이션 받아서 연결하면됨

interface IProps {}

const Qna: React.FC<IProps> = () => {
  const hostNumber = useInput('');

  //  마지막에 추가해줘라
  const data = [
    {
      name: '',
      phoneNumber: '',
      active: true,
    },
  ];

  const TableColumns = [
    {
      Header: '관리자 성함',
      accessor: 'name',
      Cell: ({ original }: CellInfo) => <InputText hyphen />,
    },
    {
      Header: '번호',
      accessor: 'phoneNumber',
      Cell: ({ original }: CellInfo) => <InputText hyphen />, // Custom cell components!
    },
    {
      Header: '활성화',
      accessor: 'active',
      Cell: ({ value }: CellInfo) => <Switch checked={value} />,
    },
    {
      Header: '삭제',
      accessor: 'clear',
      Cell: ({ original, index }: CellInfo) => (index + 1 !== data.length ? (
        <Button mode="flat" thema="warn" label="삭제" />
      ) : (
        <Button mode="flat" thema="primary" label="추가" />
      )),
    },
  ];

  return (
    <div id="seasonTable" className="seasonT container">
      <div className="docs-section">
        <div className="docs-section__box">
          <h3>SMS 설정</h3>
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
                <JDtable {...ReactTableDefault} data={data} columns={TableColumns} />
              </Card>
            </div>
          </div>
        </div>
        <div className="docs-section__box">
          <h6>문자 템플릿 설정</h6>
          <Tabs>
            <TabList>
              <Tab>
                <InputText placeholder="템플릿 명칭" />
              </Tab>
              <Tab>
                <CircleIcon>
                  <Icon icon="add" />
                </CircleIcon>
              </Tab>
            </TabList>
            {/* map this */}
            <SmsTemplate />
            <TabPanel />
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Qna;
