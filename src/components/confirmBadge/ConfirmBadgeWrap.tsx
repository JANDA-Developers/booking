import React, {useState} from "react";
import {ErrProtecter, showError, onCompletedMessage} from "../../utils/utils";
import {Mutation} from "react-apollo";
import {confirmBooking, confirmBookingVariables} from "../../types/api";
import {CONFIRM_BOOKING} from "../../queries";
import ConfirmBadge from "./ConfirmBadge";
import {IJDbadge} from "../../atoms/badge/Badge";

class ConfirmBooking extends Mutation<
  confirmBooking,
  confirmBookingVariables
> {}

interface IProps extends IJDbadge {
  show?: boolean;
  bookingId: string;
  whenClickBadge?: (bookingId: string) => void;
}

const ConfirmBadgeWrap: React.FC<IProps> = ({
  whenClickBadge,
  bookingId,
  show,
  ...prop
}) => {
  const appearHook = useState(show || false);

  return (
    <ConfirmBooking
      variables={{
        bookingId
      }}
      mutation={CONFIRM_BOOKING}
    >
      {confirmBookingMu => (
        <ConfirmBadge
          {...prop}
          show={show}
          whenClickBadge={whenClickBadge}
          appearHook={appearHook}
          bookingId={bookingId}
          confirmBookingMu={confirmBookingMu}
        />
      )}
    </ConfirmBooking>
  );
};

export default ErrProtecter(ConfirmBadgeWrap);
