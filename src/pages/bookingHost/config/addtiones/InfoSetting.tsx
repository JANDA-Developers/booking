import React, { useState } from 'react';
import { InputText } from '@janda-com/front/build/components/InputText/InputText';
import { JDphotoFrame, JDalign } from '@janda-com/front';
import { LANG } from '../../../../hooks/hook';
import { IAddtionProp } from '../components/ConfigBlock';

interface IProp { }

export const InfoSetting: React.FC<IAddtionProp> = ({
    context,
    updateFn,
}) => {
    const [infos, setInfos] = useState([]);
    const handleUpdateBtn = () => {
        updateFn({
        })
    }

    return <div >
        <JDalign>
            <div>
                <InputText label={LANG("resv_complete_msg")} textarea />
            </div>
            <JDphotoFrame />
        </JDalign>
        <JDalign>
            <div>
                <InputText label={LANG("check_point_msg")} textarea />
            </div>
            <JDphotoFrame />
        </JDalign>
    </div>;
};
