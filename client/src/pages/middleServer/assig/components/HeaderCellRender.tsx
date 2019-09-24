import React from "react";
import JDbadge from "../../../../atoms/badge/Badge";
import classnames from "classnames";
import {IHolidaysByApi} from "../../../../types/interface";
import {searchHoliday} from "../../../../utils/utils";

interface Iprops {
  onClickCell?: ({intervalContext}: any) => void;
  holidays?: IHolidaysByApi[];
  getIntervalProps: any;
  intervalContext: any;
}

const HeaderCellRender: React.FC<Iprops> = ({
  getIntervalProps,
  onClickCell,
  intervalContext,
  holidays
}) => {
  const {startTime} = intervalContext.interval;
  const holiday = holidays && searchHoliday(startTime, holidays);
  const isToday = startTime.isSame(new Date(), "day");
  const isPast = startTime.isBefore(new Date(), "day");

  const headerClasses = classnames(
    "rct-dateHeader timelineHeaderCell",
    undefined,
    {
      "timelineHeaderCell--today": isToday,
      "timelineHeaderCell--isPast": isPast
    }
  );

  return (
    <div className={headerClasses} {...getIntervalProps()}>
      <div
        className="timelineHeaderCell__inner"
        onClickCapture={e => {
          e.preventDefault();
          e.stopPropagation();
          onClickCell && onClickCell({intervalContext});
        }}
      >
        {intervalContext.intervalText
          .replace("요일,", ", ")
          .replace(/[0-9]{4}년/, "")}

        <span className="timelineHeaderCell__badgeWrap">
          {isToday && <JDbadge tooltip="오늘" hover={false} thema="new" />}
          {holiday && <JDbadge tooltip={holiday.dateName} thema={"error"} />}
        </span>
      </div>
    </div>
  );
};

export default HeaderCellRender;
