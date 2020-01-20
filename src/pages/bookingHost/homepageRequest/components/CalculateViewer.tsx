import React from "react";
import "./CalculateViewer.scss";
import { arraySum } from "../../../../utils/elses";
import { toNumber } from "../../../../utils/utils";
import { LANG } from "../../../../hooks/hook";

type SubProduct = {
  title: string;
  price: string;
};

type Product = {
  title: string;
  price: string;
  sub: SubProduct[];
};

interface IProps {
  products: Product[];
}

const CalculateViewer: React.FC<IProps> = ({ products }) => {
  const total = products.map(
    p => toNumber(p.price) + arraySum(p.sub.map(subp => toNumber(subp.price)))
  );
  return (
    <div className="calculateViewer">
      {products.map(p => (
        <div className="calculateViewer__history">
          <h5 className="JDflex">
            {p.title} <span>{p.price}</span>
          </h5>
          {p.sub.map(subp => (
            <div className="JDflex">
              <span>└{subp.title}</span>
              <span>{subp.price}</span>
            </div>
          ))}
        </div>
      ))}
      <div className="calculateViewer__result">
        <h3>
          {LANG("total_price")} <span>{total}</span>
        </h3>
      </div>
    </div>
  );
};

export default CalculateViewer;
