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
import { inOr } from '../../../utils/C';


export interface IOptionModalInfo {
	defaultData: IRoomTypeOptional[];
	handleSave: THandleChangeOptionalProduct;
	roomTypeId: string;
}

interface IProp extends JDmodalConfigProps {
	modalHook: IUseModal<IOptionModalInfo>;
}

export const OptionalProductModal: React.FC<IProp> = ({ modalHook, ...props }) => {
	const { info } = modalHook;
	if (!info) return <span />;
	if (!modalHook.info?.defaultData) return <div />
	const { handleSave, defaultData, roomTypeId } = info;
	const [data, setData] = useState<OptionalItemUpsertInput[]>(defaultData);
	const [deleteIds, setDeletes] = useState<string[]>([]);
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
						해당 모달을 통해서 부가적인 상품을 판매할 수 있습니다. <br />
							조식, 추가인원, 파티인원 등을 별도 판매합니다.
						</JDtypho>
				</div>
			}}
			{...modalHook}
			key={info.roomTypeId + "optionalProductModal"}
		>
			<JDbutton
				iconProp={{
					icon: "addCircle"
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
							between: true,
							vCenter: true
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
					setDeletes([...deleteIds, _id || '']);
				}}
				handleComplete={(prop) => {
					let targetIndex = data.findIndex((d) => d._id && d._id === prop._id);

					console.log("DEBUGG::");
					console.log(targetIndex);
					console.log(prop);

					if (targetIndex !== -1) data[targetIndex] = prop
					else data.push(prop);


					setData([...data]);
				}}
				modalHook={eidtModalHook}
			/>
			<ModalEndSection>
				<JDbutton
					onClick={() => {
						const formatedData = data.map((data): OptionalItemUpsertInput => {
							const { _id, label, maxCount, multiplyDate, optionalItems, price, type } = data;

							return ({
								_id: _id,
								label: label,
								maxCount: maxCount || undefined,
								multiplyDate: multiplyDate,
								optionalItems: optionalItems?.map(item => ({
									_id: item._id,
									label: item.label,
									maxCount: item.maxCount,
									multiplyDate: item.multiplyDate,
									price: item.price,
									type: item.type
								})),
								price: price,
								type: type
							})
						})
						handleSave(roomTypeId, formatedData, deleteIds);
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
