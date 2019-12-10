import React from "react";
import { IUseModal, LANG } from "../../../../hooks/hook";
import JDmodal from "../../../../atoms/modal/Modal";
import { Language } from "../../../../types/enum";
import { LANGUAGE_LIST } from "../../../../types/const";
import JDbox from "../../../../atoms/box/JDbox";
import CircleIcon from "../../../../atoms/circleIcon/CircleIcon";
import JDIcon from "../../../../atoms/icons/Icons";
import { s4 } from "../../../../utils/utils";

interface IProps {
  modalHook: IUseModal;
  setEnableLngList: React.Dispatch<React.SetStateAction<Language[]>>;
  enableLangs: Language[];
}

const LangConfigModal: React.FC<IProps> = ({
  setEnableLngList,
  modalHook,
  enableLangs
}) => {
  const shared = (enable: boolean) => {
    const list = LANGUAGE_LIST.filter(lang =>
      enable ? enableLangs.includes(lang) : !enableLangs.includes(lang)
    );

    return (
      <JDbox
        topLabel={enable ? LANG("support") : LANG("unSupport")}
        className="clear-fix"
        mode="border"
      >
        {list.map((lang, index) => {
          // @ts-ignore
          const flag = "";
          return (
            <JDbox size={undefined} float key={s4()}>
              <div className="JDflex--between JDflex--vCenter">
                <img className="JDstandard-space" src={flag} />
                <span className="JDstandard-space">{LANG(lang)}</span>
                <CircleIcon
                  darkWave
                  thema="greybg"
                  onClick={() => {
                    if (enable) {
                      setEnableLngList([
                        ...list.filter((lang, inIndex) => inIndex !== index)
                      ]);
                    } else {
                      setEnableLngList([...enableLangs, lang]);
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
      <h6>{LANG("select_support_language")}</h6>
      <div className="flex-grid">
        <div className="flex-grid__col col--full-6">{shared(true)}</div>
        <div className="flex-grid__col col--full-6">{shared(false)}</div>
      </div>
      <p className="JDtextColor--point">
        * {LANG("must_input_text_of_every_lang_you_supporting")}
      </p>
    </JDmodal>
  );
};

export default LangConfigModal;
