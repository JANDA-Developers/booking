import React from "react";
import { IContext } from "../../../BookingHostRouter";
import Vtable, {
  VtableColumn,
  VtableCell
} from "../../../../../atoms/vtable/Vtable";
import JDswitch from "../../../../../atoms/forms/switch/Switch";
import { useSwitch, useRange } from "../../../../../hooks/hook";
import JDrange from "../../../../../atoms/forms/range/Range";

interface Iprops {
  context: IContext;
}

// basic
// Today Marker
// Mouse Market
// ZoomLevel


export interface IAssigBaseConfig {
    useTodayMark: boolean,
    useCursorMark: boolean,
    zoomHook: number      
};
export const ASSIG_BASIC_CONFIG_STORAGE_NAME = "assigTimeline_basicConfig";

export const ASSIG_BASIC_DEFAULT_CONFIG:IAssigBaseConfig = {
    useTodayMark: true,
    useCursorMark: true,
    zoomHook: 30      
}

const BasicConfig: React.FC<Iprops> = ({ context }) => {
  const config = localStorage.getItem(ASSIG_BASIC_CONFIG_STORAGE_NAME)
  const parsedConfig =  config ? JSON.parse(config) : ASSIG_BASIC_DEFAULT_CONFIG;

  const useTodayMark = useSwitch(parsedConfig);
  const useCursorMark = useSwitch(true);
  const zoomHook = useRange(30, 60, 0);

  const saveData = (data:IAssigBaseConfig) => { 
    localStorage.setItem(ASSIG_BASIC_CONFIG_STORAGE_NAME,JSON.stringify(data))
  }

  saveData({
    useTodayMark: useTodayMark.checked,
    useCursorMark: useCursorMark.checked,
    zoomHook: zoomHook.value;
  })


  return (
    <div>
      <Vtable>
        <VtableColumn>
          <VtableCell label="Today Mark">
            <JDswitch {...useTodayMark} />
          </VtableCell>
          <VtableCell label="Cursor Mark">
            <JDswitch {...useCursorMark} />
          </VtableCell>
          <VtableCell label="Zoom Range">
            <JDrange {...zoomHook} />
          </VtableCell>
        </VtableColumn>
      </Vtable>
    </div>
  );
};

export default BasicConfig;
