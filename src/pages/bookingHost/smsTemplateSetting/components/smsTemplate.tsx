import React, { useState, Fragment } from 'react';
import JDLabel from '../../../../atoms/label/JDLabel';
import JDselect, { SelectBoxSize } from '../../../../atoms/forms/selectBox/SelectBox';
import { SendTarget, AutoSendWhen } from '../../../../types/enum';
import { AUTO_SEND_OP, SMS_TARGET_OP, SmsReplaceKeyEnumKeys } from '../../../../types/const';
import { useSelect, useSwitch, LANG } from '../../../../hooks/hook';
import InputText from '../../../../atoms/forms/inputText/InputText';
import Switch from '../../../../atoms/forms/switch/Switch';
import Button from '../../../../atoms/button/Button';
import { ErrProtecter, smsMessageFormatter } from '../../../../utils/utils';
import {
	getSmsInfo_GetSmsInfo_smsInfo_smsTemplates,
	updateSmsTemplate,
	updateSmsTemplateVariables,
	deleteSmsTemplate,
	deleteSmsTemplateVariables,
	createSmsTemplate,
	createSmsTemplateVariables,
	getSmsInfo_GetSmsInfo_smsInfo
} from '../../../../types/api';
import { MutationFn } from 'react-apollo';
import { smsMsgParser } from '../../../../utils/smsUtils';

interface IProps {
	templateData: getSmsInfo_GetSmsInfo_smsInfo_smsTemplates;
	smsTemplateMutationes: {
		updateSmsTemplateMu: MutationFn<updateSmsTemplate, updateSmsTemplateVariables>;
		deleteSmsTemplateMu: MutationFn<deleteSmsTemplate, deleteSmsTemplateVariables>;
		createSmsTemplateMu: MutationFn<createSmsTemplate, createSmsTemplateVariables>;
	};
	houseId: string;
	templateTitle: string;
	smsInfo: getSmsInfo_GetSmsInfo_smsInfo;
}

const SmsTemplate: React.SFC<IProps> = ({ templateData, smsTemplateMutationes, templateTitle, houseId, smsInfo }) => {
	const [ messageValue, setMessage ] = useState(smsMsgParser(templateData.smsFormat, LANG('SmsReplaceKey')));
	const enableHook = useSwitch(templateData.smsSendCase ? templateData.smsSendCase.enable : false);
	const autoSendHook = useSelect<AutoSendWhen | null>({
		value: templateData.smsSendCase ? templateData.smsSendCase.when : null,
		label: templateData.smsSendCase ? LANG(templateData.smsSendCase.when) : LANG('dont_send')
	});
	const sendTargetHook = useSelect<SendTarget | null>({
		value: templateData.smsSendCase ? templateData.smsSendCase.who : null,
		label: templateData.smsSendCase ? LANG(templateData.smsSendCase.who) : LANG('dont_send')
	});

	const AutoSendWhenTemp =
		sendTargetHook.selectedOption &&
		sendTargetHook.selectedOption.value &&
		autoSendHook.selectedOption &&
		autoSendHook.selectedOption.value
			? {
					enable: enableHook.checked,
					when: autoSendHook.selectedOption.value!,
					who: sendTargetHook.selectedOption.value!
				}
			: null;

	const tempTemplateVariables = {
		houseId: houseId,
		params: {
			formatName: templateTitle,
			smsFormat: smsMessageFormatter(messageValue),
			smsSendCase: AutoSendWhenTemp
		}
	};

	const hanldeTemplateBtnClick = (label: string) => {
		setMessage(`${messageValue} ${label}`);
	};

	const handleDeleteBtnClick = () => {
		smsTemplateMutationes.deleteSmsTemplateMu({
			variables: {
				smsInfoId: smsInfo._id,
				smsTemplateId: templateData._id
			}
		});
	};

	const handleUpdateBtnClick = () => {
		smsTemplateMutationes.updateSmsTemplateMu({
			variables: {
				...tempTemplateVariables,
				smsTemplateId: templateData._id
			}
		});
	};

	const tempArr = SmsReplaceKeyEnumKeys;

	return (
		<Fragment>
			<InputText value={messageValue} onChange={setMessage} label={LANG('msg')} textarea doubleHeight />
			<div>
				<div>
					<JDLabel txt={LANG('template_msg')} />
				</div>
				{tempArr.map((value: any) => (
					<Button
						mode="flat"
						onClick={() => {
							hanldeTemplateBtnClick(LANG(value));
						}}
						key={`templateBtn${templateData._id}${value}`}
						label={LANG(value).replace('[', '').replace(']', '')}
					/>
				))}
			</div>
			<div className="JDz-index-1 flex-grid flex-grid--start">
				{/* props 로부터 받아서 쓸거임. onChange시에는 뮤테이션을 날리겠지. */}
				<JDselect size={SelectBoxSize.FIVE} options={AUTO_SEND_OP} {...autoSendHook} label={LANG('auto_send')} />
				<JDselect
					size={SelectBoxSize.FOUR}
					options={SMS_TARGET_OP}
					{...sendTargetHook}
					label={LANG('outgoing_destination')}
				/>
				<Switch {...enableHook} label={LANG('auto_send_enable')} />
			</div>
			<div>
				{/* <Button onClick={handleCreateBtnClick} thema="primary" label="추가" /> */}
				<Button onClick={handleUpdateBtnClick} thema="primary" label={LANG('modify')} />
				<Button onClick={handleDeleteBtnClick} thema="error" label={LANG('delete')} />
			</div>
		</Fragment>
	);
};

export default ErrProtecter(SmsTemplate);
