import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import React from "react";
import classNames from "classnames";
import "./Pagination.scss";
import { LANG } from "../../hooks/hook";
import { IPageInfo } from "../../types/interface";

interface IProps {
  previousDisplay?: boolean;
  textSize?: "large" | "small";
  align?: "center";
  pageInfo: IPageInfo;
  setPage: (foo: number) => any;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  previousLabel?: React.ReactNode;
  nextLabel?: React.ReactNode;
  breakLabel?: string | React.ReactNode;
  breakClassName?: string;
  breakLinkClassName?: string;
  onPageChange?(selectedItem: { selected: number }): void;
  initialPage?: number;
  forcePage?: number;
  disableInitialCallback?: boolean;
  containerClassName?: string;
  pageClassName?: string;
  pageLinkClassName?: string;
  activeClassName?: string;
  activeLinkClassName?: string;
  previousClassName?: string;
  nextClassName?: string;
  previousLinkClassName?: string;
  nextLinkClassName?: string;
  disabledClassName?: string;
  hrefBuilder?(pageIndex: number): void;
  extraAriaContext?: string;
}

const JDPagination: React.SFC<IProps> = ({
  previousDisplay,
  textSize,
  align,
  pageRangeDisplayed = 1,
  marginPagesDisplayed = 4,
  setPage,
  pageInfo,
  ...props
}) => {
  const classes = classNames({
    "JDpagination-wrap": true,
    "JDpagination-wrap--text-large": textSize === "large",
    "JDpagination-wrap--text-small": textSize === "small",
    "JDpagination-wrap--align-center": align === "center",
    "JDpagination-wrap--prev-hidden": previousDisplay === false
  });

  const pageCount = pageInfo.totalPage;
  const onPageChange = ({ selected }: any) => {
    setPage(selected + 1);
  };

  return (
    <div className={classes}>
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={onPageChange}
        pageRangeDisplayed={pageRangeDisplayed}
        marginPagesDisplayed={marginPagesDisplayed}
        containerClassName="JDpagination" // Ul
        pageClassName="JDpagination__li"
        activeClassName="JDpagination__li--active"
        pageLinkClassName="JDpagination__a"
        activeLinkClassName="JDpagination__a--active"
        previousClassName="JDpagination__btn-prev"
        nextClassName="JDpagination__btn-next"
        previousLinkClassName="JDpagination__btn-prev__a"
        nextLinkClassName="JDpagination__btn-next__a"
        disabledClassName="JDpagination__btn--disabled"
        extraAriaContext="extraAriaContext"
        breakClassName="JDpagination__ellipsis"
        breakLinkClassName="JDpagination__ellipsis-a"
        nextLabel={LANG("next")}
        previousLabel={LANG("prev")}
        {...props}
      />
    </div>
  );
};
//
export default JDPagination;
