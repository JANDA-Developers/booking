import React from "react";
import PageHeader from "../../../components/pageHeader/PageHeader";
import { LANG } from "../../../hooks/hook";
import PageBody from "../../../components/pageBody/PageBody";
import PhotoFrame from "../../../atoms/photoFrame/PhotoFrame";
import { WindowSizeShort } from "../../../types/enum";
import JDcard from "../../../atoms/cards/Card";
import InputText from "../../../atoms/forms/inputText/InputText";
import HomepageViewer from "./components/HomepageViewer";
import CheckBox from "../../../atoms/forms/checkBox/CheckBox";

interface IProps {}

const HomepageRequest: React.FC<IProps> = () => {
  const HomePageOption = ({ key, label }: { label: string; key: string }) => (
    <CheckBox size="small" label={label} />
  );

  const CalculateViewer = () => <div></div>;

  return (
    <div>
      <PageHeader desc={LANG("sms_info_decs")} title={LANG("sms_info")} />
      <PageBody>
        <JDcard>
          <PhotoFrame
            responseImg={[WindowSizeShort.TABLET]}
            type=".png"
            unStyle
            langPic
            src="booking_app/describe/homepage_request_01"
          />
        </JDcard>
        <JDcard>
          <h5>기본정보 입력하기</h5>
          <div className="flex-grid">
            <div className="flex-grid__col col--full-6 col--wmd-12">
              <InputText />
            </div>
            <div className="flex-grid__col col--full-6 col--wmd-12">
              <InputText />
            </div>
          </div>
          <div className="flex-grid">
            <div className="flex-grid__col col--full-6 col--wmd-12">
              <InputText />
            </div>
            <div className="flex-grid__col col--full-6 col--wmd-12">
              <InputText />
            </div>
          </div>
          <div className="flex-grid">
            <div className="flex-grid__col col--full-6 col--wmd-12">
              <InputText />
            </div>
            <div className="flex-grid__col col--full-6 col--wmd-12">
              <InputText />
            </div>
          </div>
        </JDcard>
        <JDcard>
          <h5>디자인 선택하기</h5>
          <div>
            <HomepageViewer />
            <HomepageViewer />
          </div>
        </JDcard>
        <JDcard>
          <h5>추가옵션 선택하기</h5>
          <div>
            <HomePageOption key="a" label={"option1"} />
          </div>
          <CalculateViewer />
        </JDcard>
      </PageBody>
    </div>
  );
};

export default HomepageRequest;
