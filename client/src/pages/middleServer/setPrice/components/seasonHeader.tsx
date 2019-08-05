import React, {Fragment} from "react";
import {ISeason} from "../../../../types/interface";
import {useDayPicker, useSelect, useModal} from "../../../../actions/hook";
import JDdayPicker from "../../../../atoms/dayPicker/DayPicker";
import JDIcon from "../../../../atoms/icons/Icons";
import JDselect, {
  IselectedOption,
  SelectBoxSize
} from "../../../../atoms/forms/selectBox/SelectBox";
import InputText from "../../../../atoms/forms/inputText/InputText";
import {useState} from "react";
import moment from "moment";
import CircleIcon from "../../../../atoms/circleIcon/CircleIcon";
import TooltipList from "../../../../atoms/tooltipList/TooltipList";
import Button from "../../../../atoms/button/Button";
import JDmodal from "../../../../atoms/modal/Modal";
import {
  deleteSeason,
  changePriority,
  deleteSeasonVariables,
  changePriorityVariables
} from "../../../../types/api";
import {MutationFn} from "react-apollo";
import {targetBlinkFuture} from "../../../../utils/targetBlink";
import {setYYYYMMDD} from "../../../../utils/setMidNight";

interface IProps {
  season: ISeason;
  seasons: ISeason[];
  setSeasons: React.Dispatch<React.SetStateAction<ISeason[]>>;
  priorityOption: IselectedOption[];
  changePriorityMu: MutationFn<changePriority, changePriorityVariables>;
  deleteSeasonMu: MutationFn<deleteSeason, deleteSeasonVariables>;
  houseId: string;
}

const SeasonHeader: React.FC<IProps> = ({
  priorityOption,
  houseId,
  seasons,
  season,
  setSeasons,
  changePriorityMu,
  deleteSeasonMu,
  ...props
}) => {
  const dayPickerHook = useDayPicker(
    season.start,
    season.end
      ? moment(season.end)
          .add(-1, "day")
          .toDate()
      : null
  );
  const periorityModalHook = useModal(false);
  const periorityHook = useSelect({
    value: season.priority,
    label: `${season.priority}순위`
  });

  const handleDeleteSeason = () => {
    deleteSeasonMu({
      variables: {
        houseId,
        seasonId: season._id
      }
    });
    targetBlinkFuture(`#seasonHeader${season._id}`, true);
  };

  const handleChangePriority = () => {
    if (!periorityHook.selectedOption) return;
    changePriorityMu({
      variables: {
        houseId,
        priority: periorityHook.selectedOption.value,
        seasonId: season._id
      }
    });
    periorityModalHook.closeModal();
  };

  const Menue = () => (
    <Fragment>
      <div
        data-tip
        data-delay-hide={0}
        data-for={`seasonMenu${season._id}`}
        data-event="click"
        data-place="top"
      >
        <CircleIcon>
          <JDIcon icon="dotMenuVertical" />
        </CircleIcon>
      </div>
      <TooltipList id={`seasonMenu${season._id}`}>
        <ul>
          <li>
            <Button
              onClick={handleDeleteSeason}
              label="삭제하기"
              mode="flat"
              color="white"
            />
          </li>
          <li>
            <Button
              onClick={() => {
                periorityModalHook.openModal();
              }}
              label="순위변경"
              mode="flat"
              color="white"
            />
          </li>
        </ul>
      </TooltipList>
    </Fragment>
  );

  const PeriorityModal = () => (
    <JDmodal visibleOverflow {...periorityModalHook}>
      <h5>{season.name}</h5>
      <JDselect
        size={SelectBoxSize.FOUR}
        className="JDz-index-1 seasonHeader__selectPriority"
        label="우선순위"
        options={priorityOption}
        {...periorityHook}
      />
      <div className="JDmodal__endSection">
        <Button
          onClick={() => {
            handleChangePriority();
          }}
          label="적용"
          mode="flat"
          size="small"
          thema="primary"
        />
      </div>
    </JDmodal>
  );

  // ⭐️⭐️⭐️
  return (
    <div id={`seasonHeader${season._id}`} className="seasonHeader">
      <div className="seasonHeader__wrap">
        <InputText
          defaultValue={season.name}
          onBlur={e => {
            season.name = e.currentTarget.value;
            setSeasons([...seasons]);
          }}
          className="JDmargin-bottom0--wmdUp"
        />
        <Menue />
      </div>
      <div>
        <JDdayPicker
          calenaderPosition="left"
          className="seasonHeader__dayPicker"
          inputClassName="JDmargin-bottom0--wmdUp"
          showInputIcon={false}
          format={"MM/DD"}
          input
          isRange
          onChangeDate={(from, to) => {
            if (from && to) {
              season.end = setYYYYMMDD(to);
              season.start = setYYYYMMDD(from);
              setSeasons([...seasons]);
            }
          }}
          {...dayPickerHook}
        />
      </div>
      <PeriorityModal />
    </div>
  );
};

export default SeasonHeader;
