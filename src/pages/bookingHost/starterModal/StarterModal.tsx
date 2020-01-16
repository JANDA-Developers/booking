import React, { useState, useRef, useCallback } from "react";
import JDmultiStep from "../../../atoms/multiStep/MultiStep";
import { IContext } from "../../bookingHost/BookingHostRouter";
import { stepFinder, s4, cardValidate } from "../../../utils/utils";
import JDmodal from "../../../atoms/modal/Modal";
import { IMG_REPO } from "../../../types/const";
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
import { RoomConfigSubmitData } from "../../../components/bookingModal/declaration";
import { DEFAULT_ROOMTYPE, DEFAULT_CARD_INFO } from "../../../types/defaults";
import Vtable, { ColumnCells } from "../../../atoms/vtable/Vtable";
import CardInfoForm from "../../outPages/reservation/components/CardInfoForm";
import { cardExpToObj } from "../../../utils/autoFormat";
import { toast } from "react-toastify";
import PreloaderModal from "../../../atoms/preloaderModal/PreloaderModal";
import PhotoFrame from "../../../atoms/photoFrame/PhotoFrame";
import ModalEndSection from "../../../atoms/modal/components/ModalEndSection";

interface IProps {
  context: IContext;
  onSubmit: (variables: initHouseVariables) => void;
  muLoading: boolean;
}

const StarterModal: React.FC<IProps> = ({ context, onSubmit, muLoading }) => {
  const modalHook = useModal(true);
  const defaultStep = stepFinder(context);
  const [step, setStep] = useState(defaultStep);
  const roomSubmitRef = useRef<any>(null);
  const houseSubmitRef = useRef<any>(null);
  const [cardInfo, setCardInfo] = useState(DEFAULT_CARD_INFO);
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
    setStep("card");
  };

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
      current: step === "card",
      name: <span>{LANG("payment_info")}</span>
    },
    {
      current: step === "check",
      name: <span>{LANG("check_init")}</span>
    }
  ];

  const Wrap: React.FC = useCallback(
    ({ children }) => (
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
    ),
    [step]
  );

  switch (step) {
    case "phoneVerification":
      return (
        <Wrap>
          <h5 id="phoneVerification">
            {LANG("please_verify_your_mobile_phone_to_ensure_smooth_service")}
          </h5>
          <ModalEndSection>
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
          </ModalEndSection>
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
              mr="no"
              id="NextBtnToRoomConfig"
              thema="primary"
              mode="flat"
              onClick={() => {
                houseSubmitRef.current?.click();
              }}
              mb="no"
              label={LANG("next_step")}
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
              mb="no"
              label={LANG("prev_step")}
            />
            <Button
              id="NextBtnToCard"
              thema="primary"
              mode="flat"
              onClick={() => {
                roomSubmitRef.current?.click();
              }}
              mb="no"
              label={LANG("next_step")}
            />
          </div>
        </Wrap>
      );
    case "card":
      return (
        <Wrap>
          <PhotoFrame
            mb="normal"
            unStyle
            src={`${IMG_REPO}booking_app/describe/jd_booking_free_ex_banner.jpg`}
          />
          <CardInfoForm
            forHost
            column="2"
            cardInfo={cardInfo}
            setCardInfo={setCardInfo}
          />
          <Button
            thema="primary"
            mode="flat"
            onClick={() => {
              setStep("createRoom");
            }}
            mb="no"
            label={LANG("prev_step")}
          />
          <Button
            id="NextBtnToFinish"
            thema="primary"
            mode="flat"
            onClick={() => {
              const { msg, result } = cardValidate(cardInfo);
              if (result) setStep("check");
              else toast.warn(msg);
            }}
            mb="no"
            label={LANG("next_step")}
          />
        </Wrap>
      );
    case "check":
      return (
        <Wrap>
          <ModalEndSection className="staterModal__createRoom_finish_Btn">
            <Vtable>
              <ColumnCells datas={initInfoDataTable} />
            </Vtable>
            <Button
              thema="primary"
              mode="flat"
              onClick={() => {
                setStep("card");
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

                const expObj = cardExpToObj(cardInfo.exp);

                onSubmit({
                  param: {
                    cardInfo: {
                      cardNo: cardInfo.cardNumber,
                      cardPw: cardInfo.cardPassword,
                      expMonth: expObj.month,
                      expYear: expObj.year,
                      idNo: cardInfo.idNumber
                    },
                    createHouseInput: InitHouseData,
                    createRoomTypesInput: roomTypesData as any
                  }
                });
              }}
              mode="flat"
              label={LANG("exit_room_settings")}
            />
            <PreloaderModal loading={muLoading} />
          </ModalEndSection>
        </Wrap>
      );
    default:
      return <div />;
  }
};
export default StarterModal;
