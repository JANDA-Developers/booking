import React from "react";
import { IContext } from "../../../../BookingHostRouter";
import Vtable, {
  VtableColumn,
  VtableCell
} from "../../../../../../atoms/vtable/Vtable";
import JDswitch from "../../../../../../atoms/forms/switch/Switch";
import { useSwitch, useRange } from "../../../../../../hooks/hook";
import JDrange from "../../../../../../atoms/forms/range/Range";
import getConfigStorage from "../../../helper/getStorage";

interface Iprops {
  context: IContext;
}

// basic
// Today Marker
// Mouse Market
// ZoomLevel

export interface IAssigBaseConfig {
  useTodayMark: boolean;
  useCursorMark: boolean;
  zoomValue: number;
}
export const ASSIG_BASIC_CONFIG_STORAGE_NAME = "assigTimeline_basicConfig";

export const ASSIG_BASIC_DEFAULT_CONFIG: IAssigBaseConfig = {
  useTodayMark: true,
  useCursorMark: true,
  zoomValue: 30
};

const BasicConfig: React.FC<Iprops> = ({ context }) => {
  const config = getConfigStorage();
  const {
    useCursorMark: deafultCursorMark,
    useTodayMark: defaultTodayMark,
    zoomValue: defaultZoomValue
  } = config.basicConfig;

  const useTodayMark = useSwitch(deafultCursorMark);
  const useCursorMark = useSwitch(defaultTodayMark);
  const zoomValue = useRange(defaultZoomValue, 60, 0);

  const saveData = (data: IAssigBaseConfig) => {
    localStorage.setItem(ASSIG_BASIC_CONFIG_STORAGE_NAME, JSON.stringify(data));
  };

  saveData({
    useTodayMark: useTodayMark.checked,
    useCursorMark: useCursorMark.checked,
    zoomValue: zoomValue.value
  });

  return (
    <div>
      <Vtable mode="unStyle">
        <VtableColumn>
          <VtableCell label="Today Mark">
            <JDswitch {...useTodayMark} />
          </VtableCell>
        </VtableColumn>
        <VtableColumn>
          <VtableCell label="Cursor Mark">
            <JDswitch {...useCursorMark} />
          </VtableCell>
        </VtableColumn>
        <VtableColumn>
          <VtableCell label="Zoom Range">
            <JDrange {...zoomValue} />
          </VtableCell>
        </VtableColumn>
      </Vtable>
    </div>
  );
};

export default BasicConfig;
