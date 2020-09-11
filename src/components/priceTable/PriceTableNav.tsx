import React from "react";
import DayPicker, { NavbarElementProps } from "react-day-picker";

interface IPriceTableNav extends NavbarElementProps {
  onNavChange: () => boolean;
}

const PriceTableNav = ({
  onNavChange,
  nextMonth,
  previousMonth,
  onPreviousClick,
  onNextClick,
  className,
  localeUtils
}: IPriceTableNav) => {
  const months = localeUtils.getMonths();
  const prev = months[previousMonth.getMonth()];
  const next = months[nextMonth.getMonth()];

  const handleNavChange = (callBack: () => void) => {
    if (!onNavChange()) {
      alert("변경한 정보를 우선 저장해 주십시요");
      return false;
    }
    callBack();
  };

  return (
    <div className={className}>
      <button
        onClick={() => {
          handleNavChange(onPreviousClick);
        }}
      >
        ←
      </button>
      <button
        onClick={() => {
          handleNavChange(onNextClick);
        }}
      >
        →
      </button>
    </div>
  );
};

export default PriceTableNav;
