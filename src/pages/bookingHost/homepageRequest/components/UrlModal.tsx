import React, { useState } from "react";
import JDmodal from "../../../../atoms/modal/Modal";
import { IUseModal, LANG } from "../../../../hooks/hook";
import InputText from "../../../../atoms/forms/inputText/InputText";
import Button from "../../../../atoms/button/Button";
import Align from "../../../../atoms/align/Align";
import { s4 } from "../../../../utils/utils";
import ModalEndSection from "../../../../atoms/modal/components/ModalEndSection";

interface IProps {
  modalHook: IUseModal;
  onSubmit: (urls: string[]) => any;
  urls: string[];
}

const UrlModal: React.FC<IProps> = ({
  modalHook,
  urls: defaultUrl,
  onSubmit
}) => {
  const [urls, setUrls] = useState(defaultUrl);

  return (
    <JDmodal
      head={{
        title: LANG("request_domain"),
        closeFn: modalHook.closeModal
      }}
      key={modalHook.isOpen ? "UrlModalOpen" : "UrlModalClose"}
      {...modalHook}
    >
      {urls.map((url, i) => {
        const isLast = i === urls.length - 1;
        return (
          <Align
            flex={{
              grow: true
            }}
          >
            <InputText
              onChange={v => {
                urls[i] = v;
                setUrls([...urls]);
              }}
              iconHover
              iconOnClick={() => {
                urls.splice(i, 1);
                setUrls([...urls]);
              }}
              iconProps={{
                size: "small"
              }}
              icon={i > 2 && !isLast ? "clear" : "no"}
              value={url}
              placeholder={"example.co.kr"}
            />
            {i > 2 && isLast && (
              <Button
                onClick={() => {
                  urls.push("");
                  setUrls([...urls]);
                }}
                size="small"
                mode="flat"
                thema="primary"
                label={LANG("add")}
              />
            )}
          </Align>
        );
      })}
      <ModalEndSection>
        <Button
          onClick={() => {
            onSubmit(urls);
            modalHook.closeModal();
          }}
          thema="primary"
          label={LANG("confirm")}
          mode="flat"
        />
      </ModalEndSection>
    </JDmodal>
  );
};

export default UrlModal;
