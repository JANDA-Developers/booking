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
import ModalEndSection from '../../../atoms/modal/components/ModalEndSection';

export interface IEditProductInfo {
	optionProduct: OptionalItemUpsertInput;
}

interface IProp {
	modalHook: IUseModal<IEditProductInfo>;
	handleComplete: (prop: OptionalItemUpsertInput) => void;
	handleDelete: (prop: OptionalItemUpsertInput) => void;
}


const EditProdctModal: React.FC<IProp> = ({ modalHook, handleComplete, handleDelete }) => {
	const typeOps = enumToOption(LANG, 'OptionalItemType', OptionalItemType);
	const { info } = modalHook;
	if (!info) return <span />;
	const { optionProduct } = info;
	const { _id, label, maxCount, multiplyDate, optionalItems, price, type } = optionProduct;

	const drawerHook = useDrawer(false);
	const typeHook = useSelect(optionFineder(typeOps, type || OptionalItemType.INPUT), typeOps);
	const shouldMulitplyDatePrice = useCheckBox(multiplyDate ? true : false);
	const haslimit = useCheckBox(maxCount ? true : false);
	const priceHook = useInput(price || 0);
	const productName = useInput(label || '');
	const maxCountHook = useInput(`${maxCount}`);

	const handleCompleteBtn = () => {
		handleComplete({
			_id: _id || undefined,
			label: productName.value,
			maxCount: haslimit ? parseInt(maxCountHook.value) || 0 : undefined,
			multiplyDate: shouldMulitplyDatePrice.checked,
			price: parseInt(`${priceHook.value || 0}`),
			type: typeHook.selectedOption?.value
		});
	};

	return (
		<JDmodal
			head={{
				element: (
					<JDalign
						flex={{
							vCenter: true
						}}
					>
						<JDtypho mb="no" mr="normal" size="h6">
							부가상품 설정
						</JDtypho>
						<JDalign mr="large">
							<Drawer label="상세설정" mb="no" mode="button" {...drawerHook} />
						</JDalign>
					</JDalign>
				)
			}}
			{...modalHook}
		>
			<JDalign>
				<div>
					<InputText {...productName} label="품명" />
				</div>
				<div>
					<InputText {...priceHook} comma label="가격" />
				</div>
			</JDalign>
			{drawerHook.open && (
				<div>
					<div>
						<JDselect menuPlacement="top" Z="1" label="입력타입" {...typeHook} />
					</div>
					<JDcheckBox {...shouldMulitplyDatePrice} label="가격에 날짜곱하기" />
					<JDcheckBox {...haslimit} label="수량제한" />
					{haslimit.checked && <InputText {...maxCountHook} label="최대수량" />}
				</div>
			)}

			<ModalEndSection>
				<JDbutton mode="flat" thema="primary" onClick={() => {
					handleCompleteBtn();
					modalHook.closeModal();
				}} label="완료" />
				{_id && (
					<JDbutton
						mode="flat"
						thema="error"
						onClick={() => {
							handleDelete(optionProduct);
							modalHook.closeModal();
						}}
						label="삭제"
					/>
				)}
				<JDbutton
					mode="flat"
					onClick={() => {
						modalHook.closeModal();
					}}
					thema="grey1"
					label="취소"
				/>
			</ModalEndSection>
		</JDmodal>
	);
};

export default EditProdctModal;
