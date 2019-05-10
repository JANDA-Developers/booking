import React from 'react';
import { Product } from '../../../../types/enum';

const getProducts = ({
  productTypes,
  selectedProductTypeId,
  currentProductTypeId,
  sharedProductProps,
  testProductId,
}: any) => {
  const product0 = {
    ...sharedProductProps,
    productIndex: Product.TEST,
    productName: '데모 상품',
    value: testProductId,
    roomLimit: '',
    roomCondition: '(무료체험 서비스)',
    price: '무료체험',
    specifications: [
      '숙소홈페이지 셋팅 체험',
      '실시간 예약 체험',
      '하우스메뉴얼 체험',
      <span className="JDtextColor--secondary">본상품은 예약이 불가능합니다.</span>,
    ],
    isSelected: selectedProductTypeId === testProductId,
    isCurrent: currentProductTypeId === testProductId,
    disabled: false,
  };

  const product1Id = productTypes && productTypes.filter((productType: any) => productType.name === '상품2')[0]._id;
  const product1 = {
    ...sharedProductProps,
    productIndex: '상품2',
    productName: '작은숙소',
    value: product1Id,
    roomLimit: '룸 7개이하',
    roomCondition: '(공유민박, 소규모 숙소)',
    price: (
      <span>
        {'55,000'}
        <span className="JDtiny-text"> /월 (부가세포함)</span>
      </span>
    ),
    specifications: ['직접 세팅이 가능한 숙소 홈페이지', '실시간 예약 시스템', '다국어 하우스 메뉴얼'],
    isSelected: selectedProductTypeId === product1Id,
    isCurrent: currentProductTypeId === product1Id,
  };

  const product2Id = productTypes && productTypes.filter((productType: any) => productType.name === '상품3')[0]._id;
  const product2 = {
    ...sharedProductProps,
    productIndex: '상품3',
    productName: '중간 규모숙박업',
    value: product2Id,
    roomLimit: '룸 8 ~ 20개',
    roomCondition: '(게스트하우스, 펜션)',
    price: (
      <span>
        {'55,000+'}
        <span className="JDtiny-text"> /월 (부가세포함)</span>
      </span>
    ),
    specifications: ['직접 세팅이 가능한 숙소 홈페이지', '실시간 예약 시스템', '다국어 하우스 메뉴얼(월 1만원 추가)'],
    isSelected: selectedProductTypeId === product2Id,
    isCurrent: currentProductTypeId === product2Id,
  };

  const product3Id = productTypes && productTypes.filter((productType: any) => productType.name === '상품4')[0]._id;
  const product3 = {
    ...sharedProductProps,
    productIndex: '상품4',
    productName: '큰 규모숙박업',
    value: product3Id,
    roomLimit: '룸 20개 이상',
    roomCondition: '(공유민박, 소규모 숙소)',
    price: '별도협의',
    specifications: [
      '직접 세팅이 가능한 숙소 홈페이지',
      '실시간 예약 시스템',
      '다국어 하우스 메뉴얼',
      '객실관리 IOT 시스템 연동',
      '맞춤제작 별도 문의',
    ],
    isSelected: selectedProductTypeId === product3Id,
    isCurrent: currentProductTypeId === product3Id,
  };

  const arrProducts = [product0, product1, product2, product3];

  return arrProducts;
};

export default getProducts;
