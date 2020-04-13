import React, { useEffect, useLayoutEffect, useMemo, useCallback } from 'react';
import './DailyAssig.scss';
import {
	getGuests_GetBlocks_blocks as IB,
	getGuests_GetGuests_guests as IG,
	getAllRoomType_GetAllRoomType_roomTypes_rooms as IR
} from '../../types/api';
import { useModal, IUseModal, LANG } from '../../hooks/hook';
import JDdayPicker from '../../atoms/dayPicker/DayPicker';
import BookingModalWrap from '../bookingModal/BookingModalWrap';
import ArrowDayByDay from '../../atoms/dayPicker/component/inputComponent/ArrowDayByDay';
import { IContext } from '../../pages/bookingHost/BookingHostRouter';
import { DragBoxPlace } from './components/DragBoxPlace';
import { DndProvider, DragObjectWithType } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import GuestTooltip from './components/GuestTooltip';
import { IDailyAssigProp, IChainProps } from './DailyAssigWrap';
import getDailyAssigUtils from '../../pages/bookingHost/assig/helper/dailyAssigUtils';
import { JDtoastModal } from '../../atoms/modal/Modal';
import { ReactTooltip } from '../../atoms/tooltipList/TooltipList';
import { FLOATING_PRELOADER_SIZE, IS_MOBILE } from '../../types/const';
import Tooltip from '../../atoms/tooltip/Tooltip';
import { isMobile } from 'is-mobile';
import { IDailyAssigDataControl } from '../../pages/bookingHost/assig/components/assigIntrerface';
import PlaceTooltip from './components/PlaceTooltip';
import moment from 'moment';
import BlockTooltip from './components/BlockTooltip';
import { isEmpty, s4 } from '../../utils/utils';
import ReadyItemTooltip from '../../pages/bookingHost/assig/components/tooltips/ReadyItemTooltip';
import DayPickerModal from '../dayPickerModal/DayPickerModal';
import { PortalPreloader } from '../../utils/portalElement';
import { to4YMMDD } from '../../utils/setMidNight';
import { checkIsFull, getPlaceArray } from './helpert';

export interface IDailyAssigContext extends IDailyAssigProp {
	confirmModalHook: IUseModal<any>;
	bookingModalHook: IUseModal<any>;
	handleDrop: (item: IG & DragObjectWithType, room: IR, place: number) => void;
}

interface IProps extends IChainProps {
	context: IContext;
	dailyAssigDataControl: IDailyAssigDataControl;
	outDailyAssigContext: IDailyAssigProp;
}

const DailyAssig: React.FC<IProps> = ({ context, outDailyAssigContext, dailyAssigDataControl, onRederCallBack }) => {
	const { house } = context;
	const {
		loading,
		dayPickerHook,
		roomTypesData,
		itemDatas,
		networkStatus,
		calendarPosition,
		roomTypeLoading
	} = outDailyAssigContext;
	const bookingModalHook = useModal(false);
	const confirmModalHook = useModal(false);
	const dayPickerModalHook = useModal(false);
	const { allocateMu, createBlockMu, totalMuLoading, deleteBlockMu } = dailyAssigDataControl;

	const handleDrop = (item: IG & DragObjectWithType, room: IR, place: number) => {
		allocateMu({
			variables: {
				guestId: item._id,
				allocateInfo: {
					bedIndex: place,
					roomId: room._id
				}
			}
		});
	};

	// 2차 Context
	const dailayAssigContext: IDailyAssigContext = Object.assign(outDailyAssigContext, {
		confirmModalHook,
		bookingModalHook,
		handleDrop
	});

	const dailyAssigUtils = getDailyAssigUtils(dailyAssigDataControl, dailayAssigContext);

	const { toogleCheckInOut, deleteBookingById } = dailyAssigUtils;

	const guestTooltipInfoBtnCallBack = (targetGuest: IG) => {
		ReactTooltip.hide();
		bookingModalHook.openModal({
			bookingId: targetGuest.booking._id
		});
	};

	const guestTooltipCheckInCallBack = (targetGuest: IG) => {
		ReactTooltip.hide();
		toogleCheckInOut(targetGuest);
	};

	const guestTooltipDeleteCallBack = (targetGuest: IG) => {
		ReactTooltip.hide();
		deleteBookingById(targetGuest.booking._id, true);
	};

	const blockTooltipDeleteCallBack = (targetBlock: IB) => {
		ReactTooltip.hide();
		deleteBlockMu({
			variables: {
				blockId: targetBlock._id
			}
		});
	};

	const DailyAssigDayPicker = useCallback(
		() => (
			<div key={'DailyAssigDayPicker'} className="dailyAssig__dayPicker">
				<JDdayPicker
					isRange={false}
					mode="input"
					label={LANG('calender_date')}
					{...dayPickerHook}
					className="JDwaves-effect JDoverflow-visible"
					inputComponent={(prop: any) => (
						<ArrowDayByDay
							{...prop}
							onClick={() => {
								dayPickerModalHook.openModal();
							}}
							format={`MM/DD`}
							dayPickerHook={dayPickerHook}
						/>
					)}
				/>
				<DayPickerModal isRange={false} modalHook={dayPickerModalHook} {...dayPickerHook} />
			</div>
		),
		[ dayPickerHook.from, dayPickerHook.to, dayPickerModalHook ]
	);

	useLayoutEffect(
		() => {
			if (loading === false && !isEmpty(dailayAssigContext.itemDatas)) {
				onRederCallBack && onRederCallBack();
			}
		},
		[ loading ]
	);

	const firstLoading = networkStatus === 1 || roomTypeLoading;
	const classes = `dailyAssigWrap ${firstLoading && 'dailyAssigWrap--loading'}`;

	if (firstLoading) {
		return <div className={classes} />;
	}

	return (
		<div onClick={() => {}} onClickCapture={() => {}} className={classes}>
			<div className="dailyAssig__dayPicker--center">{calendarPosition === 'center' && <DailyAssigDayPicker />}</div>
			<PortalPreloader noAnimation floating size={FLOATING_PRELOADER_SIZE} loading={networkStatus < 7 || totalMuLoading} />
			<DndProvider backend={isMobile() ? TouchBackend : HTML5Backend}>
				<div
					style={{
						display: networkStatus === 1 ? 'none' : undefined
					}}
					className="dailyAssig"
				>
					{roomTypesData.map((roomType, index) => {
						if (isEmpty(roomType.rooms)) return <span key={roomType._id + index + 'empty'} />;
						const dayPickerRenderCondition = index === 0 && calendarPosition === 'inside' && !IS_MOBILE;
						const { pricingType, peopleCountMax } = roomType;

						return (
							<div key={`roomType${roomType._id}`} className="dailyAssig__row">
								<div className="dailyAssig__roomTypeTittle">
									{dayPickerRenderCondition && (
										<span className="dailyAssig__dayPicker--leftTop">
											<DailyAssigDayPicker />
										</span>
									)}
									<div className="dailyAssig__roomTypeName">{roomType.name}</div>
								</div>
								<div className="dailyAssig__roomsWrap">
									{roomType.rooms.map((room) => {
										const itemsInRoom = itemDatas.filter((guest) => guest.room && guest.room._id === room._id);

										// 방이 가득찼는지
										const isFull = checkIsFull(pricingType, itemsInRoom.length, peopleCountMax);
										const places = getPlaceArray(pricingType, itemsInRoom, peopleCountMax);

										return (
											<div key={`room${room._id}`} className="dailyAssig__room">
												<div className="dailyAssig__roomTitle">{room.name}</div>
												{places.map((place, index) => (
													<DragBoxPlace
														isFull={isFull}
														key={room._id + index}
														itemsInPlace={place}
														onDrop={handleDrop}
														roomType={roomType}
														room={room}
														place={index}
													/>
												))}
											</div>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
			</DndProvider>
			<PlaceTooltip
				blockRoomBtnCallBack={(info) => {
					const infoJson = JSON.parse(info);
					createBlockMu({
						variables: {
							bedIndex: infoJson.place,
							checkIn: to4YMMDD(dayPickerHook.from),
							checkOut: to4YMMDD(moment(dayPickerHook.to!).add(1, 'day').toDate()),
							houseId: house._id,
							roomId: infoJson.roomId
						}
					});
				}}
			/>
			<GuestTooltip
				dailyAssigUtils={dailyAssigUtils}
				dailyAssigDataControl={dailyAssigDataControl}
				dailayAssigContext={dailayAssigContext}
				context={context}
				checkInBtnCallBack={guestTooltipCheckInCallBack}
				deleteBtnCallBack={guestTooltipDeleteCallBack}
				infoBtnCallBack={guestTooltipInfoBtnCallBack}
			/>
			<BlockTooltip
				dailyAssigUtils={dailyAssigUtils}
				dailyAssigDataControl={dailyAssigDataControl}
				dailayAssigContext={dailayAssigContext}
				context={context}
				deleteBtnCallBack={blockTooltipDeleteCallBack}
			/>
			<ReadyItemTooltip />
			<Tooltip id="guestCheckInOutToolTip" type="dark" effect="solid" />
			<JDtoastModal confirm {...confirmModalHook} />
			<BookingModalWrap context={context} modalHook={bookingModalHook} />
		</div>
	);
};

export default DailyAssig;
