import React from 'react';
import TooltipList from '../../../../atoms/tooltipList/TooltipList';
import Button from '../../../../atoms/button/Button';

interface IProps {}

const ItemMenu: React.FC<IProps> = () => (
  <TooltipList unPadding getContent={() => <span />} id="itemTooltip">
    <ul>
      <li>
        <Button label="체크아웃" mode="flat" color="white" />
      </li>
      <li>
        <Button label="배정확정" mode="flat" color="white" />
      </li>
      <li>
        <Button label="삭제" mode="flat" color="white" />
      </li>
    </ul>
  </TooltipList>
);

export default ItemMenu;
