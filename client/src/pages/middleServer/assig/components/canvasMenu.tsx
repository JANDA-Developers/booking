import React from 'react';
import TooltipList from '../../../../atoms/tooltipList/TooltipList';
import Button from '../../../../atoms/button/Button';

interface IProps {}

const CanvasMenu: React.FC<IProps> = () => (
  <TooltipList unPadding getContent={() => <span />} id="canvasTooltip">
    <ul>
      <li>
        <Button label="예약생성" mode="flat" color="white" />
      </li>
      <li>
        <Button label="방막기" mode="flat" color="white" />
      </li>
    </ul>
  </TooltipList>
);

export default CanvasMenu;
