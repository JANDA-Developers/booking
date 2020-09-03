import React from 'react'
import DayPicker, { NavbarElementProps } from "react-day-picker";

interface IPriceTableNav extends NavbarElementProps {
    isSaved:boolean,
    selectedDaysListLen:number
}

const PriceTableNav = (
    {
        isSaved,
        selectedDaysListLen,
        nextMonth,
        previousMonth,
        onPreviousClick,
        onNextClick,
        className,
        localeUtils,
    }:IPriceTableNav) => {
    const months = localeUtils.getMonths();
    const prev = months[previousMonth.getMonth()];
    const next = months[nextMonth.getMonth()];
    const styleLeft = {
        float: 'left',
    };
    const styleRight = {
        float: 'right',
    };
    return (
        <div className={className}>
            <button onClick={() => {

                    if(selectedDaysListLen > 0 && !isSaved) {
                        alert('변경한 정보를 우선 저장해 주십시요');
                        return false;
                    }
                    onPreviousClick()

                }
            }>
                 ←
            </button>
            <button  onClick={() => {

                    if(selectedDaysListLen > 0 && !isSaved) {
                        alert('변경한 정보를 우선 저장해 주십시요');
                        return false;
                    }
                    onNextClick()

                }
            }>
                 →
            </button>
          </div>
    )
}

export default PriceTableNav
