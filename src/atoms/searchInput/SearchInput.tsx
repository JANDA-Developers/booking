// 참고: https://codepen.io/manpreet/pen/EyXwrE
import $ from "jquery";
import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";
import List from "./list";
import "./searchInput.scss";
import Icon from "../icons/Icons";
import Preloader from "../preloader/Preloader";
import searchListFormat from "../../utils/searchListFormater";
import JDLabel from "../label/JDLabel";
import { IInput } from "../../types/interface";
import InputText from "../forms/inputText/InputText";

interface IProps extends IInput {
  dataList: Array<any>;
  onListClick?(value: string | undefined, id: string | undefined): void;
  placeholder?: string;
  label?: string;
  onFindOne?(label?: string | null, id?: string): any;
  setIsMatched?(foo?: boolean): any;
  onTypeChange?(foo?: string): any;
  onSearch?(value?: string): any;
  staticList?: boolean;
  filter?: boolean;
  isMatched?: boolean;
  isLoading?: boolean;
  alwaysListShow?: boolean;
  setTypeWhenFindOne?: boolean;
  onTypeValue?: string;
  asName?: string;
  asDetail?: string;
  asId?: string;
  feedBackMessage?: string;
  maxCount?: number;
  mode?: "fill";
}

const JDsearchInput: React.FC<IProps> = ({
  dataList,
  staticList,
  placeholder,
  label,
  onFindOne,
  filter,
  onListClick,
  onTypeChange,
  onTypeValue,
  isMatched,
  setIsMatched,
  alwaysListShow,
  setTypeWhenFindOne,
  asName,
  asDetail,
  isLoading,
  feedBackMessage,
  maxCount,
  onSearch,
  asId,
  mode,
  ...props
}) => {
  // Naming Format
  const formatDataList: Array<any> = searchListFormat(
    dataList && dataList.slice(0, maxCount),
    asName,
    asDetail,
    asId
  );
  const [filteredDataList, SetFilteredDataList] = useState(formatDataList);
  const inputRef: any = useRef(null);
  const ulRef: any = useRef(null);

  //  value와 메치되는 리스트를 찾습니다.
  const setList = (value = inputRef.current.value) => {
    // CASE: 필터할경우
    if (filter) {
      let filteredItems = []; // if value == '' filter all
      if (value) {
        filteredItems = formatDataList.filter(item =>
          item.name.toLowerCase().includes(value.toLowerCase())
        );
      }
      SetFilteredDataList(filteredItems);
    } else if (value || alwaysListShow) SetFilteredDataList(formatDataList);
    // CASE: input has no value
    if (!value && !alwaysListShow) SetFilteredDataList([]);
  };

  const autoScrollList = (target: HTMLElement) => {
    $(target)
      .parent()
      .scrollTop(target.offsetTop);
  };

  // Handler - input : onKeyPress
  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // CASE: 엔터를 쳤을경우에
    if (e.key === "Enter") {
      e.preventDefault();
      // 키보드에 의해서 선택된것 또는 그런게없다면 완벽하게 일치하는것을 찾음
      const selectedNode =
        $(ulRef.current)
          .find(".JDsearchInput__li--selected")
          .get(0) ||
        $(ulRef.current)
          .find(".JDsearchInput__li--correspond")
          .get(0);
      onSearch && onSearch(e.currentTarget.value);
      // CASE: 키보드상 선택된 노드가 있을경우에
      if (selectedNode) {
        !isLoading &&
          onFindOne &&
          onFindOne($(selectedNode).attr("value"), $(selectedNode).attr("id"));

        setTypeWhenFindOne &&
          onTypeChange &&
          onTypeChange($(selectedNode).attr("value"));

        $(inputRef.current).blur();
      }
    }

    // ⌨️ 키보드 위아래로 움직일경우에 노드 선택
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      // CASE: ul has no children
      if (!ulRef.current) return;
      if (!ulRef.current.children) return;

      const selectedNode = $(ulRef.current).find(
        ".JDsearchInput__li--selected"
      );

      // CASE: li is selected
      if (selectedNode.length) {
        // active select
        if (e.key === "ArrowUp") {
          const target = $(selectedNode).prev();
          if (!target.get(0)) return;
          target.addClass("JDsearchInput__li--selected");
          autoScrollList(target.get(0));
        } else {
          const target = $(selectedNode).next();
          if (!target.get(0)) return;
          target.addClass("JDsearchInput__li--selected");
          autoScrollList(target.get(0));
        }
        // remove select
        $(selectedNode).removeClass("JDsearchInput__li--selected");

        // first select
      } else if (e.key === "ArrowDown")
        ulRef.current.children[0].classList.add("JDsearchInput__li--selected");
    }
  };

  // Handler - 인풋 : onChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (filter) setList(e.target.value);
    onTypeChange && onTypeChange(e.target.value);
  };

  // Handler - 인풋 : onFocus
  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTimeout(() => {
      $(ulRef.current).removeClass("JDsearchInput__ul--hide");
    }, 100);
  };

  // Handler - 인풋 : onBlur
  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();

    // 여기 setTimeOut 이 있는이유는 이벤트 파서가 도착하기전에 css 가 먼저 반응하기 떄문이다.
    setTimeout(() => {
      $(ulRef.current).addClass("JDsearchInput__ul--hide");
    }, 500);
  };

  // Handler - 리스트 : onClick
  const handleOnListClick = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const value = $(e.currentTarget).attr("value");
    const id = $(e.currentTarget).attr("id");
    if (!onListClick && onFindOne) {
      onFindOne(value, id);
    }
    if (!onListClick && onTypeChange) {
      onTypeChange(value);
    }
    onListClick && (await onListClick(value, id));
    // $(inputRef.current).val(value || "");
    // onFindOne && onFindOne(value, id);
  };

  // Handler - 리스트 : onKeyPress - 🚫 useless
  const handleOnListKeyPress = (e: any) => {
    e.preventDefault();
  };

  // Handler - 아이콘 : onClick
  const handleOnSearchClick = () => {
    onSearch && onSearch(inputRef.current.value);
  };

  const classes = classNames({
    JDsearchInput: true,
    "JDsearchInput--staticList": staticList === true,
    "JDsearchInput--labeled": label,
    "JDsearchInput--unFeedBack": !feedBackMessage,
    "JDsearchInput--fill": mode === "fill"
  });

  useEffect(setList, [dataList]); // 유저 리스트가 변할때마다 새롭게 리스트를 찾습니다.
  // 매칭된 리스트가 있을경우에 클래스를 붙여줍니다.
  useEffect(() => {
    if (isMatched)
      $(inputRef.current).addClass("JDsearchInput__input--matched");
  }, [isMatched]);

  return (
    <div className={classes}>
      {label && <JDLabel txt={label} />}
      <div className="JDsearchInput__input_wrapper">
        <div className="JDsearchInput__innerWrap">
          <input
            {...props}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            onKeyDown={handleOnKeyPress}
            ref={inputRef}
            className="JDsearchInput__input"
            onChange={handleChange}
            placeholder={placeholder}
            value={onTypeValue}
          />
          <span
            tabIndex={0}
            role="button"
            onClick={handleOnSearchClick}
            onKeyDown={handleOnKeyPress}
            className="JDsearchInput__icon"
          >
            <Preloader noAnimation loading={isLoading || false} />
            {isLoading || <Icon hover icon="magnifier" />}
          </span>
        </div>
        {feedBackMessage && (
          <span className="JDsearchInput__feedBack">{`${feedBackMessage}`}</span>
        )}
      </div>
      <List
        currentValue={onTypeValue}
        onListKeyPress={handleOnListKeyPress}
        onListClick={handleOnListClick}
        refContainer={ulRef}
        dataList={filteredDataList}
        setIsMatched={setIsMatched}
        alwaysListShow={alwaysListShow}
      />
    </div>
  );
};

JDsearchInput.defaultProps = {
  dataList: [],
  staticList: false,
  filter: true,
  isMatched: false,
  alwaysListShow: false,
  isLoading: false,
  onTypeValue: "",
  placeholder: "search",
  asName: "name",
  asDetail: "detail",
  onFindOne: () => {},
  setIsMatched: () => {},
  onTypeChange: () => {},
  maxCount: 999
};
export default JDsearchInput;
