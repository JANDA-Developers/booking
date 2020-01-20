import React from "react";
import DynamicImport from "../../../utils/dynamicComponent";
import Preloader from "../../../atoms/preloader/Preloader";

export const HostHouses = (props: any) => (
  <DynamicImport load={() => import("./hostHouse/HostHousesWrap")}>
    {(DNcompoent: any) =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);

export const Users = (props: any) => (
  <DynamicImport load={() => import("./users/UsersWrap")}>
    {(DNcompoent: any) =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);
