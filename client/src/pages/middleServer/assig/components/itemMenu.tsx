import React from "react";
import TooltipList from "../../../../atoms/tooltipList/TooltipList";
import Button from "../../../../atoms/button/Button";

interface IProps {}

const ItemMenu: React.FC<IProps> = () => (
  <TooltipList
    unPadding
    getContent={dataTip => (
      <ul>
        <li>
          <Button onClick={() => ({check})} label="체크아웃" mode="flat" color="white" />
        </li>
        {/* <li>
          <Button label="배정확정" mode="flat" color="white" />
        </li> */}
        <li>
          <Button label="삭제" mode="flat" color="white" />
        </li>
      </ul>
    )}
    id="itemTooltip"
  />
);

export default ItemMenu;
