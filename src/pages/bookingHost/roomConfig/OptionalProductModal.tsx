import React, { useState } from 'react';
import { IUseModal, JDmodal, JDbutton, useModal, JDalign, autoComma, JDtypho, JDmodalConfigProps } from '@janda-com/front';
import { OptionalItemUpsertInput } from '../../../types/api';
import { IRoomTypeOptional } from '../../../types/interface';
import EditProdctModal, { IEditProductInfo } from './EditOptionalProductModal';
import _, { isEmpty } from 'lodash';
import { THandleChangeOptionalProduct } from './RoomConfigWrap';
import ModalEndSection from '../../../atoms/modal/components/ModalEndSection';
import { DEFAULT_OPTION_ITEM } from '../../../types/defaults';
import "./OptionalProductModal.scss";


export interface IOptionModalInfo {
	defaultData: IRoomTypeOptional[];
	handleSave: THandleChangeOptionalProduct;
	roomTypeId: string;
}

interface IProp extends JDmodalConfigProps{
	modalHook: IUseModal<IOptionModalInfo>;
}

export const OptionalProductModal: React.FC<IProp> = ({ modalHook,...props }) => {
	const { info } = modalHook;
	if (!info) return <span />;
	if(!modalHook.info?.defaultData) return <div/> 
	const { handleSave, defaultData, roomTypeId } = info;

	const [ data, setData ] = useState<OptionalItemUpsertInput[]>(defaultData);
	const [ deleteIds, setDeletes ] = useState<string[]>([]);
	const eidtModalHook = useModal<IEditProductInfo>(false);

	return (
		<JDmodal
			{...props}
			className="optionalProductModal"
			head={{
				element: <div>
						<JDtypho mb="small" size="h6">
							추가상품 설정하기
						</JDtypho>
						<JDtypho size="small">
							해당 모달을 통해서 부가적인 상품을 판매할 수 있습니다. <br/> 
							조식, 추가인원, 파티인원 등을 별도 판매합니다.
						</JDtypho>
					</div>
			}}
			{...modalHook}
		>
			<JDbutton
				iconProp={{
					icon:"addCircle"
				}}
				onClick={() => {
					eidtModalHook.openModal({
						optionProduct: DEFAULT_OPTION_ITEM
					});
				}}
				mode="flat"
				thema="primary"
				label="항목추가"
			/>
			{/* list */}
			{isEmpty(data) && <JDtypho mb="normal" size="h6" color="grey2">추가된 상품이 없습니다.</JDtypho>}
			{isEmpty(data) || <div className="optionalProductModal__options">
			{data.map((d) => (
				<JDalign 
					className="optionalProductModal__option"
					flex={{
						between:true,
						vCenter:true
					}} key={d._id + 'optionList'}>
					<JDtypho mb="no" mr="largest" weight={600}>{d.label}</JDtypho>
					<JDtypho mr="largest">{autoComma(d.price || 0)}</JDtypho>
					<JDbutton
						mr="no"
						mb="no"
						size="small"
						onClick={() => {
							eidtModalHook.openModal({
								optionProduct: d
							});
						}}
						mode="border"
						label="수정하기"
					/>
				</JDalign>
			))}
			</div>
			}
			{/* Add Modal */}
			<EditProdctModal
				handleDelete={({ _id }) => {
					setData(data.filter((d) => d._id !== _id));
					setDeletes([ ...deleteIds, _id || '' ]);
				}}
				handleComplete={(prop) => {
					let targetData = data.find((d) => d._id && d._id === prop._id);

					if (targetData) targetData = prop 
					else data.push(prop);

					setData([ ...data ]);
				}}
				modalHook={eidtModalHook}
			/>
			<ModalEndSection>
					<JDbutton
						onClick={() => {
							handleSave(roomTypeId, data, deleteIds);
						}}
						thema="primary"
						mode="flat"
						label="확인"
					/>
					<JDbutton
						onClick={() => {
							modalHook.closeModal();
						}}
						thema="grey1"
						mode="flat"
						label="닫기"
					/>
				</ModalEndSection>
		</JDmodal>
	);
};

export default OptionalProductModal;
