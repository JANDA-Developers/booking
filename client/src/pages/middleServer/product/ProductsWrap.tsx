/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { Mutation, graphql } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { useRadio, useModal2, useCheckBox } from '../../../actions/hook';
import Products from './Products';
import {
  GET_All_PRODUCTS_TYPES, BUY_PRODUCTS, GET_USER_INFO, REFUND_PRODUCT,
} from '../../../queries';
import {
  ErrProtecter, download, toast, isEmpty, onError,
} from '../../../utils/utils';
import getProducts from './components/specification';
import {
  buyProduct, buyProductVariables, refundProduct, refundProductVariables,
} from '../../../types/api';
import { ReactTooltip } from '../../../atoms/tooltipList/TooltipList';
import { Product } from '../../../types/apiEnum';

class BuyProductMutation extends Mutation<buyProduct, buyProductVariables> {}
class RefundProductMutation extends Mutation<refundProduct, refundProductVariables> {}

// currentProduct : 현재 적용중인 상품
const ProductsWrap: React.FC<any> = ({
  data: { GetAllProductTypes, productLoading },
  currentProduct,
  selectedHouse,
  isPhoneVerified,
}: any = {}) => {
  const productTypes = GetAllProductTypes && GetAllProductTypes.productTypes;
  const currentProductTypeId = !isEmpty(currentProduct) && currentProduct.productType._id;
  const [selectedProductTypeId, setSelectedProductTypeId] = useRadio(currentProductTypeId);
  const exModalHook = useModal2(false);
  const refundModal = useModal2(false);
  const [redirect, setRedirect] = useState(false);
  const hostAppHook = useCheckBox(false);

  const handleSelectProductType = (value: any) => setSelectedProductTypeId(value.replace('--slider', ''));

  const checkMutation = (mutation: any) => {
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
    isPhoneVerified,
  };

  const testProductId = productTypes && productTypes.filter((productType: any) => productType.name === Product.TEST)[0]._id;
  const tempProp = {
    productTypes,
    selectedProductTypeId,
    currentProductTypeId,
    sharedProductProps,
    testProductId,
  };

  const arrProducts = getProducts(tempProp);

  //  👿 안티패턴 key로 변경해주자
  useEffect(() => {
    setSelectedProductTypeId(currentProductTypeId);
  }, [currentProductTypeId]);

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  return (
    <BuyProductMutation
      mutation={BUY_PRODUCTS}
      variables={{
        houseId: selectedHouse._id,
        productTypeId: selectedProductTypeId && selectedProductTypeId.replace('--slider', ''),
      }}
      refetchQueries={[{ query: GET_USER_INFO }]}
      // 👼 success return function을 uitl 에 추가하자
      onCompleted={({ BuyProduct }: any) => {
        if (BuyProduct.ok) {
          toast.success('서비스 적용 완료');
          if (testProductId === selectedProductTypeId) {
            exModalHook.openModal();
            return;
          }
          setRedirect(true);
        } else {
          console.error(BuyProduct.error);
          toast.warn('구매절차에 문제가 발생했습니다. 별도 문의 바랍니다.');
        }
      }}
      // 통신에러
      onError={onError}
    >
      {productMutation => (
        <RefundProductMutation
          mutation={REFUND_PRODUCT}
          variables={{
            houseId: selectedHouse._id,
            productId: currentProduct._id,
          }}
          refetchQueries={[{ query: GET_USER_INFO }]}
          onCompleted={({ RefundProduct: { ok, error } }: any) => {
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
              exModalHook={exModalHook}
              isPhoneVerified={isPhoneVerified}
              refundModal={refundModal}
              hostAppHook={hostAppHook}
            />
          ))
          }
        </RefundProductMutation>
      )}
    </BuyProductMutation>
  );
};

export default graphql(GET_All_PRODUCTS_TYPES)(ErrProtecter(ProductsWrap));
