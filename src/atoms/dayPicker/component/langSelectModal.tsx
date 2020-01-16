import React from "react";
import JDmodal from "../../modal/Modal";
import LangList from "../../../components/langList/LangList";
import { IContext } from "../../../pages/bookingHost/BookingHostRouter";
import {
  LanguageShortResverse,
  LanguageResverseShort
} from "../../../types/enum";
import { LANGUAGE_LIST } from "../../../types/const";
import { IUseModal, LANG } from "../../../hooks/hook";

interface Iprops {
  context: IContext;
  modalHook: IUseModal;
}

const LangSelectModal: React.FC<Iprops> = ({ context, modalHook }) => {
  const enableLangs = ["KOREAN", "ENGLISH"];
  const {
    langHook: { currentLang, changeLang }
  } = context;
  return (
    <JDmodal {...modalHook}>
      <div className="JDflex JDstandard-margin-bottom-minus">
        <LangList
          onClickLng={lang => {
            localStorage.setItem("LastLang", LANG(LanguageResverseShort[lang]));
            changeLang(LanguageResverseShort[lang]);
          }}
          // @ts-ignorec
          hilightLangs={[LanguageShortResverse[currentLang]]}
          hideList={LANGUAGE_LIST.filter(lang => !enableLangs.includes(lang))}
        />
      </div>
    </JDmodal>
  );
};

export default LangSelectModal;
