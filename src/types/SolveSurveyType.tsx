export type SolveSurveyType = {
    TextInputAnswer: TextInputAnswer[];
    SurveyId: string;
}

export type TextInputAnswer = {
    OrderKey: number;
    Input: string;
}