import React, {useState, useEffect, useRef, Fragment} from "react";
import Card from "../../../atoms/cards/Card";
import {
  useImageUploader,
  useModal,
  IuseImageUploader,
  useShouldSave,
  useInput,
  LANG
} from "../../../hooks/hook";
import Button from "../../../atoms/button/Button";
import JDIcon, {IconSize} from "../../../atoms/icons/Icons";
import {
  getHM_GetHM_HM,
  updateHM,
  updateHMVariables,
  getHM_GetHM_HM_menus
} from "../../../types/api";
import "./HMconfig.scss";
import CircleIcon from "../../../atoms/circleIcon/CircleIcon";
import JDmodal from "../../../atoms/modal/Modal";
import JDbox from "../../../atoms/box/JDbox";
import {muResult} from "../../../utils/utils";
import {
  Language,
  LANGUAGE_LIST,
  FLOATING_PRELOADER_SIZE,
  MODAL_MIN_WIDTH,
  WindowSize
} from "../../../types/enum";
import Help from "../../../atoms/Help/Help";
import LangList from "../../../components/langList/LangList";
import LangConfigModal from "./component/LangConfigModal";
import {MutationFn} from "react-apollo";
import {toast} from "react-toastify";
import Preloader from "../../../atoms/preloader/Preloader";
import {IContext} from "../../MiddleServerRouter";
import {isMobile} from "is-mobile";
import TooltipList, {
  ReactTooltip
} from "../../../atoms/tooltipList/TooltipList";
import HMcomponent from "../../outPages/HM/HM";
import {DEFAUT_HM} from "../../../types/defaults";
import InputText from "../../../atoms/forms/inputText/InputText";
import {isPhone, isEmail} from "../../../utils/inputValidations";
import {MutationFunctionOptions} from "@apollo/react-common";
import {ExecutionResult} from "graphql";

interface IProps {
  context: IContext;
  loading: boolean;
  HM?: getHM_GetHM_HM;
  updateHMmu: (
    options?: MutationFunctionOptions<updateHM, updateHMVariables> | undefined
  ) => Promise<ExecutionResult<updateHM>>;
  mutationLoading: boolean;
}

export interface IHMconfig {
  title: string;
  bgImageHook: IuseImageUploader;
}

const HMconfig: React.FC<IProps> = ({
  HM = DEFAUT_HM,
  loading,
  context,
  mutationLoading,
  updateHMmu
}) => {
  const {house} = context;
  const tempSrc = null;
  // "https://i.pinimg.com/originals/54/88/35/5488351dfdde55dc9f088eb88a7fef34.png";
  const [currentLang, setCurrentLang] = useState(Language.KOREAN);
  const [enableLangs, setEnableLngList] = useState(HM.langList);
  const [menuData, setMenuData] = useState(HM.menus);
  const previewModalHook = useModal();
  const phoneNumberModalHook = useModal();
  const phoneNumberHook = useInput(HM.phoneNumber, true);
  const emailModalHook = useModal();
  const emailHook = useInput(HM.email, true);
  const languageConfigModalHook = useModal();
  const menusConfigModalHook = useModal();
  const [isGuestView, setGuestView] = useState(false);
  const [title, setTitle] = useState(HM.title);
  const bgImageHook = useImageUploader(HM.backgroundImg, {
    resizeMaxWidth: WindowSize.PHABLET
  });
  const {shouldSave, setShouldSave} = useShouldSave([
    title,
    bgImageHook.file,
    enableLangs,
    menuData
  ]);

  const validate = (): boolean => {
    if (!title) {
      toast.warn(LANG("please_input_HM_title"));
      return false;
    }

    if (!phoneNumberHook.isValid) {
      toast.warn(LANG("the_phone_number_set_is_not_valid"));
      return false;
    }

    if (!emailHook.isValid) {
      toast.warn(LANG("the_email_set_is_not_valid"));
      return false;
    }
    return true;
  };

  const handleSaveBtnClick = async () => {
    if (validate()) {
      const result = await updateHMmu({
        variables: {
          houseId: house._id,
          updateParams: {
            enableLangs,
            phoneNumber: phoneNumberHook.value,
            backgroundImg: bgImageHook.file,
            menus: menuData.map(menu => ({...menu, __typename: undefined})),
            title
          }
        }
      });
      if (muResult(result, "UpdateManual")) {
        setShouldSave(false);
      }
    }
  };

  ReactTooltip.rebuild();

  const MenusConfigModal = () => {
    const renderContent = (isEnable: boolean, menu: getHM_GetHM_HM_menus) => (
      <JDbox key={menu.id} className="HMmenuConfigMenu">
        <div className="JDflex--between JDflex--vCenter">
          <JDIcon
            className="JDstandard-space"
            size={IconSize.NORMAL}
            icon={menu.icon as any}
          />
          <span className="HMmenuConfigMenu__menuTitle JDstandard-small-space">
            {menu.name[currentLang]}
          </span>
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
        <h6>{LANG("menu_enable_set")}</h6>
        <div className="flex-grid">
          <div className="flex-grid__col col--full-6">
            <JDbox
              className="JDmargin-bottom0 clear-fix"
              mode="border"
              topLabel={LANG("using")}
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
              topLabel={LANG("not_use")}
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

  const MenuConfigBtn = (
    <Button
      onClick={() => {
        menusConfigModalHook.openModal();
      }}
      label={LANG("menu_set")}
    />
  );
  const LangConfigBtn = (
    <Button
      onClick={() => {
        languageConfigModalHook.openModal();
      }}
      label={LANG("lang_set")}
    />
  );

  const userInfo = {
    profileImg: HM.profileImg,
    email: emailHook.value,
    phoneNumber: phoneNumberHook.value,
    location: HM.location
  };

  const sharedProps = {
    enableLangs,
    house,
    title,
    menuData,
    bgData: bgImageHook.file,
    setCurrentLang,
    currentLang,
    userInfo
  };

  if (loading) return <Preloader page loading={loading} />;

  return (
    <div className="HMconfig">
      <Preloader floating size={FLOATING_PRELOADER_SIZE} loading={loading} />
      <div className="container container--sm">
        <div className="docs-section">
          <h3>
            <span className="JDstandard-space">{LANG("HM_set")}</span>
            <Help
              size={IconSize.MEDEIUM_SMALL}
              className="JDmargin-bottom0"
              tooltip={
                <span className="JDletterSpace0">
                  {LANG(
                    "HM_provides_guests_with_a_comfortable_and_convenient_accommodation_send_the_guide_page"
                  )}
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
                label={LANG("save")}
              />
              {isMobile() ? (
                <span
                  data-tip={true}
                  data-event="click"
                  data-offset="{'top': 10, 'left': 0}"
                  data-for="HMconfigTolltip"
                >
                  <Button tooltip="" icon="config" label={LANG("config")} />
                </span>
              ) : (
                <Fragment>
                  {LangConfigBtn}
                  {MenuConfigBtn}
                </Fragment>
              )}
            </div>
            <div>
              <Button
                onClick={() => {
                  previewModalHook.openModal();
                }}
                label={LANG("preview")}
              />
            </div>
          </div>
          <div>
            <Card fullHeight align="center">
              <Fragment>
                <div className="JDstandard-margin-bottom">
                  <LangList
                    onClickLng={lang => {
                      setCurrentLang(lang);
                    }}
                    hilightLangs={[currentLang]}
                    hideList={LANGUAGE_LIST.filter(
                      lang => !enableLangs.includes(lang)
                    )}
                  />
                </div>
                <HMcomponent
                  key={`HM${currentLang}`}
                  host={
                    !isGuestView
                      ? {
                          setTitle,
                          setEnableLngList,
                          setMenuData,
                          bgImageHook,
                          emailModalHook,
                          phoneNumberModalHook
                        }
                      : undefined
                  }
                  {...sharedProps}
                />
              </Fragment>
            </Card>
          </div>
          {/* 메뉴 설정 모달 */}
          <MenusConfigModal />
          {/* 언어 설정 모달 */}
          <LangConfigModal
            setEnableLngList={setEnableLngList}
            modalHook={languageConfigModalHook}
            enableLangs={enableLangs}
          />
        </div>
      </div>
      <JDmodal minWidth={MODAL_MIN_WIDTH} {...previewModalHook}>
        <HMcomponent {...sharedProps} />
      </JDmodal>

      <JDmodal {...phoneNumberModalHook} minWidth={MODAL_MIN_WIDTH}>
        <InputText
          {...phoneNumberHook}
          hyphen
          validation={isPhone}
          label={LANG("connected_number")}
        />
      </JDmodal>

      <JDmodal {...emailModalHook} minWidth={MODAL_MIN_WIDTH}>
        <InputText
          {...emailHook}
          validation={isEmail}
          label={LANG("connected_email")}
        />
      </JDmodal>

      <TooltipList unPadding id="HMconfigTolltip" className="guestTooltip">
        <ul className="tooltipList__ul">
          <li>{LangConfigBtn}</li>
          <li>{MenuConfigBtn}</li>
        </ul>
      </TooltipList>
    </div>
  );
};

export default HMconfig;
