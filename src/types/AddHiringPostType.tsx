export type GeneralSkillType={
    Name:string;
}

export type RequiredLanguageType = {
    LanguageId: string;
    LanguageLevelId:string;
}

export type AddHiringPostType = {
    Position:string;
    UtilizationTypeId:string;
    CompanyProjectId:string;
    UtilizationAmount:number;
    EmployeeLevelOfExperienceId:string;
    Rgb:string;
    ExpiresAt:Date;
    Title:string;
    Budget:number;
    PrefferedStart: Date;
    GeneralSkills: GeneralSkillType[];
    RequiredLanguages: RequiredLanguageType[];
}