import React from 'react';
import JDIcon from '../icons/Icons';
import { IconConifgProps } from '../icons/declation';
import Button, { IButtonProps } from '../button/Button';
import { LANG } from '../../hooks/hook';
import { JDatomExtentionSet } from '../../types/interface';
import { JDatomClasses } from '@janda-com/front';
import classNames from 'classnames';

interface Iprops extends IconConifgProps, JDatomExtentionSet {
	open: boolean;
	onClick: (e: any) => void;
	label?: string;
	mode?: 'icon' | 'button';
	buttonModeProps?: IButtonProps;
}

const Drawer: React.FC<Iprops> = ({ open, onClick, mode = 'icon', label, buttonModeProps, ...props }) => {
	const classes = classNames('', undefined, {
		...JDatomClasses(props)
	});

	const icon = open ? 'vUp' : 'vDown';
	if (mode === 'icon') {
		return <JDIcon className={classes} label={label} onClick={onClick} hover {...props} icon={icon} />;
	} else {
		return (
			<Button
				mode="flat"
				onClick={onClick}
				size="tiny"
				thema="black"
				label={label || LANG('show_detail')}
				icon={icon}
				className={classes}
				{...buttonModeProps}
			/>
		);
	}
};

export default Drawer;
