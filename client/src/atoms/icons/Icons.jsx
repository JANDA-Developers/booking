/* eslint-disable max-len */
import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import classNames from 'classnames/bind';
import './icons.scss';

const icons = {
  arrow_right: 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z',
  arrow_left: 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z',
  magnifier:
    'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  menue: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
  checkList:
    'M22 2v20h-20v-20h20zm2-2h-24v24h24v-24zm-4 7h-8v1h8v-1zm0 5h-8v1h8v-1zm0 5h-8v1h8v-1zm-10.516-11.304l-.71-.696-2.553 2.607-1.539-1.452-.698.71 2.25 2.135 3.25-3.304zm0 5l-.71-.696-2.552 2.607-1.539-1.452-.698.709 2.249 2.136 3.25-3.304zm0 5l-.71-.696-2.552 2.607-1.539-1.452-.698.709 2.249 2.136 3.25-3.304z',
  google:
    'M2.897 4.181c2.43-2.828 5.763-4.181 9.072-4.181 4.288 0 8.535 2.273 10.717 6.554-2.722.001-6.984 0-9.293 0-1.674.001-2.755-.037-3.926.579-1.376.724-2.415 2.067-2.777 3.644l-3.793-6.596zm5.11 7.819c0 2.2 1.789 3.99 3.988 3.99s3.988-1.79 3.988-3.99-1.789-3.991-3.988-3.991-3.988 1.791-3.988 3.991zm5.536 5.223c-2.238.666-4.858-.073-6.293-2.549-1.095-1.891-3.989-6.933-5.305-9.225-1.33 2.04-1.945 4.294-1.945 6.507 0 5.448 3.726 10.65 9.673 11.818l3.87-6.551zm2.158-9.214c1.864 1.734 2.271 4.542 1.007 6.719-.951 1.641-3.988 6.766-5.46 9.248 7.189.443 12.752-5.36 12.752-11.972 0-1.313-.22-2.66-.69-3.995h-7.609z',
  iconmonstr:
    'M16.5 2.75c-.965 0-1.75.785-1.75 1.75s.785 1.75 1.75 1.75 1.75-.785 1.75-1.75-.785-1.75-1.75-1.75zm0-2.75C18.98 0 21 2.02 21 4.5S18.98 9 16.5 9 12 6.98 12 4.5 14.02 0 16.5 0zM11 17.01s2.54 3.088 4.02 4.943C16.186 23.408 17.048 24 18.485 24 19.894 24 21 22.936 21 21.69c0-.538-.184-1.11-.594-1.645C18.886 18.072 18 17.01 18 17.01h-7zM7.864 17H5c-.55 0-1-.45-1-1s.45-1 1-1h13.28c.892 0 1.4.248 1.962.958.96 1.212 2.505 3.163 2.562 3.25C23.54 18.34 24 17.23 24 16c0-2.762-2.238-5-5-5H5c-2.76 0-5 2.238-5 5s2.24 5 5 5h6.14c-1.143-1.405-3.276-4-3.276-4zm.05-12.5L10 6.586 8.586 8 6.5 5.914 4.414 8 3 6.586 5.086 4.5 3 2.414 4.414 1 6.5 3.086 8.586 1 10 2.414 7.914 4.5z',
  slack:
    'M22.994 8.7c-1.817-6.055-4.223-8.7-8.636-8.7-1.6 0-3.464.347-5.658 1.006-6.056 1.817-8.7 4.223-8.7 8.636 0 1.6.347 3.463 1.006 5.658 1.816 6.056 4.222 8.7 8.635 8.7 1.6 0 3.463-.347 5.659-1.006 6.055-1.817 8.7-4.222 8.7-8.635 0-1.6-.348-3.464-1.006-5.659m-4.164 5.353l-1.554.519.537 1.611c.211.652-.133 1.362-.786 1.573-.735.208-1.373-.206-1.574-.786l-.537-1.612-3.204 1.074.537 1.612c.212.653-.134 1.363-.786 1.573-.73.208-1.371-.201-1.573-.787l-.538-1.611-1.554.518c-.725.21-1.371-.203-1.574-.787-.21-.652.135-1.362.787-1.573l1.554-.518-1.036-3.089-1.554.518c-.729.207-1.37-.2-1.573-.787-.211-.652.134-1.362.786-1.573l1.555-.518-.538-1.611c-.211-.653.135-1.363.787-1.574.652-.211 1.362.134 1.573.787l.538 1.611 3.203-1.074-.536-1.612c-.212-.652.134-1.362.786-1.573.653-.211 1.363.134 1.574.787l.537 1.612 1.554-.519c.652-.211 1.362.135 1.573.787.212.652-.134 1.362-.786 1.573l-1.555.518 1.036 3.089 1.555-.518c.652-.211 1.362.134 1.573.787.211.652-.135 1.362-.787 1.573m-5.747-4.117l-3.202 1.073 1.035 3.092 3.202-1.072-1.035-3.093z',
  github:
    'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
  list:
    'M19 5v14H5V5h14m1.1-2H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM11 7h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7z',
  calendar:
    'M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z',
  notify:
    'M15.137 3.945c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6z',
  roomChange:
    'M 24 13.001 h -3 v 10 h -18 v -10 h -3 l 12 -12.001 l 12 12.001 Z m -19 -2.172 v 10.172 h 14 v -10.172 l -7 -7 l -7 7 Z m 10.332 8.043 s -3.953 -4.159 -4.148 -4.354 c -0.463 -0.464 -1.003 -0.333 -1.285 -0.051 c -0.398 0.398 -0.037 1.019 -0.037 1.019 l -0.874 0.875 l -2.474 -2.474 l 0.875 -0.874 s 0.607 0.433 1.114 -0.074 c 0.552 -0.552 0.301 -1.288 1.525 -2.21 c 0.726 -0.547 1.576 -0.728 2.384 -0.728 c 1.591 0 3.019 0.703 3.019 0.703 c -2.581 0.258 -3.607 1.453 -2.54 2.52 l 3.995 4.318 c 0.808 0.808 -0.476 2.408 -1.554 1.33 Z m 4.668 -16.871 v 5.576 l -3 -3 v -2.576 h 3 Z',
  location:
    'M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z',
  product:
    'M11.499 12.03v11.971l-10.5-5.603v-11.835l10.5 5.467zm11.501 6.368l-10.501 5.602v-11.968l10.501-5.404v11.77zm-16.889-15.186l10.609 5.524-4.719 2.428-10.473-5.453 4.583-2.499zm16.362 2.563l-4.664 2.4-10.641-5.54 4.831-2.635 10.474 5.775z',
  apps:
    'M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z',
  persons:
    'M 10.644 17.08 c 2.866 -0.662 4.539 -1.241 3.246 -3.682 c -3.932 -7.427 -1.042 -11.398 3.111 -11.398 c 4.235 0 7.054 4.124 3.11 11.398 c -1.332 2.455 0.437 3.034 3.242 3.682 c 2.483 0.574 2.647 1.787 2.647 3.889 v 1.031 h -18 c 0 -2.745 -0.22 -4.258 2.644 -4.92 Z m -12.644 4.92 h 7.809 c -0.035 -8.177 3.436 -5.313 3.436 -11.127 c 0 -2.511 -1.639 -3.873 -3.748 -3.873 c -3.115 0 -5.282 2.979 -2.333 8.549 c 0.969 1.83 -1.031 2.265 -3.181 2.761 c -1.862 0.43 -1.983 1.34 -1.983 2.917 v 0.773 Z',
  addCircle:
    'M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z',
  add: 'M 19 13 h -6 v 6 h -2 v -6 H 5 v -2 h 6 V 5 h 2 v 6 h 6 v 2 Z',
};

function Icon({
  label, icon, width, height, hover,
}) {
  const classes = classNames({
    JDicon__svg: true,
    'JDicon__svg--hover': hover,
  });
  return (
    <Fragment>
      <svg
        alignmentBaseline="central"
        className={classes}
        width={width}
        height={height}
        version="1.1"
        viewBox="0 0 24 24 "
      >
        <g>
          <path d={icons[icon]} />
        </g>
      </svg>
      {label !== '' && <span className="Icon__label">{label}</span>}
    </Fragment>
  );
}

Icon.propTypes = {
  icon: PT.string.isRequired,
  width: PT.string,
  height: PT.string,
  label: PT.string,
  hover: PT.bool,
};

Icon.defaultProps = {
  width: '1em',
  height: '1em',
  label: '',
  hover: false,
};

export { icons };

export default Icon;
