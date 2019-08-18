import React, {useState, useEffect} from "react";
import {EerrorProtect} from "../../../utils/errProtect";
import "./SetPrice.scss";
import {
  getAllSeasonTable_GetAllRoomType_roomTypes,
  getAllSeasonTable_GetAllSeason_seasons as ISeason,
  createSeason,
  createSeasonVariables,
  changePriority,
  changePriorityVariables,
  deleteSeason,
  deleteSeasonVariables,
  updateSeasonPrices,
  updateSeasonPricesVariables,
  updateSeason,
  updateSeasonVariables,
  UpdateSeasonPriceInput
} from "../../../types/api";
import classNames from "classnames";
import Button from "../../../atoms/button/Button";
import {Link} from "react-router-dom";
import {priceMapResult} from "./SetPriceWrap";
import JDtable, {ReactTableDefault} from "../../../atoms/table/Table";
import {CellInfo} from "react-table";
import JDIcon from "../../../atoms/icons/Icons";
import InputText from "../../../atoms/forms/inputText/InputText";
import {toNumber, muResult} from "../../../utils/utils";
import CircleIcon from "../../../atoms/circleIcon/CircleIcon";
import JDbox from "../../../atoms/box/JDbox";
import {numberToStrings} from "../../../utils/dayOfweeks";
import selectOpMaker from "../../../utils/selectOptionMaker";
import SeasonHeader from "./components/seasonHeader";
import {
  useModal,
  useCheckBox,
  useShouldSave,
  useDayPicker
} from "../../../actions/hook";
import DayOfWeekModal, {IDayOfWeekModalInfo} from "./components/dayOfWeekModal";
import JDdayPicker from "../../../atoms/dayPicker/DayPicker";
import JDmodal from "../../../atoms/modal/Modal";
import CreateSeasonModal from "./components/createSeasonModal";
import {MutationFn} from "react-apollo";
import reactWindowSize, {WindowSizeProps} from "react-window-size";
import {WindowSize} from "../../../types/enum";

interface IProps {
  loading?: boolean;
  seasonData: ISeason[];
  priceMap: Map<string, priceMapResult>;
  roomTypes: getAllSeasonTable_GetAllRoomType_roomTypes[];
  houseId: string;
  createSeasonMu: MutationFn<createSeason, createSeasonVariables>;
  createLoaindg: boolean;
  updateSeasonPriceMu: MutationFn<
    updateSeasonPrices,
    updateSeasonPricesVariables
  >;
  updateSeasonMu: MutationFn<updateSeason, updateSeasonVariables>;
  changePriorityMu: MutationFn<changePriority, changePriorityVariables>;
  deleteSeasonMu: MutationFn<deleteSeason, deleteSeasonVariables>;
}

export interface IDefaultSeason {
  name: string;
  _id: string;
  color: string;
  end: null;
  start: null;
  priority: number;
  description: string;
}

const SetPrice: React.SFC<IProps & WindowSizeProps> = ({
  priceMap: defaultPriceMap,
  roomTypes,
  seasonData: defaultSeasonData,
  updateSeasonPriceMu,
  updateSeasonMu,
  createSeasonMu,
  createLoaindg,
  changePriorityMu,
  deleteSeasonMu,
  windowWidth,
  loading,
  houseId
}) => {
  const isPhablet = windowWidth <= WindowSize.PHABLET;
  const dayOfWeekModal = useModal<IDayOfWeekModalInfo>(false);
  const createSeasonModal = useModal(false);
  const dayPickerHook = useDayPicker(null, null);
  const [seasonData, setSeasons] = useState(defaultSeasonData);
  const [isChange, setIsChange] = useState(false);
  const [roomTypePrices, setRoomTypePrices] = useState(
    roomTypes.map(roomType => ({
      roomTypeId: roomType._id,
      defaultPrice: roomType.defaultPrice
    }))
  );
  const [priceMap, setPriceMap] = useState(defaultPriceMap);
  const {shouldSave, setShouldSave} = useShouldSave([priceMap, roomTypePrices]);

  const priorityOption = selectOpMaker({
    count: seasonData.length,
    labelAdd: "순위"
  });

  const handleRoomTypeDefaultPrice = (roomTypeId: string, value: number) => {
    const targetPrice = roomTypePrices.find(
      prices => prices.roomTypeId === roomTypeId
    );
    if (!targetPrice) return;

    targetPrice.defaultPrice = value;
    setRoomTypePrices([...roomTypePrices]);
  };

  const handleSeasonDefaultPrice = (
    seasonId: string,
    roomTypeId: string,
    price: number
  ) => {
    const targetPrice = priceMap.get(roomTypeId + seasonId);
    if (!targetPrice) return;
    priceMap.set(roomTypeId + seasonId, {
      _id: targetPrice._id,
      default: price,
      dayOfWeekPriceList: targetPrice ? targetPrice.dayOfWeekPriceList : []
    });
    const copyMap = new Map(priceMap);
    setPriceMap(copyMap);
  };

  const handleUpdateBtnClick = async () => {
    const updatePrices: UpdateSeasonPriceInput[] = (() => {
      let returnTemp: UpdateSeasonPriceInput[] = [];
      roomTypes.forEach(roomType => {
        seasonData.forEach(season => {
          const targetPrice = priceMap.get(roomType._id + season._id);
          if (!targetPrice)
            throw Error("handleUpdateBtnClick :: id none match");
          returnTemp.push({
            seasonPriceId: targetPrice._id,
            defaultPrice: targetPrice.default,
            dayOfWeekPriceList: targetPrice.dayOfWeekPriceList
          });
        });
      });
      return returnTemp;
    })();

    const result = await updateSeasonPriceMu({
      variables: {
        defaultRoomTypePriceInputs: roomTypePrices,
        seasonPricesInputs: updatePrices
      }
    });

    if (muResult(result, "UpdateSeasonPrices")) {
      setShouldSave(false);
    }
  };

  const seasonTableColumns = seasonData.map(season => ({
    Header: (
      <SeasonHeader
        // key={season._id}
        seasons={seasonData}
        setSeasons={setSeasons}
        season={season}
        updateSeasonMu={updateSeasonMu}
        priorityOption={priorityOption}
        deleteSeasonMu={deleteSeasonMu}
        changePriorityMu={changePriorityMu}
        houseId={houseId}
      />
    ),
    accessor: "index",
    minWidth: isPhablet ? 130 : 130,
    maxWidth: 234,
    Cell: ({value, original: roomType, index}: CellInfo) => {
      const targetPrice = priceMap.get(roomType._id + season._id);
      return (
        <div>
          {targetPrice && (
            <div className="setPrice__priceCell">
              <InputText
                className="JDmargin-bottom0"
                label="시즌 기본가격"
                comma
                defaultValue={targetPrice.default.toString()}
                onBlur={e => {
                  handleSeasonDefaultPrice(
                    season._id,
                    roomType._id,
                    toNumber(e.currentTarget.value)
                  );
                }}
              />
              <CircleIcon>
                <JDIcon
                  tooltip="요일별가격"
                  className="JDmargin-bottom0"
                  onClick={() => {
                    dayOfWeekModal.openModal({
                      roomTypeId: roomType._id,
                      seasonId: season._id,
                      priceInput: targetPrice
                    });
                  }}
                  icon="edit"
                />
              </CircleIcon>
            </div>
          )}
        </div>
      );
    }
  }));

  const tableColumns = [
    {
      Header: "방타입 \\ 시즌",
      accessor: "name",
      Cell: ({value, original, index}: CellInfo) => {
        return <div>{value}</div>;
      }
    },
    {
      Header: "기본가격",
      accessor: "defaultPrice",
      Cell: ({value, original, index}: CellInfo) => {
        return (
          <InputText
            className="JDmargin-bottom0"
            comma
            defaultValue={(roomTypePrices[index]
              ? roomTypePrices[index].defaultPrice || 0
              : 0
            ).toString()}
            onBlur={e => {
              handleRoomTypeDefaultPrice(
                original._id,
                toNumber(e.currentTarget.value)
              );
            }}
          />
        );
      }
    },
    ...seasonTableColumns
  ];

  const containerClasses = classNames("container", undefined, {
    "container--sm": seasonData.length < 3,
    "container--md": seasonData.length >= 3 && seasonData.length < 4,
    "container--lg": seasonData.length >= 4 && seasonData.length < 5
  });

  return (
    <div id="setPrice" className={`setPrice ${containerClasses}`}>
      <div className="docs-section">
        <h3>가격설정</h3>
        <Button
          onClick={() => {
            createSeasonModal.openModal();
          }}
          label="시즌생성"
          thema="primary"
        />
        <Button
          onClick={() => {
            handleUpdateBtnClick();
          }}
          className="JDz-index-6"
          pulse={shouldSave}
          label="변경사항 저장하기"
          thema="point"
        />
        <Link to="/specificPrice">
          <Button label="일별가격설정 하기" mode="border" />
        </Link>
        <JDtable
          className="setPrice__table"
          marginAtuo={false}
          {...ReactTableDefault}
          data={roomTypes}
          columns={tableColumns}
        />
        <CreateSeasonModal
          key={roomTypes.toString()}
          houseId={houseId}
          roomTypes={roomTypes}
          modalHook={createSeasonModal}
          createSeasonMu={createSeasonMu}
        />
        <DayOfWeekModal
          priceMap={priceMap}
          setShouldSave={setShouldSave}
          setPriceMap={setPriceMap}
          modalHook={dayOfWeekModal}
        />
        <p>
          <div>* 시즌이 적용되지 않는 기간동안 "기본가격"을 사용합니다.</div>
          <div>
            * 시즌이 중첩되어 있는 동안에는 좌측 시즌 가격을 사용합니다.
          </div>
          <div>
            * "요일별 가격"이 적용되어 있지않은 요일에는 시즌 기본가격을
            따릅니다.
          </div>
        </p>
      </div>
    </div>
  );
};
export default reactWindowSize<IProps>(EerrorProtect(SetPrice));
