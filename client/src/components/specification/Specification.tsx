import JDbox from "../../atoms/box/JDbox";
import {
  getSpecification_GetHouse_house,
  updateProductForSU,
  updateProductForSUVariables
} from "../../types/api";
import {Fragment, useState} from "react";
import moment from "moment";
import React from "react";
import {autoHypen, isEmpty, autoComma} from "../../utils/utils";
import {DEFAULT_PRODUCT, DEFAULT_APP_INFO_REQUEST} from "../../types/defaults";
import Preloader from "../../atoms/preloader/Preloader";
import JDselect from "../../atoms/forms/selectBox/SelectBox";
import InputText from "../../atoms/forms/inputText/InputText";
import {
  LAYOUT_TYPE_OP,
  SELECT_PRODUCT_TYPE_OP,
  ProductStatusKr,
  ProductStatus,
  PRODUCT_STATUS_OP
} from "../../types/enum";
import Button from "../../atoms/button/Button";
import CheckBox from "../../atoms/forms/checkBox/CheckBox";
import {useSelect, useCheckBox, useInput} from "../../actions/hook";
import {MutationFn} from "react-apollo";

interface IProps {
  specification: getSpecification_GetHouse_house | undefined;
  updateProductForSU: MutationFn<
    updateProductForSU,
    updateProductForSUVariables
  >;
  loading: boolean;
  isAdmin?: boolean;
}

const defaultSpecification = {
  name: "",
  __typename: "House",
  _id: "",
  createdAt: "",
  hostApplication: null,
  houseType: "",
  product: null,
  updatedAt: "",
  user: null
};

export const SpecificAtion: React.SFC<IProps> = ({
  specification = defaultSpecification,
  loading,
  isAdmin,
  updateProductForSU
}) => {
  const {
    _id,
    product,
    createdAt,
    houseType,
    name: houseName,
    updatedAt,
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
    status
  } = product || DEFAULT_PRODUCT;

  const lastRequestIndex = !isEmpty(appInfoRequested)
    ? appInfoRequested.length - 1
    : 0;
  const inAppInfoRequested = !isEmpty(appInfoRequested)
    ? appInfoRequested[lastRequestIndex]
    : DEFAULT_APP_INFO_REQUEST;

  const {
    __typename,
    isDone: isHomePageDone,
    layoutType,
    requestedDate,
    useHostApp,
    url: requestUrl
  } = inAppInfoRequested;

  if (!user) return <div />;
  const {name: userName, email, isPhoneVerified, phoneNumber} = user;

  // HOOK
  const productStatusHook = useSelect({
    label: ProductStatusKr[status || ProductStatus.WAIT],
    value: status || ProductStatus.WAIT
  });
  const ProductPriceHook = useState(productPrice || 0);
  const layOutPricePaidHook = useCheckBox(layoutPricePaid || false);
  const applideUrlHook = useInput(appliedUrl || "");
  const haveHostAppHook = useCheckBox(existingHostApp);
  const descHook = useState(description || "");

  const handleUpdateClick = () => {
    updateProductForSU({
      variables: {
        params: {
          appliedUrl: applideUrlHook.value,
          description: descHook[0],
          existingHostApp: haveHostAppHook.checked,
          price: ProductPriceHook[0],
          layoutPricePaid: layOutPricePaidHook.checked,
          status: productStatusHook.selectedOption
            ? productStatusHook.selectedOption.value
            : ProductStatus.WAIT
        },
        productId: productId
      }
    });
  };

  const columns: {
    title: string;
    value: string;
    adminUi?: JSX.Element | JSX.Element[];
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
        .format("YY년 MM월 DD일 HH:mm")
    },
    {
      title: "홈페이지 예상완료일시",
      value: moment(productCreateAt)
        .add(3, "days")
        .format("YY년 MM월 DD일 HH:mm")
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
      value: "-",
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
      value: productPrice + " / 월",
      adminUi: <InputText value={productPrice} />
    },
    {
      title: "현재상태",
      value: status || "",
      adminUi: <JDselect {...productStatusHook} options={PRODUCT_STATUS_OP} />
    },
    {
      title: "관리자 메모",
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

      {isAdmin && (
        <Button
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
