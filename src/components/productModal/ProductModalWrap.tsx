import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_PRODUCTS_TYPES, BUY_PRODUCTS, GET_USER_INFO } from '../../apollo/queries';
import client from '../../apollo/apolloClient';
import { ProductModal, IProductModalProps, IProductModalChainProp } from './ProductModal';
import { getAllProductTypes, selectProduct, selectProductVariables } from '../../types/api';
import { LANG } from '../../hooks/hook';
import { IContext } from '../../pages/bookingHost/BookingHostRouter';
import { queryDataFormater, onCompletedMessage } from '../../utils/utils';

export interface IProps extends IProductModalChainProp {
	context: IContext;
}

export const ProductModalWrap: React.FC<IProps> = ({ modalHook, context }) => {
	const { house } = context;
	const houseId = house._id;
	const { data: productTypeDatas, loading: priceLoading } = useQuery<getAllProductTypes>(GET_PRODUCTS_TYPES, {
		client
	});
	const productTypes = queryDataFormater(productTypeDatas, 'GetAllProductTypes', 'productTypes', []) || [];

	const [ selectProductMu, { loading: selectProductLoading } ] = useMutation<
		selectProduct,
		selectProductVariables
	>(BUY_PRODUCTS, {
		client,
		awaitRefetchQueries: true,
		refetchQueries: [ { query: GET_USER_INFO } ],
		onCompleted: ({ SelectProduct }) => {
			onCompletedMessage(SelectProduct, LANG('product_application_completed'), LANG('product_application_failed'));
		}
	});

	const changeFn = (id: string) => {
		selectProductMu({
			variables: {
				param: {
					houseId,
					productTypeId: id
				}
			}
		});
	};

	return <ProductModal onClickSelect={changeFn} productTypes={productTypes} modalHook={modalHook} />;
};

export default ProductModalWrap;
