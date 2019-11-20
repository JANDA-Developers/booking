import React from 'react';
import './ColorBox.scss';
import PropTypes from 'prop-types';
import ErrProtecter from '../../../../utils/errProtect';

const colorBox = ({
  color, txt, dataFor, dataTip,
}) => (
  <div className="colorPage-box-wrap">
    <div className="colorPage-box">
      <div data-tip={dataTip} data-for={dataFor} className={`colorPage-circle colorPage-circle--${color}`}>
        <h6 className="colorPage-circle__txt">{txt}</h6>
      </div>
    </div>
  </div>
);

colorBox.propTypes = {
  color: PropTypes.string.isRequired,
  txt: PropTypes.string.isRequired,
  dataFor: PropTypes.node,
  dataTip: PropTypes.bool,
};

colorBox.defaultProps = {
  dataFor: <span className="EMPTY_NODE" />,
  dataTip: false,
};

export default ErrProtecter(colorBox);
