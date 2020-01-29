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
import {
  getHM_GetHM_HM,
  updateHM,
  updateHMVariables
} from "../../../types/api";
import "./HMconfig.scss";
// @ts-ignore
import omitDeep from "omit-deep";
import JDmodal from "../../../atoms/modal/Modal";
import { muResult } from "../../../utils/utils";
import { Language, WindowSize } from "../../../types/enum";
import {
  LANGUAGE_LIST,
  FLOATING_PRELOADER_SIZE,
  MODAL_MIN_WIDTH
} from "../../../types/const";
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
import PageHeader from "../../../components/pageHeader/PageHeader";
import PageBody from "../../../components/pageBody/PageBody";
import Menus from "./component/Menus";
import CardHeader from "../../../atoms/cards/components/CardHeader";

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
  updateHMmu
}) => {
  const { house } = context;
  // "https://i.pinimg.com/originals/54/88/35/5488351dfdde55dc9f088eb88a7fef34.png";
  const [currentLang, setCurrentLang] = useState(Language.KOREAN);
  const [enableLangs, setEnableLngList] = useState(HM.langList);
  const [menuData, setMenuData] = useState(HM.menus);
  const phoneNumberModalHook = useModal();
  const phoneNumberHook = useInput(HM.phoneNumber, true);
  const emailModalHook = useModal();
  const prevModalHook = useModal(false);
  const emailHook = useInput(HM.email, true);
  const languageConfigModalHook = useModal();
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
  const isPhabeltDown = window.innerWidth < WindowSize.PHABLET;

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

  ReactTooltip.rebuild();

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

  if (loading) return <Preloader page loading={loading} />;

  const LangConfigBtn = () => (
    <Button
      mb="normal"
      mode="border"
      onClick={() => {
        languageConfigModalHook.openModal();
      }}
      label={LANG("lang_set")}
    />
  );

  return (
    <div className="HMconfig">
      <Preloader floating size={FLOATING_PRELOADER_SIZE} loading={loading} />
      <PageHeader title={LANG("HM_set")} desc={LANG("HM_set__desc")} />
      <PageBody>
        <div className={`${isPhabeltDown ? "flex-grid" : "flex-grid-grow"}`}>
          <div className="flex-grid__col col--md-12">
            <Card>
              <div className="JDstandard-margin-bottom JDflex--between">
                <CardHeader
                  title={LANG("detail_info")}
                  headerRgiht={
                    <Fragment>
                      {isPhabeltDown && (
                        <Button
                          id="HMsaveBtn"
                          mode="flat"
                          className="JDz-index-1"
                          thema="black"
                          size="tiny"
                          pulse={shouldSave}
                          onClick={() => {
                            prevModalHook.openModal();
                          }}
                          label={LANG("preview")}
                        />
                      )}
                      <Button
                        id="HMsaveBtn"
                        mode="flat"
                        className="JDz-index-1"
                        thema="point"
                        size="tiny"
                        pulse={shouldSave}
                        onClick={() => {
                          handleSaveBtnClick();
                        }}
                        label={LANG("save")}
                      />
                    </Fragment>
                  }
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
              <Fragment>
                <div>
                  <InputText
                    id="HMtitleInput"
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
                    id="BackImgUploader"
                    mode="input"
                    label={LANG("house_front_img")}
                    className="JDstandard-margin-bottom"
                    minHeight="100px"
                    {...bgImageHook}
                  />
                </div>
              </Fragment>
              <div>
                <Menus
                  currentLang={currentLang}
                  menuData={menuData}
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
          <JDmodal
            autoMinContentWidth
            {...prevModalHook}
            unWrap={!isPhabeltDown}
          >
            <div className="HMconfig__preview flex-grid__col col--md-12">
              <MockUp frame="JDmocUp">
                <HMcomponent {...sharedProps} />
              </MockUp>
            </div>
          </JDmodal>
        </div>
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
