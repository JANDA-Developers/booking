import React from "react";
import { InputText, useInput, JDbutton, JDlabel } from "@janda-com/front/build";
import { JDphotoFrame, JDalign } from "@janda-com/front";
import { LANG } from "../../../../hooks/hook";
import { HouseOptionsKey } from "../../../../types/enum";
import { IAddtionProp } from "../components/ConfigBlock";
import { useMutation } from "@apollo/react-hooks";
import {
  addHouseConfigOptions,
  addHouseConfigOptionsVariables
} from "../../../../types/api";
import { ADD_HOUSE_CONFIG_OPTIONS } from "../../../../apollo/queries";
import client from "../../../../apollo/apolloClient";
import { onCompletedMessage, getOptionsObj } from "../../../../utils/utils";

interface IMsgPariProp {
  inputHook: any;
  label: string;
  img?: string;
}

const MsgPair: React.FC<IMsgPariProp> = ({ inputHook, label, img }) => (
  <JDalign
    flex={{
      oneone: true
    }}
  >
    <InputText textarea label={label} {...inputHook} />
    <JDalign
      flex={{
        column: true
      }}
    >
      <div>
        <JDlabel txt="예시" />
      </div>
      <JDphotoFrame
        style={{
          flexGrow: 1
        }}
        src={img}
        mb="large"
        unStyle={false}
      />
    </JDalign>
  </JDalign>
);

export const InfoSetting: React.FC<IAddtionProp> = ({ context, updateFn }) => {
  const {
    house: { _id: houseId },
    houseConfig
  } = context;

  const {
    CheckMsg,
    PayPrecaution,
    ResvCautionMsg,
    ResvCompeleteMsg
  } = getOptionsObj(houseConfig.options);

  const [addHouseConfigMu, { loading: addHouseConfigLoading }] = useMutation<
    addHouseConfigOptions,
    addHouseConfigOptionsVariables
  >(ADD_HOUSE_CONFIG_OPTIONS, {
    client,
    onCompleted: ({ AddHouseConfigOptions }) => {
      onCompletedMessage(
        AddHouseConfigOptions,
        "설정이 저장 되었습니다.",
        "저장실패"
      );
    },
    notifyOnNetworkStatusChange: true,
    refetchQueries: [],
    awaitRefetchQueries: true
  });

  const ResvCompeleteMsgHook = useInput(ResvCompeleteMsg || "");
  const ResvCautionMsgHook = useInput(ResvCautionMsg || "");
  const PayPrecautionHook = useInput(CheckMsg || "");
  const CheckPageMsgHook = useInput(PayPrecaution || "");

  const handleUpdateBtn = () => {
    addHouseConfigMu({
      variables: {
        houseId,
        options: [
          {
            key: HouseOptionsKey.ResvCautionMsg,
            value: ResvCautionMsgHook.value
          },
          {
            key: HouseOptionsKey.PayPrecaution,
            value: PayPrecautionHook.value
          },
          {
            key: HouseOptionsKey.ResvCompeleteMsg,
            value: ResvCompeleteMsgHook.value
          },
          {
            key: HouseOptionsKey.CheckMsg,
            value: CheckPageMsgHook.value
          }
        ]
      }
    });
  };

  return (
    <div>
      <div className="additionDetail__titleTopRight">
        <JDbutton
          size="tiny"
          onClick={() => {
            handleUpdateBtn();
          }}
          thema="point"
          label={LANG("save")}
        />
      </div>

      <MsgPair
        inputHook={ResvCompeleteMsgHook}
        img="https://s3.ap-northeast-2.amazonaws.com/booking.stayjanda.files/booking_app/describe/resv_compelete.jpg"
        label={LANG("resv_complete_msg")}
      />
      <MsgPair
        inputHook={ResvCautionMsgHook}
        img="https://s3.ap-northeast-2.amazonaws.com/booking.stayjanda.files/booking_app/describe/resv_caution.jpg"
        label={LANG("resv_caution_msg")}
      />
      <MsgPair
        inputHook={PayPrecautionHook}
        img="https://s3.ap-northeast-2.amazonaws.com/booking.stayjanda.files/booking_app/describe/pay_pre_caution.jpg"
        label={LANG("pay_precaution")}
      />
      <MsgPair
        inputHook={CheckPageMsgHook}
        img=""
        label={LANG("check_point_msg")}
      />
    </div>
  );
};
