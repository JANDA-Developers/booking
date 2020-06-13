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
import { BookingLang } from "../../../langs/JDlang";
const { changeLang, currentLang } = BookingLang;

interface Iprops {
  context: IContext;
  modalHook: IUseModal;
}

const LangSelectModal: React.FC<Iprops> = ({ context, modalHook }) => {
  const { } = context;
  const enableLangs = ["KOREAN", "ENGLISH"];

  return (
    <JDmodal
      head={{
        title: LANG("language_setting")
      }}
      {...modalHook}
    >
      <div className="JDflex JDstandard-margin-bottom-minus">
        <LangList
          onClickLng={lang => {
            localStorage.setItem("LastLang", LanguageResverseShort[lang]);
            changeLang(LanguageResverseShort[lang]);
            location.reload();
          }}
          // @ts-ignore
          hilightLangs={[LanguageShortResverse[currentLang]]}
          hideList={LANGUAGE_LIST.filter(lang => !enableLangs.includes(lang))}
        />
      </div>
    </JDmodal>
  );
};

export default LangSelectModal;
