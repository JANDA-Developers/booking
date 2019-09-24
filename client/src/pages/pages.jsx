import React from "react";
import DynamicImport from "../utils/dynamicComponent";
import Preloader from "../atoms/preloader/Preloader";

export const Sms = props => (
  <DynamicImport load={() => import("./middleServer/sms/SmsWrap")}>
    {DNcompoent =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);

export const DashBoard = props => (
  <DynamicImport load={() => import("./middleServer/dashBoard/DashBoardWrap")}>
    {DNcompoent =>
      DNcompoent === null ? (
        <Preloader page loading={true} />
      ) : (
        <DNcompoent {...props} />
      )
    }
  </DynamicImport>
);

export const HouseManualConfig = props => (
  <DynamicImport
    load={() =>
      import("./middleServer/houseManualConfig/HouseManualConfigWrap.tsx")
    }
  >
    {DNcompoent =>
      DNcompoent === null ? (
        <Preloader page loading={true} />
      ) : (
        <DNcompoent {...props} />
      )
    }
  </DynamicImport>
);

export const ResvList = props => (
  <DynamicImport load={() => import("./middleServer/resvList/ResvListWrap")}>
    {DNcompoent =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);

export const Qna = props => (
  <DynamicImport load={() => import("./middleServer/qna/Qna")}>
    {DNcompoent =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);

export const Statistic = props => (
  <DynamicImport load={() => import("./middleServer/statistic/StatisticWrap")}>
    {DNcompoent =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);

export const SmsHistory = props => (
  <DynamicImport
    load={() => import("./middleServer/smsHistory/SmsHistoryWrap")}
  >
    {DNcompoent =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);

export const SetPrice = props => (
  <DynamicImport load={() => import("./middleServer/setPrice/SetPriceWrap")}>
    {DNcompoent =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);

export const ConfigWrap = props => (
  <DynamicImport load={() => import("./middleServer/config/ConfigWrap")}>
    {DNcompoent =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);

export const SelectProducts = props => (
  <DynamicImport
    load={() => import("./middleServer/product/SelectProductWrap")}
  >
    {DNcompoent =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);

export const SuperMain = props => (
  <DynamicImport load={() => import("./middleServer/super/SuperMainWrap")}>
    {DNcompoent =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);

export const MakeHouse = props => (
  <DynamicImport load={() => import("./middleServer/makeHouse/MakeHouse")}>
    {DNcompoent =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);

export const MyPage = props => (
  <DynamicImport load={() => import("./middleServer/myPage/MyPageWrap")}>
    {DNcompoent =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);

export const SignUp = props => (
  <DynamicImport load={() => import("./middleServer/signUp/SignUp")}>
    {DNcompoent =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);

export const Login = props => (
  <DynamicImport load={() => import("./middleServer/Login/Login")}>
    {DNcompoent =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);

export const Ready = props => (
  <DynamicImport load={() => import("./middleServer/ready/Ready")}>
    {DNcompoent =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);

export const AssigTimeline = props => (
  <DynamicImport load={() => import("./middleServer/assig/AssigTimelineWrap")}>
    {DNcompoent =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);

export const RoomConfig = props => (
  <DynamicImport
    load={() => import("./middleServer/roomConfig/RoomConfigWrap")}
  >
    {DNcompoent =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);

export const DailyPrice = props => (
  <DynamicImport
    load={() => import("./middleServer/dailyPrice/DailyPriceWrap")}
  >
    {DNcompoent =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);
