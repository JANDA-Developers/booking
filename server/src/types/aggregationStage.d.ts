type StageType =
    | "$project"
    | "$addFields"
    | "$match"
    | "$unwind"
    | "$group"
    | "$sort"
    | "$out"
    | "$count"
    | "$lookup"
    | "$limit"
    | "$facet"
    | "$skip";

export type Stage = {
    [K in StageType]?: any;
};
