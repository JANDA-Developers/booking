import React, { useState } from "react";
import DayPicker from "react-day-picker";
import { InputText, JDselect, JDalign, JDbutton } from "@janda-com/front";
import { ISet } from "@janda-com/front/build/types/interface";
import dayjs from "dayjs";
import "./PriceTable.scss";
import "dayjs/locale/ko";
import { DEFULAT_CLASSES, weekdaysKor } from "./helper";
import PriceTableNav from "./PriceTableNav";
import PriceTableCaption from "./PriceTableCaption";
import faker from "faker";
import { TElements } from "../../types/interface";
import { IInputTextCutsomProp } from "@janda-com/front/build/components/InputText/InputText";

const getDay = (day: Date) => dayjs(day).get("day");

interface IProps {
  data: number[];
  setData: (data: number[]) => void;
  date: Date;
  setDate: ISet<Date>;
  ToolElement: TElements;
  onNavChange: () => boolean;
  selectedDays: number[];
  setSelectedDays: ISet<number[]>;
  inputProps?: IInputTextCutsomProp;
}

const PriceTable: React.FC<IProps> = ({
  data,
  setData,
  onNavChange,
  date,
  setDate,
  ToolElement,
  selectedDays,
  setSelectedDays,
  inputProps
}) => {
  const [dragMode, setDragMode] = useState<boolean>(false);

  const checkIsSelectedDay = (day: Date) =>
    selectedDays.includes(dayjs(day).get("day"));

  const cellMouseDown = (day: Date) => {
    if (!checkIsSelectedDay(day)) {
      setSelectedDays([...selectedDays, getDay(day)]);
    } else {
      setSelectedDays([...selectedDays.filter(list => list !== getDay(day))]);
    }
  };

  const cellMouseEnter = (day: Date) => {
    if (dragMode) {
      if (!checkIsSelectedDay(day)) {
        setSelectedDays([...selectedDays, getDay(day)]);
      }
    }
  };

  const modifiers = {
    sunday: { daysOfWeek: [0] },
    saturday: { daysOfWeek: [6] },
    selected: checkIsSelectedDay
  };

  return (
    <div>
      <DayPicker
        month={date}
        onMonthChange={d => {
          setDate(d);
        }}
        classNames={DEFULAT_CLASSES}
        locale={"ko"}
        selectedDays={checkIsSelectedDay}
        onDayMouseUp={day => {
          setDragMode(false);
        }}
        onDayMouseDown={(day, modifiers, e) => {
          setDragMode(true);
          cellMouseDown(day);
        }}
        onDayMouseEnter={(day, modifier, e) => {
          cellMouseEnter(day);
        }}
        captionElement={({ date }) => {
          return (
            <PriceTableCaption
              ToolElement={() => {
                return ToolElement;
              }}
              date={date}
            />
          );
        }}
        navbarElement={prop => {
          return <PriceTableNav {...prop} onNavChange={onNavChange} />;
        }}
        renderDay={(date, md) => {
          const dayIndex = dayjs(date).get("day");
          return (
            <div>
              {dayjs(date).format("DD")}
              <div
                onMouseDown={e => {
                  e.stopPropagation();
                }}
                className={`JDpriceTable__InputWRapper`}
              >
                <InputText
                  comma
                  value={data[dayIndex]}
                  onChange={(v: any) => {
                    selectedDays.forEach(day => {
                      data[day] = v;
                    });
                    setData([...data]);
                  }}
                  {...inputProps}
                />
              </div>
            </div>
          );
        }}
        modifiers={modifiers}
        firstDayOfWeek={1}
        weekdaysShort={weekdaysKor["ko"]}
        canChangeMonth={true}
      />
    </div>
  );
};

// 아래쪽은 사용 예시입니다.
const PriceTableUsage = () => {
  const DummyData = new Array(31)
    .fill(null)
    .map(i => faker.random.number(100000));
  const [data, setDatas] = useState<number[]>(DummyData);
  const [date, setDate] = useState(new Date());
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const setData = (data: number[]) => {
    setIsSaved(false);
    setDatas([...data]);
  };

  const saveAll = () => {
    let saveResult = confirm("기입하신 내용을 저장하시겠습니까?");
    if (saveResult) {
      setIsSaved(true);
    }
  };

  const cancelAll = () => {
    let cancelResult = confirm("선택한 날짜를 모두 취소하시겠습니까?");
    if (cancelResult) {
      setSelectedDays([]);
      setIsSaved(false);
    }
  };

  return (
    <PriceTable
      onNavChange={() => {
        setSelectedDays([]);
        if (isSaved) {
          return true;
        } else {
          return false;
        }
      }}
      selectedDays={selectedDays}
      setSelectedDays={setSelectedDays}
      ToolElement={
        <JDalign
          flex
          style={{
            fontSize: "1rem"
          }}
        >
          <div>
            <JDselect
              // {...roomSelectHook}
              // onChange={e => {
              // console.log(e);
              // }}
              mr="normal"
            />
          </div>
          <JDbutton
            onClick={e => {
              saveAll();
            }}
          >
            저장하기
          </JDbutton>
          <JDbutton
            onClick={e => {
              cancelAll();
            }}
          >
            선택전체취소
          </JDbutton>
        </JDalign>
      }
      setDate={setDate}
      date={date}
      setData={setData}
      data={data}
    />
  );
};

export default PriceTableUsage;
