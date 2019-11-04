import React, { useRef, Fragment, useEffect } from "react";
import Sms from "./Sms";
import { Mutation, Query } from "react-apollo";
import {
  createSmsTemplate,
  createSmsTemplateVariables,
  deleteSmsTemplate,
  deleteSmsTemplateVariables,
  updateSmsTemplate,
  updateSmsTemplateVariables,
  getSmsInfo,
  getSmsInfoVariables,
  getMyProfile_GetMyProfile_user,
  updateSender,
  updateSenderVariables
} from "../../../types/api";
import {
  GET_SMS_INFO,
  CREATE_SMS_TEMPLATE,
  DELETE_SMS_TEMPLATE,
  UPDATE_SMS_TEMPLATE,
  UPDATE_SENDER,
  GET_BOOKINGS
} from "../../../queries";
import {
  queryDataFormater,
  showError,
  onCompletedMessage
} from "../../../utils/utils";
import { getOperationName } from "apollo-utilities";
import { DEFAULT_SMS_TEMPLATE } from "../../../types/defaults";
import Preloader from "../../../atoms/preloader/Preloader";
import { IContext } from "../../MiddleServerRouter";
import { LANG } from "../../../hooks/hook";

class CreateSmsTemplate extends Mutation<
  createSmsTemplate,
  createSmsTemplateVariables
  > { }
class DeleteSmsTemplate extends Mutation<
  deleteSmsTemplate,
  deleteSmsTemplateVariables
  > { }
class UpdateSmsTemplate extends Mutation<
  updateSmsTemplate,
  updateSmsTemplateVariables
  > { }
class UpdateSmsSender extends Mutation<updateSender, updateSenderVariables> { }
class GetSmsInfo extends Query<getSmsInfo, getSmsInfoVariables> { }

interface IProps {
  context: IContext;
}

const SmsWrap: React.FC<IProps> = ({ context }) => {
  const { house } = context;

  useEffect(() => { }, []);

  return (
    <GetSmsInfo
      query={GET_SMS_INFO}
      variables={{
        houseId: house._id
      }}
    >
      {({ data: smsData, loading, error }) => {
        const smsInfo = queryDataFormater(
          smsData,
          "GetSmsInfo",
          "smsInfo",
          undefined
        );

        return (
          <CreateSmsTemplate
            mutation={CREATE_SMS_TEMPLATE}
            refetchQueries={[getOperationName(GET_SMS_INFO)!]}
            onCompleted={({ CreateSmsTemplate }) =>
              onCompletedMessage(
                CreateSmsTemplate,
                LANG("create_template_complited"),
                LANG("create_template_failed")
              )
            }
          >
            {createSmsTemplateMu => (
              <DeleteSmsTemplate
                mutation={DELETE_SMS_TEMPLATE}
                refetchQueries={[getOperationName(GET_SMS_INFO)!]}
                onCompleted={({ DeleteSmsTemplate }) =>
                  onCompletedMessage(
                    DeleteSmsTemplate,
                    LANG("delete_template_completed"),
                    LANG("delete_template_failed")
                  )
                }
              >
                {deleteSmsTemplateMu => (
                  <UpdateSmsSender mutation={UPDATE_SENDER}>
                    {updateSenderMu => (
                      <UpdateSmsTemplate
                        mutation={UPDATE_SMS_TEMPLATE}
                        onCompleted={({ UpdateSmsTemplate }) =>
                          onCompletedMessage(
                            UpdateSmsTemplate,
                            LANG("update_template_completed"),
                            LANG("update_template_failed")
                          )
                        }
                      >
                        {updateSmsTemplateMu => {
                          const smsTemplateMutationes = {
                            updateSmsTemplateMu,
                            deleteSmsTemplateMu,
                            createSmsTemplateMu,
                            updateSenderMu
                          };

                          return (
                            <Fragment>
                              <Sms
                                key={`sms${smsInfo &&
                                  smsInfo.smsTemplates &&
                                  smsInfo.smsTemplates.length}${loading &&
                                  "--loading"}`}
                                smsTemplateMutationes={smsTemplateMutationes}
                                loading={loading}
                                context={context}
                                smsInfo={smsInfo}
                              />
                              <Preloader loading={loading} page />
                            </Fragment>
                          );
                        }}
                      </UpdateSmsTemplate>
                    )}
                  </UpdateSmsSender>
                )}
              </DeleteSmsTemplate>
            )}
          </CreateSmsTemplate>
        );
      }}
    </GetSmsInfo>
  );
};

export default SmsWrap;
