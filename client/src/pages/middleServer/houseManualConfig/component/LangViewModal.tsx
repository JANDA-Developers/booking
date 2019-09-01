import React from "react";
import {IUseModal} from "../../../../actions/hook";
import LangList from "../../../../components/langList/LangList";
import JDmodal from "../../../../atoms/modal/Modal";
import {LANGUAGE_LIST, Language} from "../../../../types/enum";

interface IProps {
  modalHook: IUseModal;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<Language>>;
  enableLngList: Language[];
  currentLanguage: Language;
}

const LangViewModal: React.FC<IProps> = ({
  modalHook,
  setCurrentLanguage,
  currentLanguage,
  enableLngList
}) => {
  return (
    <JDmodal noAnimation {...modalHook}>
      <LangList
        onClickLng={lang => setCurrentLanguage(lang)}
        hilightLangs={[currentLanguage]}
        hideList={LANGUAGE_LIST.filter(lang => !enableLngList.includes(lang))}
      />
    </JDmodal>
  );
};

export default LangViewModal;
