import OutReactTooltip from 'react-tooltip';
import $ from 'jquery';
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ErrProtecter from '../../utils/errProtect';
import './TooltipList.scss';

interface IProps extends OutReactTooltip.Props {
  className?: string;
  scrollNodeClass?: string;
  tooltipRef?: React.MutableRefObject<any>;
  unPadding?: boolean;
}

const ToolTipList: React.SFC<IProps> = ({
  tooltipRef, scrollNodeClass, children, unPadding, className, ...props
}) => {
  const defualtProps = {
    clickable: true,
    globalEventOff: 'click',
    border: true,
  };

  const classes = classNames('tooltipList', className, {
    'tooltipList--unPadding': unPadding,
  });

  // 스크롤시 닫치게해줌
  useEffect(() => {
    if (tooltipRef) {
      $(`.${scrollNodeClass}`).on('scroll', () => {
        OutReactTooltip.hide(tooltipRef.current);
      });
    }
  }, []);

  return (
    <OutReactTooltip className={classes} {...props} effect="solid" {...defualtProps}>
      {children}
    </OutReactTooltip>
  );
};

export default ErrProtecter(ToolTipList);
export const ReactTooltip = OutReactTooltip;
