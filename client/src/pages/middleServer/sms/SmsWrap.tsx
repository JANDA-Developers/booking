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
  UPDATE_SENDER,
  GET_BOOKINGS
} from "../../../queries";
import {
  queryDataFormater,
  showError,
  onCompletedMessage
} from "../../../utils/utils";
import {getOperationName} from "apollo-utilities";
import {DEFAULT_SMS_TEMPLATE} from "../../../types/defaults";

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

      // SMS INFO formatter 추가용
      if (smsInfo) {
        if (smsInfo.smsTemplates === null) {
          smsInfo.smsTemplates = [
            {...DEFAULT_SMS_TEMPLATE, formatName: "새로운 템플릿"}
          ];
        } else {
          if (
            !smsInfo.smsTemplates.find(
              template => template._id === DEFAULT_SMS_TEMPLATE._id
            )
          ) {
            smsInfo.smsTemplates.push({
              ...DEFAULT_SMS_TEMPLATE,
              formatName: "새로운 템플릿 +"
            });
          }
        }
      }

      return (
        <CreateSmsTemplate
          mutation={CREATE_SMS_TEMPLATE}
          refetchQueries={[getOperationName(GET_SMS_INFO)!]}
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
              refetchQueries={[getOperationName(GET_SMS_INFO)!]}
              onCompleted={({DeleteSmsTemplate}) =>
                onCompletedMessage(
                  DeleteSmsTemplate,
                  "템플릿 삭제완료",
                  "템플릿 삭제실패"
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
                          "템플릿 업데이트 완료",
                          "템플릿 업데이트 실패"
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
                            key={`sms${smsInfo &&
                              smsInfo.smsTemplates &&
                              smsInfo.smsTemplates.length}${loading &&
                              "--loading"}`}
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
