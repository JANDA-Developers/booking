import React, { useState } from "react";
import PageHeader from "../../../components/pageHeader/PageHeader";
import { LANG, useModal, useSelect } from "../../../hooks/hook";
import PageBody from "../../../components/pageBody/PageBody";
import PhotoFrame from "../../../atoms/photoFrame/PhotoFrame";
import JDcard from "../../../atoms/cards/Card";
import InputText from "../../../atoms/forms/inputText/InputText";
import HomepageViewer from "./components/HomepageViewer";
import CheckBox from "../../../atoms/forms/checkBox/CheckBox";
import PreviewModal from "./components/PrevModal";
import { IMG_REPO, HOMPAGES, PAYMETHOD_FOR_JD_OP } from "../../../types/const";
import { IContext } from "../BookingHostRouter";
import "./HomepageRequest.scss";
import CalculateViewer from "./components/CalculateViewer";
import Button from "../../../atoms/button/Button";
import UrlModal from "./components/UrlModal";
import Align from "../../../atoms/align/Align";
import CardModalWrap from "../../../components/cardModal/CardModalWrap";
import { HomapgeOp, IMu } from "../../../types/interface";
import {
  createUserRequest,
  createUserRequestVariables,
  DoBillPayInput
} from "../../../types/api";
import { LayoutDesign, UserReqeustType } from "../../../types/enum";
import PriceTag from "./components/PriceTag";
import PayMethodSelecter from "./components/PayMethodSelecter";
import JDlist from "../../../atoms/list/List";
import JDIcon from "../../../atoms/icons/Icons";
import { arraySum } from "../../../utils/elses";
import { ICardModalInfo } from "../../../components/cardModal/declare";

type TRequest = {
  siteName: string;
  url: string[];
  managerName: string;
  contact: string;
  eamil: string;
  userMsg: string;
  design: string;
};

interface IHomepageOp extends HomapgeOp {
  selected: boolean;
}

interface IProps {
  context: IContext;
  homepageOptions: IHomepageOp[];
  createUserRequestMu: IMu<createUserRequest, createUserRequestVariables>;
}

const HomepageRequest: React.FC<IProps> = ({
  context,
  createUserRequestMu,
  homepageOptions
}) => {
  const { langHook, house, user } = context;
  const { _id, name: userName, email } = user;
  const { _id: houseId } = house;
  const { currentLang } = langHook;
  const cardModalHook = useModal<ICardModalInfo>(false);
  const previewModalHook = useModal(false);
  const urlModalHook = useModal(false);
  const paymethodHook = useSelect(PAYMETHOD_FOR_JD_OP[0]);

  const [requestData, setRequestData] = useState<TRequest>({
    siteName: "",
    url: ["", "", "", ""],
    managerName: "",
    contact: "",
    eamil: "",
    userMsg: "",
    design: LayoutDesign.BASIC
  });

  const [HOptions, setHOptions] = useState<IHomepageOp[]>(
    homepageOptions.map(op => {
      if (!op.price) {
        op.selected = true;
      }
      return op;
    })
  );

  function set<T extends keyof TRequest>(key: T, value: TRequest[T]) {
    setRequestData({ ...requestData, [key]: value });
  }
  const handleSubmitUrlModal = (urls: string[]) => {
    set("url", urls);
  };

  const selectedOptions = HOptions.filter(ho => ho.selected).map(op => ({
    title: LANG("HomepageOptions", op.key),
    price: op.price
  }));
  const totalSum = arraySum(selectedOptions.map(op => op.price));

  const Wrap: React.FC<any> = ({ flag, children }) =>
    flag ? <div>{children}</div> : children;

  const createHompageRequestFn = (payInfo?: DoBillPayInput) => {
    const {
      contact,
      url,
      userMsg,
      design,
      eamil,
      managerName,
      siteName
    } = requestData;
    createUserRequestMu({
      variables: {
        param: {
          userId: _id,
          homepageInfo: {
            contact,
            eamil,
            url,
            options: HOptions.map(op => ({
              price: op.price,
              key: op.key
            })),
            siteName,
            managerName,
            houseId,
            design: design as LayoutDesign
          },
          payInfo: payInfo
            ? {
                ...payInfo,
                buyerName: userName,
                buyerEmail: email
              }
            : undefined,
          types: UserReqeustType.HOMEPAGE,
          userMsg
        }
      }
    });
  };

  const handleRequestHomepage = () => {
    if (totalSum) {
      cardModalHook.openModal({
        mode: "all",
        unPadding: true,
        onSubmit: ({ billKey }) => {
          createHompageRequestFn({
            amt: totalSum,
            billKey,
            buyerEmail: "",
            goodsName: LANG("homepage"),
            buyerName: "",
            goodsCnt: 1
          });
        }
      });
      return;
    }
    createHompageRequestFn();
  };

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
                {/* siteName */}
                <InputText
                  label={LANG("site_name")}
                  value={requestData.siteName}
                  onChange={v => {
                    set("siteName", v);
                  }}
                />
              </div>
              <div className="flex-grid__col col--full-6 col--wmd-12">
                <Align
                  mb="normal"
                  flex={{
                    grow: true
                  }}
                >
                  {/* 희망 url들 */}
                  <InputText
                    label={LANG("request_urls")}
                    value={requestData.url.filter(d => d !== "").join(", ")}
                    readOnly
                    mb="no"
                  />
                  <Button
                    style={{
                      alignSelf: "flex-end"
                    }}
                    onClick={() => {
                      urlModalHook.openModal();
                    }}
                    mode="border"
                    label={LANG("add")}
                  />
                </Align>
              </div>
            </div>
            <div className="flex-grid">
              <div className="flex-grid__col col--full-6 col--wmd-12">
                <InputText
                  onChange={v => {
                    set("managerName", v);
                  }}
                  label={LANG("manage_name")}
                />
              </div>
              <div className="flex-grid__col col--full-6 col--wmd-12">
                {/* contact */}
                <InputText
                  onChange={v => {
                    set("contact", v);
                  }}
                  label={LANG("contact")}
                />
              </div>
            </div>
            <div className="flex-grid">
              <div className="flex-grid__col col--full-6 col--wmd-12">
                {/* email */}
                <InputText
                  onChange={v => {
                    set("eamil", v);
                  }}
                  label={LANG("email")}
                />
              </div>
              {/* user Message */}
              <div className="flex-grid__col col--full-6 col--wmd-12">
                <InputText
                  onChange={v => {
                    set("userMsg", v);
                  }}
                  label={LANG("else_fill")}
                  textarea
                  autoHeight
                />
              </div>
            </div>
          </JDcard>
        </div>
        <div>
          <JDcard>
            <h5>{LANG("design_select")}</h5>
            <div>
              {HOMPAGES.map(hp => (
                <HomepageViewer previewModalHook={previewModalHook} hp={hp} />
              ))}
            </div>
          </JDcard>
        </div>
        <div>
          <JDcard>
            <h5>{LANG("select_addtional_ui")}</h5>
            <div className="homepageRequest__optionsWrap">
              {HOptions.map((op, index) => (
                <Align flex={{}}>
                  <CheckBox
                    onChange={flag => {
                      HOptions[index].selected = flag;
                      setHOptions([...HOptions]);
                    }}
                    checked={op.selected}
                    size="tiny"
                    label={LANG("HomepageOptions", op.key)}
                  />
                  <PriceTag price={op.price} />
                </Align>
              ))}
            </div>
            <CalculateViewer
              products={[
                {
                  price: 0,
                  sub: selectedOptions,
                  title: LANG("homepage")
                }
              ]}
            />
            <PayMethodSelecter
              menuPlacement="top"
              position
              selectHook={paymethodHook}
            />
            <JDlist
              mb="large"
              marginBottom="normal"
              contents={[
                <Align flex={{ vCenter: true }}>
                  <JDIcon mr="normal" color="error" icon="info" />
                  {LANG("homepage_request_info1")}
                </Align>,
                <Align flex={{ vCenter: true }}>
                  <JDIcon mr="normal" color="error" icon="info" />
                  {LANG("homepage_request_info2")}
                </Align>
              ]}
            />
            <PageBody>
              <Button
                onClick={() => {
                  handleRequestHomepage();
                }}
                mode="flat"
                label={LANG("homepage_request")}
                thema="primary"
                size="longLarge"
              />
            </PageBody>
          </JDcard>
        </div>
      </PageBody>
      <CardModalWrap modalHook={cardModalHook} context={context} />
      <PreviewModal modalHook={previewModalHook} />
      <UrlModal
        onSubmit={handleSubmitUrlModal}
        urls={requestData.url}
        modalHook={urlModalHook}
      />
    </div>
  );
};

export default HomepageRequest;
