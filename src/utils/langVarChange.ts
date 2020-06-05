import { BookingLang } from "../langs/JDlang";
import { krFn } from "../langs/kr";
import en from "../langs/en";
import { getMyProfile_GetMyProfile_user_houses_tags } from "../types/api";
import { HouseTags } from "../types/enum";
import { LANG_VAR_SETS, TLangVarSet } from "../langs/langVar";

export const langVarChange = (houseTags: getMyProfile_GetMyProfile_user_houses_tags[]) => {
    const langTag = houseTags.find(tag => {
        tag.key === HouseTags.LangSet
    })

    if (langTag) {
        const tagValue = langTag.value as keyof TLangVarSet;

        // TODO tagValue 로 찾기
        BookingLang.overrideLangPack({
            kr: krFn(LANG_VAR_SETS[tagValue]),
            en
        });
    }
}