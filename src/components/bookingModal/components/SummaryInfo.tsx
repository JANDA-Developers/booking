import React, { useState, Fragment } from "react";
import { IBookingModalContext } from "../declaration";
import JDtypho from "../../../atoms/typho/Typho";
import { LANG, useModal } from "../../../hooks/hook";
import { JDalign, JDconfiger, JDmodal } from "@janda-com/front";
import InputText from "../../../atoms/forms/inputText/InputText";
import { s4, isEmpty } from "../../../utils/utils";
import Button from "../../../atoms/button/Button";
import "./SummaryInfo.scss";
import { toast } from "react-toastify";
import Align from "../../../atoms/align/Align";
import JDselect from "../../../atoms/forms/selectBox/SelectBox";
import {
  CHECK_IN_OUT_OP,
  PAYMETHOD_FOR_HOST_OP,
  BOOKING_STATUS_OP,
  PAYMENT_STATUS_OP,
  FUNNELS_OP
} from "../../../types/const";
import CheckBox from "../../../atoms/forms/checkBox/CheckBox";
import JDdayPicker from "../../../atoms/dayPicker/DayPicker";
import dayjs from "dayjs";
import { DateFormat } from "../../../types/enum";
import RoomSelectInfoTable from "./RoomSelectInfoTable";
import JDIcon from "../../../atoms/icons/Icons";

export interface IProps {
  bookingModalContext: IBookingModalContext;
}

const settingKey = "settingBookingModal";
const createSettingKey = "settingCreateBookingModal";

type TinputKeys =
  | "name"
  | "checkInOut"
  | "phoneNumber"
  | "bookingStatus"
  | "roomSelectInfo"
  | "funnel"
  | "payMethod"
  | "paymentStatus"
  | "memo"
  | "breakfast"
  | "resvDate";

const AllKeys: TinputKeys[] = [
  "name",
  "checkInOut",
  "phoneNumber",
  "bookingStatus",
  "roomSelectInfo",
  "funnel",
  "payMethod",
  "memo",
  "resvDate",
  "breakfast"
];

const DefaultCreateKeys: TinputKeys[] = [
  "name",
  "phoneNumber",
  "funnel",
  "checkInOut",
  "breakfast"
];

const DefaultKeys: TinputKeys[] = [
  "name",
  "checkInOut",
  "phoneNumber",
  "bookingStatus",
  "roomSelectInfo",
  "funnel",
  "payMethod",
  "memo",
  "resvDate",
  "breakfast"
];
const createRequireKeys: TinputKeys[] = ["name", "payMethod", "funnel"];
const requireKeys: TinputKeys[] = ["name"];

const validater = (isCreateMode: boolean, data: TinputKeys[]) => {
  const valid = isCreateMode ? createRequireKeys : requireKeys;
  let result = true;
  for (const key of valid) {
    if (!data.includes(key)) {
      result = false;
      break;
    } else result = true;
  }
  return result;
};

const getSetting = (isCreateMode: boolean) => {
  try {
    if (isCreateMode) {
      const data = JSON.parse(localStorage.getItem(createSettingKey) || "[]");
      return isEmpty(data) ? DefaultCreateKeys : data;
    } else {
      const data = JSON.parse(localStorage.getItem(settingKey) || "[]");
      return isEmpty(data) ? DefaultKeys : data;
    }
  } catch (e) {
    return isCreateMode ? DefaultCreateKeys : DefaultKeys;
  }
};

const setSetting = (isCreateMode: boolean, data: TinputKeys[]) => {
  try {
    localStorage.setItem(
      isCreateMode ? createSettingKey : settingKey,
      JSON.stringify(data)
    );
    toast.success(LANG("your_conifg_is_saved"));
  } catch (e) {}
};

interface IWrapProp {
  order?: number;
}

const Wrap: React.FC<IWrapProp> = ({ order, children }) => {
  if (order === undefined) {
    return <span />;
  }
  return (
    <div
      style={{
        order: order + 1
      }}
    >
      {children}
    </div>
  );
};

export const SummaryInfo: React.FC<IProps> = ({ bookingModalContext }) => {
  const [, doUpdate] = useState("");
  const {
    bookingNameHook,
    bookingPhoneHook,
    checkInOutHook,
    bookingStatusHook,
    funnelStatusHook,
    payMethodHook,
    memoHook,
    paymentStatusHook,
    emailHook,
    bookingData,
    resvDateHook,
    roomSelectInfo,
    breakfast: breakfastChecked,
    isCreateMode,
    setBreakfast,
    mode
  } = bookingModalContext;
  const { createdAt } = bookingData;

  const editModalHook = useModal();

  const [renderInputKeys, setRenderInputKeys] = useState<TinputKeys[]>(
    getSetting(isCreateMode)
  );

  const map = new Map<TinputKeys, number>();
  renderInputKeys.forEach((value, i) => {
    map.set(value, i);
  });

  const name = map.get("name");
  const phoneNumber = map.get("phoneNumber");
  const checkInOut = map.get("checkInOut");
  const funnel = map.get("funnel");
  const memo = map.get("memo");
  const payMethod = map.get("payMethod");
  const resvDate = map.get("resvDate");
  const breakfast = map.get("breakfast");
  const bookingStatus = map.get("bookingStatus");
  const roomSelect = map.get("roomSelectInfo");
  const paymentStatus = map.get("paymentStatus");

  return (
    <div id="SummaryInfo">
      <JDtypho>
        <JDalign flex={{ end: true }}>
          <JDtypho
            onClick={() => {
              editModalHook.openModal();
            }}
          >
            <JDalign
              flex={{
                vCenter: true
              }}
              mb="small"
            >
              <JDIcon mr="small" icon="edit" />
              {LANG("edit")}
            </JDalign>
          </JDtypho>
        </JDalign>
        <Align
          flex={{
            column: true
          }}
        >
          <Wrap order={name}>
            <InputText label={LANG("booker")} {...bookingNameHook} />
          </Wrap>
          <Wrap order={phoneNumber}>
            <InputText label={LANG("phoneNumber")} {...bookingPhoneHook} />
          </Wrap>
          <Wrap order={checkInOut}>
            <JDselect
              menuPlacement="top"
              options={CHECK_IN_OUT_OP}
              label={LANG("check_in_slash_check_out")}
              {...checkInOutHook}
            />
          </Wrap>
          <Wrap order={breakfast}>
            <CheckBox
              label={LANG("breakfast")}
              checked={breakfastChecked}
              onChange={v => {
                setBreakfast(v);
              }}
            />
          </Wrap>
          <Wrap order={funnel}>
            <JDselect
              options={FUNNELS_OP}
              label={LANG("funnels")}
              {...funnelStatusHook}
            />
          </Wrap>
          <Wrap order={memo}>
            <InputText {...memoHook} halfHeight textarea label={LANG("memo")} />
          </Wrap>
          <Wrap order={payMethod}>
            <JDselect
              {...payMethodHook}
              menuPlacement="top"
              options={PAYMETHOD_FOR_HOST_OP}
              label={LANG("method_of_payment")}
            />
          </Wrap>
          <Wrap order={paymentStatus}>
            <JDselect
              id="PaymentStatusSelecter"
              {...paymentStatusHook}
              menuPlacement="top"
              options={PAYMENT_STATUS_OP}
              label={LANG("payment_status")}
            />
          </Wrap>
          <Wrap order={resvDate}>
            <JDdayPicker
              mr={"no"}
              displayIcon={false}
              canSelectBeforeDay={false}
              {...resvDateHook}
              mode="input"
              className="JDstandard-space"
              readOnly
              label={LANG("date_of_stay")}
            />
          </Wrap>
          <Wrap order={bookingStatus}>
            <JDselect
              mr={"no"}
              {...bookingStatusHook}
              options={BOOKING_STATUS_OP}
              id="BookingStatusSelect"
              label={LANG("booking_status")}
            />
          </Wrap>
          <Wrap order={roomSelect}>
            <RoomSelectInfoTable roomSelectInfo={roomSelectInfo} />
          </Wrap>
          <Wrap>
            <InputText
              readOnly
              id="ResvDateInput"
              value={dayjs(createdAt || undefined).format(DateFormat.WITH_TIME)}
              label={LANG("reservation_date")}
              placeholder={LANG("reservation_date")}
            />
          </Wrap>
        </Align>
      </JDtypho>
      <JDmodal
        fullInMobile
        head={{
          title: isCreateMode ? LANG("summaryCreateEdit") : LANG("summaryEdit"),
          closeFn: () => {
            setRenderInputKeys(getSetting(isCreateMode));
            editModalHook.closeModal();
          }
        }}
        {...editModalHook}
        foot={
          <div className="JDmodal__paddingBottom">
            <Button
              onClick={() => {
                if (validater(isCreateMode, renderInputKeys)) {
                  setSetting(isCreateMode, renderInputKeys);
                  editModalHook.closeModal();
                } else {
                  toast(LANG("plz_insert_required"));
                }
              }}
              mode="flat"
              thema="primary"
              label={LANG("confirm")}
            />
          </div>
        }
      >
        <JDconfiger
          mb="large"
          langs={{
            enableHeader: LANG("use"),
            unableHeader: LANG("not_use"),
            // @ts-ignore
            labelFn: (value: TinputKeys) => {
              const lang = LANG.bind(LANG, "Summary");
              const valid = isCreateMode ? createRequireKeys : requireKeys;
              if (valid.includes(value)) {
                return (
                  <Align flex={{}}>
                    {lang(value)}{" "}
                    <JDtypho size="tiny" color="point">
                      (필수*)
                    </JDtypho>
                  </Align>
                );
              }
              return lang(value);
            }
          }}
          enableItems={renderInputKeys}
          onEnableChange={(enableKeys: any) => {
            setRenderInputKeys([...enableKeys]);
          }}
          allItem={AllKeys}
        />
      </JDmodal>
    </div>
  );
};

export default SummaryInfo;
