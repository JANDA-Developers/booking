import React from "react";
import { IUseModal } from "../../../../hooks/hook";
import LangList from "../../../../components/langList/LangList";
import JDmodal from "../../../../atoms/modal/Modal";
import { Language } from "../../../../types/enum";
import { LANGUAGE_LIST } from "../../../../types/const";

interface IProps {
  modalHook: IUseModal;
  setCurrentLang: React.Dispatch<React.SetStateAction<Language>>;
  enableLangs: Language[];
  currentLang: Language;
}

const LangViewModal: React.FC<IProps> = ({
  modalHook,
  setCurrentLang,
  currentLang,
  enableLangs
}) => {
  return (
    <JDmodal noAnimation {...modalHook}>
      <LangList
        onClickLng={lang => setCurrentLang(lang)}
        hilightLangs={[currentLang]}
        hideList={LANGUAGE_LIST.filter(lang => !enableLangs.includes(lang))}
      />
    </JDmodal>
  );
};

export default LangViewModal;
