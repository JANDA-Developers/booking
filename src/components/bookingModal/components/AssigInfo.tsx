import React from 'react';
import { IBookingModalContext } from '../declaration';
import Align from '../../../atoms/align/Align';
import JDtypho from '../../../atoms/typho/Typho';
import { LANG } from '../../../hooks/hook';
import RoomSelectInfoTable from './RoomSelectInfoTable';
import JDLabel from '../../../atoms/label/JDLabel';
import { Fragment } from 'react';
import RoomAssigedInfoTable from './RoomAssigedInfoTable';
import { getBookingForPublic_GetBookingForPublic_booking_optionalItemSubmitted_items } from '../../../types/api';
import { autoComma } from '../../../utils/utils';

interface IProps {
	responseStyle: any;
	bookingModalContext: IBookingModalContext;
}

const AssigInfo: React.FC<IProps> = ({ bookingModalContext, responseStyle }) => {
	const {
		roomSelectInfo,
		assigInfo,
		guests,
		setAssigInfo,
		mode,
		isDesktopUp,
    optional,
    bookingData,
		setOptional
  } = bookingModalContext;
  const {optionalItemSubmitted} = bookingData;

  const itemArray:getBookingForPublic_GetBookingForPublic_booking_optionalItemSubmitted_items[] = [];
  optionalItemSubmitted?.forEach(sub => {
    sub.items.forEach(item =>{
     itemArray.push(item);
  })}); 

  
	return (
		<Align {...responseStyle}>
			{isDesktopUp && <JDtypho mb="normal">{LANG('room_assig_info')}</JDtypho>}
			<JDLabel txt={LANG('people_and_room_info')} />
			<RoomSelectInfoTable setOption={setOptional} optional={optional} roomSelectInfo={roomSelectInfo} />
			{mode !== 'CREATE' && (
				<Fragment>
					<JDLabel txt={LANG('assig_info')} />
					<RoomAssigedInfoTable setAssigInfo={setAssigInfo} assigInfo={assigInfo} guestsData={guests || []} />
				</Fragment>
			)}

      <div>
        <JDtypho>options</JDtypho>
        {optional.map(op => {
        const target  = roomSelectInfo.find(rsi => rsi.roomTypeId === op.roomTypeId);
        return (
        <div key={op.roomTypeId + "Asassaas"}>
          {itemArray.map(ii => <div key={ii.itemId}>
            {ii.itemLabel +":"+ ii.count + "=" + autoComma(ii.price)}
          </div>
          )}
        </div>
        )
        }
        )
        }
        </div>
		</Align>
	);
};

export default AssigInfo;
