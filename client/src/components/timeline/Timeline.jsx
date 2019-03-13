/* tslint:disable */
import Timeline, {
  defaultHeaderLabelFormats,
  defaultSubHeaderLabelFormats,
  TimelineMarkers,
  CustomMarker,
  TodayMarker,
  CursorMarker,
} from 'react-calendar-timeline';
import React from 'react';
import PropTypes from 'prop-types';
import ErrProtecter from '../../utils/ErrProtecter';
import './Timeline';
import './Timeline.scss';
// import 'react-calendar-timeline/lib/Timeline.css';

const JDtimeline = ({ children, ...props }) => <Timeline {...props}>{children}</Timeline>;

JDtimeline.propTypes = {
  props: PropTypes.any,
};

JDtimeline.defaultProps = {
  props: {},
};

export {
  defaultHeaderLabelFormats,
  defaultSubHeaderLabelFormats,
  TimelineMarkers,
  CustomMarker,
  TodayMarker,
  CursorMarker,
};

export default ErrProtecter(JDtimeline);
