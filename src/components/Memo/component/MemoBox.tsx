import React, { Fragment, useEffect } from "react";
import JDbox from "../../../atoms/box/JDbox";
import { getMemos_GetMemos_memos } from "../../../types/api";
import dayjs from "dayjs";
import textReader from "../../../utils/textReader";
import { LANG } from "../../../hooks/hook";
import { MemoToolTipIcon } from "./MemoTooltipIcon";
import ReactTooltip from "react-tooltip";

interface Iprops {
  memo: getMemos_GetMemos_memos;
  className?: string;
}

const MemoBox: React.FC<Iprops> = ({ memo, className }) => {
  useEffect(() => {
    ReactTooltip.rebuild();
  });

  // ⭐️ 메인 리턴
  return (
    <Fragment>
      <JDbox
        tooltip={dayjs(memo.createdAt).format(`${LANG("write")} MM/DD HH:MM`)}
        tooltipDirection="left"
        className={`memoBox JDhoverBox ${className}`}
        mode={"border"}
      >
        <span className="JDstandard-small-space">{textReader(memo.text)}</span>
        <MemoToolTipIcon id={memo._id} />
      </JDbox>
      {/* 툴팁 */}
    </Fragment>
  );
};
export default MemoBox;
