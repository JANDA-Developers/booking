import { IUseModal } from '../../hooks/hook';
import { getMyProfile_GetMyProfile_user_paymentInfos } from '../../types/api';

export type TCard = getMyProfile_GetMyProfile_user_paymentInfos;
export type Tmode = 'onlyGet' | 'all' | 'modify' | 'changePer';
export type TCardRegistInfo = {
	cardNo: string;
	cardPw: string;
	expMonth: string;
	expYear: string;
	idNo: string;
};

export interface CardViewerConfigProp {
	unPadding?: boolean;
	mode?: Tmode;
	onSubmit?: (cardInfo: TCard) => any;
}

export interface ICardModalPropShareWrap extends CardViewerConfigProp {
	modalHook: IUseModal<ICardModalInfo>;
}

export interface ICardModalInfo extends CardViewerConfigProp {
	productIds?: string[];
}
