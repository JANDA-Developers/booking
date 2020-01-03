import React, { Fragment } from "react";
import JDmodal from "../../../../atoms/modal/Modal";
import { IUseModal, IUseDayPicker, LANG } from "../../../../hooks/hook";
import { ISeason } from "../../../../types/interface";
import JDdayPicker from "../../../../atoms/dayPicker/DayPicker";
import InputText from "../../../../atoms/forms/inputText/InputText";
import { updateSeason, updateSeasonVariables } from "../../../../types/api";
import { MutationFn } from "react-apollo";
import Button from "../../../../atoms/button/Button";
import { to4YMMDD } from "../../../../utils/setMidNight";

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
        displayIcon={false}
        displayYear={false}
        format={"MM/DD"}
        mode="input"
        {...dayPickerHook}
        isRange
        onChangeDate={(from, to) => {
          if (from && to) {
            season.end = to4YMMDD(to);
            season.start = to4YMMDD(from);
            setSeasons([...seasons]);
          }
        }}
      />
    </div>
    <div className="JDmodal__endSection">
      <Button
        mode="flat"
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
        label={LANG("confrim")}
        thema={"primary"}
      />
    </div>
  </JDmodal>
);

export default UpdateSeasonModal;
