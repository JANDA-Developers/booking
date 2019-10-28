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
  LANG,
  useDrawer
} from "../../hooks/hook";
import {MutationFn} from "react-apollo";
import {to4YMMDD} from "../../utils/setMidNight";
import JDdayPicker from "../../atoms/dayPicker/DayPicker";
import DayPickerModal from "../dayPickerModal/DayPickerModal";
import {inOr} from "../../utils/C";
import Drawer from "../../atoms/drawer/Drawer";
import {IconSize} from "../../atoms/icons/Icons";

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

  const drawerHook = useDrawer(false);

  const {layoutType, useHostApp, url: requestUrl} = inAppInfoRequested;

  if (!user) return <div />;
  const {name: userName, phoneNumber} = user;
  // HOOK
  const HouseStatusHook = useSelect({
    label: LANG(status || HouseStatus.WAIT),
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

  let columns: {
    title: string;
    value: string;
    adminUi?: JSX.Element | JSX.Element[] | string;
  }[] = [
    {
      title: LANG("applied_product_type"),
      value: productName,
      adminUi: (
        <JDselect
          options={SELECT_PRODUCT_TYPE_OP}
          selectedOption={{value: productName, label: productName}}
        />
      )
    },
    {title: LANG("houseName"), value: houseName},
    {title: LANG("house_type"), value: houseType},
    {title: LANG("applicant"), value: userName},
    {
      title: LANG("is_apply_homepage"),
      value: useHostApp ? "Y" : "N"
    },
    {
      title: LANG("monthly_fee"),
      value: productPrice + ` / ${LANG("month")}`,
      adminUi: <InputText comma onChange={setPrice} value={price} />
    },
    {
      title: LANG("expire_date"),
      value: to4YMMDD(expireDate),
      adminUi: (
        <InputText
          onClick={() => {
            dayPickerModal.openModal();
          }}
          value={`${to4YMMDD(expireDateHook.from)}${LANG("till")}`}
        />
      )
    },
    {
      title: LANG("left_days"),
      value: `${daysLeftToExpire}`,
      adminUi: `${daysLeftToExpire}`
    },
    {
      title: LANG("current_status"),
      value: status || "",
      adminUi: <JDselect {...HouseStatusHook} options={PRODUCT_STATUS_OP} />
    },
    {
      title: LANG("product_memo"),
      value: description || "",
      adminUi: <InputText {...descHook} textarea />
    }
  ];

  if (drawerHook.open) {
    columns = [
      ...columns,
      {
        title: LANG("homepage_application_date"),
        value: moment(productCreateAt)
          .local()
          .format(
            `YY${LANG("year")} MM${LANG("month")} DD${LANG("date")} HH:mm`
          )
      },
      {
        title: LANG("homepage_complete_estimated_date"),
        value: moment(productCreateAt)
          .add(3, "days")
          .format(
            `YY${LANG("year")} MM${LANG("month")} DD${LANG("date")} HH:mm`
          )
      },
      {
        title: LANG("applicant_contact"),
        value: autoHypen(phoneNumber)
      },
      {
        title: LANG("homepage_develope_status"),
        value: existingHostApp ? LANG("completed") : LANG("waiting"),
        adminUi: <CheckBox {...haveHostAppHook} />
      },
      {
        title: LANG("apply_layout"),
        value: useHostApp ? layoutType : ""
      },
      {
        title: LANG("request_url"),
        value: requestUrl
      },
      {
        title: LANG("applied_url"),
        value: `${applideUrlHook.value}`,
        adminUi: <InputText {...applideUrlHook} />
      },
      {
        title: LANG("layout_cost"),
        value: autoComma(layoutPrice || 0),
        adminUi: <InputText readOnly value={layoutPrice} />
      },
      {
        title: LANG("is_layout_paied"),
        value: layoutPricePaid ? "Y" : "N",
        adminUi: <CheckBox {...layOutPricePaidHook} />
      }
    ];
  }

  return (
    <JDbox className="JDmargin-bottom0" mode="table">
      <table className="JDtable">
        <thead>
          <tr>
            <th>{LANG("item")}</th>
            <th>{LANG("status")}</th>
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
      <div className="JDstandard-margin-bottom">
        <Drawer size={IconSize.MEDIUM} {...drawerHook} />
      </div>
      <DayPickerModal
        modalHook={dayPickerModal}
        {...expireDateHook}
        format={`YY${LANG("year")} MM${LANG("month")} DD${LANG("date")} ${LANG(
          "till"
        )}`}
        displayInfo={false}
        isRange={false}
      />
      {isAdmin && (
        <Button
          className="JDstandard-margin0"
          onClick={() => {
            handleUpdateClick();
          }}
          label={LANG("change")}
          thema="primary"
        />
      )}
    </JDbox>
  );
};

export default SpecificAtion;
