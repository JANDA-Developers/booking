import React, {useState, useEffect, useRef, Fragment} from "react";
import Card from "../../../atoms/cards/Card";
import {
  useImageUploader,
  useModal,
  IuseImageUploader,
  useShouldSave,
  useInput
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
  FLOATING_PRElOADER_SIZE,
  MODAL_MIN_WIDTH
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
  const tempSrc =
    "https://i.pinimg.com/originals/54/88/35/5488351dfdde55dc9f088eb88a7fef34.png";
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
  const bgImageHook = useImageUploader(HM.backgroundImg || tempSrc);
  const {shouldSave, setShouldSave} = useShouldSave([
    title,
    bgImageHook.fileUrl,
    enableLangs,
    menuData
  ]);

  const validate = (): boolean => {
    if (!title) {
      toast.warn("하우스메뉴얼 타이틀을 입력해주세요");
      return false;
    }

    if (!phoneNumberHook.isValid) {
      toast.warn("설정된 전화번호가 유효하지 않습니다.");
      return false;
    }

    if (!emailHook.isValid) {
      toast.warn("설정된 이메일이 유효하지 않습니다.");
      return false;
    }

    // if (
    //   menuData.find(menu => {
    //     menu.isEnable && !menu.content;
    //   })
    // ) {
    //   toast.warn("내용을 입력하지 않은 메뉴가 존재합니다.");
    //   toast("사용하지 않을 메뉴라면 사용목록에서 해재해 주세요.");
    //   return false;
    // }

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
            backgroundImg: bgImageHook.fileUrl,
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

  const MenuConfigBtn = (
    <Button
      onClick={() => {
        menusConfigModalHook.openModal();
      }}
      label="메뉴설정"
    />
  );
  const LangConfigBtn = (
    <Button
      onClick={() => {
        languageConfigModalHook.openModal();
      }}
      label="언어설정"
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
    bgData: bgImageHook.fileUrl,
    setCurrentLang,
    currentLang,
    userInfo
  };

  return (
    <div className="HMconfig">
      <Preloader floating size={FLOATING_PRElOADER_SIZE} loading={loading} />
      <div className="container container--sm">
        <div className="docs-section">
          <h3>
            <span className="JDstandard-space">하우스 메뉴얼 설정</span>
            <Help
              size={IconSize.MEDEIUM_SMALL}
              className="JDmargin-bottom0"
              tooltip={
                <span className="JDletterSpace0">
                  하우스 메뉴얼은 게스트가 쉽고 편하게 숙소를 이용할 수 있도록
                  안내 페이지를 송신합니다. <br />
                  하우스 메뉴얼이 게스트의 숙소 이용법을 설명하는 수고를 덜어
                  줄겁니다.
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
              {isMobile() ? (
                <span
                  data-tip={true}
                  data-event="click"
                  data-offset="{'top': 10, 'left': 0}"
                  data-for="HMconfigTolltip"
                >
                  <Button tooltip="" icon="config" label="설정" />
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
                label="미리보기"
              />
            </div>
          </div>
          <div>
            <Card fullHeight align="center">
              {loading ? (
                <Preloader size="large" loading={loading} />
              ) : (
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
              )}
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
          label="연결번호"
        />
      </JDmodal>

      <JDmodal {...emailModalHook} minWidth={MODAL_MIN_WIDTH}>
        <InputText {...emailHook} validation={isEmail} label="연결이메일" />
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
