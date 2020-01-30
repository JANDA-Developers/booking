import React from "react";
import ErrProtecter from "../../utils/errProtect";
import { IDiv } from "../../types/interface";
import {
  Language,
  LanguageItSelf,
  LangShortToNational,
  LanguageResverseShort
} from "../../types/enum";
import { LANGUAGE_LIST, IMG_REPO } from "../../types/const";
import JDbox from "../../atoms/box/JDbox";
import { s4 } from "../../utils/utils";
import "./LangList.scss";

interface IProps extends IDiv {
  children?: JSX.Element[] | JSX.Element | string | Element[];
  onClickLng?: (lng: Language) => void;
  hideList?: Language[];
  hilightLangs?: Language[];
}

const LangList: React.FC<IProps> = ({ onClickLng, hideList, hilightLangs }) => {
  const LangList = hideList
    ? LANGUAGE_LIST.filter(lang => !hideList.includes(lang))
    : LANGUAGE_LIST;

  return (
    <div className={"clear-fix"}>
      {LangList.map(lang => {
        const fileName = LangShortToNational[LanguageResverseShort[lang]];
        const flag = `${IMG_REPO}flags/${fileName}.png`;
        return (
          <JDbox
            key={s4()}
            thema={
              hilightLangs && hilightLangs.includes(lang)
                ? "primary"
                : undefined
            }
            onClick={() => {
              onClickLng && onClickLng(lang);
            }}
            className="JDflex--center"
            size="small"
            space="tiny"
            clickable
            float
          >
            <div className="JDflex JDflex--vCenter">
              <img
                className="LangList__flag JDstandard-tiny-space"
                src={flag}
              />
              <span
                style={{
                  marginLeft: "-1px"
                }}
              >
                {LanguageItSelf[lang]}
              </span>
            </div>
          </JDbox>
        );
      })}
    </div>
  );
};

export default ErrProtecter<IProps>(LangList);
