import React from "react";
import {IProductTypeDesc} from "../../../types/interface";
import {getAllProductTypes_GetAllProductTypes_productTypes} from "../../../types/api";
import {ProductTypeKey} from "../../../types/enum";
import {autoComma} from "../../../utils/utils";
import {IIcons} from "../../../atoms/icons/Icons";
import JDlist from "../../../atoms/list/List";

const froductTypeManuFacter = (
  productTypes: getAllProductTypes_GetAllProductTypes_productTypes[]
): IProductTypeDesc[] => {
  const specifcGet = (
    productType: getAllProductTypes_GetAllProductTypes_productTypes
  ): {
    icon: IIcons | "";
    shortDesc: string | JSX.Element | JSX.Element[];
    detailDesc: string | JSX.Element | JSX.Element[];
    priceText: string;
    disable?: boolean;
  } => {
    if (productType.key === ProductTypeKey.DEMO)
      return {
        icon: "rocket",
        shortDesc: (
          <JDlist
            noWrap
            align="center"
            contents={[
              "이주일간 테스트 하기.",
              "사용해보고 결정하세요.",
              "지금 바로 시작할수 있습니다."
            ]}
          />
        ),
        detailDesc: (
          <JDlist
            linePoint="·"
            contents={[
              "상품을 구매하기전에 체험하기를 통해서 미리 체험해보세요.",
              "본상품은 구매전 체험을 위한 용도로 사용됩니다.",
              "잔다에서 무료로 제공하는 홈페이지를 제공받으실수 없습니다.",
              "대부분의 서비스를 사용가능하며 일주일후에는 사용이 불가능 합니다.",
              "기한이 끝난후에 새로운 상품을 적용하시면 계속 사용이 가능합니다."
            ]}
          />
        ),
        priceText: "무료체험"
      };
    if (productType.key === ProductTypeKey.STANDARD)
      return {
        icon: "heartHouse",
        shortDesc: (
          <JDlist
            noWrap
            align="center"
            contents={[
              "중소숙박 최적화 서비스",
              "필요한 서비스만 쉽고",
              "간단하게 사용하세요."
            ]}
          />
        ),
        detailDesc: (
          <JDlist
            linePoint="·"
            contents={[
              "게스트 하우스 및 중소숙박에 최적화된 상품입니다.",
              `해당 상품은 방갯수가 ${productType.roomCount}개 이하인 숙소에 적합합니다.`,
              "잔다에서 무료로 제공하는 홈페이지를 제공받으실수 있습니다.",
              "사용기한은 한달이며 한달후 재결제가 이루어집니다."
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
              "호텔 대규모 솔루션 최적화",
              "호텔관리자가 관여하여",
              "다양한 서비스를 제공합니다."
            ]}
          />
        ),
        detailDesc: (
          <JDlist
            linePoint="·"
            contents={[
              "호텔 같은 큰규모에 적합한 상품.",
              `해당 상품은 방갯수가 ${productType.roomCount}개 이상인 숙소에 적합합니다.`,
              "잔다에서 무료로 제공하는 홈페이지를 제공받으실수 있습니다.",
              "홈페이지 커스텀 제작을 요청하실수 있으며, 별도 비용이 발생할수 있습니다.",
              "사용기한은 한달이며 한달후 재결제가 이루어집니다."
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
              "숙박외 서비스 예약 및",
              "다른 예약관리가 필요하신가요?",
              "이상품을 선택하세요."
            ]}
          />
        ),
        priceText: "별도문의",
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

export default froductTypeManuFacter;
