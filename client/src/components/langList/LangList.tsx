import classNames from "classnames";
import React from "react";
import ErrProtecter from "../../utils/errProtect";
import {IDiv} from "../../types/interface";
import {
  Language,
  LANGUAGE_LIST,
  LanguageShort,
  LanguageItSelf
} from "../../types/enum";
import JDbox from "../../atoms/box/JDbox";
import Card from "../../atoms/cards/Card";

interface IProps extends IDiv {
  children?: JSX.Element[] | JSX.Element | string | Element[];
  onClickLng?: (lng: Language) => void;
  hideList?: Language[];
  hilightLangs?: Language[];
}

const LangList: React.FC<IProps> = ({
  children,
  onClickLng,
  className,
  hideList,
  hilightLangs
}) => {
  const LangList = hideList
    ? LANGUAGE_LIST.filter(lang => !hideList.includes(lang))
    : LANGUAGE_LIST;

  return (
    <div className={"clear-fix"}>
      {LangList.map(lang => {
        const fileName = LanguageShort[lang];
        try {
          const flag = require(`../../img/flags/${fileName}.png`);
          return (
            <JDbox
              thema={
                hilightLangs && hilightLangs.includes(lang)
                  ? "primary"
                  : undefined
              }
              onClick={() => {
                onClickLng && onClickLng(lang);
              }}
              clickable
              float
            >
              <img className="JDstandard-space" src={flag} />
              <span>{LanguageItSelf[lang]}</span>
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
