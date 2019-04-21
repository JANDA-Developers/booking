/* tslint:disable */
import Timeline, {
  defaultHeaderLabelFormats,
  defaultSubHeaderLabelFormats,
  ReactCalendarTimelineProps,
} from 'react-calendar-timeline';
import React from 'react';
import ErrProtecter from '../../utils/ErrProtecter';
import './Timeline.scss';
// import 'react-calendar-timeline/lib/Timeline.css';

interface IProps extends ReactCalendarTimelineProps {}

const JDtimeline: React.SFC<IProps> = ({ children, ...props }) => <Timeline {...props}>{children}</Timeline>;

export { defaultHeaderLabelFormats, defaultSubHeaderLabelFormats };

export default ErrProtecter(JDtimeline);
