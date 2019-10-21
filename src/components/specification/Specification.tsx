import JDbox from "../../atoms/box/JDbox";
import {
  getSpecification_GetHouse_house,
  UserRole,
  updateUserForSU,
  updateUserForSUVariables
} from "../../types/api";
import {Fragment, useState} from "react";
import moment from "moment";
import React from "react";
import {autoHypen, isEmpty, autoComma, stringToPrice} from "../../utils/utils";
import {DEFAUT_PRODUCT, DEFAUT_APP_INFO_REQUEST} from "../../types/defaults";
import Preloader from "../../atoms/preloader/Preloader";
import JDselect from "../../atoms/forms/selectBox/SelectBox";
import InputText from "../../atoms/forms/inputText/InputText";
import {
  LAYOUT_TYPE_OP,
  SELECT_PRODUCT_TYPE_OP,
  HouseStatusKr,
  HouseStatus,
  PRODUCT_STATUS_OP,
  HouseType
} from "../../types/enum";
import Button from "../../atoms/button/Button";
import CheckBox from "../../atoms/forms/checkBox/CheckBox";
import {
  useSelect,
  useCheckBox,
  useInput,
  useDayPicker,
  useModal,
  LANG
} from "../../hooks/hook";
import {MutationFn} from "react-apollo";
import {to4YMMDD} from "../../utils/setMidNight";
import JDdayPicker from "../../atoms/dayPicker/DayPicker";
import DayPickerModal from "../dayPickerModal/DayPickerModal";
import {inOr} from "../../utils/C";

interface IProps {
  specification: getSpecification_GetHouse_house;
  updateUserForSu: MutationFn<updateUserForSU, updateUserForSUVariables>;
  loading: boolean;
  isAdmin?: boolean;
}

export const SpecificAtion: React.FC<IProps> = ({
  specification,
  loading,
  isAdmin,
  updateUserForSu
}) => {
  const {
    _id,
    product,
    createdAt,
    houseType,
    name: houseName,
    updatedAt,
    status,
    user
  } = specification;

  const {
    appliedUrl,
    _id: productId,
    name: productName,
    createdAt: productCreateAt,
    price: productPrice,
    existingHostApp,
    description,
    layoutPrice,
    roomCount,
    roomCountExtraCharge,
    appInfoRequested,
    layoutPricePaid,
    productType,
    canHaveHostApp,
    discountedPrice,
    bookingCountExtraCharge,
    expireDate,
    daysLeftToExpire,
    isExpired
  } = product || DEFAUT_PRODUCT;

  const lastRequestIndex = !isEmpty(appInfoRequested)
    ? appInfoRequested.length - 1
    : 0;
  const inAppInfoRequested = !isEmpty(appInfoRequested)
    ? appInfoRequested[lastRequestIndex]
    : DEFAUT_APP_INFO_REQUEST;

  const {layoutType, useHostApp, url: requestUrl} = inAppInfoRequested;

  if (!user) return <div />;
  const {name: userName, phoneNumber} = user;

  // HOOK
  const HouseStatusHook = useSelect({
    label: HouseStatusKr[status || HouseStatus.WAIT],
    value: status || HouseStatus.WAIT
  });

  const dayPickerModal = useModal(false);
  const [price, setPrice] = useState(productPrice || 0);
  const layOutPricePaidHook = useCheckBox(layoutPricePaid || false);
  const applideUrlHook = useInput(appliedUrl || "");
  const haveHostAppHook = useCheckBox(existingHostApp);
  const descHook = useInput(description || "");
  const expireDateHook = useDayPicker(expireDate, expireDate);

  const handleUpdateClick = () => {
    if (!expireDateHook.from) return;
    updateUserForSu({
      variables: {
        productParams: {
          appliedUrl: applideUrlHook.value,
          description: descHook.value,
          existingHostApp: haveHostAppHook.checked,
          price,
          layoutPricePaid: layOutPricePaidHook.checked,
          expireDate: expireDateHook.from!
        },
        productId: productId,
        houseId: specification._id,
        status: inOr(HouseStatusHook.selectedOption, "value", HouseStatus.WAIT)
      }
    });
  };

  const columns: {
    title: string;
    value: string;
    adminUi?: JSX.Element | JSX.Element[] | string;
  }[] = [
    {
      title: "적용상품타입",
      value: productName,
      adminUi: (
        <JDselect
          options={SELECT_PRODUCT_TYPE_OP}
          selectedOption={{value: productName, label: productName}}
        />
      )
    },
    {title: "숙소명", value: houseName},
    {title: "숙소타입", value: houseType},
    {title: "신청자", value: userName},
    {
      title: "홈페이지 신청여부",
      value: useHostApp ? "Y" : "N"
    },
    {
      title: "홈페이지 신청일시",
      value: moment(productCreateAt)
        .local()
        .format(`YY년 MM${LANG("month")} DD일 HH:mm`)
    },
    {
      title: "홈페이지 예상완료일시",
      value: moment(productCreateAt)
        .add(3, "days")
        .format(`YY년 MM${LANG("month")} DD일 HH:mm`)
    },
    {
      title: "홈페이지 작업 현황",
      value: existingHostApp ? "완료" : "대기",
      adminUi: <CheckBox {...haveHostAppHook} />
    },
    {
      title: "신청레이아웃",
      value: useHostApp ? layoutType : ""
    },
    {
      title: "요청URL",
      value: requestUrl
    },
    {
      title: "적용URL",
      value: `${applideUrlHook.value}`,
      adminUi: <InputText {...applideUrlHook} />
    },
    {
      title: "레이아웃 비용",
      value: autoComma(layoutPrice || 0),
      adminUi: <InputText readOnly value={layoutPrice} />
    },
    {
      title: "레이아웃 비용 입금상태",
      value: layoutPricePaid ? "Y" : "N",
      adminUi: <CheckBox {...layOutPricePaidHook} />
    },
    {
      title: "상품금액",
      value: productPrice + ` / ${LANG("month")}`,
      adminUi: <InputText comma onChange={setPrice} value={price} />
    },
    {
      title: "만료일",
      value: to4YMMDD(expireDate),
      adminUi: (
        <InputText
          onClick={() => {
            dayPickerModal.openModal();
          }}
          value={`${to4YMMDD(expireDate)}까지`}
        />
      )
    },
    {
      title: "남은일수",
      value: `${daysLeftToExpire}`,
      adminUi: `${daysLeftToExpire}`
    },
    {
      title: "현재상태",
      value: status || "",
      adminUi: <JDselect {...HouseStatusHook} options={PRODUCT_STATUS_OP} />
    },
    {
      title: "상품 메모",
      value: description || "",
      adminUi: <InputText {...descHook} textarea />
    },
    {
      title: "신청자 연락처",
      value: autoHypen(phoneNumber)
    }
  ];

  return (
    <JDbox mode="table">
      <table className="JDtable">
        <thead>
          <tr>
            <th>항목</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {columns.map(column => (
            <tr key={column.title}>
              <td>{column.title}</td>
              <td>{isAdmin ? column.adminUi || column.value : column.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <DayPickerModal
        input
        modalHook={dayPickerModal}
        {...expireDateHook}
        format={`YY년 MM${LANG("month")} DD일 까지`}
        isRange={false}
      />

      {isAdmin && (
        <Button
          className="JDstandard-margin0"
          onClick={() => {
            handleUpdateClick();
          }}
          label="변경"
          thema="primary"
        />
      )}
    </JDbox>
  );
};

export default SpecificAtion;
