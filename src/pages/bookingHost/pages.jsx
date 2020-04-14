import React, { Fragment } from 'react';
import DynamicImport from '../../utils/dynamicComponent';

export const SmsInfo = (props) => (
	<DynamicImport load={() => import('./smsInfo/SmsInfo')}>
		{(DNcompoent) => (DNcompoent === null ? <Fragment /> : <DNcompoent {...props} />)}
	</DynamicImport>
);

export const Expired = (props) => (
	<DynamicImport load={() => import('./expire/Expired')}>
		{(DNcompoent) => (DNcompoent === null ? <Fragment /> : <DNcompoent {...props} />)}
	</DynamicImport>
);

export const SmsTemplateSetting = (props) => (
	<DynamicImport load={() => import('./smsTemplateSetting/SmsTemplateSettingWrap')}>
		{(DNcompoent) => (DNcompoent === null ? <Fragment /> : <DNcompoent {...props} />)}
	</DynamicImport>
);

export const DashBoard = (props) => (
	<DynamicImport load={() => import('./dashboard/DashBoardWrap')}>
		{(DNcompoent) => (DNcompoent === null ? <Fragment page loading={true} /> : <DNcompoent {...props} />)}
	</DynamicImport>
);

export const HMconfig = (props) => (
	<DynamicImport load={() => import('./HMconfig/HMconfigWrap.tsx')}>
		{(DNcompoent) => (DNcompoent === null ? <Fragment page loading={true} /> : <DNcompoent {...props} />)}
	</DynamicImport>
);

export const ResvList = (props) => (
	<DynamicImport load={() => import('./resvList/ResvListWrap')}>
		{(DNcompoent) => (DNcompoent === null ? <Fragment /> : <DNcompoent {...props} />)}
	</DynamicImport>
);

export const Qna = (props) => (
	<DynamicImport load={() => import('./qna/Qna')}>
		{(DNcompoent) => (DNcompoent === null ? <Fragment /> : <DNcompoent {...props} />)}
	</DynamicImport>
);

export const Statistic = (props) => (
	<DynamicImport load={() => import('./statistic/StatisticWrap')}>
		{(DNcompoent) => (DNcompoent === null ? <Fragment /> : <DNcompoent {...props} />)}
	</DynamicImport>
);

export const SmsHistory = (props) => (
	<DynamicImport load={() => import('./smsHistory/SmsHistoryWrap')}>
		{(DNcompoent) => (DNcompoent === null ? <Fragment /> : <DNcompoent {...props} />)}
	</DynamicImport>
);

export const SetPrice = (props) => (
	<DynamicImport load={() => import('./setPrice/SetPriceWrap')}>
		{(DNcompoent) => (DNcompoent === null ? <Fragment /> : <DNcompoent {...props} />)}
	</DynamicImport>
);

export const ConfigWrap = (props) => (
	<DynamicImport load={() => import('./config/ConfigWrap')}>
		{(DNcompoent) => (DNcompoent === null ? <Fragment /> : <DNcompoent {...props} />)}
	</DynamicImport>
);

export const SuperMain = (props) => (
	<DynamicImport load={() => import('./super/superAdminRouter')}>
		{(DNcompoent) => (DNcompoent === null ? <Fragment /> : <DNcompoent {...props} />)}
	</DynamicImport>
);

export const CreateHouse = (props) => (
	<DynamicImport load={() => import('./createHouse/CreateHouseWrap')}>
		{(DNcompoent) => (DNcompoent === null ? <Fragment /> : <DNcompoent {...props} />)}
	</DynamicImport>
);

export const MyPage = (props) => (
	<DynamicImport load={() => import('./myPage/MyPageWrap')}>
		{(DNcompoent) => (DNcompoent === null ? <Fragment /> : <DNcompoent {...props} />)}
	</DynamicImport>
);

export const SignUp = (props) => (
	<DynamicImport load={() => import('./signUp/SignUp')}>
		{(DNcompoent) => (DNcompoent === null ? <Fragment /> : <DNcompoent {...props} />)}
	</DynamicImport>
);

export const Login = (props) => (
	<DynamicImport load={() => import('./Login/Login')}>
		{(DNcompoent) => (DNcompoent === null ? <Fragment /> : <DNcompoent {...props} />)}
	</DynamicImport>
);

export const AssigTimeline = (props) => (
	<DynamicImport load={() => import('./assig/AssigTimelineWrap')}>
		{(DNcompoent) => (DNcompoent === null ? <Fragment /> : <DNcompoent {...props} />)}
	</DynamicImport>
);

export const RoomConfig = (props) => (
	<DynamicImport load={() => import('./roomConfig/RoomConfigWrap')}>
		{(DNcompoent) => (DNcompoent === null ? <Fragment /> : <DNcompoent {...props} />)}
	</DynamicImport>
);

export const DailyPrice = (props) => (
	<DynamicImport load={() => import('./dailyPrice/DailyPriceWrap')}>
		{(DNcompoent) => (DNcompoent === null ? <Fragment /> : <DNcompoent {...props} />)}
	</DynamicImport>
);

export const HouseConfig = (props) => (
	<DynamicImport load={() => import('./houseConfig/HouseConfigWrap')}>
		{(DNcompoent) => (DNcompoent === null ? <Fragment /> : <DNcompoent {...props} />)}
	</DynamicImport>
);

export const HomepageRequest = (props) => (
	<DynamicImport load={() => import('./homepageRequest/HomepageRequestWrap')}>
		{(DNcompoent) => (DNcompoent === null ? <Fragment /> : <DNcompoent {...props} />)}
	</DynamicImport>
);
