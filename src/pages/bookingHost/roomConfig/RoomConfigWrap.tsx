/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment, useMemo } from 'react';
import {
	getAllRoomType,
	getAllRoomTypeVariables,
	saveRoomTypes,
	saveRoomTypesVariables,
	changeRoomTypeTags,
	changeRoomTypeTagsVariables,
	TagInput,
	upsertRoomTypeOptionalItem,
	upsertRoomTypeOptionalItemVariables,
	OptionalItemUpsertInput
} from '../../../types/api';
import {
	GET_ALL_ROOMTYPES,
	SAVE_ROOMTYPES,
	CHANGE_ROOM_TYPE_TAGS,
	USERT_ROOM_TYPE_OPTIONAL_ITEM
} from '../../../apollo/queries';
import { ErrProtecter, queryDataFormater, onCompletedMessage, s4 } from '../../../utils/utils';
import { IContext } from '../../bookingHost/BookingHostRouter';
import client from '../../../apollo/apolloClient';
import RoomConfig from './RoomConfig';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { RoomConfigSubmitData } from '../../../components/bookingModal/declaration';
import Preloader from '../../../atoms/preloader/Preloader';
import { getOperationName } from 'apollo-utilities';
import { LANG } from '../../../hooks/hook';

interface IProps {
	context: IContext;
}

let LastKey = '';

export type TChangeTags = (roomTypeId: string, upsertTags: TagInput[], removeKeys: string[]) => void;
export type THandleChangeOptionalProduct = (
	roomTypeId: string,
	params: OptionalItemUpsertInput[],
	deletes?: string[] | undefined
) => void;

const RoomConfigWrap: React.FC<IProps> = ({ context }) => {
	const { house } = context;
	const { data: roomData, loading } = useQuery<getAllRoomType, getAllRoomTypeVariables>(GET_ALL_ROOMTYPES, {
		client,
		notifyOnNetworkStatusChange: true,
		fetchPolicy: 'network-only',
		variables: { houseId: house._id }
	});

	const refetchQueries = [ getOperationName(GET_ALL_ROOMTYPES) || '' ];

	const [ changeRoomTypeTagsMu, { loading: changeRoomTypeTagsLoading } ] = useMutation<
		changeRoomTypeTags,
		changeRoomTypeTagsVariables
	>(CHANGE_ROOM_TYPE_TAGS, {
		client,
		notifyOnNetworkStatusChange: true,
		refetchQueries,
		awaitRefetchQueries: true
	});

	const [ upsertRoomTypeOptionsMu, { loading: upsertRoomTypeOptionLoading } ] = useMutation<
		upsertRoomTypeOptionalItem,
		upsertRoomTypeOptionalItemVariables
	>(USERT_ROOM_TYPE_OPTIONAL_ITEM, {
		client,
		notifyOnNetworkStatusChange: true,
		refetchQueries,
		awaitRefetchQueries: true,
		onCompleted: ({ UpsertRoomTypeOptionalItem }) => {
			onCompletedMessage(UpsertRoomTypeOptionalItem, LANG('change_complited'), LANG('change_failed'));
		}
	});

	const [ saveRoomsMu, { loading: saveRoomsLoading } ] = useMutation<
		saveRoomTypes,
		saveRoomTypesVariables
	>(SAVE_ROOMTYPES, {
		client,
		notifyOnNetworkStatusChange: true,
		refetchQueries,
		awaitRefetchQueries: true,
		onCompleted: ({ SaveRoomTypes }) => {
			onCompletedMessage(SaveRoomTypes, LANG('save_room_done'), LANG('save_room_failed'));

			if (SaveRoomTypes.ok) {
				sessionStorage.clear();
			}
		}
	});

	const roomTypesData = queryDataFormater(roomData, 'GetAllRoomType', 'roomTypes', []) || [];

	const handleChangTags: TChangeTags = (roomTypeId: string, upsertTags: TagInput[], removeKeys: string[]) => {
		changeRoomTypeTagsMu({
			variables: {
				upsertTags,
				removeKeys,
				roomTypeId
			}
		});
	};

	const handleSubmit = (data: RoomConfigSubmitData) => {
		const upsertDatas = [ ...data.updateCreateDatas ];

		upsertDatas.forEach((ud) => {
			// @ts-ignore
			delete ud['uploadImg'];
		});

		console.log('upsertDatas');
		console.log(upsertDatas);

		saveRoomsMu({
			variables: {
				param: {
					houseId: house._id,
					deletes: data.deleteIds,
					upserts: upsertDatas
				}
			}
		});
	};

	const innerKey = useMemo(
		() => {
			const key = s4();
			LastKey = key;
			if (loading) return LastKey;
			return key;
		},
		[ loading ]
	);

	const handleOptionalProduct = (roomTypeId: string, params: OptionalItemUpsertInput[], deletes?: string[]) => {
		upsertRoomTypeOptionsMu({
			variables: {
				upserts: params,
				deletes: deletes,
				roomTypeId
			}
		});
	};

	return (
		<Fragment>
			<RoomConfig
				onSubmit={handleSubmit}
				context={context}
				loading={loading}
				handleChangTags={handleChangTags}
				saveRoomsLoading={saveRoomsLoading}
				defaultData={{
					defaultAddTemp: undefined,
					roomTypesData
				}}
				upsertRoomTypeOptionLoading={upsertRoomTypeOptionLoading}
				handleOptionalProduct={handleOptionalProduct}
				key={innerKey}
			/>
			<Preloader floating loading={saveRoomsLoading} />
		</Fragment>
	);
};

export default ErrProtecter(RoomConfigWrap);
