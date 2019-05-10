/* tslint:disable */
import Timeline, {
  defaultHeaderLabelFormats,
  defaultSubHeaderLabelFormats,
  // @ts-ignore
  SidebarHeader,
  // @ts-ignore
  DateHeader,
  // @ts-ignore
  TimelineHeaders,
  // @ts-ignore
  CustomHeader,
} from 'react-calendar-timeline';
import React from 'react';
import ErrProtecter from '../../utils/ErrProtecter';
import './Timeline.scss';
// import 'react-calendar-timeline/lib/Timeline.css';

// interface IProps extends ReactCalendarTimelineProps {}

const JDtimeline = ({ ...props }: any) => <Timeline {...props} />;

export {
  defaultHeaderLabelFormats,
  defaultSubHeaderLabelFormats,
  DateHeader,
  SidebarHeader,
  TimelineHeaders,
  CustomHeader,
};

export default ErrProtecter(JDtimeline);
