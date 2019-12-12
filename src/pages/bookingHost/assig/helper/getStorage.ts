import {
  IAssigBaseConfig,
  ASSIG_BASIC_CONFIG_STORAGE_NAME,
  ASSIG_BASIC_DEFAULT_CONFIG
} from "../components/AssigTimelineConfigModal/BasicConfig";

const getConfigStorage = () => {
  const temp = localStorage.getItem(ASSIG_BASIC_CONFIG_STORAGE_NAME);
  const basicConfig: IAssigBaseConfig = temp
    ? JSON.parse(temp)
    : ASSIG_BASIC_DEFAULT_CONFIG;

  const userConfig = {
    basicConfig
  };
};

export default getConfigStorage;
