import React, {Fragment} from "react";
import JDmodal from "../../../../atoms/modal/Modal";
import {IUseModal, IUseDayPicker} from "../../../../actions/hook";
import {ISeason} from "../../../../types/interface";
import JDdayPicker from "../../../../atoms/dayPicker/DayPicker";
import InputText from "../../../../atoms/forms/inputText/InputText";
import {updateSeason, updateSeasonVariables} from "../../../../types/api";
import {MutationFn} from "react-apollo";
import Button from "../../../../atoms/button/Button";
import {set4YMMDD} from "../../../../utils/setMidNight";

interface IProps {
  season: ISeason;
  seasons: ISeason[];
  setSeasons: React.Dispatch<React.SetStateAction<ISeason[]>>;
  updateSeasonMu: MutationFn<updateSeason, updateSeasonVariables>;
  modalHook: IUseModal;
  dayPickerHook: IUseDayPicker;
}

const UpdateSeasonModal: React.FC<IProps> = ({
  modalHook,
  season,
  updateSeasonMu,
  setSeasons,
  seasons,
  dayPickerHook
}) => (
  <JDmodal visibleOverflow {...modalHook}>
    <h5>{season.name}</h5>
    <div>
      <InputText
        defaultValue={season.name}
        onBlur={e => {
          season.name = e.currentTarget.value;
          setSeasons([...seasons]);
        }}
        className="JDmargin-bottom0--wmdUp"
      />
    </div>
    <div>
      <JDdayPicker
        calenaderPosition="center"
        inputClassName="JDmargin-bottom0--wmdUp"
        canSelectBeforeDay={true}
        showInputIcon={false}
        displayYear={false}
        format={"MM/DD"}
        input
        {...dayPickerHook}
        isRange
        onChangeDate={(from, to) => {
          if (from && to) {
            season.end = set4YMMDD(to);
            season.start = set4YMMDD(from);
            setSeasons([...seasons]);
          }
        }}
      />
    </div>
    <div className="JDmodal__endSection">
      <Button
        onClick={() => {
          updateSeasonMu({
            variables: {
              name: season.name,
              seasonId: season._id,
              start: season.start,
              end: season.end
            }
          });
          modalHook.closeModal();
        }}
        label="확인"
        thema={"primary"}
      />
    </div>
  </JDmodal>
);

export default UpdateSeasonModal;
