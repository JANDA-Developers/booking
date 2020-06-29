import React from 'react';
import EerrorProtect from '../../../../utils/errProtect';
import { updateHouseConfig, UpdateHouseConfigParams } from '../../../../types/api';
import { IContext } from '../../../bookingHost/BookingHostRouter';
import { FetchResult } from 'apollo-link';

export interface IAddtionProp {
	updateFn: (
		param: UpdateHouseConfigParams
	) => Promise<void | FetchResult<updateHouseConfig, Record<string, any>, Record<string, any>>>;
	context: IContext;
}

export interface IAddition {
	name: string;
	updateAt: string;
	description: string;
	detailDescription: (prop: IAddtionProp) => any;
}

interface IProps {
	addtionInfo: IAddition;
	setAdditionIndex: React.Dispatch<React.SetStateAction<number | null>>;
	index: number;
}

const ConfigBlock: React.FC<IProps> = ({ addtionInfo, setAdditionIndex, index }) => (
	<div
		onClick={() => {
			setAdditionIndex(index);
		}}
		className="configBlock"
	>
		<h6 className="configBlock__title">{addtionInfo.name}</h6>
		<span className="configBlock__descrition">{addtionInfo.description}</span>
		<span className="configBlock__updateAt">{addtionInfo.updateAt}</span>
	</div>
);

export default EerrorProtect(ConfigBlock);
