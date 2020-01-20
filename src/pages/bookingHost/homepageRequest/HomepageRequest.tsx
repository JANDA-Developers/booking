import React, { useState } from "react";
import PageHeader from "../../../components/pageHeader/PageHeader";
import { LANG } from "../../../hooks/hook";
import PageBody from "../../../components/pageBody/PageBody";
import PhotoFrame from "../../../atoms/photoFrame/PhotoFrame";
import JDcard from "../../../atoms/cards/Card";
import InputText from "../../../atoms/forms/inputText/InputText";
import HomepageViewer from "./components/HomepageViewer";
import CheckBox from "../../../atoms/forms/checkBox/CheckBox";
import { IMG_REPO } from "../../../types/const";
import { IContext } from "../BookingHostRouter";
import "./HomepageRequest.scss";
import CalculateViewer from "./components/CalculateViewer";

interface IProps {
  context: IContext;
}

enum HomepageOption {
  RESV_PAGE = "RESV_PAGE",
  PRICE_INFO_PAGE = "PRICE_INFO_PAGE",
  RESV_INTRO_PAGE = "RESV_INTRO_PAGE",
  NOTICE_PAGE = "NOTICE_PAGE",
  PHOTO_REVIEW = "PHOTO_REVIEW",
  QUESTION_PAGE = "QUESTION_PAGE",
  INSTA_SHOW = "INSTA_SHOW",
  CUSTOM_DESIGN = "CUSTOM_DESIGN",
  CUSTOM_DEVELOP = "CUSTOM_DEVELOP"
}

type THoption = {
  label: string;
  value: number;
};

enum LayoutType {
  BASIC = "BASIC",
  RED = "RED"
}

const HomepageRequest: React.FC<IProps> = ({ context }) => {
  const { langHook } = context;
  const { currentLang } = langHook;
  const [layout, setLayout] = useState<LayoutType>(LayoutType.BASIC);
  const [HOptions, setHOptions] = useState<THoption[]>([]);

  const HomePageOption = ({ key, label }: { label: string; key: string }) => (
    <CheckBox size="small" label={label} />
  );

  const layouts = [
    {
      desc: "",
      name: "",
      key: "",
      imgUrl: ""
    }
  ];

  const options = [
    {
      label: HomepageOption.CUSTOM_DESIGN,
      value: 0
    },
    {
      label: HomepageOption.CUSTOM_DEVELOP,
      value: 0
    },
    {
      label: HomepageOption.CUSTOM_DEVELOP,
      value: 0
    },
    {
      label: HomepageOption.CUSTOM_DEVELOP,
      value: 0
    },
    {
      label: HomepageOption.CUSTOM_DEVELOP,
      value: 0
    },
    {
      label: HomepageOption.CUSTOM_DEVELOP,
      value: 0
    },
    {
      label: HomepageOption.CUSTOM_DEVELOP,
      value: 0
    },
    {
      label: HomepageOption.CUSTOM_DEVELOP,
      value: 0
    }
  ];

  const Wrap: React.FC<any> = ({ flag, children }) =>
    flag ? <div>{children}</div> : children;

  return (
    <div className="homepageRequest">
      <PageHeader
        desc={LANG("homepage_request_decs")}
        title={LANG("homepage_request")}
      />
      <PageBody>
        <div>
          <JDcard>
            <PhotoFrame
              isBgImg
              responseImg
              context={context}
              type=".png"
              lang={currentLang}
              unStyle
              className="homepageRequest__topPhoto JDbgColor--primary"
              src={`${IMG_REPO}booking_app/describe/homepage_request`}
            />
          </JDcard>
        </div>
        <div>
          <JDcard>
            <h5>{LANG("basic_info_insert")}</h5>
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
        </div>
        <div>
          <JDcard>
            <h5>{LANG("design_select")}}</h5>
            <div>
              <HomepageViewer />
            </div>
          </JDcard>
        </div>
        <div>
          <JDcard>
            <h5>{LANG("select_addtional_ui")}</h5>
            <div className="homePageRequest__optionsWrap">
              {options.map((op, index) => (
                <HomePageOption key={op.label} label={op.label} />
              ))}
            </div>
            <CalculateViewer
              products={[
                {
                  price: LANG("free"),
                  sub: HOptions.map(op => ({
                    title: op.label,
                    price: op.value.toString()
                  })),
                  title: LANG("homepage")
                }
              ]}
            />
          </JDcard>
        </div>
      </PageBody>
    </div>
  );
};

export default HomepageRequest;
