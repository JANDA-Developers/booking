import React from "react";
import { IProductTypeDec } from "../../../types/interface";
import { getAllProductTypes_GetAllProductTypes_productTypes } from "../../../types/api";
import { ProductTypeKey } from "../../../types/enum";
import { autoComma } from "../../../utils/utils";
import { IIcons } from "../../../atoms/icons/Icons";
import JDlist from "../../../atoms/list/List";
import { LANG } from "../../../hooks/hook";

interface IProductSpecifc {
  icon: IIcons | "";
  shortDesc: string | JSX.Element | JSX.Element[];
  detailDesc: string | JSX.Element | JSX.Element[];
  priceText: string;
  disable?: boolean;
}

const ProductTypeGetDesc = (
  productTypes: getAllProductTypes_GetAllProductTypes_productTypes[]
): IProductTypeDec[] => {
  const specifcGet = (
    productType: getAllProductTypes_GetAllProductTypes_productTypes
  ): IProductSpecifc => {
    if (productType.key === ProductTypeKey.DEMO)
      return {
        icon: "rocket",
        shortDesc: (
          <JDlist
            noWrap
            align="center"
            contents={[
              LANG("product1_short1"),
              LANG("product1_short2"),
              LANG("product1_short3")
            ]}
          />
        ),
        detailDesc: (
          <JDlist
            linePoint="·"
            contents={[
              LANG("product1_detail1"),
              LANG("product1_detail2"),
              LANG("product1_detail3"),
              LANG("product1_detail4"),
              LANG("product1_detail5")
            ]}
          />
        ),
        priceText: LANG("free_experience")
      };
    if (productType.key === ProductTypeKey.STANDARD)
      return {
        icon: "heartHouse",
        shortDesc: (
          <JDlist
            noWrap
            align="center"
            contents={[
              LANG("product2_short1"),
              LANG("product2_short2"),
              LANG("product2_short3")
            ]}
          />
        ),
        detailDesc: (
          <JDlist
            linePoint="·"
            contents={[
              LANG("product2_detail1"),
              LANG("F_product2_detail2")(productType.roomCount),
              LANG("product2_detail3"),
              LANG("product2_detail4")
            ]}
          />
        ),
        priceText: autoComma(productType.price)
      };
    if (productType.key === ProductTypeKey.PREMIUM)
      return {
        icon: "hotel",
        shortDesc: (
          <JDlist
            noWrap
            align="center"
            contents={[
              LANG("product3_shortl"),
              LANG("product3_short2"),
              LANG("product3_short3")
            ]}
          />
        ),
        detailDesc: (
          <JDlist
            linePoint="·"
            contents={[
              LANG("product3_detail1"),
              LANG("F_product3_detail2")(productType.roomCount),
              LANG("product3_detail3"),
              LANG("product3_detail4"),
              LANG("product3_detail5")
            ]}
          />
        ),
        priceText: autoComma(productType.price)
      };
    if (productType.key === ProductTypeKey.NEGOTIATION)
      return {
        icon: "peopleWithStarts",
        detailDesc: <div></div>,
        shortDesc: (
          <JDlist
            noWrap
            align="center"
            contents={[
              LANG("product4_short1"),
              LANG("product4_short2"),
              LANG("product4_short3")
            ]}
          />
        ),
        priceText: LANG("inquire_separately"),
        disable: true
      };
    return {
      icon: "",
      shortDesc: "",
      detailDesc: "",
      priceText: ""
    };
  };

  const specifc = productTypes.map(productType =>
    Object.assign(productType, specifcGet(productType))
  );

  return specifc;
};

export default ProductTypeGetDesc;
