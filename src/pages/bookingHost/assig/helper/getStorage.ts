import {
  IAssigBaseConfig,
  ASSIG_BASIC_CONFIG_STORAGE_NAME,
  ASSIG_BASIC_DEFAULT_CONFIG
} from "../components/AssigTimelineConfigModal/components/BasicConfig";
import { IUserConfig } from "../components/assigIntrerface";

const getConfigStorage = (): IUserConfig => {
  const temp = localStorage.getItem(ASSIG_BASIC_CONFIG_STORAGE_NAME);
  const basicConfig: IAssigBaseConfig = temp
    ? JSON.parse(temp)
    : ASSIG_BASIC_DEFAULT_CONFIG;

  return {
    basicConfig
  };
};

export default getConfigStorage;
