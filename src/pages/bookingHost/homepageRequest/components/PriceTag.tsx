import React from "react";
import "./priceTag.scss";
import { autoComma } from "../../../../utils/utils";

interface IProps {
  price: number;
}

const PriceTag: React.FC<IProps> = ({ price }) => {
  if (price === 0)
    return (
      <img
        className="priceTag--free"
        src="https://s3.ap-northeast-2.amazonaws.com/booking.stayjanda.files/infographic/option_basic.png"
      />
    );
  return <div className="priceTag">{"+ " + autoComma(price)}</div>;
};

export default PriceTag;
