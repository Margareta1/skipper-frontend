export type AddSkillsMatrixType = {
    Skills: SkillType[],
    AssigneesIds: string[],
    Rgb: string
}

export type SkillType = {
    SkillTitle: string,
    RangeFrom: number,
    RangeTo: number,
    OrderKey: number,
    SkillDescription: string
}