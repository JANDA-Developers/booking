import React from "react";
import "./CalculateViewer.scss";
import { arraySum } from "../../../../utils/elses";
import { toNumber, autoComma } from "../../../../utils/utils";
import { LANG } from "../../../../hooks/hook";
import Align from "../../../../atoms/align/Align";
import JDtypho from "../../../../atoms/typho/Typho";
import List from "../../../../atoms/searchInput/list";

type SubProduct = {
  title: string;
  price: number;
};

type Product = {
  title: string;
  price: number;
  sub: SubProduct[];
};

interface IProps {
  products: Product[];
}

const CalculateViewer: React.FC<IProps> = ({ products }) => {
  const total = arraySum(
    products.map(
      p => toNumber(p.price) + arraySum(p.sub.map(subp => toNumber(subp.price)))
    )
  );

  return (
    <div className="calculateViewer">
      {products.map(p => (
        <div className="calculateViewer__history">
          <div className="calculateViewer__historyInner">
            <JDtypho weight={600} size="h5">
              <Align
                flex={{
                  between: true
                }}
              >
                <span>{p.title}</span> <span>{autoComma(p.price)}</span>
              </Align>
            </JDtypho>
            {p.sub.map((subp, i) => (
              <Align key={subp.title + i} mb="small" flex={{ between: true }}>
                <div>└{subp.title}</div>
                <div>
                  {subp.price ? (
                    <Align flex={{}}>
                      <JDtypho mr="normal">+</JDtypho>
                      {autoComma(subp.price)}
                    </Align>
                  ) : (
                      LANG("free")
                    )}
                </div>
              </Align>
            ))}
          </div>
        </div>
      ))}
      <Align
        flex={{
          end: true
        }}
        className="calculateViewer__result"
      >
        <Align
          flex={{
            between: true
          }}
          className="calculateViewer__result-title"
        >
          <JDtypho size="h3">{LANG("sum_price")}</JDtypho>{" "}
          <JDtypho size="h3">
            {total === 0 ? LANG("free") : autoComma(total)}
          </JDtypho>
        </Align>
      </Align>
    </div>
  );
};

export default CalculateViewer;
