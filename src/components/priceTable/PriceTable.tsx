import React, { useState } from "react";
import PropTypes from "prop-types";
import DayPicker, { CaptionElementProps, NavbarElementProps } from "react-day-picker";
import { InputText, JDdayPicker, JDselect, useSelect } from "@janda-com/front";
import { ISet } from "@janda-com/front/build/types/interface";
import moment, { months } from "moment";
import "./PriceTable.scss";
import "moment/locale/ko";
import {DEFULAT_CLASSES, weekdaysKor} from './helper';
import PriceTableNav from './PriceTableNav';
import PriceTableCaption from './PriceTableCaption';

type TPriceCell = {
    data: string
    pirce: number
}

interface IProps {
    data: TPriceCell[],
    setData: ISet<TPriceCell[]>
}

const PriceTable: React.FC<IProps> = ({ data, setData }) => {

    // 구현에 필요한것 같은것들을 미리 작성해 두었습니다.
    const [selectedDaysList, setSelectedDays] = useState<string[]>([]);
    const [price, setPrice] = useState<string | undefined>('');
    const [dragMode, setDragMode] = useState<boolean>(false);
    const [isShift, setIsShift] = useState<boolean>(false);
    const [isSaved, setIsSaved] = useState<boolean>(false);

    const dateFomulate = (day:Date) => {
        return moment(day).format("YYYYMMDD")
    }

    const InputRender = (day:Date) => {
        const isSelectedDay = selectedDaysList.includes(dateFomulate(day));

        if(isSelectedDay) 
            return  <InputText value={price} onChange={(v:any)=>{ cellPrice(v); }}/>

        if(!isSelectedDay) 
            return  <InputText value={''} onChange={(v:any)=>{ cellPrice(v); }}/>
    }

    const cellDayClick = (day:Date) => {
        if(isShift) {setSelectedDays([ ...selectedDaysList.filter(list => list !== dateFomulate(day)) ])} 
    }

    const cellKeyDown = (key:string) => {
        if(key === "Shift") {
            setIsShift(true);
            window.addEventListener('keyup', function(){
                setIsShift(false);
            })                
        };
    }

    const cellMouseDown = (day:Date) => {
        if(!selectedDaysList.includes(dateFomulate(day))) {       
            setSelectedDays([...selectedDaysList,dateFomulate(day)])
        }
    }

    const cellMouseEnter = (day:Date) => {
        if(dragMode) {
            if(!selectedDaysList.includes(dateFomulate(day))) {
                setSelectedDays([...selectedDaysList,dateFomulate(day)])
            }
            console.log(selectedDaysList);
        }
    }

    const isFirstOfMonth = (day:Date) => {
        return selectedDaysList.includes(dateFomulate(day));
    }

    const saveAll = () => {
        let saveResult = confirm('기입하신 내용을 저장하시겠습니까?');
        if(saveResult){
            setIsSaved(true);
        }
    }
    
    const cancelAll = () => {
        let cancelResult = confirm('선택한 날짜를 모두 취소하시겠습니까?');
        if(cancelResult){
            setSelectedDays([]);
            setIsSaved(false);
            setPrice('');
        }
    }

    const cellPrice = (price:string) => {
        setPrice(price);
    }


    const modifiers = {
        sunday: { daysOfWeek: [0] },
        saturday: { daysOfWeek: [6] },
        selected: isFirstOfMonth 
    };

    return <div>

        {/* DayPicker 모듈은 가장 유명한 React 모듈중 하나입니다. */}
        {/* 아래 링크에서 개발에 필요한 내용들을 찾을 수 있을 겁니다. */}
        {/* http://react-day-picker.js.org/docs/basic-concepts  */}
        {/* 구현에 필요할것 같은 프로퍼티들을 미리 찾아 놓았습니다... */}
        {/* 화이팅 😁😁😁 */}
        
        <DayPicker
            classNames={DEFULAT_CLASSES}
            locale={"ko"}
            selectedDays={isFirstOfMonth}
            onDayClick={ (day, modifiers, e) => { 
                cellDayClick(day);
            }}
            onKeyDown={(e) => { 
                cellKeyDown(e.key);
            }}
            onDayMouseUp={ (day) => { 
                setDragMode(false) 
            }}
            onDayMouseDown={(day, modifiers, e) => { 
                setDragMode(true)
                cellMouseDown(day);
            }}
            onDayMouseEnter={(day, modifier, e) => {
                cellMouseEnter(day);
            }}
            captionElement={({date}) => {
                return <PriceTableCaption date={date} saveAll={saveAll} cancelAll={cancelAll} />
            }}
            navbarElement={(prop) => {
                return <PriceTableNav {...prop} isSaved={isSaved} selectedDaysListLen={selectedDaysList.length} />
            }}
            renderDay={(date,md) => {
                return <div>
                            {moment(date).format("DD")}
                            {InputRender(date)}
                       </div>
            }} 
            modifiers={modifiers}
            firstDayOfWeek={ 1 }
            weekdaysShort={ weekdaysKor['ko'] }
            canChangeMonth={true}
            />
        {/*  예시. */}
        <h1>이건 제가한 스타일링 예시 입니다. 이런식으로 정렬 하시면 되어요</h1>
        {/*  다만 찬규님 코드로 새로 스타일링 해주세요. */}
        <DayPicker />
    </div>
}

// 아래쪽은 사용 예시입니다.
const PriceTableUsage = () => {

    // * 데이터는 항상 부모 컴포넌트에 있어야합니다.
    // 그렇지 않으면 데이터를 송신해야 하는 상황에서 자식컴포넌트에 있는 데아터를 끌어 올릴
    // 좋은 방법은 없습니다. React 공식문서에서는 Best Practice 부분에서 확인 할 수 있습니다.
    // 예를 들면 이쪽컴포넌트에서 이 데이터를 가지고 백엔드와 어떤 통신을 할지 결정합니다.
    // useQuery(UPDATE_PRICE)

    const [data, setData] = useState<TPriceCell[]>([]);

    //자식 컴포넌트는 데이터를 입력받는 역할만 하게 됩니다. 
    // 그렇게 되었을떄 이 컴포넌트를 좀더 '범용적' 으로 사용할 수 있는 거지요.

    return <PriceTable setData={setData} data={data} />

}

export default PriceTableUsage;
