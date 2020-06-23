import React, { useState } from 'react';
import {
	InputText,
	JDtypho,
	JDbutton,
	JDmodal,
	IUseModal,
	JDalign,
	JDcheckBox,
	JDselect,
	useCheckBox,
	useSelect,
	useInput
} from '@janda-com/front';
import { useDrawer } from '../../../hooks/hook';
import Drawer from '../../../atoms/drawer/Drawer';
import { enumToOption } from '@janda-com/front';
import { LANG } from '@janda-com/lang';
import { OptionalItemType } from '../../../types/enum';
import { OptionalItemUpsertInput } from '../../../types/api';
import optionFineder from '../../../utils/optionFinder';

export interface IEditProductInfo {
	optionProduct: OptionalItemUpsertInput;
}

interface IProp {
	modalHook: IUseModal<IEditProductInfo>;
	handleComplete: (prop: OptionalItemUpsertInput) => void;
}

const typeOps = enumToOption(LANG, 'OptionalItemType', OptionalItemType);

const EditProdctModal: React.FC<IProp> = ({ modalHook, handleComplete }) => {
	const { info } = modalHook;
	if (!info) return <span />;
	const { optionProduct } = info;
	const { _id, label, maxCount, multiplyDate, optionalItems, price, type } = optionProduct;

	const drawerHook = useDrawer(false);
	const typeHook = useSelect(optionFineder(typeOps, type || OptionalItemType.CHECK), typeOps);
	const shouldMulitplyDatePrice = useCheckBox(multiplyDate ? true : false);
	const noCountLimit = useCheckBox(maxCount ? false : true);
	const priceHook = useInput(price || '');
	const productName = useInput(label || '');
	const maxCountHook = useInput(`${maxCount}`);

	const handleCompleteBtn = () => {
		handleComplete({
			_id,
			label,
			maxCount,
			multiplyDate,
			optionalItems,
			price,
			type
		});
	};

	return (
		<JDmodal
			head={{
				element: (
					<JDtypho>
						부가상품 설정
						<Drawer {...drawerHook} />
					</JDtypho>
				)
			}}
			foot={
				<div>
					<JDbutton onClick={handleCompleteBtn} label="완료" />
					<JDbutton
						onClick={() => {
							modalHook.closeModal();
						}}
						label="취소"
					/>
				</div>
			}
			{...modalHook}
		>
			<JDalign>
				<InputText {...productName} label="품명" />
				<InputText {...priceHook} comma label="가격" />
			</JDalign>
			{drawerHook.open && (
				<div>
					<JDselect {...typeHook} />
					<JDcheckBox {...shouldMulitplyDatePrice} label="가격에 날짜곱하기" />
					<JDcheckBox {...noCountLimit} label="수량제한 없음" />
					{noCountLimit.checked && <InputText {...maxCountHook} label="수량제한 없음" />}
				</div>
			)}
		</JDmodal>
	);
};

export default EditProdctModal;
