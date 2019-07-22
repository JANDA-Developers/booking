import React from "react";
import {Product} from "../../../../types/enum";

const getProducts = ({
  productTypes,
  selectedProductTypeId,
  currentProductTypeId,
  sharedProductProps,
  testProductId
}: any) => {
  const product0 = {
    ...sharedProductProps,
    productIndex: Product.TEST,
    productName: "데모 상품",
    value: testProductId,
    roomLimit: "",
    roomCondition: "(무료체험 서비스)",
    price: "무료체험",
    specifications: [
      "숙소홈페이지 셋팅 체험",
      "실시간 예약 체험",
      "하우스메뉴얼 체험",
      <span className="JDtextColor--point">
        본상품은 예약이 불가능합니다.
      </span>
    ],
    isSelected: selectedProductTypeId === testProductId,
    isCurrent: currentProductTypeId === testProductId,
    disabled: false
  };

  const product1Id =
    productTypes &&
    productTypes.filter((productType: any) => productType.name === "상품2")[0]
      ._id;
  const product1 = {
    ...sharedProductProps,
    productIndex: "상품2",
    productName: "중소숙박",
    value: product1Id,
    roomLimit: "",
    roomCondition: "(공유민박, 게스트하우스 등, 소규모 숙소)",
    price: (
      <span>
        {"55,000"}
        <span className="JDtiny-text"> /월 (부가세포함)</span>
      </span>
    ),
    specifications: [
      "직접 세팅이 가능한 숙소 홈페이지",
      "실시간 예약 시스템",
      "다국어 하우스 메뉴얼"
    ],
    isSelected: selectedProductTypeId === product1Id,
    isCurrent: currentProductTypeId === product1Id
  };

  const product2Id =
    productTypes &&
    productTypes.filter((productType: any) => productType.name === "상품3")[0]
      ._id;
  const product2 = {
    ...sharedProductProps,
    productIndex: "상품3",
    productName: "큰 규모 숙박",
    value: product2Id,
    roomLimit: "",
    roomCondition: "(호텔, 모텔)",
    price: (
      <span>
        {"110,000+"}
        <span className="JDtiny-text"> /월 (부가세포함)</span>
      </span>
    ),
    specifications: [
      "직접 세팅이 가능한 숙소 홈페이지",
      "실시간 예약 시스템",
      "다국어 하우스 메뉴얼",
      "객실관리 IOT 시스템 연동",
      "맞춤제작 별도 문의"
    ],
    isSelected: selectedProductTypeId === product2Id,
    isCurrent: currentProductTypeId === product2Id
  };

  const product3Id =
    productTypes &&
    productTypes.filter((productType: any) => productType.name === "상품4")[0]
      ._id;
  const product3 = {
    ...sharedProductProps,
    productIndex: "상품4",
    productName: "기타 예약 상품",
    value: product3Id,
    roomLimit: "숙박업 외 다른 예약 시스템",
    roomCondition: "(티켓판매, 엑티비티)",
    price: "별도협의",
    specifications: [
      "직접 세팅이 가능한 숙소 홈페이지",
      "실시간 예약 시스템",
      "다국어 하우스 메뉴얼",
      "객실관리 IOT 시스템 연동",
      "맞춤제작 별도 문의"
    ],
    isSelected: selectedProductTypeId === product3Id,
    isCurrent: currentProductTypeId === product3Id
  };

  const arrProducts = [product0, product1, product2, product3];

  return arrProducts;
};

export default getProducts;
