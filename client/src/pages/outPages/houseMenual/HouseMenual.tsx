import React, {useState} from "react";
import ImageUploader from "../../../atoms/imageUploader/ImageUploader";
import ProfileCircle from "../../../atoms/profileCircle/ProfileCircle";
import InputText from "../../../atoms/forms/inputText/InputText";
import Button from "../../../atoms/button/Button";
import CircleIcon from "../../../atoms/circleIcon/CircleIcon";
import JDIcon, {IconSize} from "../../../atoms/icons/Icons";
import JDmenu, {JDsubMenu} from "../../../atoms/menu/Menu";
import HouseMenualMenu from "../../middleServer/houseMenual/component/HouseMenualMenu";
import {Language, LANGUAGE_LIST} from "../../../types/enum";
import {IHouse, IUser} from "../../../types/interface";
import {useModal, IuseImageUploader, IUseModal} from "../../../actions/hook";
import JDmodal from "../../../atoms/modal/Modal";
import LangList from "../../../components/langList/LangList";
import JDbox from "../../../atoms/box/JDbox";
import {Fragment} from "react";
import "./HouseMenual.scss";
import {isEmpty} from "../../../utils/utils";
import {IHouseMenualConfig} from "../../middleServer/houseMenual/HouseMenualConfig";

interface IProps {
  house: IHouse;
  host?: {
    configData: IHouseMenualConfig;
    setConfigData: React.Dispatch<React.SetStateAction<IHouseMenualConfig>>;
    setEnableLngList: any;
    setMenuData: any;
    languageConfigModalHook: IUseModal;
  };
  menuData: any;
  bgData: string;
  mainTitle: string;
  enableLngList: Language[];
  setCurrentLanguage: React.Dispatch<React.SetStateAction<Language>>;
  currentLanguage: Language;
}

const HouseMenual: React.FC<IProps> = ({
  house,
  setCurrentLanguage,
  currentLanguage,
  bgData,
  menuData,
  mainTitle,
  enableLngList,
  host
}) => {
  const languageListModalHook = useModal();

  const visibleMenuData = host
    ? menuData.filter((menu: any) => menu.isEnable)
    : menuData;

  const LangListModal = () => {
    return (
      <JDmodal noAnimation {...languageListModalHook}>
        <LangList
          onClickLng={lang => setCurrentLanguage(lang)}
          hilightLangs={[currentLanguage]}
          hideList={LANGUAGE_LIST.filter(lang => !enableLngList.includes(lang))}
        />
      </JDmodal>
    );
  };

  return (
    <div className="houseMenual">
      <div className="houseMenual__mocUp" />
      <div className="houseMenual__frame">
        <section className="houseMenual__headerSectiion">
          <div className="docs-section__box">
            <div className="houseMenual__bgSection">
              <Fragment>
                {!host ? (
                  <div
                    style={{backgroundImage: `url(${bgData})`}}
                    className="houseMenual__bg"
                  />
                ) : (
                  <ImageUploader
                    className="houseMenual__bg"
                    mode="noEffect"
                    {...host.configData.bgImageHook}
                    minHeight="180px"
                  />
                )}
                <ProfileCircle
                  isBordered
                  whiteBorder
                  size="large"
                  className="houseMenual__profilceCricle"
                />
              </Fragment>
            </div>
          </div>
          <div className="docs-section__box">
            <div className="houseMenual__titleWrap">
              {!host ? (
                <h6>{mainTitle}</h6>
              ) : (
                <div>
                  <InputText
                    textAlign="center"
                    value={host.configData.mainTitle}
                    onChange={value => {
                      const {configData, setConfigData} = host;
                      configData.mainTitle = value;
                      setConfigData(Object.assign({}, configData));
                    }}
                    placeholder="간략한 하우스 소개"
                  />
                </div>
              )}
            </div>
            <div className="houseMenual__languageBtnWrap JDflex--center">
              <Button
                className="JDmargin-bottom0"
                onClick={() => {
                  languageListModalHook.openModal();
                }}
                tooltip={`현재:${currentLanguage}`}
                thema="primary"
                mode="flat"
                label="language"
              />
              {host && (
                <CircleIcon
                  thema="greybg"
                  className="JDmargin-bottom0"
                  onClick={() => {
                    host.languageConfigModalHook.openModal();
                  }}
                >
                  <JDIcon icon="edit" />
                </CircleIcon>
              )}
            </div>
          </div>
          <div className="houseMenual__contectMenu">
            {/* 👿 자식에게 넘길수있도록 하자 */}
            <CircleIcon
              darkWave
              thema="greybg"
              onClick={() => {
                document.location.href = "tel:010-5237-4492";
              }}
              size={IconSize.BIG_LARGE}
            >
              <JDIcon
                tooltip="호스트에게 전화걸기"
                size={IconSize.BIG_LARGE}
                icon="call"
              />
            </CircleIcon>
            <CircleIcon
              darkWave
              onClick={() => {
                window.open(
                  `http://google.co.kr/map/${house.location.address}`
                );
              }}
              thema="greybg"
              size={IconSize.BIG_LARGE}
            >
              <JDIcon
                tooltip="구글맵으로 위치확인하기"
                size={IconSize.BIG_LARGE}
                icon="location"
              />
            </CircleIcon>
            <CircleIcon
              darkWave
              onClick={() => {
                document.location.href = "sms:010-5237-4492";
              }}
              thema="greybg"
              size={IconSize.BIG_LARGE}
            >
              <JDIcon
                tooltip="호스트에게 문자보내기"
                size={IconSize.BIG_LARGE}
                icon="sms"
              />
            </CircleIcon>
          </div>
        </section>
        <section className="houseMenual__bodySection">
          <ul className="houseMenual__menus">
            <li className="houseMenual__menu">
              <JDmenu customMode="dropDown" mode="inline">
                {visibleMenuData.map((menu: any) => {
                  return (
                    <JDsubMenu
                      title={
                        <div className="JDflex--vCenter">
                          <JDIcon
                            className="JDstandard-space"
                            size={IconSize.MEDEIUM_SMALL}
                            icon={menu.icon}
                          />
                          <span>{menu.title}</span>
                          <span></span>
                        </div>
                      }
                    >
                      <HouseMenualMenu
                        menu={menu}
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
        {/* 언어 리스트모달 */}
        <LangListModal />
      </div>
    </div>
  );
};

export default HouseMenual;
