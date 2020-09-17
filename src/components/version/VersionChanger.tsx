import React, { useEffect } from "react";
import { IselectedOption } from "@janda-com/front/build/types/interface";
import { useSelect, JDselect } from "@janda-com/front";


interface ISelectedVersion extends IselectedOption {
    isStable?: boolean;
}

interface IProps {
    versionList: ISelectedVersion[];
}

let lastVersion = localStorage.getItem("lastVersion");

export const VersionChanger: React.FC<IProps> = ({ versionList }) => {
    const getFirstPath = () => window.location.pathname.split('/')[1];
    const urlVersion = getFirstPath();

    const checkVersionIsAvaliable = (version: string): boolean => {
        if (versionList.find(vl => vl.value === version)) return true;
        return false
    }

    const ridUnExistVersion = () => {
        if (lastVersion) {
            if (!checkVersionIsAvaliable(lastVersion)) {
                localStorage.removeItem("lastVersion")
                lastVersion = ""
            }
        }
    }

    const isIncludeInPath = (version: string) => {
        return getFirstPath().includes(version);
    }

    const versionRedirect = (versionString: string = "") => {
        const hashPath = location.href.split("/#/")[1] || "";
        const VS = versionString ? "/" + versionString : versionString;
        location.href = location.protocol + "//" + location.host + VS + "/#/" + hashPath;
    }

    const selectedValue = versionList.find(v =>
        isIncludeInPath(v.value)) ||
        versionList[0]

    const versionHook = useSelect(selectedValue, versionList);

    useEffect(() => {
        ridUnExistVersion();
        if (isIncludeInPath(selectedValue.value))
            localStorage.setItem("lastVersion", selectedValue.value);
    }, [selectedValue.value])

    const changeUrl = (version: string) => {
        ridUnExistVersion();
        const isStable = versionList.find(v => v.value === version)?.isStable;
        const haveVersionUrl = location.pathname.split("/#/")[0].length > 3;

        if (isStable) {
            if (haveVersionUrl)
                versionRedirect("");
        } else if (!isIncludeInPath(version)) {
            versionRedirect(version);
        } else if (haveVersionUrl && !checkVersionIsAvaliable(urlVersion)) {
            ridUnExistVersion();;
            versionRedirect("");
        }
    }

    return <JDselect size="small" selectedOption={versionHook.selectedOption} onChange={v => {
        versionHook.onChange(v);
        changeUrl(v.value);
    }} options={versionHook.options} />
}