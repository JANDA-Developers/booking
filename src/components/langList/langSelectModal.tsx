import React from "react";
import JDmodal from "../../atoms/modal/Modal";
import LangList from "./LangList";
import { IContext } from "../../pages/bookingServer/MiddleServerRouter";
import {
  LanguageShortResverse,
  LANGUAGE_LIST,
  LanguageResverseShort
} from "../../types/enum";
import { IUseModal } from "../../hooks/hook";

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
      <LangList
        onClickLng={lang => {
          changeLang(LanguageResverseShort[lang]);
        }}
        // @ts-ignore
        hilightLangs={[LanguageShortResverse[currentLang]]}
        hideList={LANGUAGE_LIST.filter(lang => !enableLangs.includes(lang))}
      />
    </JDmodal>
  );
};

export default LangSelectModal;
