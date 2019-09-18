/* eslint-disable max-len */
import React from "react";
import classNames from "classnames";
import ErrProtecter from "../../utils/errProtect";
import "./Preloader.scss";
import JDanimation, {Animation} from "../animation/Animations";
export type PreloaderSize = "large" | "tiny" | "medium" | "small";

interface IProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  page?: boolean;
  size?: PreloaderSize;
  loading?: boolean;
  position?: "center";
  floating?: boolean;
  animation?: Animation[];
  noAnimation?: boolean;
  wrapClassName?: string;
}

const JDpreloader: React.FC<IProps> = ({
  page,
  size = "tiny",
  position,
  className,
  wrapClassName,
  loading = false,
  floating,
  noAnimation,
  animation = [Animation.zoomIn, Animation.zoomOut],
  ...props
}) => {
  const wrapClasses = classNames("preloader__wrap", wrapClassName, {
    "preloader__wrap--center": position === "center"
  });

  const classes = classNames("preloader", className, {
    "preloader--tiny": size === "tiny",
    "preloader--large": size === "large",
    "preloader--medium": size === "medium",
    "preloader--small": size === "small",
    "preloader--floating": floating
  });

  return !page ? (
    <JDanimation animation={noAnimation ? [] : animation}>
      {loading && (
        <span className={`preloader__wrap ${wrapClasses}`}>
          <svg
            {...props}
            version="1.1"
            className={classes}
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30px"
            height="30px"
            viewBox="0 0 40 40"
            enableBackground="new 0 0 30 30"
            xmlSpace="preserve"
          >
            <path
              className="preloader__outerline"
              d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
              s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
              c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
            />
            <path
              className="preloader__fill"
              d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
              C22.32,8.481,24.301,9.057,26.013,10.047z"
            >
              <animateTransform
                attributeType="xml"
                attributeName="transform"
                type="rotate"
                from="0 20 20"
                to="360 20 20"
                dur="0.5s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </span>
      )}
    </JDanimation>
  ) : (
    <JDanimation animation={[Animation.fadeOut]}>
      {loading && (
        <div className={`preloader--page__wrap ${wrapClassName}`}>
          <div className="preloader--page" />
        </div>
      )}
    </JDanimation>
  );
};

export default ErrProtecter(JDpreloader);
