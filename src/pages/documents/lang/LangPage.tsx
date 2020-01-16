import React, { Fragment } from "react";
import { JDlangsSet } from "../../../langs/JDlang";
import "./LangPage.scss";
import { instanceOfA } from "../../../utils/utils";

const LangPage: React.FC = () => {
  const primeLang = JDlangsSet["kr"];
  const keys = Object.keys(primeLang);

  const ErrBlock = () => <div className="langPage__value langPage__empty" />;

  const render = (keySet: any, langType: string, word: any) => {
    // @ts-ignore
    const value = keySet[word];
    // @ts-ignore
    if (!primeLang[word]) return;

    if (!value) return <ErrBlock />;

    if (typeof value === "string") {
      return <div className="langPage__value">{value}</div>;
    } else if (instanceOfA<JSX.Element>(value, "key")) {
      return <div className="langPage__value">{value}</div>;
    } else if (typeof value === "object") {
      const enums = Object.keys(
        // @ts-ignore
        primeLang[word]
      );

      return (
        <div className={`langPage__value langPage__value--enum`}>
          <h6>{word}</h6>
          {enums.map((enumKey, index) => {
            if (!value[enumKey]) return <ErrBlock />;
            if (typeof value[enumKey] === "string") {
              return (
                <div className="langPage__enums">
                  <div>
                    {`${index}: `}
                    {value[enumKey]}
                  </div>
                </div>
              );
            }
          })}
        </div>
      );
    } else if (typeof value === "function") {
      return (
        <div className="langPage__value">
          {// @ts-ignore
          value()}
        </div>
      );
    }
  };

  return (
    <div className="langPage container container--full">
      <div className="docs-section langPage__wrapAll">
        <div className="langPage__row">
          {Object.keys(JDlangsSet).map((langType, index) => (
            <Fragment>
              {index === 0 && (
                <h3 className="langPage__value langPage__langKey">KEY</h3>
              )}
              <h3 className="langPage__value langPage__langKey">{langType}</h3>
            </Fragment>
          ))}
        </div>
        {keys.map((word, rowIndex) => (
          <div className="langPage__row">
            <span className="langPage__rowIndex">{`${rowIndex}`}</span>
            <span className="langPage__rowKey langPage__value">{word}</span>
            {Object.keys(JDlangsSet).map((langType, index) => {
              // @ts-ignore
              const langSet = JDlangsSet[langType];
              return render(langSet, langType, word);
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LangPage;
