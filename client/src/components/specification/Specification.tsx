import JDbox from "../../atoms/box/JDbox";
import {getSpecification_GetHouse_house} from "../../types/api";
import {Fragment} from "react";
import moment from "moment";
import React from "react";

interface IProps {
  specification: getSpecification_GetHouse_house | undefined;
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
  specification = defaultSpecification
}) => {
  const columns: {title: string; value: string}[] = [
    {
      title: "적용상품",
      value: specification.product && specification.product.name
    },
    {title: "숙소명", value: specification.name},
    {title: "숙소타입", value: specification.houseType},

    {title: "신청자", value: specification.user && specification.user.name},
    {
      title: "신청일시",
      value:
        specification.product &&
        moment(specification.product.createdAt).format("YY년 MM월 DD일 HH:mm")
    },
    {
      title: "예상완료일시",
      value:
        specification.product &&
        moment(specification.product.createdAt)
          .add(3, "days")
          .format("YYMMDD")
    },
    {title: "홈페이지 생성 일시", value: ""},
    {title: "홈페이지 작업 현황", value: ""},
    {title: "신청레이아웃", value: ""},
    {
      title: "결제금액",
      value: specification.product && specification.product.price
    },
    {
      title: "현재상태",
      value: ""
    },
    {
      title: "연락처",
      value: specification.user && specification.user.phoneNumber
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
