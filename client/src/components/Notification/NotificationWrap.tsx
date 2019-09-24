import React, {Fragment} from "react";
import {Mutation, Query} from "react-apollo";
import {
  UPDATE_MYPROFILE,
  GET_USER_INFO,
  GET_NOTI,
  CONFIRM_NOTI
} from "../../queries";
import {
  showError,
  onCompletedMessage,
  queryDataFormater
} from "../../utils/utils";
import {IUser, IHouse, IDiv} from "../../types/interface";
import {
  getNotifications,
  getNotificationsVariables,
  confirmBooking,
  confirmBookingVariables,
  confirmNotification,
  confirmNotificationVariables
} from "../../types/api";
import Notification from "./Notification";
import {IContext} from "../../pages/MiddleServerRouter";
import {getOperationName} from "apollo-link";
import moment from "moment";
import {FLOATING_PRElOADER_SIZE} from "../../types/enum";
import Preloader from "../../atoms/preloader/Preloader";

class GetNotificationQu extends Query<
  getNotifications,
  getNotificationsVariables
> {}

class ConfirmMutation extends Mutation<
  confirmNotification,
  confirmNotificationVariables
> {}

interface IProps {
  context: IContext;
  icon: JSX.Element;
}

const NotificationWrap: React.FC<IProps> = ({context, icon}) => {
  const {house} = context;

  return (
    <GetNotificationQu
      skip={!house}
      query={GET_NOTI}
      variables={{houseId: house._id, count: 20}}
    >
      {({data, loading}) => {
        const notifications =
          queryDataFormater(data, "GetNotifications", "notifications", []) ||
          [];
        const filterdNotifications = notifications.filter(
          noti => moment(noti.validPeriod).toDate() > new Date()
        );

        return (
          <ConfirmMutation
            mutation={CONFIRM_NOTI}
            refetchQueries={[getOperationName(GET_NOTI)!]}
          >
            {(confirmMutationMu, {loading: confirmMutationLoading}) => (
              <Fragment>
                <Preloader
                  floating
                  size={FLOATING_PRElOADER_SIZE}
                  loading={confirmMutationLoading}
                />
                <Notification
                  icon={icon}
                  loading={loading}
                  context={context}
                  confirmMutationMu={confirmMutationMu}
                  notifications={filterdNotifications}
                />
              </Fragment>
            )}
          </ConfirmMutation>
        );
      }}
    </GetNotificationQu>
  );
};

export default NotificationWrap;
