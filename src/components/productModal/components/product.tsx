import React from 'react';
import JDlist from '../../../atoms/list/List';
import { LANG } from '../../../hooks/hook';
import { TElements } from '@janda-com/front/build/types/interface';

export interface IjandaProduct {
	name: string;
	describes: TElements[];
	price: number;
	subTitle: TElements;
}

export const getProducts = (): IjandaProduct[] => [
	// {
	// 	name: '잔다33',
	// 	describes: LANG('janda33'),
	// 	price: 33000,
	// 	subTitle: (
	// 		<div>
	// 			공간예약 솔루션 '타임스페이스' <br />정기결제권
	// 		</div>
	// 	)
	// },
	{
		name: '잔다55',
		describes: LANG('janda55'),
		price: 55000,
		subTitle: (
			<div>
				중소숙박에 적합한 이용권 <br />객실수 20개 미만
			</div>
		)
	},
	{
		name: '잔다110',
		describes: LANG('janda110'),
		price: 110000,
		subTitle: (
			<div>
				큰 규모 숙박 및 호텔에 적합한 이용권 <br />객실수 20개 이상
			</div>
		)
	}
	// {
	// 	name: '잔다골드',
	// 	describes: LANG('jandaGold'),
	// 	price: 0,
	// 	subTitle: (
	// 		<div>
	// 			모든 기능 사용을 원하거나 <br />맞춤설계 맞춤디자인이 필요한 경우
	// 		</div>
	// 	)
	// }
];
