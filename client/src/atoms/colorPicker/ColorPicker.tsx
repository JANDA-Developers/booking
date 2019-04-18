import React from 'react';
import { SketchPicker, ColorResult } from 'react-color';
import classnames from 'classnames';
import { IUseColor } from '../../actions/hook';
import './ColorPicker.scss';

interface IProps {
  colorHook: IUseColor;
  className?: string;
}

const JDcolorPicker: React.SFC<IProps> = ({ className, colorHook }) => {
  const handleClick = () => {
    colorHook.setDisplay(!colorHook.display);
  };

  const handleClose = () => {
    colorHook.setDisplay(false);
  };

  const handleChange = (color: ColorResult) => {
    colorHook.setColor(color.hex);
  };

  const styleColor = {
    backgroundColor: colorHook.color,
  };

  const classNames = classnames('JDcolorPicker', className, {});

  return (
    <div className={classNames}>
      <div tabIndex={0} role="button" className="JDcolorPicker__swatch" onClick={handleClick} onKeyPress={handleClick}>
        <div className="JDcolorPicker__color" style={styleColor} />
      </div>
      {colorHook.display ? (
        <div className="JDcolorPicker__modalWrap">
          <div
            className="JDcolorPicker__cover"
            tabIndex={0}
            role="button"
            onKeyPress={handleClick}
            onClick={handleClose}
          />
          <SketchPicker color={colorHook.color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default JDcolorPicker;
