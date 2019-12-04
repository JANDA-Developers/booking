import React, { useState, useEffect, useRef, Fragment } from "react";
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
import JDIcon from "../../../atoms/icons/Icons";
import {
  getHM_GetHM_HM,
  updateHM,
  updateHMVariables,
  getHM_GetHM_HM_menus
} from "../../../types/api";
import "./HMconfig.scss";
// @ts-ignore
import omitDeep from "omit-deep";
import CircleIcon from "../../../atoms/circleIcon/CircleIcon";
import JDmodal from "../../../atoms/modal/Modal";
import JDbox from "../../../atoms/box/JDbox";
import { muResult } from "../../../utils/utils";
import {
  Language,
  LANGUAGE_LIST,
  FLOATING_PRELOADER_SIZE,
  MODAL_MIN_WIDTH,
  WindowSize
} from "../../../types/enum";
import MockUp from "../../../atoms/mockup/MockUp";
import LangList from "../../../components/langList/LangList";
import LangConfigModal from "./component/LangConfigModal";
import { toast } from "react-toastify";
import Preloader from "../../../atoms/preloader/Preloader";
import { IContext } from "../../bookingHost/BookingHostRouter";
import { ReactTooltip } from "../../../atoms/tooltipList/TooltipList";
import HMcomponent from "../../outPages/HM/HM";
import { DEFAULT_HM } from "../../../types/defaults";
import InputText from "../../../atoms/forms/inputText/InputText";
import { isPhone, isEmail } from "../../../utils/inputValidations";
import { MutationFunctionOptions } from "@apollo/react-common";
import { ExecutionResult } from "graphql";
import ImageUploader from "../../../atoms/imageUploader/ImageUploader";
import JDLabel from "../../../atoms/label/JDLabel";
import HMmenu from "../../outPages/HM/component/HMmenu";
import JDmenu, { JDsubMenu } from "../../../atoms/menu/Menu";
import PageHeader from "../../../components/pageHeader/PageHeader";
import PageBody from "../../../components/pageBody/PageBody";
import Menus from "./component/Menus";

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
  HM = DEFAULT_HM,
  loading,
  context,
  mutationLoading,
  updateHMmu
}) => {
  const { house } = context;
  const tempSrc = null;
  // "https://i.pinimg.com/originals/54/88/35/5488351dfdde55dc9f088eb88a7fef34.png";
  const [currentLang, setCurrentLang] = useState(Language.KOREAN);
  const [enableLangs, setEnableLngList] = useState(HM.langList);
  const [menuData, setMenuData] = useState(HM.menus);
  const phoneNumberModalHook = useModal();
  const phoneNumberHook = useInput(HM.phoneNumber, true);
  const emailModalHook = useModal();
  const emailHook = useInput(HM.email, true);
  const languageConfigModalHook = useModal();
  const menusConfigModalHook = useModal();
  const [title, setTitle] = useState(HM.title);
  const bgImageHook = useImageUploader(HM.backgroundImg, {
    resizeMaxWidth: WindowSize.PHABLET
  });
  const { shouldSave, setShouldSave } = useShouldSave([
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
        variables: omitDeep(
          {
            houseId: house._id,
            updateParams: {
              enableLangs,
              phoneNumber: phoneNumberHook.value,
              backgroundImg: bgImageHook.file,
              menus: menuData.map(menu => ({ ...menu })),
              title
            }
          },
          ["__typename"]
        )
      });

      if (muResult(result, "UpdateHM")) {
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
            size={"small"}
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
      <JDmodal minContentsWidth={"340px"} noAnimation {...menusConfigModalHook}>
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

  const visibleMenuData = menuData.filter((menu: any) => menu.isEnable);

  const LangConfigBtn = () => (
    <Button
      mode="border"
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

  const HeaderConfig = () => (
    <Fragment>
      <div>
        <InputText
          label={LANG("house_title")}
          overfloweEllipsis
          value={title[currentLang]}
          onChange={value => {
            title[currentLang] = value;
            setTitle({ ...title });
          }}
          placeholder={LANG("HM_title")}
        />
      </div>
      <div>
        <ImageUploader
          mode="input"
          label={LANG("house_front_img")}
          className="JDstandard-margin-bottom"
          minHeight="100px"
          {...bgImageHook}
        />
      </div>
    </Fragment>
  );

  if (loading) return <Preloader page loading={loading} />;

  return (
    <div className="HMconfig">
      <Preloader floating size={FLOATING_PRELOADER_SIZE} loading={loading} />
      <PageHeader title={LANG("HM_set")} desc={LANG("HM_set__desc")} />
      <PageBody>
        <div className="flex-grid-grow">
          <div className="flex-grid__col">
            <Card>
              <div className="JDstandard-margin-bottom JDflex--between">
                <h4>{LANG("HM_detail_info")}</h4>
                <Button
                  mode="flat"
                  className="JDz-index-1"
                  thema="point"
                  pulse={shouldSave}
                  onClick={() => {
                    handleSaveBtnClick();
                  }}
                  label={LANG("save")}
                />
              </div>
              <JDLabel txt={LANG("current_config_lang")} />
              <div className="JDflex">
                <LangList
                  onClickLng={lang => {
                    setCurrentLang(lang);
                  }}
                  hilightLangs={[currentLang]}
                  hideList={LANGUAGE_LIST.filter(
                    lang => !enableLangs.includes(lang)
                  )}
                />
                <LangConfigBtn />
              </div>
              <HeaderConfig />
              <div>
                <Menus
                  currentLang={currentLang}
                  menuData={visibleMenuData}
                  host={{
                    setEnableLngList,
                    setMenuData,
                    bgImageHook,
                    setTitle
                  }}
                />
              </div>
            </Card>
          </div>
          {/* 미리보기 */}
          <div className="HMconfig__preview flex-grid__col">
            <MockUp frame="JDmocUp">
              <HMcomponent {...sharedProps} />
            </MockUp>
          </div>
        </div>
        {/* 메뉴 설정 모달 */}
        <MenusConfigModal />
        {/* 언어 설정 모달 */}
        <LangConfigModal
          setEnableLngList={setEnableLngList}
          modalHook={languageConfigModalHook}
          enableLangs={enableLangs}
        />
      </PageBody>

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
    </div>
  );
};

export default HMconfig;
