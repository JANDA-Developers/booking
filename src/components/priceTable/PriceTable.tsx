import React, { useState } from "react";
import DayPicker, { CaptionElementProps, NavbarElementProps } from "react-day-picker";
import { InputText, JDdayPicker } from "@janda-com/front";
import "./PriceTable.scss";
import moment, { months } from "moment";
import { ISet } from "@janda-com/front/build/types/interface";
import "moment/locale/ko";


type TPriceCell = {
    data: string
    pirce: number
}

interface IProps {
    data: TPriceCell[],
    setData: ISet<TPriceCell[]>
}

const DEFULAT_CLASSES = {
    body: "JDpriceTable__body",
    caption: "JDpriceTable__caption",
    container: "JDpriceTable",
    disabled: "JDpriceTable__day--disalbed",
    day: "JDpriceTable__day",
    footer: "JDpriceTable__footer",
    interactionDisabled: "JDpriceTable--disabled",
    months: "",
    navBar: "",
    month: "",
    navButtonInteractionDisabled: "",
    navButtonNext: "",
    navButtonPrev: "",
    outside: "",
    selected: "",
    today: "",
    todayButton: "",
    week: "",
    weekNumber: "",
    weekday: "",
    weekdays: "",
    weekdaysRow: "",
    wrapper: ""
}


const PriceTable: React.FC<IProps> = ({ data, setData }) => {

    // 구현에 필요한것 같은것들을 미리 작성해 두었습니다.
    const [selectedDays, setSelectedDays] = useState([]);
    const [dragMode, setDragMode] = useState<boolean>(false);


    return <div>
        {/* DayPicker 모듈은 가장 유명한 React 모듈중 하나입니다. */}
        {/* 아래 링크에서 개발에 필요한 내용들을 찾을 수 있을 겁니다. */}
        {/*http://react-day-picker.js.org/docs/basic-concepts  */}
        {/* 구현에 필요할것 같은 프로퍼티들을 미리 찾아 놓았습니다... */}
        {/* 화이팅 😁😁😁 */}
        <DayPicker
            classNames={DEFULAT_CLASSES}
            locale={"ko"}
            onDayClick={() => { }}
            onKeyDown={() => { }}
            selectedDays={selectedDays}
            onDayMouseUp={() => { }}
            onDayMouseDown={() => { }}
            onDayMouseEnter={() => { }}
            captionElement={(prop: CaptionElementProps) => {
                // caption tsx 파일 참고 하세요 ~ 
                return <div>Caption</div>
            }}
            navbarElement={(prop: NavbarElementProps) => {
                // Navbar jsx 파일 참고 하세요 ~ 
                return <div></div>
            }}
            renderDay={(date) => {
                const day = moment(date).format("DD");
                return <div>
                    {day}
                    {/* value를 'data' 에서 찾아서 삽입해주세요.  */}
                    <InputText />
                </div>
            }} />


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
