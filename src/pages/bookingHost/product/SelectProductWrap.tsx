/* eslint-disable camelcase */
import React, { useState, useEffect, Fragment } from "react";
import { Mutation, Query } from "react-apollo";
import { Redirect } from "react-router-dom";
import {
  GET_PRODUCTS_TYPES,
  BUY_PRODUCTS,
  GET_USER_INFO,
  REFUND_PRODUCT
} from "../../../apollo/queries";
import {
  ErrProtecter,
  queryDataFormater,
  onCompletedMessage
} from "../../../utils/utils";
import {
  buyProduct,
  buyProductVariables,
  refundProduct,
  refundProductVariables,
  getAllProductTypes
} from "../../../types/api";
import { ReactTooltip } from "../../../atoms/tooltipList/TooltipList";
import { LayoutType } from "../../../types/enum";
import SelectProducts from "./SelectProduct";
import productTypeGetDesc from "./helper";
import { IContext } from "../../bookingHost/BookingHostRouter";
import { LANG } from "../../../hooks/hook";

class GetProductTypes extends Query<getAllProductTypes> {}
class BuyProductMutation extends Mutation<buyProduct, buyProductVariables> {}
class RefundProductMutation extends Mutation<
  refundProduct,
  refundProductVariables
> {}

export interface IAdditionHook {
  useLayout: boolean;
  layoutType: LayoutType;
  url: string;
}
interface IProps {
  context: IContext;
}

// currentProduct : 현재 적용중인 상품
const SelectProductWrap: React.FC<IProps> = ({ context }) => {
  const {
    house: selectedHouse,
    applyedProduct: currentProduct,
    user: { isPhoneVerified }
  } = context;

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const refetchQueries = [{ query: GET_USER_INFO }];
  return (
    <GetProductTypes query={GET_PRODUCTS_TYPES}>
      {({ data: productTypeDatas, loading }) => {
        const productTypes = queryDataFormater(
          productTypeDatas,
          "GetAllProductTypes",
          "productTypes",
          []
        );
        const productTypeDesc = productTypeGetDesc(productTypes || []);
        return (
          <BuyProductMutation
            mutation={BUY_PRODUCTS}
            onCompleted={({ BuyProduct }) => {
              onCompletedMessage(
                BuyProduct,
                LANG("product_application_completed"),
                LANG("product_application_failed")
              );
            }}
            refetchQueries={refetchQueries}
            awaitRefetchQueries
          >
            {(buyProductMu, { loading: buyProductLoading }) => (
              <RefundProductMutation
                mutation={REFUND_PRODUCT}
                refetchQueries={refetchQueries}
              >
                {refundMu => (
                  <Fragment>
                    <SelectProducts
                      productTypeDecs={productTypeDesc}
                      refundMu={refundMu}
                      buyProductMu={buyProductMu}
                      loading={loading}
                      mutationLoading={buyProductLoading}
                      selectedHouse={selectedHouse}
                      currentProduct={currentProduct}
                      isPhoneVerified={isPhoneVerified}
                    />
                  </Fragment>
                )}
              </RefundProductMutation>
            )}
          </BuyProductMutation>
        );
      }}
    </GetProductTypes>
  );
};

export default ErrProtecter(SelectProductWrap);
