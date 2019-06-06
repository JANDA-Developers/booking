import React from "react";
import {ErrProtecter} from "../../../utils/utils";
import Config from "./Config";

interface IProps {}

const ConfigWrap: React.FC<IProps> = () => <Config />;

export default ErrProtecter(ConfigWrap);
