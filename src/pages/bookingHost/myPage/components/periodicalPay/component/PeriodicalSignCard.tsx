import React from 'react';
import { IContext } from '../../../../BookingHostRouter';
import Vtable, { VtableColumn, VtableCell } from '../../../../../../atoms/vtable/Vtable';
import { LANG, useModal } from '../../../../../../hooks/hook';
import Button from '../../../../../../atoms/button/Button';
import { getMyProfile_GetMyProfile_user_paymentInfos } from '../../../../../../types/api';
import { DEFAULT_PAYMENT_INFO } from '../../../../../../types/defaults';
import './PeriodicalSignCard.scss';
import moment from 'moment';
import { card_space, autoComma, toNumber } from '../../../../../../utils/autoFormat';
import { DateFormat, WindowSize } from '../../../../../../types/enum';
import SelecterPayStatus from './SelecterPayStatus';
import reactWindowSize, { WindowSizeProps } from 'react-window-size';
import { ICardModalInfo } from '../../../../../../components/cardModal/declare';
import CardModalWrap from '../../../../../../components/cardModal/CardModalWrap';

interface Iprops {
	context: IContext;
}

const PeriodicalSignCard: React.FC<Iprops & WindowSizeProps> = ({ context, windowWidth }) => {
	const isPhabletDown = windowWidth < WindowSize.PHABLET;
	const cardModalHook = useModal<ICardModalInfo>(false);
	// 등록이 안되어있으면
	// 가격부분에 테스트사용중 이라고 적어놓자
	// 저기 적혀있는 달은 다음에 납부할 달이여야한다.
	// 예금(주)명은 없다. 따라서 상품타입명으로 변경한다.
	const { applyedProduct, user, house } = context;
	const { price, productType, name: productName, billKey, _id: productId, status: { isContinue } } = applyedProduct!;

	const { name } = productType;
	let { paymentInfos } = user;
	let paymentInfo: getMyProfile_GetMyProfile_user_paymentInfos = DEFAULT_PAYMENT_INFO;
	if (paymentInfos)
		paymentInfo = paymentInfos.find((patemntInfo) => patemntInfo.billKey === billKey) || DEFAULT_PAYMENT_INFO;
	const { authDate, cardName, cardNo, isLive } = paymentInfo;

	return (
		<div className="periodicalSignCard">
			{/* 헤더 */}
			<div className="periodicalSignCard__header">
				<span>{house.name}</span>
				<div>
					<div className=" periodicalSignCard__product">
						<span className="JDdisplay-none--wmd JDstandard-space periodicalSignCard__product-name">{name}</span>
						<Button
							cunsumPadding
							className="periodicalSignCard__productBtn"
							size="small"
							mode="flat"
							thema="primary"
							label={LANG('product_change')}
						/>
					</div>
				</div>
			</div>
			<div className="flex-grid--noMargin flex-grid periodicalSignCard__bodyWrap">
				<div className="flex-grid__col col--lg-12 col--full-4">
					<div className="periodicalSignCard__priceZone">
						<span>
							{moment(new Date()).format(`YYYY${LANG('year')} MM${LANG('month')} `)}
							{LANG('payment_fee')}
						</span>
						<h1 className="periodicalSignCard__price JDtextColor--point">{autoComma(toNumber(price || 0))}</h1>
					</div>
				</div>
				<div className="flex-grid__col col--lg-12 col--full-8">
					<div className="periodicalSignCard__infoTableWrap">
						<Vtable cellColumn={isPhabletDown} mode="unStyle">
							<VtableColumn>
								<VtableCell label={LANG('product_info')}>{productName}</VtableCell>
								<VtableCell label={LANG('current_status')}>
									<SelecterPayStatus context={context} isContinue={isContinue} productId={productId} />
								</VtableCell>
							</VtableColumn>
							<VtableColumn>
								<VtableCell label={LANG('method_of_payment')}>{billKey ? LANG('CARD') : LANG('un_registed')}</VtableCell>
								<VtableCell label={LANG('sign_date')}>{moment(authDate).format(DateFormat.YYMMDD)}</VtableCell>
							</VtableColumn>
							<VtableColumn>
								<VtableCell label={LANG('payment_information')}>
									{cardName}:{card_space(cardNo)}
								</VtableCell>
								<VtableCell label={''}>
									<Button
										id="CreaditCardChangeBtn"
										mode="border"
										onClick={() => {
											cardModalHook.openModal({
												mode: 'changePer',
												productIds: [ productId ]
											});
										}}
										label={LANG('creadit_card_change')}
									/>
								</VtableCell>
							</VtableColumn>
						</Vtable>
					</div>
				</div>
			</div>
			<CardModalWrap modalHook={cardModalHook} context={context} />
		</div>
	);
};

export default reactWindowSize(PeriodicalSignCard);
