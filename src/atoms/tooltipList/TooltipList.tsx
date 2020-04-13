import OutReactTooltip from 'react-tooltip';
import $ from 'jquery';
import React, { useEffect, useRef, Fragment, useState } from 'react';
import classNames from 'classnames';
import ErrProtecter from '../../utils/errProtect';
import './TooltipList.scss';
import { IIcons } from '../icons/declation';
import Button, { IButtonProps } from '../button/Button';
import { TElements } from '../../types/interface';
import JDtypho from '../typho/Typho';
import isMobile from 'is-mobile';
import { s4 } from '@janda-com/front/build/utils/utils';

export interface TButtonProp extends IButtonProps {
	label: string;
	onClick?: (e: any) => any;
	icon?: IIcons;
	cond?: boolean;
}

interface TooltipButtonsProps {
	Buttons: TButtonProp[];
	key?: string;
	head?: {
		title?: string;
		onlyMobile?: boolean;
		element?: TElements;
	};
}

export const TooltipButtons: React.FC<TooltipButtonsProps> = ({ Buttons, head, key = '' }) => {
	return (
		<div>
			{head && (
				<div className={`tooltipList__head ${head.onlyMobile && 'tooltipList__head--onlyMobile'}`}>
					<JDtypho color="black">
						{head.title}
						{head.element}
					</JDtypho>
				</div>
			)}
			<ul className="tooltipList__ul">
				{Buttons.map((btnProp, i) => {
					const { cond = true } = btnProp;
					if (!cond) {
						return (
							<span
								key={key + i}
								style={{
									display: 'none'
								}}
							/>
						);
					}

					return (
						<li className="tooltipList__li" key={key + i + 'tooltip'}>
							<Button mb="no" mr="no" className={`tooltipList__btn` + ' ' + btnProp.className} {...btnProp} />
						</li>
					);
				})}
			</ul>
		</div>
	);
};

interface IProps extends OutReactTooltip.Props {
	className?: string;
	scrollNodeClass?: string;
	tooltipRef?: React.MutableRefObject<any>;
	unPadding?: boolean;
	mode?: 'custom';
}

const ToolTipList: React.FC<IProps> = ({
	tooltipRef,
	scrollNodeClass,
	children,
	unPadding,
	className,
	mode,
	...props
}) => {
	const [ open, setOpen ] = useState(false);
	const defualtProps = {
		hover: true,
		eventOff: 'mouseleave',
		globalEventOff: 'click',
		border: true,
		delayHide: isMobile() ? 0 : 700
	};

	const classes = classNames('tooltipList', className, {
		'tooltipList--unPadding': unPadding,
		'tooltipList--noraml': !mode,
		'tooltipList--open': open
	});

	// 특정 콘텐츠의 스크롤시 닫치게해줌
	useEffect(() => {
		if (tooltipRef) {
			$(`.${scrollNodeClass}`).on('scroll', () => {
				OutReactTooltip.hide(tooltipRef.current);
			});
		}
	}, []);

	return (
		<OutReactTooltip className={classes} {...defualtProps} effect="solid" scrollHide {...props}>
			{children}
		</OutReactTooltip>
	);
};

export default ErrProtecter(ToolTipList);
export const ReactTooltip = OutReactTooltip;
