import React, {useRef} from "react";
import Sms from "./Sms";
import {Mutation, Query} from "react-apollo";
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
  UPDATE_SENDER
} from "../../../queries";
import {
  queryDataFormater,
  showError,
  onCompletedMessage
} from "../../../utils/utils";

class CreateSmsTemplate extends Mutation<
  createSmsTemplate,
  createSmsTemplateVariables
> {}
class DeleteSmsTemplate extends Mutation<
  deleteSmsTemplate,
  deleteSmsTemplateVariables
> {}
class UpdateSmsTemplate extends Mutation<
  updateSmsTemplate,
  updateSmsTemplateVariables
> {}
class UpdateSmsSender extends Mutation<updateSender, updateSenderVariables> {}
class GetSmsInfo extends Query<getSmsInfo, getSmsInfoVariables> {}

interface IProps {
  houseId: string;
}

const SmsWrap: React.FC<IProps> = ({houseId}) => (
  <GetSmsInfo
    query={GET_SMS_INFO}
    variables={{
      houseId: houseId
    }}
  >
    {({data: smsData, loading, error}) => {
      showError(error);
      const smsInfo = queryDataFormater(
        smsData,
        "GetSmsInfo",
        "smsInfo",
        undefined
      );
      return (
        <CreateSmsTemplate
          mutation={CREATE_SMS_TEMPLATE}
          onCompleted={({CreateSmsTemplate}) =>
            onCompletedMessage(
              CreateSmsTemplate,
              "템플릿 생성완료",
              "템플릿 생성실패"
            )
          }
        >
          {createSmsTemplateMu => (
            <DeleteSmsTemplate
              mutation={DELETE_SMS_TEMPLATE}
              onCompleted={({DeleteSmsTemplate}) =>
                onCompletedMessage(
                  DeleteSmsTemplate,
                  "템플릿 생성완료",
                  "템플릿 생성실패"
                )
              }
            >
              {deleteSmsTemplateMu => (
                <UpdateSmsSender mutation={UPDATE_SENDER}>
                  {updateSenderMu => (
                    <UpdateSmsTemplate
                      mutation={UPDATE_SMS_TEMPLATE}
                      onCompleted={({UpdateSmsTemplate}) =>
                        onCompletedMessage(
                          UpdateSmsTemplate,
                          "템플릿 생성완료",
                          "템플릿 생성실패"
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
                          <Sms
                            smsTemplateMutationes={smsTemplateMutationes}
                            loading={loading}
                            houseId={houseId}
                            smsInfo={smsInfo}
                          />
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

export default SmsWrap;
