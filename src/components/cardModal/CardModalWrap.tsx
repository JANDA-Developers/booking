import React from 'react';
import { getOperationName } from 'apollo-link';
import { GET_USER_INFO, REGISTE_BILLKEY, UN_REGISTER_BILLKEY, UPDATE_PRODUCT_BILL_INFO } from '../../apollo/queries';
import { useMutation } from '@apollo/react-hooks';
import {
	registerBillKey,
	registerBillKeyVariables,
	unregisterBillKey,
	unregisterBillKeyVariables,
	updateProductBillInfo,
	updateProductBillInfoVariables
} from '../../types/api';
import { onCompletedMessage } from '../../utils/utils';
import { LANG } from '../../hooks/hook';
import client from '../../apollo/apolloClient';
import { IContext } from '../../pages/bookingHost/BookingHostRouter';
import CardModal from './CardModal';
import { ICardModalPropShareWrap } from './declare';

interface IProps extends ICardModalPropShareWrap {
	context: IContext;
	createCallBack?: () => any;
	deleteCallBack?: () => any;
}

// 이곳에서 카드 등록 수정 삭제 모든 요청 발생
const CardModalWrap: React.FC<IProps> = ({ context, createCallBack, deleteCallBack, onSubmit, ...props }) => {
	const refetchQueries = [ getOperationName(GET_USER_INFO) || '' ];

	// 카드 등록
	const [ createBillMu, { loading: registerBillLoading } ] = useMutation<
		registerBillKey,
		registerBillKeyVariables
	>(REGISTE_BILLKEY, {
		client,
		refetchQueries,
		onCompleted: ({ RegisterBillKey }) => {
			onCompletedMessage(
				RegisterBillKey,
				LANG('card_regist_complete'),
				LANG('card_regist_complete_fail'),
				'RegisterBillKey'
			);
			if (RegisterBillKey.ok) createCallBack && createCallBack();
		}
	});

	const [ updateProductBillInfoMu ] = useMutation<
		updateProductBillInfo,
		updateProductBillInfoVariables
	>(UPDATE_PRODUCT_BILL_INFO, {
		client,
		onCompleted: ({ UpdateProductBillInfo }) => {
			onCompletedMessage(UpdateProductBillInfo, LANG('change_complited'), LANG('card_regist_complete_fail'));
		}
	});

	// 카드 삭제
	const [ unRegisterBillKeyMu, { loading: unRegisterBillLoading } ] = useMutation<
		unregisterBillKey,
		unregisterBillKeyVariables
	>(UN_REGISTER_BILLKEY, {
		client,
		refetchQueries,
		onCompleted: ({ UnregisterBillKey }) => {
			onCompletedMessage(UnregisterBillKey, LANG('card_delte_complete'), LANG('card_info_complete_fail'));
			if (UnregisterBillKey.ok) deleteCallBack && deleteCallBack();
		}
	});

	return (
		<CardModal
			createMu={createBillMu}
			deleteMu={unRegisterBillKeyMu}
			pChangeMu={updateProductBillInfoMu}
			context={context}
			{...props}
		/>
	);
};

export default CardModalWrap;
