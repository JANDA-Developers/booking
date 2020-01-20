import React from "react";
import ProfileCircle from "../../../atoms/profileCircle/ProfileCircle";
import Button from "../../../atoms/button/Button";
import CircleIcon from "../../../atoms/circleIcon/CircleIcon";
import JDIcon from "../../../atoms/icons/Icons";
import JDmenu, { JDsubMenu } from "../../../atoms/menu/Menu";
import { Language } from "../../../types/enum";
import { useModal, LANG } from "../../../hooks/hook";
import { Fragment } from "react";
import "./HM.scss";
import { getHM_GetHM_HM_location } from "../../../types/api";
import HMmenu from "./component/HMmenu";
import Preloader from "../../../atoms/preloader/Preloader";
import { JdFile } from "../../../types/interface";
import LangViewModal from "../../bookingHost/HMconfig/component/LangViewModal";
import { IMenusprops } from "../../bookingHost/HMconfig/component/Menus";
import JDmenuTitle from "../../../atoms/menu/components/MenuTitle";

interface IProps extends IMenusprops {
  bgData?: JdFile | null;
  enableLangs: Language[];
  setCurrentLang: React.Dispatch<React.SetStateAction<Language>>;
  loading?: boolean;
  title: any;
  userInfo: {
    email: string | null;
    profileImg?: JdFile | null;
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
  enableLangs
}) => {
  const languageListModalHook = useModal();
  const visibleMenuData = menuData.filter(m => m.isEnable);

  if (loading) {
    return <Preloader page size="large" loading={loading} />;
  }

  return (
    <div className="HM">
      <div className="HM__frame">
        <section className="HM__headerSectiion">
          <div className="docs-section__box">
            <div className="HM__bgSection">
              <Fragment>
                <div
                  style={{
                    backgroundImage: `url(${bgData ? bgData.url : ``})`
                  }}
                  className="HM__bg"
                />
                <ProfileCircle
                  file={userInfo.profileImg}
                  isBordered
                  whiteBorder
                  size={"huge"}
                  className="HM__profilceCricle"
                />
              </Fragment>
            </div>
          </div>
          {!title || (
            <div className="docs-section__box">
              <div className="HM__titleWrap">
                <h6 className="THMtitle">{title[currentLang]}</h6>
              </div>
              <div className="HM__languageBtnWrap JDflex--center">
                <Button
                  className="JDstandard-margin0"
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
                document.location.href = `tel:${userInfo.phoneNumber}`;
              }}
              size={"huge"}
            >
              <JDIcon
                tooltip={`${LANG("current_set_number")}}: ${
                  userInfo.phoneNumber
                }`}
                size={"huge"}
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
              size={"huge"}
            >
              <JDIcon
                tooltip={LANG("check_location_with_google_map")}
                size={"huge"}
                icon="location"
              />
            </CircleIcon>
            <CircleIcon
              darkWave
              onClick={() => {
                window.open(`mailto:${userInfo.email}`);
              }}
              thema="greybg"
              size={"huge"}
            >
              <JDIcon
                tooltip={LANG("send_text_to_host")}
                size={"huge"}
                icon="sms"
              />
            </CircleIcon>
          </div>
        </section>
        <section className="HM__bodySection">
          <ul className="HM__menus">
            <li className="HM__menu">
              <JDmenu customMode="dropDown" mode="inline">
                {visibleMenuData.map(menu => {
                  return (
                    <JDsubMenu
                      key={menu.id}
                      title={
                        <JDmenuTitle
                          title={menu.name[currentLang]}
                          icon={(menu.icon as any) || undefined}
                        />
                      }
                    >
                      <HMmenu
                        menu={menu}
                        currentLang={currentLang}
                        menuData={menuData}
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
