import ReactPaginate, {ReactPaginateProps} from "react-paginate";
import React from "react";
import classNames from "classnames";
import "./Pagination.scss";
import Button from "../button/Button";

interface IProps extends ReactPaginateProps {
  previousDisplay?: boolean;
  textSize?: "large" | "small";
  align?: "center";
}

const JDPagination: React.SFC<IProps> = ({
  previousDisplay,
  textSize,
  align,
  ...props
}) => {
  const classes = classNames({
    "JDpagination-wrap": true,
    "JDpagination-wrap--text-large": textSize === "large",
    "JDpagination-wrap--text-small": textSize === "small",
    "JDpagination-wrap--align-center": align === "center",
    "JDpagination-wrap--prev-hidden": previousDisplay === false
  });
  return (
    <div className={classes}>
      <ReactPaginate
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
        nextLabel="다음"
        previousLabel="이전"
        {...props}
      />
    </div>
  );
};
//
export default JDPagination;
