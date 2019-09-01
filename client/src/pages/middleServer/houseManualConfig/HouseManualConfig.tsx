import React, {useState, useEffect, useRef} from "react";
import Card from "../../../atoms/cards/Card";
import {
  useImageUploader,
  useModal,
  IuseImageUploader,
  useShouldSave
} from "../../../actions/hook";
import Button from "../../../atoms/button/Button";
import JDIcon, {IconSize} from "../../../atoms/icons/Icons";
import {
  getHManual_GetHManual_houseManual,
  updateHManual,
  updateHManualVariables,
  getHManual_GetHManual_houseManual_menus
} from "../../../types/api";
import "./HouseManualConfig.scss";
import CircleIcon from "../../../atoms/circleIcon/CircleIcon";
import JDmodal from "../../../atoms/modal/Modal";
import JDbox from "../../../atoms/box/JDbox";
import {muResult} from "../../../utils/utils";
import {Language, LANGUAGE_LIST} from "../../../types/enum";
import Help from "../../../atoms/Help/Help";
import {IHouse} from "../../../types/interface";
import HouseManual from "../../outPages/houseManual/HouseManual";
import LangList from "../../../components/langList/LangList";
import LangConfigModal from "./component/LangConfigModal";
import {MutationFn} from "react-apollo";
import {toast} from "react-toastify";
import Preloader from "../../../atoms/preloader/Preloader";
import {IContext} from "../../MiddleServerRouter";

interface IProps {
  context: IContext;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<Language>>;
  currentLanguage: Language;
  loading: boolean;
  houseManual?: getHManual_GetHManual_houseManual;
  updateManualMu: MutationFn<updateHManual, updateHManualVariables>;
}

export interface IHouseManualConfig {
  mainTitle: string;
  bgImageHook: IuseImageUploader;
}

const HouseManualConfig: React.FC<IProps> = ({
  houseManual,
  currentLanguage,
  loading,
  setCurrentLanguage,
  context,
  updateManualMu
}) => {
  const {house} = context;
  const tempSrc =
    "https://i.pinimg.com/originals/54/88/35/5488351dfdde55dc9f088eb88a7fef34.png";
  const [enableLngList, setEnableLngList] = useState([Language.KOREAN]);
  const [menuData, setMenuData] = useState(
    houseManual ? houseManual.menus : []
  );
  const previewModalHook = useModal();
  const languageConfigModalHook = useModal();
  const menusConfigModalHook = useModal();
  const [isGuestView, setGuestView] = useState(false);
  const [mainTitle, setMainTitle] = useState("");
  const bgImageHook = useImageUploader(
    houseManual ? houseManual.backgroundImg : tempSrc
  );
  const {shouldSave, setShouldSave} = useShouldSave([
    mainTitle,
    bgImageHook.fileUrl,
    enableLngList,
    menuData
  ]);

  const validate = (): boolean => {
    if (!mainTitle) return false;

    if (menuData.find(menu => !menu.content)) {
      return false;
    }

    return true;
  };

  const handleSaveBtnClick = async () => {
    if (validate()) {
      const result = await updateManualMu({
        variables: {
          houseId: house._id,
          lang: currentLanguage,
          updateParams: {
            backgroundImg: bgImageHook.fileUrl,
            menus: menuData,
            name: mainTitle
          }
        }
      });
      if (muResult(result, "UpdateManual")) {
        setShouldSave(false);
      }
    }
  };

  const MenusConfigModal = () => {
    const renderContent = (
      isEnable: boolean,
      menu: getHManual_GetHManual_houseManual_menus
    ) => (
      <JDbox>
        <div className="JDflex--between JDflex--vCenter">
          <JDIcon
            className="JDstandard-space"
            size={IconSize.NORMAL}
            icon={menu.icon as any}
          />
          <span className="JDstandard-space">{menu.name}</span>
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
      <JDmodal minContentsWidth={"350px"} noAnimation {...menusConfigModalHook}>
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

  let userProp = undefined;

  if (houseManual) {
    userProp = {
      profileImg: houseManual.profileImg,
      phoneNumber: houseManual.phoneNumber,
      location: houseManual.house.location
    };
  }

  const sharedProps = {
    enableLngList,
    house,
    mainTitle,
    menuData,
    bgData: bgImageHook.fileUrl,
    setCurrentLanguage,
    currentLanguage,
    userProp
  };

  return (
    <div className="houseManualConfig">
      <Preloader floating size="medium" loading={loading} />
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
                className="JDz-index-1"
                thema="point"
                pulse={shouldSave}
                onClick={() => {
                  handleSaveBtnClick();
                }}
                label="저장하기"
              />
              <Button
                onClick={() => {
                  menusConfigModalHook.openModal();
                }}
                label="메뉴설정"
              />
              <Button
                onClick={() => {
                  languageConfigModalHook.openModal();
                }}
                label="언어설정"
              />
            </div>
            <div>
              <Button
                onClick={() => {
                  previewModalHook.openModal();
                }}
                label="미리보기"
              />
            </div>
          </div>
          <div>
            <Card fullHeight align="center">
              <div className="JDstandard-margin-bottom">
                <LangList
                  onClickLng={lang => {
                    if (shouldSave) {
                      toast.warn("언어를 변경하시기전에 먼저 저장해주세요");
                    } else {
                      setCurrentLanguage(lang);
                    }
                  }}
                  hilightLangs={[currentLanguage]}
                  hideList={LANGUAGE_LIST.filter(
                    lang => !enableLngList.includes(lang)
                  )}
                />
              </div>
              <HouseManual
                host={
                  !isGuestView
                    ? {
                        setMainTitle,
                        setEnableLngList,
                        setMenuData,
                        bgImageHook
                      }
                    : undefined
                }
                {...sharedProps}
              />
            </Card>
          </div>
          {/* 메뉴 설정 모달 */}
          <MenusConfigModal />
          {/* 언어 설정 모달 */}
          <LangConfigModal
            setEnableLngList={setEnableLngList}
            modalHook={languageConfigModalHook}
            enableLngList={enableLngList}
          />
        </div>
      </div>
      <JDmodal minWidth="360px" {...previewModalHook}>
        <HouseManual {...sharedProps} />
      </JDmodal>
    </div>
  );
};

export default HouseManualConfig;
