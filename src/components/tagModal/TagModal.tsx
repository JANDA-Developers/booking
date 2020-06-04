import React, { useState } from 'react';
import TagInput, { Ttag } from '../../atoms/tagInput/TagInput';
import { JDmodalConfigProps, IUseModal, JDbutton, JDmodal, JDlabel } from '@janda-com/front';
import ModalEndSection from '../../atoms/modal/components/ModalEndSection';
import { LANG } from '@janda-com/lang';
import Button from '../../atoms/button/Button';


export interface TModalInfo {
    defaultTags: Ttag[];
    [key: string]: any;
}

interface IProp {
    modalHook: IUseModal<TModalInfo>;
    modalProp: JDmodalConfigProps;
    callBackTagModify: (tags: Ttag[], newTags: Ttag[], revmovedKeys: string[]) => void;
}

export const TagModal: React.FC<IProp> = ({ modalProp, modalHook, callBackTagModify }) => {
    const { info } = modalHook;
    if (!info) throw Error("TagModal Info was not supplied")
    const { defaultTags } = info;
    const [tags, setTags] = useState<Ttag[]>(defaultTags);

    const handleCallBackTagModify = () => {
        const originTagKeys = defaultTags.map(t => t.key);
        const tagKeys = tags.map(t => t.key);
        const newTags = tags.filter(dt => !originTagKeys.includes(dt.key))
        const removedTags = originTagKeys.filter(otk => !tagKeys.includes(otk))
        callBackTagModify(tags, newTags, removedTags);
    }

    return <JDmodal {...modalHook} {...modalProp} >
        <div>
            <JDlabel txt={LANG("insert_tag")} />

            <TagInput mb="normal" tags={tags} setTags={setTags} />
        </div>
        <ModalEndSection>
            <Button mode="flat" label={LANG("confirm")} thema="primary" onClick={handleCallBackTagModify} />
            <Button mode="flat" label={LANG("close")} thema="grey" onClick={() => modalHook.closeModal()} />
        </ModalEndSection>
    </JDmodal>;
};

export default TagModal