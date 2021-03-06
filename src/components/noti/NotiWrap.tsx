import React, { Fragment } from "react";
import { Mutation, Query } from "react-apollo";
import { GET_NOTI, CONFIRM_NOTI } from "../../apollo/queries";
import { queryDataFormater, s4 } from "../../utils/utils";
import {
  getNotis,
  getNotisVariables,
  confirmNoti,
  confirmNotiVariables,
  getNotis_GetNotis_notis,
  getMyProfile_GetMyProfile_user_houses_product
} from "../../types/api";
import Noti from "./Noti";
import { IContext } from "../../pages/bookingHost/BookingHostRouter";
import { getOperationName } from "apollo-link";
import moment from "moment";
import { NotiType, NotiLevel } from "../../types/enum";
import { FLOATING_PRELOADER_SIZE } from "../../types/const";
import Preloader from "../../atoms/preloader/Preloader";
import { LANG } from "../../hooks/hook";

class GetNotiQu extends Query<getNotis, getNotisVariables> {}

class ConfirmMutation extends Mutation<confirmNoti, confirmNotiVariables> {}

interface IProps {
  context: IContext;
  icon: JSX.Element;
}

const addExpiredWarnNoti = (
  notis: getNotis_GetNotis_notis[],
  product?: getMyProfile_GetMyProfile_user_houses_product
): void => {
  if (!product) return;

  const { isExpired, expireDate } = product;
  const leftDate = moment(expireDate).diff(new Date(), "day");

  // 몇일 남았는지는 toast로 넣고 만료 직전에 노티를 넣자

  const sharedProp = {
    _id: s4(),
    createdAt: new Date(),
    updatedAt: new Date(),
    validPeriod: moment().add(3, "days")
  };

  if (isExpired) {
    notis.push({
      ...sharedProp,
      __typename: "Noti",
      notiType: NotiType.PRODUCT_EXPIRE,
      title: LANG("product_has_expired"),
      isConfirm: false,
      notiLevel: NotiLevel.WARN,
      msg: LANG(
        "the_current_product_has_expired_normal_service_is_not_possible_Please_proceed_with_the_payment"
      )
    });
  } else if (leftDate < 14) {
    notis.push({
      ...sharedProp,
      __typename: "Noti",
      notiType: NotiType.PRODUCT_EXPIRE,
      title: LANG("F_have_x_days_left_to_try_for_free")(leftDate),
      isConfirm: false,
      notiLevel: NotiLevel.WARN,
      msg: LANG("F_you_have_x_free_trial_left_y__is_about_to_expire")(
        leftDate,
        moment(product.expireDate)
          .local()
          .format("YYYY/MM/DD")
      )
    });
  }
};

const NotiWrap: React.FC<IProps> = ({ context, icon }) => {
  const { house, applyedProduct } = context;

  return (
    <GetNotiQu
      skip={!house}
      query={GET_NOTI}
      variables={{ houseId: house._id, count: 20 }}
    >
      {({ data, loading }) => {
        const notis = queryDataFormater(data, "GetNotis", "notis", []) || [];
        const filterdNotis = notis.filter(noti => true);

        if (applyedProduct) {
          addExpiredWarnNoti(filterdNotis, applyedProduct);
        }

        return (
          <ConfirmMutation
            mutation={CONFIRM_NOTI}
            refetchQueries={[getOperationName(GET_NOTI)!]}
          >
            {(confirmMutationMu, { loading: confirmMutationLoading }) => (
              <Fragment>
                <div style={{ position: "absolute" }}>
                  <Preloader
                    floating
                    size={FLOATING_PRELOADER_SIZE}
                    loading={confirmMutationLoading}
                  />
                </div>
                <Noti
                  icon={icon}
                  loading={loading}
                  context={context}
                  confirmMutationMu={confirmMutationMu}
                  notis={filterdNotis}
                />
              </Fragment>
            )}
          </ConfirmMutation>
        );
      }}
    </GetNotiQu>
  );
};

export default NotiWrap;
