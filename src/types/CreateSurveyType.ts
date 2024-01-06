export type SurveyQuestionType = {
  Label: string;
  OrderKey: number;
  Placeholder: string;
};

export type CreateSurveyType = {
  Rgb: string;
  StartDate: Date;
  EndDate: Date;
  Questions: SurveyQuestionType[];
  AssigneesUsernames: string[];
};
