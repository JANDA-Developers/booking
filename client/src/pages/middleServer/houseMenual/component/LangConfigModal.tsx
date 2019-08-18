import React from "react";
import {IUseModal} from "../../../../actions/hook";
import LangList from "../../../../components/langList/LangList";
import JDmodal from "../../../../atoms/modal/Modal";
import {
  LANGUAGE_LIST,
  Language,
  LanguageKr,
  LanguageShort
} from "../../../../types/enum";
import JDbox from "../../../../atoms/box/JDbox";
import CircleIcon from "../../../../atoms/circleIcon/CircleIcon";
import JDIcon from "../../../../atoms/icons/Icons";
import {s4} from "../../../../utils/utils";

interface IProps {
  modalHook: IUseModal;
  setEnableLngList: React.Dispatch<React.SetStateAction<Language[]>>;
  enableLngList: Language[];
}

const LangConfigModal: React.FC<IProps> = ({
  setEnableLngList,
  modalHook,
  enableLngList
}) => {
  const shared = (enable: boolean) => {
    const list = LANGUAGE_LIST.filter(lang =>
      enable ? enableLngList.includes(lang) : !enableLngList.includes(lang)
    );

    return (
      <JDbox
        topLabel={enable ? "지원함" : "지원안함"}
        className="clear-fix"
        mode="border"
      >
        {list.map((lang, index) => {
          const fileName = LanguageShort[lang];
          const flag = require(`../../../../img/flags/${fileName}.png`);
          return (
            <JDbox size={undefined} float key={s4()}>
              <div className="JDflex--between JDflex--vCenter">
                <img className="JDstandard-space" src={flag} />
                <span className="JDstandard-space">{LanguageKr[lang]}</span>
                <CircleIcon
                  darkWave
                  thema="greybg"
                  onClick={() => {
                    if (enable) {
                      setEnableLngList([
                        ...list.filter((lang, inIndex) => inIndex !== index)
                      ]);
                    } else {
                      setEnableLngList([...enableLngList, lang]);
                    }
                  }}
                >
                  <JDIcon icon={enable ? "arrowRight" : "arrowLeft"} />
                </CircleIcon>
              </div>
            </JDbox>
          );
        })}
      </JDbox>
    );
  };

  return (
    <JDmodal {...modalHook}>
      <h6>지원 언어 선택</h6>
      <div className="flex-grid">
        <div className="flex-grid__col col--full-6">{shared(true)}</div>
        <div className="flex-grid__col col--full-6">{shared(false)}</div>
      </div>
      <p className="JDtextColor--point">
        * 언어선택을 바꾸신후 직접 수정하셔야합니다.
      </p>
    </JDmodal>
  );
};

export default LangConfigModal;
