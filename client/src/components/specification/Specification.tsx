import JDbox from "../../atoms/box/JDbox";
import {getSpecification_GetHouse_house} from "../../types/api";
import {Fragment} from "react";
import moment from "moment";
import React from "react";
import {autoHypen, isEmpty} from "../../utils/utils";
import {DEFAULT_PRODUCT, DEFAULT_APP_INFO_REQUEST} from "../../types/defaults";
import Preloader from "../../atoms/preloader/Preloader";

interface IProps {
  specification: getSpecification_GetHouse_house | undefined;
  loading: boolean;
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
  loading
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
    bookingCountExtraCharge
  } = product || DEFAULT_PRODUCT;

  const lastRequestIndex = !isEmpty(appInfoRequested)
    ? appInfoRequested.length - 1
    : 0;
  const inAppInfoRequested = !isEmpty(appInfoRequested)
    ? appInfoRequested[lastRequestIndex]
    : DEFAULT_APP_INFO_REQUEST;

  console.log("inAppInfoRequested");
  console.log(inAppInfoRequested);

  const {
    __typename,
    isDone: isHomePageDone,
    layoutType,
    requestedDate,
    url: requestUrl
  } = inAppInfoRequested;

  const {name: userName, email, isPhoneVerified, phoneNumber} = user!;

  const columns: {title: string; value: string}[] = [
    {
      title: "적용상품",
      value: productName
    },
    {title: "숙소명", value: houseName},
    {title: "숙소타입", value: houseType},
    {title: "신청자", value: userName},
    {
      title: "홈페이지 신청여부",
      value: ""
    },
    {
      title: "홈페이지 신청일시",
      value: moment(productCreateAt).format("YY년 MM월 DD일 HH:mm")
    },
    {
      title: "홈페이지 예상완료일시",
      value: moment(productCreateAt)
        .add(3, "days")
        .format("YYMMDD")
    },
    {title: "홈페이지 작업 현황", value: ""},
    {title: "신청레이아웃", value: product ? layoutType : ""},
    {
      title: "요청URL",
      value: requestUrl
    },
    {
      title: "레이아웃 비용",
      value: layoutPrice
    },
    {
      title: "상품금액",
      value: productPrice
    },
    {
      title: "결제상태",
      value: ""
    },
    {
      title: "현재상태",
      value: ""
    },
    {
      title: "연락처 핸드폰",
      value: autoHypen(phoneNumber)
    }
  ];

  return (
    <JDbox mode="table">
      <table>
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
              <td>{column.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </JDbox>
  );
};

export default SpecificAtion;
