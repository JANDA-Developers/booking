import classNames from "classnames";
import React from "react";
import ErrProtecter from "../../utils/errProtect";
import {IDiv} from "../../types/interface";
import {
  Language,
  LANGUAGE_LIST,
  LanguageItSelf,
  LangShortToNational,
  LanguageResverseShort
} from "../../types/enum";
import JDbox from "../../atoms/box/JDbox";
import Card from "../../atoms/cards/Card";
import {s4} from "../../utils/utils";

interface IProps extends IDiv {
  children?: JSX.Element[] | JSX.Element | string | Element[];
  onClickLng?: (lng: Language) => void;
  hideList?: Language[];
  hilightLangs?: Language[];
}

const LangList: React.FC<IProps> = ({onClickLng, hideList, hilightLangs}) => {
  const LangList = hideList
    ? LANGUAGE_LIST.filter(lang => !hideList.includes(lang))
    : LANGUAGE_LIST;

  return (
    <div className={"clear-fix"}>
      {LangList.map(lang => {
        const fileName = LangShortToNational[LanguageResverseShort[lang]];
        try {
          const flag = require(`../../img/flags/${fileName}.png`);
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
              clickable
              float
            >
              <img className="JDstandard-small-space" src={flag} />
              <span
                style={{
                  marginLeft: "-1px"
                }}
              >
                {LanguageItSelf[lang]}
              </span>
            </JDbox>
          );
        } catch {
          return <div />;
        } finally {
        }
      })}
    </div>
  );
};

export default ErrProtecter<IProps>(LangList);
