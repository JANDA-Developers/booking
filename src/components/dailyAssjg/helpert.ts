import moment from 'moment';
import { getGuests_GetGuests_guests as IG, getGuests_GetBlocks_blocks as IB } from '../../types/api';
import { PricingType } from '../../types/enum';

export const dateFromTo = (checkIn: any, checkOut: any) =>
	moment(checkIn).format(`MM/DD`) + '~' + moment(checkOut).format(`MM/DD`);

export const checkIsFull = (pricingType: PricingType, itemLegnth: number, peopleMax: number) =>
	pricingType === PricingType.DOMITORY ? itemLegnth === peopleMax : itemLegnth > 1;

// 더블 어레이 리턴
export const getPlaceArray = (pricingType: PricingType, itemsInRoom: (IG | IB | null)[], peopleCountMax: number) => {
	// 아이템들이 들어갈 자리를 생성
	const places = new Array(pricingType === PricingType.DOMITORY ? peopleCountMax : 1).fill([ null ]);

	// 아이템들을 자리에 채워넣는 함수 줍니다. (이중배열)
	const putGuestInPlace = (item: any, bedIndex: number) => {
		let exisitPlace = places[bedIndex];
		if (!exisitPlace) return;
		places[bedIndex] = [ item, ...exisitPlace ].filter((item) => item !== null);
	};

	itemsInRoom.forEach((item) => {
		// @ts-ignore
		const bedIndex = item.bedIndex || 0;
		putGuestInPlace(item, bedIndex);
	});
	return places;
};
