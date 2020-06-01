import React, { useState } from 'react';
import JDtypho from '../../../../atoms/typho/Typho';
import { InputText } from '@janda-com/front';
import { JDbutton } from '@janda-com/front';
import { useInput } from '../../../../hooks/hook';

interface IProp {
    handleSearch: (bn: string) => void;
}

export const NumForm: React.FC<IProp> = ({ handleSearch }) => {
    const numberSearchHook = useInput(localStorage.getItem("JD-BN") || "");

    return <div>
        <JDtypho />
        <InputText {...numberSearchHook} />
        <JDbutton onClick={() => {
            handleSearch(numberSearchHook.value)
        }} />
    </div>
};
