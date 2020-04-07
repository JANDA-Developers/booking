import React, { useState, useRef, useCallback, useEffect } from "react";
import JDmultiStep from "../../../atoms/multiStep/MultiStep";
import { IContext } from "../../bookingHost/BookingHostRouter";
import {
  stepFinder,
  s4,
  cardValidate,
  queryDataFormater,
} from "../../../utils/utils";
import JDmodal from "../../../atoms/modal/Modal";
import { IMG_REPO, DO_TUTO_KEY } from "../../../types/const";
import { useModal, LANG, useSelect } from "../../../hooks/hook";
import "./StarterModal.scss";
import {
  initHouseVariables,
  CreateHouseInput,
  UpsertRoomTypeInput,
  getAllProductTypes,
  PricingType,
} from "../../../types/api";
import Button from "../../../atoms/button/Button";
import { SELECT_PRODUCT_TYPE_OP } from "../../../types/const";
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
import JDlist from "../../../atoms/list/List";
import { currentWinSize } from "../../../utils/currentWinSize";
import { useQuery } from "@apollo/react-hooks";
import { GET_PRODUCTS_TYPES } from "../../../apollo/queries";
import client from "../../../apollo/apolloClient";
import JDselect from "../../../atoms/forms/selectBox/SelectBox";
import Help from "../../../atoms/Help/Help";
import { arraySum } from "../../../utils/elses";

interface IProps {
  context: IContext;
  onSubmit: (variables: initHouseVariables) => void;
  muLoading: boolean;
}

let InitHouseTemp: CreateHouseInput;
let InitRoomTypeTemp: any;
let InitCardTemp: any = DEFAULT_CARD_INFO;

try {
  InitHouseTemp =
    JSON.parse(localStorage.getItem("initHouseTemp") as any) || undefined;
  InitRoomTypeTemp =
    JSON.parse(localStorage.getItem("initRoomTypesTemp") as any) || null;
  InitCardTemp =
    JSON.parse(localStorage.getItem("initCardTemp") as any) ||
    DEFAULT_CARD_INFO;
} catch (e) {
  console.error(e);
}
const StarterModal: React.FC<IProps> = ({ context, onSubmit, muLoading }) => {
  const modalHook = useModal(true);
  const { data: productTypeData, loading } = useQuery<getAllProductTypes>(
    GET_PRODUCTS_TYPES,
    {
      client,
    }
  );
  const defaultStep = stepFinder(context);
  const [step, setStep] = useState(defaultStep);
  const roomSubmitRef = useRef<any>(null);
  const houseSubmitRef = useRef<any>(null);
  const [cardInfo, setCardInfo] = useState(InitCardTemp);
  const [InitHouseData, setInitHouseData] = useState<CreateHouseInput | null>(
    InitHouseTemp
  );
  const [roomTypesData, setRoomsTypeData] = useState<UpsertRoomTypeInput[]>(
    InitRoomTypeTemp || []
  );

  const {
    user: { phoneNumber },
  } = context;
  const phoneVerificationModalHook = useModal();
  const productTypeHook = useSelect(SELECT_PRODUCT_TYPE_OP[0]);

  const productTypes = queryDataFormater(
    productTypeData,
    "GetAllProductTypes",
    "productTypes",
    undefined
  );

  const selectedProductType = productTypes?.find(
    (pt) => pt.name === productTypeHook.selectedOption?.value
  );

  const handleCreateHouseSubmit = (param: initHouseVariables) => {
    setInitHouseData(param.param.createHouseInput);
    setStep("createRoom");
  };

  const handleSubmitCreateRoomTypes = (param: RoomConfigSubmitData) => {
    const roomCount = arraySum(
      param.updateCreateDatas.map((rt) => rt.rooms?.length || 0)
    );
    if (roomCount > 20) {
      productTypeHook.onChange(SELECT_PRODUCT_TYPE_OP[1]);
    } else {
      productTypeHook.onChange(SELECT_PRODUCT_TYPE_OP[0]);
    }
    setRoomsTypeData(param.updateCreateDatas);
    setStep("card");
  };

  let roomCount = 0;
  roomTypesData.forEach((rt) => {
    roomCount += rt.rooms?.length || 0;
  });

  const initInfoDataTable = [
    {
      label: LANG("houseName"),
      Component: () => <span>{InitHouseData?.name}</span>,
    },
    {
      label: LANG("house_type"),
      Component: () => <span>{InitHouseData?.houseType}</span>,
    },
    {
      label: LANG("roomType_count"),
      Component: () => <span>{roomTypesData.length}</span>,
    },
    {
      label: LANG("room_count"),
      Component: () => <span>{roomCount}</span>,
    },
  ];

  const staterSteps = [
    {
      current: step === "phoneVerification",
      name: <span>{LANG("auth")}</span>,
    },
    {
      current: step === "houseCreate",
      name: <span>{LANG("house_create")}</span>,
    },
    {
      current: step === "createRoom",
      name: <span>{LANG("create_room")}</span>,
    },
    {
      current: step === "card",
      name: <span>{LANG("payment_info")}</span>,
    },
    {
      current: step === "check",
      name: <span>{LANG("check_init")}</span>,
    },
  ];

  const Wrap: React.FC = useCallback(
    ({ children }) => (
      <JDmodal className="staterModal" {...modalHook} isUnderHeader>
        <div className="staterModal__stepsWrap">
          <JDmultiStep steps={staterSteps} />
        </div>
        <div className="dashboard__stepsWrap">{children}</div>
      </JDmodal>
    ),
    [step]
  );

  useEffect(() => {
    const initCardTemp = JSON.stringify(cardInfo);
    localStorage.setItem("initCardTemp", initCardTemp);

    const initRoomTypesTemp = JSON.stringify(roomTypesData);
    localStorage.setItem("initRoomTypesTemp", initRoomTypesTemp);

    const initHouseTemp = JSON.stringify(InitHouseData);
    localStorage.setItem("initHouseTemp", initHouseTemp);
  }, [step]);

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
                const initHouseTemp = JSON.stringify(InitHouseData);
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
                // @ts-ignore
                defaultAddTemp: roomTypesData.map((RT) => ({
                  ...DEFAULT_ROOMTYPE,
                  ...RT,
                  _id: s4(),
                })),
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
            mb="no"
            unStyle
            src={`${IMG_REPO}booking_app/describe/jd_booking_free_ex_banner.jpg`}
          />
          <JDlist
            mr="no"
            className="staterModal__cardNotiList"
            size="small"
            linePoint="- "
            contents={[
              LANG("pay_regist_pay_notice1"),
              LANG("pay_regist_pay_notice2"),
            ]}
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
            <div className="JDstandard-margin-bottom">
              <JDselect
                mr="no"
                mb="small"
                {...productTypeHook}
                options={SELECT_PRODUCT_TYPE_OP}
              />
              <span>
                <span className="JDsmall-text">
                  {LANG("product_type_desc")(selectedProductType?.price || 0)}{" "}
                </span>
                <Help tooltip={LANG("product_type_help_txt")} />
              </span>
            </div>
            <Vtable mr="no">
              <ColumnCells datas={initInfoDataTable} />
            </Vtable>
            <JDlist
              size="small"
              linePoint="*"
              contents={[
                LANG("pay_check_1dollor"),
                LANG("dollor1_will_be_refund_immediatly"),
              ]}
            />
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
                localStorage.setItem(DO_TUTO_KEY, "Y");
                localStorage.setItem("popUpAdditionalConfigModal", "Y");

                const expObj = cardExpToObj(
                  cardInfo.expMonth + cardInfo.expYear
                );

                onSubmit({
                  param: {
                    selectedProductType: selectedProductType?._id,
                    cardInfo: {
                      cardNo: cardInfo.cardNo,
                      cardPw: cardInfo.cardPw,
                      expMonth: expObj.month,
                      expYear: expObj.year,
                      idNo: cardInfo.idNo,
                    },
                    createHouseInput: InitHouseData,
                    createRoomTypesInput: roomTypesData as any,
                  },
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
