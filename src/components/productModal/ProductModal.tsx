import React, { Fragment } from 'react';
import { IUseModal, JDmodal, JDalign } from '@janda-com/front';
import { LANG } from '../../hooks/hook';
import { getAllProductTypes_GetAllProductTypes_productTypes } from '../../types/api';
import { getProducts } from './components/product';
import ProductCard from './components/ProductCard';
import { element } from 'prop-types';
import JDIcon from '../../atoms/icons/Icons';
import JDtypho from '../../atoms/typho/Typho';

export type IProductType = getAllProductTypes_GetAllProductTypes_productTypes;

export interface IProductModalChainProp {
	modalHook: IUseModal;
}

export interface IProductModalProps extends IProductModalChainProp {
	productTypes: IProductType[];
	onClickSelect: (id: string) => void;
}

export const ProductModal: React.FC<IProductModalProps> = ({ modalHook, productTypes, onClickSelect }) => {
	return (
		<JDmodal
			head={{
				element: (
					<Fragment>
						<JDtypho weight={600} size="h6" mb="tiny">
							{LANG('janda_price_policy')}
						</JDtypho>
						<a href={'https://stayjanda.com/charge'} target="blank" className="anchor">
							{LANG('price_policy_detail')} <JDIcon size="tiny" icon="arrowTo" />
						</a>
					</Fragment>
				)
			}}
			{...modalHook}
		>
			<JDalign grid>{getProducts().map((p) => <ProductCard key={p.name} product={p} />)}</JDalign>
		</JDmodal>
	);
};

export default ProductModal;
