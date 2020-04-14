import React, { useState } from 'react';
import { IjandaProduct } from './product';
import classNames from 'classnames';
import { JDFileManagerModal, JDalign } from '@janda-com/front';
import JDtypho from '../../../atoms/typho/Typho';
import JDlist from '../../../atoms/list/List';
import './ProductCard.scss';
import Button from '../../../atoms/button/Button';
import { LANG } from '../../../hooks/hook';
import { autoComma } from '../../../utils/utils';
import { IS_MOBILE } from '../../../types/const';
import JDIcon from '../../../atoms/icons/Icons';

export interface IProps {
	product: IjandaProduct;
}

export const ProductCard: React.FC<IProps> = ({ product }) => {
	const [ dense, setDense ] = useState(IS_MOBILE ? true : false);

	const classes = classNames('productCard', undefined, {
		'productCard--dense': dense
	});
	return (
		<JDalign
			flex={{
				column: true
			}}
			col={{
				full: 6,
				md: 12
			}}
			className={classes}
		>
			<JDalign className="productCard__head">
				<JDalign
					flex={{
						center: !IS_MOBILE,
						vCenter: true
					}}
				>
					<JDIcon
						size="normal"
						onClick={() => {
							setDense(!dense);
						}}
						className="productCard__denser"
						icon={dense ? 'vDown' : 'vUp'}
					/>
					<JDtypho size={IS_MOBILE ? 'h6' : 'h4'} mb="small" weight={800}>
						{product.name}
					</JDtypho>
				</JDalign>
				<JDalign
					flex={{
						center: !IS_MOBILE,
						vCenter: true
					}}
				>
					<JDtypho size="small">{product.subTitle}</JDtypho>
				</JDalign>
			</JDalign>

			<div className="productCard__price">
				<JDalign
					flex={{
						vCenter: true,
						center: true
					}}
				>
					<JDtypho mb="no" color="point" size={IS_MOBILE ? 'h6' : 'h4'} weight={600}>
						{autoComma(product.price)}
					</JDtypho>
					<JDtypho>/월</JDtypho>
				</JDalign>
			</div>
			<div className="productCard__body">
				<JDtypho size="small">
					<JDlist mb="no" linePoint="·" contents={product.describes} />
				</JDtypho>
			</div>
			<div className="productCard__bottom">
				<JDalign
					flex={{
						center: true
					}}
				>
					<Button br="round" size="long" mb="no" label={LANG('select')} thema="primary" mode="flat" />
				</JDalign>
			</div>
		</JDalign>
	);
};

export default ProductCard;
