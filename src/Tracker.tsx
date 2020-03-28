import React, { useEffect } from "react";
import userTacking from "./utils/userTracking";

interface IProps {
  foo: any;
}

const Tracker: React.FC<IProps> = ({ foo }) => {
  useEffect(() => {
    userTacking("urlChange", "");
  }, [window.location.href]);

  return <span />;
};

export default Tracker;
