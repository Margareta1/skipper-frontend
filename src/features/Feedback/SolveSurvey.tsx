import { useParams } from "react-router";
import { useGetIsSolvedSurvey } from "../../hooks/useGetIsSolvedSurvey";
import { useGetSurvey } from "../../hooks/useGetSurvey";
import { Button, Input, Skeleton } from "antd";
import { SolveSurveyType, TextInputAnswer } from "../../types/SolveSurveyType";
import { useState } from "react";
import { useSolveSurvey } from "../../hooks/useSolveSurvey";

const SolveSurvey: React.FC = () => {
  const { id } = useParams();
  const { data: solved, isLoading: isLoadingSolved } = useGetIsSolvedSurvey(id);
  const { data: survey, isLoading: isLoadingSurvey } = useGetSurvey(id);
  const [userInputs, setUserInputs] = useState<TextInputAnswer[]>([]);
  const solveSurvey = useSolveSurvey();

  const handleInputChange = (orderKey: number, inputValue: string) => {
    const existingInputIndex = userInputs.findIndex(
      (input) => input.OrderKey === orderKey
    );

    if (existingInputIndex !== -1) {
      setUserInputs((prevInputs) => {
        const updatedInputs = [...prevInputs];
        updatedInputs[existingInputIndex] = {
          OrderKey: orderKey,
          Input: inputValue,
        };
        return updatedInputs;
      });
    } else {
      setUserInputs((prevInputs) => [
        ...prevInputs,
        { OrderKey: orderKey, Input: inputValue },
      ]);
    }
  };

  const handleSubmit = () => {
    const dto: SolveSurveyType = {
      TextInputAnswer: userInputs,
      SurveyId: survey.survey.survey.id,
    };

    solveSurvey.mutate(dto, {
      onSuccess: () => {
        setUserInputs([]);
      },
    });
  };

  return isLoadingSolved || isLoadingSurvey ? (
    <Skeleton />
  ) : (
    <div className="dashboard-main-div">
      <div className="administration-inner-div" style={{ width: "50%" }}>
        {solved ? (
          <div>You have already solved this survey! :D </div>
        ) : (
          <div>
            {survey.questions
              .sort((a: any, b: any) => a.orderKey - b.orderKey)
              .map((question: any) => (
                <div key={question.id} style={{margin:"10px"}}>
                  <label>{question.label}</label>
                  <Input
                    placeholder={question.placeholder}
                    onChange={(e) => {
                      e.persist();
                      handleInputChange(question.orderKey, e.target.value);
                    }}
                  />
                </div>
              ))}

            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolveSurvey;
