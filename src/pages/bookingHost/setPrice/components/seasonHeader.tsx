import React, { Fragment } from "react";
import { ISeason } from "../../../../types/interface";
import {
  useDayPicker,
  useSelect,
  useModal,
  LANG,
} from "../../../../hooks/hook";
import JDIcon from "../../../../atoms/icons/Icons";
import JDselect, {
  IselectedOption,
  SelectBoxSize,
} from "../../../../atoms/forms/selectBox/SelectBox";
import InputText from "../../../../atoms/forms/inputText/InputText";
import moment from "moment";
import TooltipList, {
  TooltipButtons,
} from "../../../../atoms/tooltipList/TooltipList";
import Button from "../../../../atoms/button/Button";
import JDmodal from "../../../../atoms/modal/Modal";
import {
  deleteSeason,
  changePriority,
  deleteSeasonVariables,
  changePriorityVariables,
  updateSeason,
  updateSeasonVariables,
} from "../../../../types/api";
import { MutationFn } from "react-apollo";
import { targetBlinkFuture } from "../../../../utils/targetBlink";
import UpdateSeasonModal from "./updateSeasnModal";
import JDbox from "../../../../atoms/box/JDbox";
import ModalEndSection from "../../../../atoms/modal/components/ModalEndSection";

interface IProps {
  season: ISeason;
  seasons: ISeason[];
  updateSeasonMu: MutationFn<updateSeason, updateSeasonVariables>;
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
  updateSeasonMu,
  ...props
}) => {
  const dayPickerHook = useDayPicker(
    season.start,
    season.end ? moment(season.end).add(-1, "day").toDate() : null
  );
  const updateSeasonModal = useModal(false);
  const periorityModalHook = useModal(false);
  const periorityHook = useSelect({
    value: season.priority,
    label: `${season.priority}${LANG("nth")}`,
  });

  const handleDeleteSeason = () => {
    deleteSeasonMu({
      variables: {
        houseId,
        seasonId: season._id,
      },
    });
    targetBlinkFuture(`#seasonHeader${season._id}`, true);
  };

  const handleChangePriority = () => {
    if (!periorityHook.selectedOption) return;
    changePriorityMu({
      variables: {
        houseId,
        priority: periorityHook.selectedOption.value,
        seasonId: season._id,
      },
    });
    periorityModalHook.closeModal();
  };

  const Menue = () => (
    <Fragment>
      <TooltipList id={`seasonMenu${season._id}`}>
        <TooltipButtons
          Buttons={[
            {
              onClick: () => {
                updateSeasonModal.openModal();
              },
              label: LANG("do_modify"),
            },
            {
              onClick: () => {
                handleDeleteSeason();
              },
              label: LANG("do_delete"),
            },
            {
              onClick: () => {
                periorityModalHook.openModal();
              },
              label: LANG("chnage_priority"),
            },
          ]}
        />
      </TooltipList>
    </Fragment>
  );

  const PeriorityModal = () => (
    <JDmodal visibleOverflow {...periorityModalHook}>
      <h5>{season.name}</h5>
      <JDselect
        size={SelectBoxSize.FOUR}
        className="JDz-index-1 seasonHeader__selectPriority"
        label={LANG("priority")}
        options={priorityOption}
        {...periorityHook}
      />
      <ModalEndSection>
        <Button
          mode="flat"
          onClick={() => {
            handleChangePriority();
          }}
          label={LANG("Apply")}
          size="small"
          thema="primary"
        />
      </ModalEndSection>
    </JDmodal>
  );

  // ⭐️⭐️⭐️
  return (
    <div id={`seasonHeader${season._id}`} className="seasonHeader">
      <div
        className="seasonHeader__wrap"
        data-tip
        data-delay-hide={0}
        data-for={`seasonMenu${season._id}`}
        data-event="click"
        data-place="top"
      >
        <JDbox mr="no" clickable>
          {season.name}
        </JDbox>
      </div>
      <Menue />
      <div>
        <InputText
          style={{
            width: "100%",
          }}
          readOnly
          mb="no"
          value={`${moment(dayPickerHook.from || "").format(
            "MM/DD"
          )} ~ ${moment(dayPickerHook.to || "").format("MM/DD")}`}
        />
      </div>
      <PeriorityModal />
      <UpdateSeasonModal
        updateSeasonMu={updateSeasonMu}
        setSeasons={setSeasons}
        modalHook={updateSeasonModal}
        seasons={seasons}
        season={season}
        dayPickerHook={dayPickerHook}
      />
    </div>
  );
};

export default SeasonHeader;
