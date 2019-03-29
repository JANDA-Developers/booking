/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { Mutation, graphql } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { useRadio, useModal2 } from '../../../actions/hook';
import Products from './Products';
import manual from '../../../manual.hwp';
import {
  GET_All_PRODUCTS_TYPES, BUY_PRODUCTS, GET_USER_INFO, REFUND_PRODUCT,
} from '../../../queries';
import {
  ErrProtecter, download, toast, isEmpty,
} from '../../../utils/utils';

// currentProduct : 현재 적용중인 상품
const ProductsWrap = ({
  data: { GetAllProductTypes, productLoading },
  currentProduct,
  selectedHouse,
  isPhoneVerified,
} = {}) => {
  const productTypes = GetAllProductTypes && GetAllProductTypes.productTypes;
  const currentProductTypeId = !isEmpty(currentProduct) && currentProduct.productType._id;
  const [selectedProductTypeId, setSelectedProductTypeId] = useRadio(currentProductTypeId);
  const demoModal = useModal2(false);
  const refundModal = useModal2(false);
  const [redirect, setRedirect] = useState(false);

  const handleSelectProductType = value => setSelectedProductTypeId(value.replace('--slider', ''));

  const checkMutation = (mutation) => {
    if (!selectedProductTypeId) {
      toast.warn('상품을 선택 해주세요.');
      return false;
    }
    if (productLoading) {
      toast.warn('상품을 재선택한후 다시 시도해주세요.');
      return false;
    }
    mutation();
    return false;
  };

  const sharedProductProps = {
    disabled: !isPhoneVerified,
    setRadio: handleSelectProductType,
  };

  const testProductId = productTypes && productTypes.filter(productType => productType.name === '상품1')[0]._id;

  const product0 = {
    ...sharedProductProps,
    productIndex: '상품1',
    productName: '데모 상품',
    value: testProductId,
    roomLimit: '',
    roomCondition: '(무료체험 서비스)',
    price: '무료체험',
    specifications: [
      '숙소홈페이지 셋팅 체험',
      '실시간 예약 체험',
      '하우스메뉴얼 체험',
      <span className="JDpoint-text">본상품은 예약이 불가능합니다.</span>,
    ],
    isSelected: selectedProductTypeId === testProductId,
    isCurrent: currentProductTypeId === testProductId,
    disabled: false,
  };

  const product1Id = productTypes && productTypes.filter(productType => productType.name === '상품2')[0]._id;
  const product1 = {
    ...sharedProductProps,
    productIndex: '상품2',
    productName: '작은숙소',
    value: product1Id,
    roomLimit: '룸 7개이하',
    roomCondition: '(공유민박, 소규모 숙소)',
    price: '설치비 무료',
    specifications: ['직접 세팅이 가능한 숙소 홈페이지', '실시간 예약 시스템', '다국어 하우스 메뉴얼'],
    isSelected: selectedProductTypeId === product1Id,
    isCurrent: currentProductTypeId === product1Id,
  };

  const product2Id = productTypes && productTypes.filter(productType => productType.name === '상품3')[0]._id;
  const product2 = {
    ...sharedProductProps,
    productIndex: '상품3',
    productName: '중간 규모숙박업',
    value: product2Id,
    roomLimit: '룸 8 ~ 20개',
    roomCondition: '(게스트하우스, 펜션)',
    price: '30.000 /월',
    specifications: ['직접 세팅이 가능한 숙소 홈페이지', '실시간 예약 시스템', '다국어 하우스 메뉴얼(월 1만원 추가)'],
    isSelected: selectedProductTypeId === product2Id,
    isCurrent: currentProductTypeId === product2Id,
  };

  const product3Id = productTypes && productTypes.filter(productType => productType.name === '상품4')[0]._id;
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

  useEffect(() => {
    setSelectedProductTypeId(currentProductTypeId);
  }, [currentProductTypeId]);

  return (
    <Mutation
      mutation={BUY_PRODUCTS}
      variables={{
        houseId: selectedHouse._id,
        productTypeId: selectedProductTypeId && selectedProductTypeId.replace('--slider', ''),
      }}
      refetchQueries={[{ query: GET_USER_INFO }]}
      onCompleted={({ BuyProduct }) => {
        if (BuyProduct.ok) {
          toast.success('서비스 적용 완료');
          // 체험상품을 선택했을경우에
          if (testProductId === selectedProductTypeId) {
            download(
              manual,
              '홈페이지 사용 메뉴얼.hwp',
            ).then(() => { toast.success('메뉴얼 다운로드 완료'); });
            demoModal.openModal();
            return;
          }
          setRedirect(true);
          // 통신에러
        } else {
          console.error(BuyProduct.error);
          toast.warn('구매절차에 문제가 발생했습니다. 별도 문의 바랍니다.');
        }
      }}
      onError={(buyProductErr) => {
        toast.warn('구매절차에 문제가 발생했습니다. 별도 문의 바랍니다.');
        console.error(buyProductErr);
      }}
    >
      {productMutation => (
        // {/* Mutation : 상품해지 뮤테이션 */}
        <Mutation
          mutation={REFUND_PRODUCT}
          variables={{
            houseId: selectedHouse._id,
            productId: currentProduct._id,
          }}
          refetchQueries={[{ query: GET_USER_INFO }]}
          onCompleted={({ RefundProduct: { ok, error } }) => {
            if (ok) {
              toast.success('상품해지 완료');
              refundModal.closeModal();
            } else {
              console.error(error);
              toast.error(error);
            }
          }}
        >
          {refundMutation => (redirect ? (
            <Redirect push to="/middleServer/ready" />
          ) : (
            <Products
              refundMutation={refundMutation}
              productMutation={productMutation}
              productLoading={productLoading}
              arrProducts={arrProducts}
              checkMutation={checkMutation}
              selectedHouse={selectedHouse}
              currentProduct={currentProduct}
              demoModal={demoModal}
              refundModal={refundModal}
            />
          ))
          }
        </Mutation>
      )}
    </Mutation>
  );
};

export default ErrProtecter(graphql(GET_All_PRODUCTS_TYPES)(ProductsWrap));
