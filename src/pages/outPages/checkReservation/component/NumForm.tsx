import React, { useState } from 'react';
import JDtypho from '../../../../atoms/typho/Typho';
import { JDbutton } from '@janda-com/front';
import { useInput, LANG } from '../../../../hooks/hook';
import InputText from '../../../../atoms/forms/inputText/InputText';

interface IProp {
    handleSearch: (bn: string) => void;
}

export const NumForm: React.FC<IProp> = ({ handleSearch }) => {
    const numberSearchHook = useInput(localStorage.getItem("JD-BN") || "");

    return <div>
        <JDtypho />
        <InputText label={LANG("booking_number")} {...numberSearchHook} />
        <JDbutton label={LANG("reservation_lookup")} thema="primary" size="longLarge" onClick={() => {
            handleSearch(numberSearchHook.value)
        }} />
    </div>
};
