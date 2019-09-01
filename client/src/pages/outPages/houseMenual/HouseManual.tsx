import React, {useState} from "react";
import ImageUploader from "../../../atoms/imageUploader/ImageUploader";
import ProfileCircle from "../../../atoms/profileCircle/ProfileCircle";
import InputText from "../../../atoms/forms/inputText/InputText";
import Button from "../../../atoms/button/Button";
import CircleIcon from "../../../atoms/circleIcon/CircleIcon";
import JDIcon, {IconSize} from "../../../atoms/icons/Icons";
import JDmenu, {JDsubMenu} from "../../../atoms/menu/Menu";
import HouseMenualMenu from "../houseManual/component/HouseManualMenu";
import {Language, LANGUAGE_LIST} from "../../../types/enum";
import {IHouse, IUser} from "../../../types/interface";
import {useModal, IuseImageUploader, IUseModal} from "../../../actions/hook";
import JDmodal from "../../../atoms/modal/Modal";
import LangList from "../../../components/langList/LangList";
import JDbox from "../../../atoms/box/JDbox";
import {Fragment} from "react";
import "./HouseMenual.scss";
import {isEmpty} from "../../../utils/utils";
import LangViewModal from "../../middleServer/houseManualConfig/component/LangViewModal";
import {
  getHManual_GetHManual_houseManual_house_location,
  getHManual_GetHManual_houseManual_menus
} from "../../../types/api";

interface IProps {
  host?: {
    setEnableLngList: any;
    setMenuData: React.Dispatch<
      React.SetStateAction<getHManual_GetHManual_houseManual_menus[]>
    >;
    bgImageHook: IuseImageUploader;
    setMainTitle: React.Dispatch<string>;
  };
  menuData: getHManual_GetHManual_houseManual_menus[];
  bgData: string;
  mainTitle: string;
  enableLngList: Language[];
  setCurrentLanguage: React.Dispatch<React.SetStateAction<Language>>;
  currentLanguage: Language;
  userInfo?: {
    profileImg: string | null;
    phoneNumber: string | null;
    location: getHManual_GetHManual_houseManual_house_location;
  };
}

const HouseMenual: React.FC<IProps> = ({
  setCurrentLanguage,
  currentLanguage,
  bgData,
  userInfo,
  menuData,
  mainTitle,
  enableLngList,
  host
}) => {
  const languageListModalHook = useModal();

  const visibleMenuData = host
    ? menuData.filter((menu: any) => menu.isEnable)
    : menuData;

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
                    {...host.bgImageHook}
                    minHeight="150px"
                  />
                )}
                <ProfileCircle
                  profileImg={userInfo ? userInfo.profileImg || undefined : ""}
                  isBordered
                  whiteBorder
                  size={IconSize.BIG_LARGE}
                  className="houseMenual__profilceCricle"
                />
              </Fragment>
            </div>
          </div>
          {(!host && !mainTitle) || (
            <div className="docs-section__box">
              <div className="houseMenual__titleWrap">
                {!host ? (
                  <h6>{mainTitle}</h6>
                ) : (
                  <div>
                    <InputText
                      textAlign="center"
                      value={mainTitle}
                      onChange={value => {
                        const {setMainTitle} = host;
                        setMainTitle(value);
                      }}
                      placeholder="간략한 하우스 소개"
                    />
                  </div>
                )}
              </div>
              {host && (
                <div className="houseMenual__languageBtnWrap JDflex--center">
                  <Button
                    className="JDmargin-bottom0"
                    onClick={() => {
                      languageListModalHook.openModal();
                    }}
                    tooltip={`현재:${currentLanguage}`}
                    thema="primary"
                    label="language"
                  />
                </div>
              )}
            </div>
          )}
          <div className="houseMenual__contectMenu">
            {/* 👿 자식에게 넘길수있도록 하자 */}
            <CircleIcon
              darkWave
              thema="greybg"
              onClick={() => {
                document.location.href = `tel:${
                  userInfo ? userInfo.phoneNumber : ""
                }`;
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
                  `http://google.co.kr/map/${
                    userInfo ? userInfo.location.address : ""
                  }`
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
                document.location.href = `sms:${
                  userInfo ? userInfo.phoneNumber : ""
                }`;
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
                {visibleMenuData.map(menu => {
                  return (
                    <JDsubMenu
                      title={
                        <div className="JDflex--vCenter">
                          <JDIcon
                            className="JDstandard-space"
                            size={IconSize.MEDEIUM_SMALL}
                            icon={(menu.icon as any) || undefined}
                          />
                          <span>{menu.name}</span>
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
      </div>
      <LangViewModal
        modalHook={languageListModalHook}
        setCurrentLanguage={setCurrentLanguage}
        enableLngList={enableLngList}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};

export default HouseMenual;
