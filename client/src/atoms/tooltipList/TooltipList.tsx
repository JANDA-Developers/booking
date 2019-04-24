import OutReactTooltip from 'react-tooltip';
import $ from 'jquery';
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ErrProtecter from '../../utils/ErrProtecter';
import './TooltipList.scss';

interface IProps extends OutReactTooltip.Props {
  className?: string;
  scrollNodeClass?: string;
  tooltipRef?: React.MutableRefObject<any>;
}

const ToolTipList: React.SFC<IProps> = ({
  tooltipRef, scrollNodeClass, children, ...props
}) => {
  const defualtProps = {
    clickable: true,
    globalEventOff: 'click',
    border: true,
  };

  // 스크롤시 닫치게해줌
  useEffect(() => {
    if (tooltipRef) {
      $(`.${scrollNodeClass}`).on('scroll', () => {
        OutReactTooltip.hide(tooltipRef.current);
      });
    }
  }, []);

  return (
    <OutReactTooltip className="tooltipList" {...props} effect="solid" {...defualtProps}>
      {children}
    </OutReactTooltip>
  );
};

export default ErrProtecter(ToolTipList);
export const ReactTooltip = OutReactTooltip;
