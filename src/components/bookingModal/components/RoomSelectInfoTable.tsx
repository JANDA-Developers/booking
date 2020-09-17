import classNames from 'classnames';
import React from 'react';
import JDtable, { ReactTableDefault, JDcolumn } from '../../../atoms/table/Table';
import EerrorProtect from '../../../utils/errProtect';
import { PricingType } from '../../../types/enum';
import { LANG } from '../../../hooks/hook';
import { IRoomSelectInfo } from '../declaration';
import {
	OptionalItemSubmittedUpsertInput,
	RoomTypeOptionalItemSubmitInput,
	getHouse_GetHouse_house_roomTypes_optionalItems
} from '../../../types/api';
import InputText from '../../../atoms/forms/inputText/InputText';
import { ISet } from '@janda-com/front/build/types/interface';

interface IProps {
	className?: string;
	roomSelectInfo: IRoomSelectInfo[];
	optional?: RoomTypeOptionalItemSubmitInput[];
	setOption?: ISet<RoomTypeOptionalItemSubmitInput[]>;
}

const RoomSelectInfoTable: React.FC<IProps> = ({ className, roomSelectInfo, optional, setOption }) => {
	const classes = classNames('roomSelectInfoTable', className, {});

	const TableColumns: JDcolumn<IRoomSelectInfo>[] = [
		{
			Header: LANG('room'),
			accessor: 'roomTypeName',
			Cell: ({ original }) => <div>{original.roomTypeName}</div>
		},
		{
			Header: LANG('Headcount'),
			accessor: 'count',
			Cell: ({ value, original }) =>
				original.pricingType === PricingType.DOMITORY ? (
					<div>
						<span>{`${value.male}${LANG('male')} `}</span>
						<span>{`${value.female}${LANG('female')} `}</span>
					</div>
				) : (
					<div>
						<span>{`${value.roomCount}${LANG('person_unit')}`}</span>
					</div>
				)
		}
		// {
		// 	Header: LANG('option'),
		// 	accessor: 'options',
		// 	Cell: ({ value, original }) => {
		//     const val:getHouse_GetHouse_house_roomTypes_optionalItems[] | undefined = value;

		//     const targetOp = optional?.find(op => op.roomTypeId === original.roomTypeId)?.items;

		//     return val?.map(v => {

		//       let findedOp = targetOp?.find(op => {
		//         return op.itemId === v._id;
		//       })

		//       return <InputText label={v.label} value={findedOp?.count} OnChange={(v)=>{
		//         if(findedOp) {
		//           findedOp.count = v;
		//         } else {
		//           optional.push({
		//             items: ,
		//             roomTypeId: original.roomTypeId
		//           })
		//         }
		//         setOption([...optional])
		//       }} />
		//     })
		// 		)
		// }
	];

	return (
		<div className={classes}>
			<JDtable
				columns={TableColumns}
				{...ReactTableDefault}
				data={roomSelectInfo}
				minRows={1}
				noDataText={LANG('no_choosen_option')}
			/>
		</div>
	);
};

export default React.memo(RoomSelectInfoTable);
