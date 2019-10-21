import React from "react";
import {LANG} from "../../../../../hooks/hook";

export const assigSharedDleteGuestConfirmMessage = {
  children: (
    <span>
      {LANG("are_you_sure_you_want_to_delete_this_guest")} <br />(
      {LANG("others_booked_by_the_reservation_will_not_be_erased")})
    </span>
  ),
  trueBtns: [
    {msg: LANG("only_remove_that_guest"), callBackKey: "deleteOne"},
    {
      msg: LANG("remove_all_reservations_booked_together"),
      callBackKey: "deleteAll"
    }
  ]
};
