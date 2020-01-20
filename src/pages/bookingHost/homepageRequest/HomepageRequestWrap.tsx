import React from "react";
import HomepageViewer from "./HomepageRequest";
import { IContext } from "../BookingHostRouter";

interface IProps {
  context: IContext;
}

const HomepageRequestWrap: React.FC<IProps> = ({ context }) => {
  return <HomepageViewer context={context} />;
};

export default HomepageRequestWrap;
