/* eslint-disable camelcase */
import React, {useState, useEffect, Fragment} from "react";
import {Mutation, graphql, Query} from "react-apollo";
import {toast} from "react-toastify";
import {Redirect} from "react-router-dom";
import {useRadio, useModal, useCheckBox} from "../../../actions/hook";
import {
  GET_PRODUCTS_TYPES,
  BUY_PRODUCTS,
  GET_USER_INFO,
  REFUND_PRODUCT
} from "../../../queries";
import {
  ErrProtecter,
  isEmpty,
  showError,
  queryDataFormater,
  onCompletedMessage
} from "../../../utils/utils";
import {
  buyProduct,
  buyProductVariables,
  refundProduct,
  refundProductVariables,
  getMyProfile_GetMyProfile_user_houses_product,
  getAllProductTypes
} from "../../../types/api";
import {ReactTooltip} from "../../../atoms/tooltipList/TooltipList";
import {Product, LayoutType} from "../../../types/enum";
import ApplyProductModal from "./components/applyProductModal";
import {isUrl} from "../../../utils/inputValidations";
import Preloader from "../../../atoms/preloader/Preloader";
import {IHouse} from "../../../types/interface";
import SelectProducts from "./SelectProduct";
import froductTypeManuFacter from "./froductTypeManuFacter";

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
  selectedHouse: IHouse;
  currentProduct: getMyProfile_GetMyProfile_user_houses_product | undefined;
  isPhoneVerified: boolean;
}

// currentProduct : 현재 적용중인 상품
const SelectProductWrap: React.FC<IProps> = ({
  currentProduct,
  selectedHouse,
  isPhoneVerified
}) => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const refetchQueries = [{query: GET_USER_INFO}];
  return (
    <GetProductTypes query={GET_PRODUCTS_TYPES}>
      {({data: productTypeDatas, loading}) => {
        const productTypes = queryDataFormater(
          productTypeDatas,
          "GetAllProductTypes",
          "productTypes",
          []
        );
        const productTypeDesc = froductTypeManuFacter(productTypes || []);
        return (
          <BuyProductMutation
            mutation={BUY_PRODUCTS}
            onCompleted={({BuyProduct}) => {
              onCompletedMessage(
                BuyProduct,
                "상품 신청 완료",
                "예약 신청 실패"
              );
              setRedirect(true);
            }}
            refetchQueries={refetchQueries}
            awaitRefetchQueries
          >
            {buyProductMu => (
              <RefundProductMutation
                mutation={REFUND_PRODUCT}
                refetchQueries={refetchQueries}
              >
                {refundMu =>
                  redirect ? (
                    <Redirect push to="/ready" />
                  ) : (
                    <Fragment>
                      <SelectProducts
                        productTypes={productTypeDesc}
                        refundMu={refundMu}
                        buyProductMu={buyProductMu}
                        loading={loading}
                        selectedHouse={selectedHouse}
                        currentProduct={currentProduct}
                        isPhoneVerified={isPhoneVerified}
                      />
                      <Preloader page loading={loading} />
                    </Fragment>
                  )
                }
              </RefundProductMutation>
            )}
          </BuyProductMutation>
        );
      }}
    </GetProductTypes>
  );
};

export default ErrProtecter(SelectProductWrap);
