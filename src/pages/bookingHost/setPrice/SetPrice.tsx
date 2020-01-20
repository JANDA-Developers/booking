import React, { useState } from "react";
import { EerrorProtect } from "../../../utils/errProtect";
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
import Preloader from "../../../atoms/preloader/Preloader";
import Button from "../../../atoms/button/Button";
import { Link } from "react-router-dom";
import { priceMapResult } from "./SetPriceWrap";
import JDtable, { ReactTableDefault } from "../../../atoms/table/Table";
import { CellInfo } from "react-table";
import InputText from "../../../atoms/forms/inputText/InputText";
import { toNumber, muResult } from "../../../utils/utils";
import selectOpCreater from "../../../utils/selectOptionCreater";
import SeasonHeader from "./components/seasonHeader";
import { useModal, useShouldSave, LANG } from "../../../hooks/hook";
import DayOfWeekModal, {
  IDayOfWeekModalInfo
} from "./components/dayOfWeekModal";
import CreateSeasonModal from "./components/createSeasonModal";
import { MutationFn } from "react-apollo";
import { WindowSizeProps } from "react-window-size";
import { WindowSize } from "../../../types/enum";
import { IContext } from "../../bookingHost/BookingHostRouter";
import JDlist from "../../../atoms/list/List";
import JDLabel from "../../../atoms/label/JDLabel";
import PageHeader from "../../../components/pageHeader/PageHeader";
import PageBody from "../../../components/pageBody/PageBody";

interface IProps {
  loading?: boolean;
  seasonData: ISeason[];
  priceMap: Map<string, priceMapResult>;
  roomTypes: getAllSeasonTable_GetAllRoomType_roomTypes[];
  context: IContext;
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
  context
}) => {
  const { house } = context;
  const isPhablet = windowWidth <= WindowSize.PHABLET;
  const dayOfWeekModal = useModal<IDayOfWeekModalInfo>(false);
  const createSeasonModal = useModal(false);
  const [seasonData, setSeasons] = useState(defaultSeasonData);

  const [roomTypePrices, setRoomTypePrices] = useState(
    roomTypes.map(roomType => ({
      roomTypeId: roomType._id,
      defaultPrice: roomType.defaultPrice
    }))
  );
  const [priceMap, setPriceMap] = useState(defaultPriceMap);
  const { shouldSave, setShouldSave } = useShouldSave([
    priceMap,
    roomTypePrices
  ]);

  const priorityOption = selectOpCreater({
    count: seasonData.length,
    labelAdd: LANG("nth")
  });

  const handleRoomTypeDefaultPriceBlur = (
    roomTypeId: string,
    value: number
  ) => {
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
    const updatePricesVariables: UpdateSeasonPriceInput[] = (() => {
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
        seasonPricesInputs: updatePricesVariables
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
        houseId={house._id}
      />
    ),
    accessor: "index",
    Cell: ({ value, original: roomType, index }: CellInfo) => {
      const targetPrice = priceMap.get(roomType._id + season._id);
      return (
        <div>
          {targetPrice && (
            <div className="setPrice__priceCell">
              <InputText
                wrapClassName="JDmargin-bottom0"
                label={LANG("season_basic_price")}
                comma
                defaultValue={targetPrice.default.toString()}
                onBlur={e => {
                  handleSeasonDefaultPrice(
                    season._id,
                    roomType._id,
                    toNumber(e.currentTarget.value)
                  );
                }}
                iconProps={{
                  size: "small",
                  tooltip: LANG("day_of_week_price")
                }}
                iconHover
                icon="edit"
                iconOnClick={() => {
                  dayOfWeekModal.openModal({
                    roomTypeId: roomType._id,
                    seasonId: season._id,
                    priceInput: targetPrice
                  });
                }}
              />
            </div>
          )}
        </div>
      );
    }
  }));

  const tableColumns = [
    {
      Header: `${LANG("roomType")} \\ ${LANG("season")}`,
      accessor: "name",
      Cell: ({ value, original, index }: CellInfo) => {
        return <div>{value}</div>;
      }
    },
    {
      Header: LANG("basic_price"),
      accessor: "defaultPrice",
      Cell: ({ value, original, index }: CellInfo) => {
        return (
          <InputText
            label={LANG("room_type_basic_price")}
            wrapClassName="JDmargin-bottom0"
            comma
            defaultValue={(roomTypePrices[index]
              ? roomTypePrices[index].defaultPrice || 0
              : 0
            ).toString()}
            onBlur={e => {
              handleRoomTypeDefaultPriceBlur(
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

  return (
    <div id="setPrice" className={`setPrice`}>
      <PageHeader
        title={LANG("price_setting")}
        desc={LANG("price_setting__desc")}
      />
      <PageBody>
        <Button
          onClick={() => {
            createSeasonModal.openModal();
          }}
          label={LANG("create_season")}
          thema="primary"
        />
        <Button
          onClick={() => {
            handleUpdateBtnClick();
          }}
          className="JDz-index-6"
          pulse={shouldSave}
          label={LANG("save")}
          thema="point"
        />
        <Link to="/dailyPrice">
          <Button
            icon="arrowTo"
            label={LANG("set_daily_price")}
            mode="border"
          />
        </Link>
        {loading ? (
          <div>
            <Preloader size={"large"} loading={loading} />
          </div>
        ) : (
          <JDtable
            className="setPrice__table"
            marginAtuo={false}
            {...ReactTableDefault}
            data={roomTypes}
            columns={tableColumns}
          />
        )}
        <CreateSeasonModal
          key={roomTypes.toString()}
          houseId={house._id}
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
        <JDlist
          marginBottom="short"
          contents={[
            <span className="JDtextColor--point">
              {LANG("price_priority")}
            </span>,
            <span className="JDtextColor--point">
              {LANG(
                "when_season_multiple_applyed_use_left_side_value_will_be_used"
              )}
            </span>
          ]}
        />
      </PageBody>
    </div>
  );
};
export default EerrorProtect(SetPrice);
