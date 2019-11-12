import React from "react";
import DynamicImport from "../../utils/dynamicComponent";
import Preloader from "../../atoms/preloader/Preloader";

export const ColorPage = props => (
  <DynamicImport load={() => import("./color/ColorPage")}>
    {DNcompoent =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);

export const Grid = props => (
  <DynamicImport load={() => import("./grid/Grid")}>
    {DNcompoent =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);

export const Brand = props => (
  <DynamicImport load={() => import("./brand/Brand")}>
    {DNcompoent =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);

export const ShowComponents = props => (
  <DynamicImport load={() => import("./show/ShowComponents")}>
    {DNcompoent =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);

export const DocumentHome = props => (
  <DynamicImport load={() => import("./documentHome/DocumentHomeWrap")}>
    {DNcompoent =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);
