import React, { useState, useRef, Fragment, useEffect } from "react";
import JDmultiStep from "../../../atoms/multiStep/MultiStep";
import { IContext } from "../../bookingHost/BookingHostRouter";
import { stepFinder, s4 } from "../../../utils/utils";
import JDmodal from "../../../atoms/modal/Modal";
import { useModal, LANG } from "../../../hooks/hook";
import "./StarterModal.scss";
import {
  initHouseVariables,
  CreateHouseInput,
  UpsertRoomTypeInput
} from "../../../types/api";
import Button from "../../../atoms/button/Button";
import RoomConfig from "../roomConfig/RoomConfig";
import PhoneVerificationModalWrap from "../../../components/phoneVerificationModal/PhoneVerificationModalWrap";
import CreateHouse from "../createHouse/CreateHouse";
import { IStepsStart } from "../../../utils/stepFinder";
import { RoomConfigSubmitData } from "../../../components/bookingModal/declaration";
import { DEFAULT_ROOMTYPE } from "../../../types/defaults";
import Vtable, { ColumnCells } from "../../../atoms/vtable/Vtable";
import { validate } from "graphql";

interface IProps {
  context: IContext;
  onSubmit: (variables: initHouseVariables) => void;
}

const StarterModal: React.FC<IProps> = ({ context, onSubmit }) => {
  const modalHook = useModal(true);
  const defaultStep = stepFinder(context);
  const [step, setStep] = useState(defaultStep);

  console.log("step");
  console.log(step);

  const roomSubmitRef = useRef<any>(null);
  const houseSubmitRef = useRef<any>(null);
  const [InitHouseData, setInitHouseData] = useState<CreateHouseInput | null>();
  const [roomTypesData, setRoomsTypeData] = useState<UpsertRoomTypeInput[]>([]);
  const {
    user: { phoneNumber }
  } = context;
  const phoneVerificationModalHook = useModal();

  const handleCreateHouseSubmit = (param: initHouseVariables) => {
    setInitHouseData(param.param.createHouseInput);
    setStep("createRoom");
  };

  const handleSubmitCreateRoomTypes = (param: RoomConfigSubmitData) => {
    setRoomsTypeData(param.createDatas);
    setStep("check");
  };

  const tempSteps: IStepsStart[] = [
    "phoneVerification",
    "houseCreate",
    "createRoom"
  ];

  let roomCount = 0;
  roomTypesData.forEach(rt => {
    roomCount += rt.rooms?.length || 0;
  });

  const initInfoDataTable = [
    {
      label: "houseName",
      Component: () => <span>{InitHouseData?.name}</span>
    },
    {
      label: "houseType",
      Component: () => <span>{InitHouseData?.houseType}</span>
    },
    {
      label: "roomType count",
      Component: () => <span>{roomTypesData.length}</span>
    },
    {
      label: "room count",
      Component: () => <span>{roomCount}</span>
    }
  ];

  const movableSteps = defaultStep === "phoneVerification" ? [] : [1, 2];

  const staterSteps = [
    {
      current: step === "phoneVerification",
      name: <span>{LANG("auth")}</span>
    },
    {
      current: step === "houseCreate",
      name: <span>{LANG("house_create")}</span>
    },
    {
      current: step === "createRoom",
      name: <span>{LANG("create_room")}</span>
    },
    {
      current: step === "check",
      name: <span>{LANG("check_init")}</span>
    }
  ];

  const Wrap: React.FC = ({ children }) => (
    <JDmodal
      className="staterModal"
      {...modalHook}
      isUnderHeader
      onRequestClose={() => {}}
    >
      <div className="staterModal__stepsWrap">
        <JDmultiStep steps={staterSteps} />
      </div>
      <div className="dashboard__stepsWrap">{children}</div>
    </JDmodal>
  );

  switch (step) {
    case "phoneVerification":
      return (
        <Wrap>
          <h5 id="phoneVerification">
            {LANG("please_verify_your_mobile_phone_to_ensure_smooth_service")}
          </h5>
          <div className="JDmodal__endSection">
            <Button
              id="StarterHeaderPhoneVerificationBtn"
              onClick={() => {
                phoneVerificationModalHook.openModal();
              }}
              mode="border"
              thema="primary"
              label={LANG("phone_authenticate")}
            />
            {/* 핸드폰 인증모달 */}
            <PhoneVerificationModalWrap
              callBackPhoneVerified={() => {
                phoneVerificationModalHook.closeModal();
                setStep("houseCreate");
              }}
              phoneNumber={phoneNumber}
              modalHook={phoneVerificationModalHook}
            />
          </div>
        </Wrap>
      );
    case "houseCreate":
      return (
        <Wrap>
          <div className="JDsectionDistroy steps__createHouseWrap">
            <CreateHouse
              houseData={InitHouseData}
              onSubmit={handleCreateHouseSubmit}
              submitRef={houseSubmitRef}
              context={context}
            />
            <Button
              id="NextBtnToRoomConfig"
              thema="primary"
              mode="flat"
              onClick={() => {
                houseSubmitRef.current?.click();
              }}
              className="JDmargin-bottom0"
              label={"next step"}
            />
          </div>
        </Wrap>
      );
    case "createRoom":
      return (
        <Wrap>
          <div className="staterModal__createRoom JDsectionDistroy">
            <RoomConfig
              isStart
              submitRef={roomSubmitRef}
              onSubmit={handleSubmitCreateRoomTypes}
              context={context}
              defaultData={{
                roomTypesData: [],
                defaultCreateRoomType: roomTypesData.map(RT => ({
                  ...RT,
                  ...DEFAULT_ROOMTYPE,
                  peopleCountMax: 0,
                  _id: s4()
                }))
              }}
            />
            <Button
              thema="primary"
              mode="flat"
              onClick={() => {
                setStep("houseCreate");
              }}
              className="JDmargin-bottom0"
              label={"prev step"}
            />
            <Button
              id="NextBtnToFinish"
              thema="primary"
              mode="flat"
              onClick={() => {
                roomSubmitRef.current?.click();
              }}
              className="JDmargin-bottom0"
              label={"next step"}
            />
          </div>
        </Wrap>
      );
    case "check":
      return (
        <Wrap>
          <div className="staterModal__createRoom_finish_Btn JDmodal__endSection">
            <Vtable>
              <ColumnCells datas={initInfoDataTable} />
            </Vtable>
            <Button
              thema="primary"
              mode="flat"
              onClick={() => {
                setStep("createRoom");
              }}
              className="JDmargin-bottom0"
              label={"prev step"}
            />
            <Button
              id="SettingFinishBtn"
              thema="primary"
              onClick={() => {
                if (!InitHouseData) return;
                localStorage.setItem("popUpAdditionalConfigModal", "Y");
                onSubmit({
                  param: {
                    createHouseInput: InitHouseData,
                    createRoomTypesInput: roomTypesData as any
                  }
                });
              }}
              mode="flat"
              size="long"
              label={LANG("exit_room_settings")}
            />
          </div>
        </Wrap>
      );
    default:
      return <div />;
  }
};
export default StarterModal;
