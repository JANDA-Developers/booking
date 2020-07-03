import React from 'react';
import ResvModule from '@janda-com/resv-module';
import { RouteComponentProps } from 'react-router-dom';
// import "@janda-com/resv-module/dist/rc_index.css"
import PageHeader from '../../../components/pageHeader/PageHeader';
import PageBody from '../../../components/pageBody/PageBody';
import JDcolorPicker from '../../../atoms/colorPicker/ColorPicker';
import { useColorPicker, useModal } from '../../../hooks/hook';
import JDIcon from '../../../atoms/icons/Icons';
import './Reservation2.scss';
import { JDmodal, JDlabel, JDbutton } from '@janda-com/front';
import $ from 'jquery';

interface ICheckParams {
	houseKey: string;
	ishost: string;
}

interface IProp extends RouteComponentProps<ICheckParams> {}

export const Reservation2: React.FC<IProp> = ({ match }) => {
	const { params } = match;
	const { houseKey, ishost } = params;
	const colorPickerHook = useColorPicker('#999999');
	const customModalHook = useModal();
	localStorage.setItem('hk', houseKey);

	const handleSaveCustom = () => {};

	const themProvider = document.getElementsByClassName('themeProvider').item(0) as HTMLElement;

	if (themProvider) {
		themProvider.style.setProperty('--primary-color-dark', colorPickerHook.color);
		themProvider.style.setProperty('--primary-color', colorPickerHook.color);
	}

	if (ishost) {
		return (
			<div id="RESV2" className="reservation2">
				<PageHeader title={'JD 예약페이지 2.0'} desc={'해당 예약페이지를 홈페이지에 부착 할수 있습니다.'} />
				<PageBody>
					<div className="reservation2__wrap">
						<ResvModule publickey={houseKey} />
					</div>
				</PageBody>
				<JDmodal
					foot={
						<div>
							<JDbutton mode="flat" onClick={handleSaveCustom} thema="primary" label="저장" />
							<JDbutton mode="flat" onClick={customModalHook.closeModal} label="닫기" />
						</div>
					}
					visibleOverflow
					head={{
						title: '예약페이지 커스텀'
					}}
					{...customModalHook}
				>
					<div>
						<div>
							<JDlabel component="div" txt="대표색상" />
						</div>
						<JDcolorPicker colorHook={colorPickerHook} />
					</div>
				</JDmodal>
				<div
					onClick={() => {
						customModalHook.openModal();
					}}
					className="reservation2__config"
				>
					<JDIcon size="large" icon="paint" />
				</div>
			</div>
		);
	}

	return <ResvModule publickey={houseKey} />;
};

export default Reservation2;
