import React from 'react';
import { JDselect, useSelect } from "@janda-com/front";
import moment, { months } from "moment";

interface IPriceTableCaption {
    date:Date,
    saveAll():void,
    cancelAll():void
}

const DUMMY_OPS = [{
    label: "민들레방1",
    value: "asdasdqwcv123123"
},
{
    label: "민들레방2",
    value: "asdasdqwcv2123123"
},
{
    label: "민들레방3",
    value: "asdasdqwcv1323123"
},
{
    label: "민들레방4",
    value: "asdasdqwcv4123123"
}];


const PriceTableCaption:React.FC<IPriceTableCaption> = ({date, saveAll, cancelAll}) => {

    const roomSelectHook = useSelect(DUMMY_OPS[0], DUMMY_OPS);

    return (
        <div className="DayPicker-Caption">
            <div className="DayPicker-Caption__time">
                <span className="DayPicker-Caption__year">{moment(date).format("YYYY")}.</span>
                <span className="DayPicker-Caption__month">{moment(date).format("MM")}</span>
            </div>

            <div className="DayPicker-Caption__btnList">
                <div className="DayPicker-Caption__room">
                    <JDselect {...roomSelectHook} onChange={(e)=> {
                        console.log(e);
                    }} />
                </div>
                <button className="DayPicker-Caption__save" onClick={(e) => { saveAll() }}>
                    저장하기
                </button>
                <button className="DayPicker-Caption__cancel" onClick={ (e) => { cancelAll() }}>
                    선택전체취소
                </button>
            </div>
        </div>
    )
}

export default PriceTableCaption
