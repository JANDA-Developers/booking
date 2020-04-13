import React from 'react';
import { IContext } from '../../pages/bookingHost/BookingHostRouter';
import { IUseModal, LANG } from '../../hooks/hook';
import { useMutation } from '@apollo/react-hooks';
import { FIND_MY_EMAIL } from '../../apollo/queries';
import { findMyEmail, findMyEmailVariables } from '../../types/api';
import client from '../../apollo/apolloClient';
import { onCompletedMessage } from '../../utils/utils';
import FindEmailModal from './FindEmailModal';

interface Iprops {
	context: IContext;
	modalHook: IUseModal;
}

const FindEmailModalWrap: React.FC<Iprops> = ({ context, modalHook }) => {
	const [ findMyEmailMu, { loading: findMyEmailLoading } ] = useMutation<
		findMyEmail,
		findMyEmailVariables
	>(FIND_MY_EMAIL, {
		client,
		onCompleted: ({ FindMyEmail }) => {
			onCompletedMessage(FindMyEmail, LANG('email_sended'), LANG('email_sended_failed'));
		}
	});

	const callBackGetEmailBtn = (phoneNumber: string) => {
		findMyEmailMu({
			variables: {
				phoneNumber
			}
		});
		modalHook.closeModal();
	};

	return (
		<FindEmailModal
			context={context}
			modalHook={modalHook}
			muLoading={findMyEmailLoading}
			callBackGetEmailBtn={callBackGetEmailBtn}
		/>
	);
};

export default FindEmailModalWrap;
