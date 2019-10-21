import React from "react";
import ImageUploader from "../../../atoms/imageUploader/ImageUploader";
import ProfileCircle from "../../../atoms/profileCircle/ProfileCircle";
import InputText from "../../../atoms/forms/inputText/InputText";
import Button from "../../../atoms/button/Button";
import CircleIcon from "../../../atoms/circleIcon/CircleIcon";
import JDIcon, {IconSize} from "../../../atoms/icons/Icons";
import JDmenu, {JDsubMenu} from "../../../atoms/menu/Menu";
import {Language} from "../../../types/enum";
import {
  useModal,
  IuseImageUploader,
  IUseModal,
  LANG
} from "../../../hooks/hook";
import {Fragment} from "react";
import "./HM.scss";
import LangViewModal from "../../middleServer/HMconfig/component/LangViewModal";
import {
  getHM_GetHM_HM_location,
  getHM_GetHM_HM_menus
} from "../../../types/api";
import HMmenu from "./component/HMmenu";

import Preloader from "../../../atoms/preloader/Preloader";

interface IProps {
  host?: {
    setEnableLngList: any;
    setMenuData: React.Dispatch<React.SetStateAction<getHM_GetHM_HM_menus[]>>;
    bgImageHook: IuseImageUploader;
    setTitle: React.Dispatch<Object>;
    emailModalHook: IUseModal<any>;
    phoneNumberModalHook: IUseModal<any>;
  };
  menuData: getHM_GetHM_HM_menus[];
  bgData: string;
  title: any;
  enableLangs: Language[];
  setCurrentLang: React.Dispatch<React.SetStateAction<Language>>;
  currentLang: Language;
  loading?: boolean;
  userInfo: {
    email: string | null;
    profileImg: string | null;
    phoneNumber: string | null;
    location: getHM_GetHM_HM_location;
  };
}

const HMcompoent: React.FC<IProps> = ({
  setCurrentLang,
  currentLang,
  bgData,
  loading,
  userInfo,
  menuData,
  title,
  enableLangs,
  host
}) => {
  const languageListModalHook = useModal();

  const visibleMenuData = host
    ? menuData.filter((menu: any) => menu.isEnable)
    : menuData;

  return (
    <div className="HM">
      <div className="HM__mocUp" />
      <div className="HM__frame">
        {loading ? (
          <Preloader size="large" loading={loading} />
        ) : (
          <section className="HM__headerSectiion">
            <div className="docs-section__box">
              <div className="HM__bgSection">
                <Fragment>
                  {!host ? (
                    <div
                      style={{backgroundImage: `url(${bgData})`}}
                      className="HM__bg"
                    />
                  ) : (
                    <ImageUploader
                      className="HM__bg"
                      mode="noEffect"
                      {...host.bgImageHook}
                      minHeight="150px"
                    />
                  )}
                  <ProfileCircle
                    profileImg={userInfo.profileImg}
                    isBordered
                    whiteBorder
                    size={IconSize.BIG_LARGE}
                    className="HM__profilceCricle"
                  />
                </Fragment>
              </div>
            </div>
            {(!host && !title) || (
              <div className="docs-section__box">
                <div className="HM__titleWrap">
                  {!host ? (
                    <h6>{title[currentLang]}</h6>
                  ) : (
                    <div>
                      <InputText
                        textAlign="center"
                        value={title[currentLang]}
                        onChange={value => {
                          const {setTitle} = host;
                          title[currentLang] = value;
                          setTitle({...title});
                        }}
                        placeholder={LANG("HM_title")}
                      />
                    </div>
                  )}
                </div>
                <div className="HM__languageBtnWrap JDflex--center">
                  <Button
                    className="JDmargin-bottom0"
                    onClick={() => {
                      languageListModalHook.openModal();
                    }}
                    tooltip={`${currentLang}`}
                    thema="primary"
                    label="language"
                  />
                </div>
              </div>
            )}
            <div className="HM__contectMenu">
              {/* 👿 자식에게 넘길수있도록 하자 */}
              <CircleIcon
                darkWave
                thema="greybg"
                onClick={() => {
                  if (!host) {
                    document.location.href = `tel:${userInfo.phoneNumber}`;
                  } else {
                    host.phoneNumberModalHook.openModal();
                  }
                }}
                size={IconSize.BIG_LARGE}
              >
                <JDIcon
                  tooltip={`${LANG("current_set_number")}}: ${
                    userInfo.phoneNumber
                  }`}
                  size={IconSize.BIG_LARGE}
                  icon="call"
                />
              </CircleIcon>
              <CircleIcon
                darkWave
                onClick={() => {
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${userInfo.location.address}`
                  );
                }}
                thema="greybg"
                size={IconSize.BIG_LARGE}
              >
                <JDIcon
                  tooltip={LANG("check_location_with_google_map")}
                  size={IconSize.BIG_LARGE}
                  icon="location"
                />
              </CircleIcon>
              <CircleIcon
                darkWave
                onClick={() => {
                  if (!host) {
                    window.open(`mailto:${userInfo.email}`);
                  } else {
                    host.emailModalHook.openModal();
                  }
                }}
                thema="greybg"
                size={IconSize.BIG_LARGE}
              >
                <JDIcon
                  tooltip={LANG("send_text_to_host")}
                  size={IconSize.BIG_LARGE}
                  icon="sms"
                />
              </CircleIcon>
            </div>
          </section>
        )}
        <section className="HM__bodySection">
          <ul className="HM__menus">
            <li className="HM__menu">
              <JDmenu customMode="dropDown" mode="inline">
                {visibleMenuData.map(menu => {
                  return (
                    <JDsubMenu
                      key={menu.id}
                      title={
                        <div className="JDflex--vCenter">
                          <JDIcon
                            className="JDstandard-space"
                            size={IconSize.MEDEIUM_SMALL}
                            icon={(menu.icon as any) || undefined}
                          />
                          <span>{menu.name[currentLang]}</span>
                          <span></span>
                        </div>
                      }
                    >
                      <HMmenu
                        menu={menu}
                        currentLang={currentLang}
                        menuData={menuData}
                        host={host}
                        onChangeFile={file => {
                          menu.img = file;
                          host && host.setMenuData([...menuData]);
                        }}
                      />
                    </JDsubMenu>
                  );
                })}
              </JDmenu>
            </li>
          </ul>
        </section>
      </div>
      <LangViewModal
        modalHook={languageListModalHook}
        setCurrentLang={setCurrentLang}
        enableLangs={enableLangs}
        currentLang={currentLang}
      />
    </div>
  );
};

export default HMcompoent;
