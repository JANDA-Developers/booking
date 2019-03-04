/* tslint:disable */
import Timeline from 'react-calendar-timeline';
import React from 'react';
import PropTypes from 'prop-types';
import ErrProtecter from '../../utils/ErrProtecter';
import 'react-calendar-timeline/lib/Timeline.css';
import './Timeline.scss';

const JDtimeline = ({ children, ...props }) => <Timeline {...props}>{children}</Timeline>;

JDtimeline.propTypes = {
  props: PropTypes.any,
};

JDtimeline.defaultProps = {
  props: {},
};

export default ErrProtecter(JDtimeline);
