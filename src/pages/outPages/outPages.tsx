import React, {Fragment} from "react";
import DynamicImport from "../../utils/dynamicComponent";
import Preloader from "../../atoms/preloader/Preloader";
import "./outPages.scss";

export const Reservation = (props: any) => (
  <DynamicImport load={() => import("./reservation/ReservationWrap")}>
    {(DNcompoent: any) =>
      DNcompoent === null ? (
        <Preloader loading={true} page />
      ) : (
        <DNcompoent {...props} />
      )
    }
  </DynamicImport>
);

export const ReservationCheck = (props: any) => (
  <DynamicImport
    load={() => import("./checkReservation/CheckReservationWrap")}
  >
    {(DNcompoent: any) =>
      DNcompoent === null ? (
        <Preloader loading={true} page />
      ) : (
        <DNcompoent {...props} />
      )
    }
  </DynamicImport>
);

export const HM = (props: any) => (
  <DynamicImport load={() => import("./HM/HM")}>
    {(DNcompoent: any) =>
      DNcompoent === null ? (
        <Preloader loading={true} page />
      ) : (
        <DNcompoent {...props} />
      )
    }
  </DynamicImport>
);

export const ReservationInfo = (props: any) => (
  <DynamicImport
    load={() => import("./infoReservation/InfoReservation")}
  >
    {(DNcompoent: any) =>
      DNcompoent === null ? (
        <Preloader loading={true} page />
      ) : (
        <DNcompoent {...props} />
      )
    }
  </DynamicImport>
);

export const temp = () => {};
