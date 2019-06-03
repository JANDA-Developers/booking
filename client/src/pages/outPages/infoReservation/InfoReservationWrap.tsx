/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {Fragment, useState} from "react";
import {Mutation} from "react-apollo";
import InfoReservation from "./InfoReservation";
import {ErrProtecter} from "../../../utils/utils";
import {CREATE_BOOKER} from "../../../queries";

interface IProps {}

// 하우스 아이디를 우선 Props를 통해서 받아야함
const InfoReservationWrap: React.SFC<IProps> = () => {
  const addSeasonHook = "";
  // TODO

  return <InfoReservation />;
};

export default ErrProtecter(InfoReservationWrap);
