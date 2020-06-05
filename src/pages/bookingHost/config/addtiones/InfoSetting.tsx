import React, { useState } from 'react';
import { InputText, useInput } from '@janda-com/front/build';
import { JDphotoFrame, JDalign } from '@janda-com/front';
import { LANG } from '../../../../hooks/hook';
import { IAddtionProp } from '../components/ConfigBlock';

interface IProp { }

export const InfoSetting: React.FC<IAddtionProp> = ({
    context,
    updateFn,
}) => {
    const ResvCompeleteMsg = useInput('');
    const ResvCautionMsg = useInput('');
    const PayPrecaution = useInput('');
    const CheckPageMsg = useInput('');

    const [infos, setInfos] = useState([]);
    const handleUpdateBtn = () => {
        updateFn({
        })
    }

    return <div >
        <JDalign flex={{
            oneone: true
        }}>
            <InputText textarea label={LANG("resv_complete_msg")} {...ResvCompeleteMsg} />
            <JDphotoFrame mb="large" unStyle={false} isBgImg />
        </JDalign>
        <JDalign flex={{
            oneone: true
        }}>
            <InputText textarea label={LANG("resv_caution_msg")} {...ResvCautionMsg} />
            <JDphotoFrame mb="large" unStyle={false} isBgImg />
        </JDalign>
        <JDalign flex={{
            oneone: true
        }}>
            <InputText textarea label={LANG("pay_precaution")} {...PayPrecaution} />
            <JDphotoFrame mb="large" unStyle={false} isBgImg />
        </JDalign>
        <JDalign flex={{
            oneone: true
        }}>
            <InputText textarea label={LANG("check_point_msg")} {...CheckPageMsg} />
            <JDphotoFrame mb="large" unStyle={false} isBgImg />
        </JDalign>
    </div>;
};
