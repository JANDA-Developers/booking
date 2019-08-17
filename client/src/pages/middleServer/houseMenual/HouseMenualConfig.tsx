import React, {useState} from "react";
import Card from "../../../atoms/cards/Card";
import InputText from "../../../atoms/forms/inputText/InputText";
import {
  IUseDayPicker,
  useImageUploader,
  useModal,
  useInput,
  IuseImageUploader
} from "../../../actions/hook";
import Button from "../../../atoms/button/Button";
import JDIcon, {IconSize} from "../../../atoms/icons/Icons";
import {getSalesStatistic_GetSalesStatistic_data} from "../../../types/api";
import "./HouseMenualConfig.scss";
import ProfileCircle from "../../../atoms/profileCircle/ProfileCircle";
import CircleIcon from "../../../atoms/circleIcon/CircleIcon";
import ImageUploader from "../../../atoms/imageUploader/ImageUploader";
import JDmenu, {JDsubMenu} from "../../../atoms/menu/Menu";
import JDswitch from "../../../atoms/forms/switch/Switch";
import JDmodal from "../../../atoms/modal/Modal";
import JDbox from "../../../atoms/box/JDbox";
import {s4} from "../../../utils/utils";
import {
  Language,
  LanguageKr,
  LanguageShort,
  LANGUAGE_LIST
} from "../../../types/enum";
import Help from "../../../atoms/Help/Help";
import {IHouse} from "../../../types/interface";
import HouseMenual from "../../outPages/houseMenual/HouseMenual";

const JDLangModal = JDmodal;

interface IProps {
  house: IHouse;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<Language>>;
  currentLanguage: Language;
}

export interface IHouseMenualConfig {
  mainTitle: string;
  bgImageHook: IuseImageUploader;
}

const HouseMenualConfig: React.FC<IProps> = ({
  house,
  currentLanguage,
  setCurrentLanguage
}) => {
  const tempSrc =
    "https://i.pinimg.com/originals/54/88/35/5488351dfdde55dc9f088eb88a7fef34.png";
  const [enableLngList, setEnableLngList] = useState([Language.KOREAN]);
  const [menuData, setMenuData] = useState([
    {
      _id: s4(),
      index: 0,
      title: "ex",
      content: "",
      icon: "book",
      img: "",
      isEnable: true
    },
    {
      _id: s4(),
      index: 1,
      title: "ex",
      content: "",
      icon: "book",
      img: "",
      isEnable: true
    }
  ]);
  const [shouldSave, setShouldSave] = useState(false);
  const languageConfigModalHook = useModal();

  const menusConfigModalHook = useModal();
  const mainBgModalHook = useModal();
  const [isGuestView, setGuestView] = useState(false);
  const [configData, setConfigData] = useState<IHouseMenualConfig>({
    mainTitle: "",
    bgImageHook: useImageUploader(tempSrc)
  });

  const handleSaveBtnClick = () => {};

  const LangConfigModal = (prop: any) => {
    const shared = (enable: boolean) => {
      const list = LANGUAGE_LIST.filter(lang =>
        enable ? enableLngList.includes(lang) : !enableLngList.includes(lang)
      );

      return (
        <JDbox
          topLabel={enable ? "지원함" : "지원안함"}
          className="clear-fix"
          mode="border"
        >
          {list.map((lang, index) => {
            const fileName = LanguageShort[lang];
            const flag = require(`../../../img/flags/${fileName}.png`);
            return (
              <JDbox size={undefined} float key={s4()}>
                <div className="JDflex--between JDflex--vCenter">
                  <img className="JDstandard-space" src={flag} />
                  <span className="JDstandard-space">{LanguageKr[lang]}</span>
                  <CircleIcon
                    darkWave
                    thema="greybg"
                    onClick={() => {
                      if (enable) {
                        setEnableLngList([
                          ...list.filter((lang, inIndex) => inIndex !== index)
                        ]);
                      } else {
                        setEnableLngList([...enableLngList, lang]);
                      }
                    }}
                  >
                    <JDIcon icon={enable ? "arrowRight" : "arrowLeft"} />
                  </CircleIcon>
                </div>
              </JDbox>
            );
          })}
        </JDbox>
      );
    };

    return (
      <JDmodal {...prop} {...languageConfigModalHook}>
        <h6>지원 언어 선택</h6>
        <div className="flex-grid">
          <div className="flex-grid__col col--full-6">{shared(true)}</div>
          <div className="flex-grid__col col--full-6">{shared(false)}</div>
        </div>
        <p className="JDtextColor--point">
          * 언어선택을 바꾸신후 직접 수정하셔야합니다.
        </p>
      </JDmodal>
    );
  };

  const MenusConfigModal = () => {
    const renderContent = (isEnable: boolean, menu: any) => (
      <JDbox>
        <div className="JDflex--between JDflex--vCenter">
          <JDIcon
            className="JDstandard-space"
            size={IconSize.NORMAL}
            icon={"book"}
          />
          <span className="JDstandard-space">{menu.title}</span>
          <CircleIcon
            darkWave
            thema="greybg"
            onClick={() => {
              if (isEnable) {
                menu.isEnable = false;
              } else {
                menu.isEnable = true;
              }
              setMenuData([...menuData]);
            }}
          >
            <JDIcon icon={isEnable ? "arrowRight" : "arrowLeft"} />
          </CircleIcon>
        </div>
      </JDbox>
    );

    return (
      <JDmodal minWidth={"350px"} noAnimation {...menusConfigModalHook}>
        <h6>메뉴 사용 설정</h6>
        <div className="flex-grid">
          <div className="flex-grid__col col--full-6">
            <JDbox
              className="JDmargin-bottom0 clear-fix"
              mode="border"
              topLabel="사용중"
            >
              {menuData
                .filter(data => data.isEnable)
                .map(menu => renderContent(true, menu))}
            </JDbox>
          </div>
          <div className="flex-grid__col col--full-6">
            <JDbox
              className="JDmargin-bottom0 clear-fix"
              mode="border"
              topLabel="사용안함"
            >
              {menuData
                .filter(data => !data.isEnable)
                .map(menu => renderContent(false, menu))}
            </JDbox>
          </div>
        </div>
      </JDmodal>
    );
  };

  return (
    <div className="houseMenualConfig">
      <div className="container container--sm">
        <div className="docs-section">
          <h3>
            <span className="JDstandard-space">하우스 메뉴얼 설정</span>
            <Help
              size={IconSize.MEDEIUM_SMALL}
              className="JDmargin-bottom0"
              tooltip={
                <span className="JDletterSpace0">
                  하우스 메뉴얼은 게스트가 쉽고 편하게 숙소를 이용할수 있도록
                  안내 페이지를 송신합니다. <br />
                  하우스메뉴얼이 게스트의 숙소이용법을 설명하는 수고를
                  덜어줄겁니다.
                </span>
              }
            />
          </h3>
          <div className="JDflex--between JDflex--vCenter">
            <div>
              <Button
                thema="point"
                onClick={() => {
                  setShouldSave(false);
                  handleSaveBtnClick();
                }}
                pulse={shouldSave}
                label="저장하기"
              />
              <Button
                onClick={() => {
                  menusConfigModalHook.openModal();
                }}
                label="상세설정"
              />
            </div>
            <div>
              <JDswitch
                checked={isGuestView}
                onChange={setGuestView}
                tooltip="게스트가 보는 화면으로 전환하기"
                ltxt="호스트"
                rtxt="게스트"
              />
            </div>
          </div>
          <Card fullHeight align="center">
            <HouseMenual
              host={
                !isGuestView
                  ? {
                      configData,
                      setConfigData,
                      setEnableLngList,
                      setMenuData,
                      languageConfigModalHook
                    }
                  : undefined
              }
              enableLngList={enableLngList}
              house={house}
              mainTitle={configData.mainTitle}
              menuData={menuData}
              bgData={configData.bgImageHook.fileUrl}
              setCurrentLanguage={setCurrentLanguage}
              currentLanguage={currentLanguage}
            />
          </Card>
          {/* 메뉴 설정 모달 */}
          <MenusConfigModal />
          {/* 언어 모달 */}
          <LangConfigModal noAnimation />
        </div>
      </div>
    </div>
  );
};

export default HouseMenualConfig;
