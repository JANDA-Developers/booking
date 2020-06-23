import React, { useState } from 'react';
import { IUseModal, JDmodal, JDbutton, useModal, JDalign, autoComma } from '@janda-com/front';
import { OptionalItemUpsertInput } from '../../../types/api';
import { IRoomTypeOptional } from '../../../types/interface';
import EditProdctModal, { IEditProductInfo } from './EditOptionalProductModal';
import JDtypho from '../../../atoms/typho/Typho';

export interface IOptionModalInfo {
	defaultData: IRoomTypeOptional;
	handleSave: (param: OptionalItemUpsertInput) => void;
	//   handleDelete: TODO;
}

interface IProp {
	modalHook: IUseModal<IOptionModalInfo>;
}

export const OptionalProductModal: React.FC<IProp> = ({ modalHook }) => {
	const { info } = modalHook;
	if (!info) return <span />;
	const { handleSave, defaultData } = info;

	const [ data, setData ] = useState<OptionalItemUpsertInput>(defaultData);
	const eidtModalHook = useModal<IEditProductInfo>(false);

	function set<T extends keyof OptionalItemUpsertInput>(key: T, value: OptionalItemUpsertInput[T]) {
		data[key] = value;
		setData({ ...data });
	}

	// @ts-ignore
	const data2 = data;
	const data3 = data2 as Array<OptionalItemUpsertInput>;

	data.label;
	data.price;
	data.type;

	return (
		<JDmodal {...modalHook}>
			{/* list */}
			{data3.map((d) => (
				<JDalign key={d._id + 'optionList'}>
					<JDtypho>{d.label}</JDtypho>
					<JDtypho>{autoComma(d.price || 0)}</JDtypho>
					<JDbutton
						onClick={() => {
							eidtModalHook.openModal();
						}}
						mode="border"
						label="수정하기"
					/>
				</JDalign>
			))}
			<JDbutton label="항목추가" />
			{/* Add Modal */}
			<EditProdctModal handleComplete={(prop) => {}} modalHook={eidtModalHook} />
		</JDmodal>
	);
};
