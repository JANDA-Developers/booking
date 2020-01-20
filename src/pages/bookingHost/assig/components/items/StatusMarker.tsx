import React from "react";
import { LANG } from "../../../../../hooks/hook";

interface IProps {
  isUnpaid?: boolean;
  memo?: string;
  breakfast?: boolean | null;
}

const StatusMarker: React.FC<IProps> = ({ memo, isUnpaid, breakfast }) => {
  const Dot = ({ title, className }: React.HTMLAttributes<HTMLSpanElement>) => (
    <span title={title} className={`statusMarker__dot ${className}`}></span>
  );

  return (
    <div className="statusMarker">
      {breakfast && (
        <Dot className="JDbgColor--green" title={LANG("breakfast")} />
      )}
      {isUnpaid && <Dot className="JDbgColor--error" title={LANG("unPaid")} />}
      {memo && (
        <Dot className="JDbgColor--point" title={`${LANG("memo")}: ${memo}`} />
      )}
    </div>
  );
};

export default StatusMarker;
