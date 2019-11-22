import React from "react";
import { LANG } from "../../../../../hooks/hook";

interface IProps {
  isUnpaid?: boolean;
  memo?: string;
}

const StatusMarker: React.FC<IProps> = ({ memo, isUnpaid }) => {
  const Dot = ({ title, className }: React.HTMLAttributes<HTMLSpanElement>) => (
    <span title={title} className={`statusMarker__dot ${className}`}></span>
  );

  return (
    <div className="statusMarker">
      {isUnpaid && <Dot className="JDbgColor--error" title={LANG("unPaid")} />}
      {memo && <Dot className="JDbgColor--point" title={`메모: ${memo}`} />}
    </div>
  );
};

export default StatusMarker;