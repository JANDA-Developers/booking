import React from "react";
import JDbadge, {BADGE_THEMA} from "../../atoms/badge/Badge";
import JDanimation, {Animation} from "../../atoms/animation/Animations";
import {MutationFn} from "react-apollo";
import {confirmBooking, confirmBookingVariables} from "../../types/api";

interface IProps {
  appearHook: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  confirmBookingMu: MutationFn<confirmBooking, confirmBookingVariables>;
  whenClickBadge?: (bookingId: string) => void;
  bookingId: string;
  show?: boolean;
}

const ConfirmBadge: React.FC<IProps> = ({
  appearHook,
  whenClickBadge,
  confirmBookingMu,
  bookingId,
  show = true,
  ...props
}) => (
  <JDanimation animation={[Animation.zoomOut]}>
    {show && appearHook[0] && (
      <JDbadge
        hover
        onClick={() => {
          appearHook[1](false);
          whenClickBadge && whenClickBadge(bookingId);
          confirmBookingMu();
        }}
        thema={BADGE_THEMA.NEW}
        {...props}
      >
        new
      </JDbadge>
    )}
  </JDanimation>
);

export default ConfirmBadge;
