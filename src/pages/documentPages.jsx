import React from "react";
import DynamicImport from "../utils/dynamicComponent";
import Preloader from "../atoms/preloader/Preloader";

export const Margin = props => (
  <DynamicImport load={() => import("./documents/Margin")}>
    {DNcompoent =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);

export const ColorPage = props => (
  <DynamicImport load={() => import("./documents/color/ColorPage")}>
    {DNcompoent =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);

export const Grid = props => (
  <DynamicImport load={() => import("./documents/Grid")}>
    {DNcompoent =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);

export const Brand = props => (
  <DynamicImport load={() => import("./documents/Brand")}>
    {DNcompoent =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);

export const ShowComponents = props => (
  <DynamicImport load={() => import("./documents/show/ShowComponents")}>
    {DNcompoent =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);

export const DocumentHome = props => (
  <DynamicImport
    load={() => import("./documents/documentHome/DocumentHomeWrap")}
  >
    {DNcompoent =>
      DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />
    }
  </DynamicImport>
);
