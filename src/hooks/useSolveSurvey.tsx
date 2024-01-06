import { useMutation } from "react-query";
import { useAxios } from "../axios/useAxios";
import { SolveSurveyType } from "../types/SolveSurveyType";

export const useSolveSurvey = () =>{
    const agent = useAxios();
    const solveSurvey = async (input:SolveSurveyType) =>{
        try {
            const { data } = await agent.post('Survey/solvesurvey', JSON.stringify(input), {headers:{"Content-Type":"application/json"}})
              return data;
        } catch(error) {
            console.log(error);
        }
    };
    return useMutation(solveSurvey, {
        onError: (error) => console.log(error)
    });
}